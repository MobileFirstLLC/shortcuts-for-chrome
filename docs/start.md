Building this application from source requires Node.js and some web IDE.

First clone project and install dependencies:

```
git clone https://github.com/MobileFirstLLC/shortcuts-for-chrome.git
npm install
```


Run these commands to build a locally debuggable version:

```
npm run build
```

### Available Commands

This extension is build with [extension-cli](https://oss.mobilefirst.me/extension-cli/).
Refer to [user guide](https://oss.mobilefirst.me/extension-cli/) for further details relating to building 
the extension.

| Command             | Description               |
|:--------------------|:--------------------------|
| `npm run start`     | development build         |
| `npm run build`     | production build          |
| `npm run docs`      | generate docs             |
| `npm run test`      | run unit tests            |
| `npm run clean`     | clean generated files     |
| `npm run coverage`  | unit test coverage report |
| `npm run translate` | generate locales          |

### Debugging

1. Go to `chrome://extensions`
2. Enable developer mode
3. Click `load unpacked` 
4. Navigate to the extension source and choose `dist` directory

