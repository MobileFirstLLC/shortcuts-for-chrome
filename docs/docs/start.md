Building this application from source requires 
[Node.js](https://nodejs.org/en/download/current) and 
[git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Building from source

:octicons-git-branch-16: First clone project and install dependencies:

``` title="Setup" linenums="0"
git clone https://github.com/MobileFirstLLC/shortcuts-for-chrome.git
npm install
```

:octicons-tools-16: To build a locally debuggable version, run:

``` title="Build extension" linenums="0"
npm run build
```

:octicons-terminal-16: For a list of ather available developer commands, run:

``` title="Help" linenums="0"
npm run
```

This extension is build with [extension-cli](https://oss.mobilefirst.me/extension-cli/).
Refer to [user guide](https://oss.mobilefirst.me/extension-cli/) for further details of building the extension.


## Debugging

Howto debug a Chrome extension:

1. Go to `chrome://extensions`
2. Enable developer mode
3. Click `load unpacked` 
4. Navigate to the extension source and choose `dist` directory

## Code organization

``` py title="Directories" linenums="0"
.
├─ .github/               # automated workflows and readme
├─ assets/                # extension images and features images 
│  ├─ img/                # extension icons 
│  └─ *                   # webstore assets
├─ docs/                  # source code documentation (this website)
├─ i18n/                  # generated translations (edit on POEditor)  
├─ src/                   # source code                           
│  ├─ background/         # background scripts                    
│  ├─ menu/               # links menu                         
│  ├─ popup/              # extension popup view                  
│  ├─ shared/             # shared classes and modules            
│  └─ manifest.json       # extension manifest                    
├─ test                   # unit tests                            
└─ (root)                 # configuration and utility files
   ├─ LICENSE             # Software license
   ├─ locales.js          # utility file to format locales files
   ├─ package.json        # configuration and dependencies 
   └─ translate.js        # utility script for automatic translation                     
```

## System description

The extension has a popup window, which is visible to a user.
This is the primary way of interacting with the extension.
A service worker, that manages extension background services, runs in the background context.

When a user clicks extension icon or browser action, extension opens the extension popup window.
Clicking a menu link opens a new browser tab.
User can pin and unpin menu items, and sort pinned menu items using drag and drop.
This behavior is implemented by 3 components.

1. **`src/popup`** manages the extension popup window.
    - It saves and restores user preferences
    - It sets the visible content rendering inside the popup window
    - Menu is currently the only possible view, so popup always renders the menu panel
      <br/><br/>

2. **`src/menu`** panel shows list of links.
    - User can pin/unpin links and drag and drop pinned links
    - It programmatically launches links on click
    - It initiates capturing recently used links
      <br/><br/>

3. **`src/background`** has no visual interface, it runs in the background of the browser.
    - It creates and manages extension context menu.

This application has no external runtime dependencies.

