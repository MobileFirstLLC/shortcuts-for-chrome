This is the source code documentation for a chrome extension Shortcuts for Chrome.

This is a simple extension, written in vanilla js with ES6 syntax; no frills or fancy stuff.

## Structure

This extension has 3 primary parts: Popup, Menu and Background (see: [classes](list_class.html)). 

When user clicks extension icon ("browser action") extension opens a popup. This behavior is specified in `manifest.json`:

```json
"browser_action": {
    ...
    "default_popup": "popup.html"
  }
```

- **Popup** is a HTML document with some CSS styles and javascript. 
    - `popup.js` will determine what visible content renders inside the popup window
    - Menu is currently the only possible view, so popup will render this menu panel
      <br/><br/>

- **Menu** panel shows list of links. 
    - User can pin/unpin links and drag and drop pinned links.
    - User preferences are saved in chrome sync storage
      <br/><br/>

- **Background** has no visual interface, but runs in the background of the browser
    - it manages extension context menu
    - it programmatically launches links user clicks in the menu

In addition, there are several utility [modules](list_module.html) that are used to implement this behavior.

Menu links are defined in [constants](list_namespace.html).

<br/>

### Project organization

Path | Description
--- | ---
`└` **.github** | github files
`└` **assets** |  static assets
`└` **docs** | files used for these docs
`└` **src** | source code
`└─── ` **background** | background files
`└─── ` **menu** | links menu
`└─── ` **modules** | reusable modules
`└─── ` **popup** | extension popup
`└─── ` **config.js** | extension config
`└─── ` **manifest.json** | extension manifest
`└` **test** | unit tests
`└` **/** | config files


## Development

Building this application from source requires Node.js and some web IDE.

Run these commands to build a locally debuggable version:

```
git clone https://github.com/MobileFirstLLC/shortcuts-for-chrome.git
npm install
npm run build
```

Go to `chrome://extensions` to debug the build:

1. enable developer mode
2. load unpacked > choose `dist` directory

### Available Commands

| command | description |
| --- | --- |
| `npm run start` | development build |
| `npm run build` | production build |
| `npm run docs` | generate docs |
| `npm run test` | run unit tests |
| `npm run clean` | clean generated files |
| `npm run sync` | update config files |

This extension is build with [extension-cli](https://oss.mobilefirst.me/extension-cli/).
Refer to extension-cli docs for further details on each command.

### Source Code

**[View on Github ↗](https://github.com/MobileFirstLLC/shortcuts-for-chrome)**

### Installation

**The latest release is available for installation at Chrome Web Store.**

<a href="https://chrome.google.com/webstore/detail/jnmekaomnicdcpgdndekkmojfomifjal">
<img alt="install at chrome web store" width="250" src="https://raw.githubusercontent.com/MobileFirstLLC/shortcuts-for-chrome/master/.github/badge.png"/>
</a>

* * *

**Maker:** [Mobile First](https://mobilefirst.me) &bull; **License:** [MIT](https://github.com/MobileFirstLLC/shortcuts-for-chrome/blob/master/LICENSE)
