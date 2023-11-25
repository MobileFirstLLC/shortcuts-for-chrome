Building this application from source requires 
[Node.js](https://nodejs.org/en/download/current) and 
[git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Building from source

:octicons-git-branch-16: First clone project and install dependencies.

``` title="Setup" linenums="0"
git clone https://github.com/MobileFirstLLC/shortcuts-for-chrome.git
cd shortcuts-for-chrome && npm install
```

:octicons-tools-16: Build a locally debuggable version.

``` title="Build extension" linenums="0"
npm run build
```

:octicons-terminal-16: Get a list of other available development commands.

``` title="Help" linenums="0"
npm run
```

This extension is build with [extension-cli](https://oss.mobilefirst.me/extension-cli/).
Refer to [user guide](https://oss.mobilefirst.me/extension-cli/) for further details of building the extension.


## Debugging

Howto debug a Chrome extension:

1. Go to "Extensions" in the Shortcuts for Chrome menu.  
   Alternatively, navigate to address `chrome://extensions`.
2. Enable developer mode.
3. Click `load unpacked`.
4. Navigate to the extension source and choose `dist` directory.

## Code organization

``` { .py title="Directories & Files" linenums="0" .no-copy }
.
├─ .github/               # Repository configuration
│  ├─ workflows/          # Automated workflows
│  └─ README.md           # GitHub readme
├─ assets/                # Extension images and features images 
│  ├─ img/                # Extension icons 
│  └─ *                   # Webstore assets
├─ docs/                  # Source code documentation (this website)
├─ i18n/                  # Generated translations (edit on POEditor)  
├─ src/                   # Source code                           
│  ├─ background/         # Background scripts                    
│  ├─ menu/               # Links menu                         
│  ├─ popup/              # Extension popup view                  
│  ├─ shared/             # Shared classes and modules            
│  └─ manifest.json       # Extension manifest                    
├─ test/                  # Unit tests        
├─ utilities/             # Utility scripts                         
│  ├─ locales.js          # Formats locales files
│  └─ translate.js        # Automatic translations                     
├─ LICENSE                # Software license
└─ package.json           # Configuration and dependencies 
```

## System description

The extension has a popup window that is visible to a user.
This is the primary way of interacting with the extension.
A service worker, for managing extension background services, runs in the background context.

When a user clicks extension icon (the "browser action") extension opens the popup window.
The menu contains various navigation links and clicking a link opens a new browser tab.
User can pin and unpin menu links, and sort the pinned links by dragging and dropping.
This behavior is implemented by three modules.

:material-dock-window: **`src/popup`** manages the extension popup window.

- It saves and restores user preferences.
- It sets the visible content rendering inside the popup window.
- Menu is currently the only possible view, so the popup always renders the menu.

:material-window-shutter-settings: **`src/menu`** panel shows list of links.

- User can pin/unpin links and drag and drop pinned links.
- It programmatically handles link click actions.
- It captures recently used links.

:material-texture-box: **`src/background`** has no interface; it runs in the background context of the browser.

- It creates and manages extension context menu.

For a more detailed technical description of these modules see the [Source Code Documentation](api.md).

## Dependencies

The application release version contains no external dependencies.

### Development dependencies

| Task        | NPM Package             | Purpose                        |
|-------------|-------------------------|--------------------------------|
| Translation | @google-cloud/translate | Translation API                |
|             | dotenv                  | ENV variables                  |
|             | moment                  | File modification time         |
| Docs        | jsdoc-to-markdown       | Building docs                  |
|             | nodemon                 | Monitor js-file changes        |
| Build       | extension-cli           | Building extension             |
|             | webpack                 | Web module bundling            |
| Publishing  | cws-publish             | Publishing at Chrome Web Store |
