# agent-plugin

A Claude Code plugin marketplace shipping the **portfolio-builder** agent.

## Requirements

[Claude Code](https://claude.com/product/claude-code) installed and logged in
(CLI or VS Code extension).

## Install

```bash
/plugin marketplace add ankmay0/agent-plugin-
/plugin install portfolio-builder@agent-plugin
```

If it doesn't load right away, run `/reload-plugins` or restart Claude Code.

### VS Code one-click link

Share this with teammates — opening it jumps straight to the install screen:

```
vscode://anthropic.claude-code/install-plugin?plugin=portfolio-builder&marketplace=ankmay0/agent-plugin-
```

## What's included

**portfolio-builder** — an agent that builds a polished, responsive personal
portfolio website in plain HTML/CSS/JS. No build step, no frameworks — the
output opens by double-clicking `index.html` and deploys to GitHub Pages,
Netlify, or any static host.

Once installed, just tell Claude Code **"build my portfolio"**. The agent
collects your details (name, bio, skills, projects, contact, theme) and
generates `index.html`, `styles.css`, `script.js`, and a deploy README.

## Updating

After editing plugin files or `marketplace.json`:

```bash
git add .
git commit -m "Update plugin"
git push
```

Users refresh with:

```
/plugin marketplace update
```
