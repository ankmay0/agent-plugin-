# Portfolio Builder — Copilot Chat extension

A VS Code extension that adds a **`@portfolio-builder`** participant to GitHub
Copilot Chat. Ask it to build your portfolio and it generates a polished,
responsive personal website in plain HTML/CSS/JS — no frameworks, no build step.

## Install (one command, no account needed)

Paste this into **cmd** — it downloads the extension and installs it into VS Code:

```cmd
curl -L -o portfolio-builder.vsix https://github.com/ankmay0/agent-plugin-/raw/main/portfolio-builder-0.0.1.vsix && code --install-extension portfolio-builder.vsix
```

Then **reload VS Code**, open **Copilot Chat**, and type:

```
@portfolio-builder build my portfolio
```

It will ask for your details (name, bio, skills, projects, contact, theme),
then generate `index.html`, `styles.css`, and `script.js` you can copy into a
folder and open in a browser.

## Requirements

- VS Code 1.95+
- GitHub Copilot + Copilot Chat installed and signed in (the extension uses the
  model you've selected in Copilot Chat).

## Publishing (for the maintainer)

```cmd
npm install
npm run compile
npx @vscode/vsce package        # builds the .vsix
npx @vscode/vsce publish        # publishes to the Marketplace (needs a publisher + token)
```

Create a free publisher at https://marketplace.visualstudio.com/manage and a
Personal Access Token per the
[vsce docs](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## Development

```cmd
npm install
npm run watch
```

Press **F5** in VS Code to launch an Extension Development Host, then use
`@portfolio-builder` in Copilot Chat there.
