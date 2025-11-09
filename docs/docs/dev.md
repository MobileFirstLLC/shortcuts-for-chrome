Browser extensions are built with classic web browser technologies.
Developing an extension requires familiarity with HTML, JavaScript, and CSS.
In addition, the developer should be familiar with browser extension concepts. 
To learn about browser extension concepts, see for example the [Chrome browser extension documentation](https://developer.chrome.com/docs/extensions). 

## Building from source

Building from source requires a reasonably recent version of [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node.js](https://nodejs.org/en/download/current).

Clone project and install dependencies.

``` title="Setup" linenums="0"
git clone https://github.com/MobileFirstLLC/shortcuts-for-chrome.git
cd shortcuts-for-chrome
npm install
```

Build a debuggable version locally.

``` title="Build extension" linenums="0"
npm run build
```

After completion, the extension will be in a `dist` directory.

Get a list of other available development commands.

``` title="Help" linenums="0"
npm run
```

This extension is build with [extension-cli](https://oss.mobilefirst.me/extension-cli/).
Refer to [user guide](https://oss.mobilefirst.me/extension-cli/) for further details about building the extension.


## Debugging

Steps to debugging a Chrome extension:

1. Go to "Extensions" in the Shortcuts for Chrome menu (or write `chrome://extensions` in the address bar).
2. Enable "developer mode" (toggle).
3. Click "load unpacked".
4. Navigate to the extension source code, and choose the `dist` directory you built previously.

## Source code organization

``` { .py title="Directories & Files" linenums="0" .no-copy }
.
├─ .github/               # REPOSITORY MANAGEMENT
│  ├─ workflows/            # Automated workflows
│  └─ README.md             # Repository readme
├─ assets/                # IMAGE RESOURCES
│  ├─ img/                  # Extension icons 
│  └─ *                     # Chrome Web Store assets
├─ docs/                  # DOCUMENTATION [this website]
├─ i18n/                  # GENERATED TRANSLATIONS  
├─ src/                   # SOURCE CODE                        
│  ├─ background/           # Background scripts                    
│  ├─ menu/                 # Links menu                         
│  ├─ popup/                # Extension popup view                  
│  ├─ shared/               # Shared classes and modules            
│  └─ manifest.json         # Extension manifest                    
├─ test/                  # UNIT TESTS        
├─ utilities/             # UTLITY SCRIPTS                         
│  ├─ locales.js            # Formats locales files
│  └─ translate.js          # Automatic translations                     
├─ LICENSE                
└─ package.json           # PROJECT INFORMATION 
```

## Dependencies

### Release dependencies

The release version of Shortcuts for Chrome contains no external dependencies.    
In other words, only the source code in `src/` is distributed.

### Development dependencies

Development-time dependencies are used to translate, document, and package the extension release version.

| Task        | NPM Package             | Purpose                        |
|-------------|-------------------------|--------------------------------|
| Translation | @google-cloud/translate | Translation API                |
|             | dotenv                  | ENV variables                  |
|             | moment                  | File modification time         |
| Docs        | jsdoc-to-markdown       | Building docs                  |
|             | nodemon                 | Monitor js-file changes        |
| Build       | extension-cli           | Building extension             |
|             | webpack                 | Web module bundling            |
