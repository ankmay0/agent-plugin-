# portfolio-builder — GitHub Copilot custom agent

A [GitHub Copilot custom agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
that builds a polished, responsive personal portfolio website in plain
HTML/CSS/JS — no build step, no frameworks. The output opens by
double-clicking `index.html` and deploys to GitHub Pages, Netlify, or any
static host.

## The agent

[`.github/agents/portfolio-builder.agent.md`](.github/agents/portfolio-builder.agent.md)

## Use it in your own project

Copilot discovers custom agents from a `.github/agents/` folder in the repo
you have open. So:

1. In your project repo, create the folder `.github/agents/`.
2. Copy `portfolio-builder.agent.md` into it.
3. Reload VS Code.
4. Open **Copilot Chat** → the **agent picker** (mode dropdown at the top of
   the chat box) → select **portfolio-builder**.
5. Say **"build my portfolio."**

Quick copy from this repo:

```bash
mkdir -p .github/agents
curl -o .github/agents/portfolio-builder.agent.md \
  https://raw.githubusercontent.com/ankmay0/agent-plugin-/main/.github/agents/portfolio-builder.agent.md
```

## Make it available across all your org's repos

Put the file at `/agents/portfolio-builder.agent.md` in your organization's
special `.github` repository. It then appears in the Copilot Chat agent picker
in **every** repo in the org — no per-project copying needed.

## Notes

- Repo-level agents (`.github/agents/`) take precedence over org-level agents
  with the same file name.
- The markdown body is the agent's system prompt (max 30,000 characters).
- Copilot uses whichever model you've selected in Copilot Chat; the agent file
  doesn't pin one.
