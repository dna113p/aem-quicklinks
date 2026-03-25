# AEM Quicklinks

Chrome extension for fast navigation between AEM editing environments. One click (or keystroke) to jump between Preview, Editor, Properties, and CRXDE for any content path. Includes an environment switcher for hopping between author instances (cloud, localhost, staging, etc.) while preserving the current page path and protocol.

## Install

1. Clone this repo
2. Open `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load Unpacked** and select the cloned directory

## Keyboard Shortcuts

**Alt+A** opens the popup globally (rebind in `chrome://extensions/shortcuts`).

Inside the popup:

| Key | Action |
|-----|--------|
| `P` | Preview |
| `E` | Editor |
| `R` | Properties |
| `C` | CRXDE |
| `D` | Switch to Environment tab |
| `N` | Switch to Navigate tab |
| `1`-`9` | Pick a quick link or environment (context-dependent) |

## Environment Switching

Configure domain groups in **Settings** (gear icon or right-click the extension > Options):

- **Regex pattern** — matched against the full page URL (e.g. `/content/mysite`)
- **Domains** — list of hosts for that content (e.g. `localhost:4502`, `https://author-p123-e456.adobeaemcloud.com`)

When a match is found, the Environment tab lists all configured domains. Selecting one swaps the origin while keeping the full path intact. Omit the protocol from a domain entry to preserve whatever the current page uses.
