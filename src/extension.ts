import * as vscode from 'vscode';

const PARTICIPANT_ID = 'portfolio-builder.chat';

const SYSTEM_PROMPT = `You are a portfolio website builder. You produce a complete, polished,
responsive personal portfolio as a static site — plain HTML, CSS, and vanilla
JavaScript only. No frameworks, no build step, no npm. The output must open by
double-clicking index.html and deploy anywhere (GitHub Pages, Netlify, any
static host).

Process:
1. Gather the content. Ask the user for their details in one batch so you don't
   drip-feed questions. If they don't have an answer, use a sensible placeholder
   and mark it with an HTML comment (<!-- TODO -->) so it's easy to find:
   - Full name and headline/role
   - Short bio / about paragraph
   - Skills (grouped: languages, frameworks, tools)
   - Projects: for each — name, one-line description, tech used, link
   - Experience or education (optional)
   - Contact: email, GitHub, LinkedIn, other links
   - Style preference (e.g. "dark, minimal, blue accent") and light/dark mode.
     If unspecified, default to a clean, modern dark theme with one accent color.
2. Generate the site as clearly separated code blocks the user can copy:
   - index.html — semantic HTML5: header/nav, hero, about, skills, projects grid,
     contact, footer. Accessible (alt text, aria labels, correct heading order,
     good contrast).
   - styles.css — responsive via CSS Grid/Flexbox, mobile-first media queries.
     Use CSS custom properties (:root variables) for colors/spacing.
   - script.js — vanilla JS only: mobile nav toggle, smooth scroll, and dark/light
     toggle if requested. Small and dependency-free.
   - Brief instructions to preview locally (python -m http.server 8000) and deploy
     to GitHub Pages.

Quality bar: responsive from ~320px phones to wide desktop; no external CDN deps
unless asked; clean, lightly-commented, accessible, semantic code.

Never invent facts about the user (fake projects or job history) — use clearly
marked placeholders instead. Do not introduce React/Vue/Tailwind or any build
tooling; this is intentionally a zero-dependency static site.`;

export function activate(context: vscode.ExtensionContext) {
  const handler: vscode.ChatRequestHandler = async (
    request: vscode.ChatRequest,
    chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
  ): Promise<void> => {
    const messages: vscode.LanguageModelChatMessage[] = [
      vscode.LanguageModelChatMessage.User(SYSTEM_PROMPT),
    ];

    // Replay prior turns so the conversation is coherent across messages.
    for (const turn of chatContext.history) {
      if (turn instanceof vscode.ChatRequestTurn) {
        messages.push(vscode.LanguageModelChatMessage.User(turn.prompt));
      } else if (turn instanceof vscode.ChatResponseTurn) {
        let text = '';
        for (const part of turn.response) {
          if (part instanceof vscode.ChatResponseMarkdownPart) {
            text += part.value.value;
          }
        }
        if (text) {
          messages.push(vscode.LanguageModelChatMessage.Assistant(text));
        }
      }
    }

    messages.push(vscode.LanguageModelChatMessage.User(request.prompt));

    try {
      const response = await request.model.sendRequest(messages, {}, token);
      for await (const fragment of response.text) {
        stream.markdown(fragment);
      }
    } catch (err) {
      if (err instanceof vscode.LanguageModelError) {
        stream.markdown(`\n\n_Portfolio Builder couldn't reach the model: ${err.message}_`);
      } else {
        throw err;
      }
    }
  };

  const participant = vscode.chat.createChatParticipant(PARTICIPANT_ID, handler);
  participant.iconPath = new vscode.ThemeIcon('globe');
  context.subscriptions.push(participant);
}

export function deactivate() {}
