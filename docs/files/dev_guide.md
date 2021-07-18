## High Level Overview

When user clicks extension icon/browser action, extension opens the extension popup window. This is the primary UI and way for user to interact with the extension. 
Clicking menu links opens a new browser tab. User can pin and unpin menu items, and sort pinned menu items using drag and drop.

Code-wise this extension has 3 parts: `Popup`, `Menu` and `Background`. 

- **`Popup`** manages the extension popup window
    - It saves and restores user preferences 
    - It sets the visible content rendering inside popup window
    - Menu is currently the only possible view, so popup will render this menu panel
      <br/><br/>

- **`Menu`** panel shows list of links
    - User can pin/unpin links and drag and drop pinned links
      <br/><br/>

- **`Background`** has no visual interface; it runs in the background of the browser
    - it programmatically launches links user clicks in the menu 
    - other parts of the extension can communicate with background through message passing
    - it creates and manages extension context menu

In addition, there are several utility [modules](list_module.html) that are used to implement this behavior.

Menu links and their associated, localized labels are defined in `assets/dictionary.csv`.


## Project Source Code Organization

Path | Description
--- | ---
**└─ .github** | github files
**└─ assets** |  static assets, such as images and string dictionaries
**└─ docs** | files used for generating these these docs
**└─ src** | source code
 &nbsp; **└─ background** | background scripts
 &nbsp; **└─ menu** | navigation menu
 &nbsp; **└─ modules** | reusable modules
 &nbsp; **└─ popup** | extension popup view
 &nbsp; **└─ config.js** | extension config
 &nbsp; **└─ links.json** | generated list of menu links (do not edit)
 &nbsp; **└─ manifest.json** | extension manifest
**└─ test** | unit tests
**└─ (root)** | config files


## Building Locally

Building this application from source requires Node.js and some web IDE.

Run these commands to build a locally debuggable version:

```
git clone https://github.com/MobileFirstLLC/shortcuts-for-chrome.git

npm install

npm run build
```
### Available Commands

This extension is build with [extension-cli](https://oss.mobilefirst.me/extension-cli/).
Refer to [extension-cli user guide](https://oss.mobilefirst.me/extension-cli/) for further details on each command.

| Command | Description |
| :--- | :--- |
| `npm run start` | development build |
| `npm run build` | production build |
| `npm run docs` | generate docs |
| `npm run test` | run unit tests |
| `npm run clean` | clean generated files |
| `npm run sync` | update config files |
| `npm run translate` | generate locales dictionaries and links.json |

### Debugging

1. Go to `chrome://extensions`
2. Enable developer mode
3. Click `load unpacked` 
4. Navigate to the extension source and choose `dist` directory

