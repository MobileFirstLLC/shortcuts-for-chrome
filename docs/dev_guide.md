This extension has a popup window, which is visible to user, and the primary way of interacting with the extension, and a background context (service worker), that manages extension background services.

When user clicks extension icon/browser action, extension opens the extension popup window. 
Clicking a menu link opens a new browser tab. User can pin and unpin menu items, and sort pinned 
menu items using drag and drop.

This behavior is implemented by following 3 components:

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