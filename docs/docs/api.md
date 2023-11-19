## Classes

<dl>
<dt><a href="#ContextMenu">ContextMenu</a></dt>
<dd><p>The ContextMenu class adds custom options to the browser
action&#39;s context menu (the &quot;right-click&quot; menu). The context menu
setup must be run in the extension&#39;s background context.</p>
</dd>
<dt><a href="#Background">Background</a></dt>
<dd><p>The background class sets up all functionality and event
handlers in the extension&#39;s background context. Currently, this
module sets up the extension context menu. Instantiate <code>Background</code>
to activate this functionality. The instantiation must be run in the
extension&#39;s background context.</p>
</dd>
<dt><a href="#Dragging">Dragging</a></dt>
<dd><p>Makes child-nodes of some DOM Element draggable, using
native HTML drag and drop. This class has no dependencies and can be
applied to any collection of UI elements to make them draggable.</p>
</dd>
<dt><a href="#Menu">Menu</a></dt>
<dd><p>Menu panel is a DOM elements that shows a list of links.
This class is responsible for creating and managing the menu.</p>
</dd>
<dt><a href="#Popup">Popup</a></dt>
<dd><p>This is the main class of the popup window, displayed when
user clicks the extension icon. The <code>Popup</code> class is responsible for
saving/restoring persistent data and rendering the menu panel. This
popup view can easily be extended to display other content, but
currently it renders the menu panel only.</p>
</dd>
<dt><a href="#RecentLinks">RecentLinks</a></dt>
<dd><p>Recent links is a list of URL that were used &quot;recently&quot;,
based on configurable interval in
<a href="#config-object">Config.recentIntervalMillis</a>. Unpinned recent links
are displayed at the top of the menu. Recent links become stale after
some time and are removed from the recent list.</p>
</dd>
<dt><a href="#Storage">Storage</a></dt>
<dd><p>Application storage for persisting data. Persisted data
includes: pinned links (user preference) and recently used links
(based on user behavior). This storage is stored in chrome sync
storage, which is specific to current user, and will sync between
devices if user is signed in and sync is enabled.</p>
</dd>
</dl>

<a name="ContextMenu"></a>

## ContextMenu
The ContextMenu class adds custom options to the browser
action's context menu (the "right-click" menu). The context menu
setup must be run in the extension's background context.

**Kind**: global class  
**See**: [ chrome.contextMenus](https://developer.chrome.com/docs/extensions/reference/contextMenus/)

!!! info "Required Permissions"
    This feature requires `contextMenus` permission in extension
    manifest.  
<a name="ContextMenu.initialize"></a>

### ContextMenu.initialize()
This method creates a context menu based on a configuration
defined in [`Config.ContextMenuOptions`](#config-object).

!!! example "Initializes a context menu"
    ```js linenums="0"
    import ContextMenu from 'contextMenu.js';

    ContextMenu.initialize();
    ```

**Kind**: static method of [<code>ContextMenu</code>](#ContextMenu)  
<a name="Background"></a>

## Background
The background class sets up all functionality and event
handlers in the extension's background context. Currently, this
module sets up the extension context menu. Instantiate `Background`
to activate this functionality. The instantiation must be run in the
extension's background context.

**Kind**: global class  
<a name="new_Background_new"></a>

### new Background()
Initializes all background scripts.

!!! example "Initialize background scripts"
    ```js linenums="0"
    new Background();
    ```

<a name="Dragging"></a>

## Dragging
Makes child-nodes of some DOM Element draggable, using
native HTML drag and drop. This class has no dependencies and can be
applied to any collection of UI elements to make them draggable.

**Kind**: global class  
<a name="new_Dragging_new"></a>

### new Dragging(idAttribute, container, onElementRender, onDragEndCallback)
Initializing a new `Draggable` specifies the parent of
the draggable content: its immediate children become draggable;
the id-attribute that uniquely identifies the children; and handlers
that are called each time after the draggable content is rendered,
and when element order changes due to dragging.

!!! example "Create a new draggable"
    ```{ .js }
    new Draggable(
        // id attribute of child elements
        "data-drag-id",
        // parent container
        document.getElementById("drag-container"),
        // function to call after rendering elements
        onDragRenderCallback,
        // callback to handle drag action
        onOrderChangeCallback)
    ```


| Param | Type | Description |
| --- | --- | --- |
| idAttribute | <code>string</code> | For each draggable element, this attribute will provide its id, for example `id` when element is expected to have such attribute e.g. `<span id='label-1'>example</span>`. |
| container | <code>Element</code> | The first parent of all draggable elements -> provide a DOM element reference. Typically, a `<div>` or similar block-level element. |
| onElementRender | <code>function</code> | After drag events have been attached, other remaining action handlers still need to be attached. This callback function will allow initiator to bind additional events to draggable elements. |
| onDragEndCallback | <code>function</code> | After drag is done, this callback function notifies initiator that the item order within the draggable area has changed. |

<a name="Menu"></a>

## Menu
Menu panel is a DOM elements that shows a list of links.
This class is responsible for creating and managing the menu.

**Kind**: global class  

* [Menu](#Menu)
    * [new Menu(getLinks, onPinToggle, onPinOrderChange, getRecent)](#new_Menu_new)
    * [.name](#Menu.name) ⇒ <code>string</code>
    * [.idAttr](#Menu.idAttr) ⇒ <code>string</code>
    * [.render()](#Menu.render) ⇒ <code>Element</code>

<a name="new_Menu_new"></a>

### new Menu(getLinks, onPinToggle, onPinOrderChange, getRecent)
Create a menu of navigation links. This menu panel is
drawn dynamically by creating all menu elements programmatically on
`render()`. The parent instantiating the menu will call render.
Parent must then add the returned menu to DOM tree to display it to
user.

!!! example "Creating and rendering a menu of links"
    ```{ .js }
    import Menu from './menu';

    // construct a menu
    const menu = new Menu(getLinks, onPinToggle, onPinOrderChange, getRecent);

    // render the menu by appending it in document body
    body.append(menu.render());
    ```

**Returns**: <code>Object</code> - Menu panel reference.  

| Param | Type | Description |
| --- | --- | --- |
| getLinks | <code>function</code> | Function that returns all links. |
| onPinToggle | <code>function</code> | Callback function for when link is pinned/unpinned. |
| onPinOrderChange | <code>function</code> | Callback function for when links are re-ordered. |
| getRecent | <code>function</code> | Function that returns list of recent links. |

<a name="Menu.name"></a>

### Menu.name ⇒ <code>string</code>
Name of this menu view.

**Kind**: static property of [<code>Menu</code>](#Menu)  
<a name="Menu.idAttr"></a>

### Menu.idAttr ⇒ <code>string</code>
DOM attribute for getting the unique id of a link.

**Kind**: static property of [<code>Menu</code>](#Menu)  
<a name="Menu.render"></a>

### Menu.render() ⇒ <code>Element</code>
Programmatically draws the menu panel and its links.

**Kind**: static method of [<code>Menu</code>](#Menu)  
**Returns**: <code>Element</code> - DOM element representing the menu.  
<a name="Popup"></a>

## Popup
This is the main class of the popup window, displayed when
user clicks the extension icon. The `Popup` class is responsible for
saving/restoring persistent data and rendering the menu panel. This
popup view can easily be extended to display other content, but
currently it renders the menu panel only.

**Kind**: global class  
<a name="new_Popup_new"></a>

### new Popup()
Instantiating a popup defaults to rendering a
[`Menu`](#menu).

!!! example "Create a popup"
    ```js linenums="0"
    new Popup();
    ```

<a name="RecentLinks"></a>

## RecentLinks
Recent links is a list of URL that were used "recently",
based on configurable interval in
[Config.recentIntervalMillis](#config-object). Unpinned recent links
are displayed at the top of the menu. Recent links become stale after
some time and are removed from the recent list.

**Kind**: global class  

* [RecentLinks](#RecentLinks)
    * [.isStillRecent(timestamp)](#RecentLinks.isStillRecent) ⇒ <code>boolean</code>
    * [.addRecent(url, callback)](#RecentLinks.addRecent)
    * [.getRecent(callback)](#RecentLinks.getRecent)

<a name="RecentLinks.isStillRecent"></a>

### RecentLinks.isStillRecent(timestamp) ⇒ <code>boolean</code>
Determine if some timestamp still qualifies as
recent.

!!! example "Check if access is recent"
    ```{ .js }
    const timestamp = Date.now(); // capture timestamp

    // ... a few minutes later:
    console.log(RecentLinks.isStillRecent(timestamp));
    ```

**Kind**: static method of [<code>RecentLinks</code>](#RecentLinks)  
**Returns**: <code>boolean</code> - True if link is still valid relative to
current time.  

| Param | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | Milliseconds since epoch when link was last accessed. |

<a name="RecentLinks.addRecent"></a>

### RecentLinks.addRecent(url, callback)
Mark some URL as recently used. This will either add
or update the link, depending on if it already exists as a
recently used link.

**Kind**: static method of [<code>RecentLinks</code>](#RecentLinks)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | Link URL. |
| callback | <code>function</code> | Handler for when function is done. |

<a name="RecentLinks.getRecent"></a>

### RecentLinks.getRecent(callback)
Get all recent items. This method returns everything
that qualifies as recent. It doesn't check if a link is pinned or
not, and that should be done at display time to avoid
duplication.

**Kind**: static method of [<code>RecentLinks</code>](#RecentLinks)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Result handler |

<a name="Storage"></a>

## Storage
Application storage for persisting data. Persisted data
includes: pinned links (user preference) and recently used links
(based on user behavior). This storage is stored in chrome sync
storage, which is specific to current user, and will sync between
devices if user is signed in and sync is enabled.

**Kind**: global class  
**See**: [ Chrome storage](https://developer.chrome.com/docs/extensions/reference/storage/#usage)

!!! info "Required Permissions"
    This feature requires `storage` permission in extension manifest.  

* [Storage](#Storage)
    * [.keys](#Storage.keys) ⇒ <code>Object</code>
    * [.get(keys, callback)](#Storage.get)
    * [.save(key, value, callback)](#Storage.save)

<a name="Storage.keys"></a>

### Storage.keys ⇒ <code>Object</code>
List of storage keys. Only these keys can be stored
in this storage.

**Kind**: static enum of [<code>Storage</code>](#Storage)  
<a name="Storage.get"></a>

### Storage.get(keys, callback)
!!! example "Get values from storage"
    ```js linenums="0"
    Storage.get([Storage.keys.recent], items => {
      // do something with items
    });
    ```

**Kind**: static method of [<code>Storage</code>](#Storage)  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>Object</code> | Must be one of: A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in null to get the entire contents of storage. |
| callback | <code>function</code> | Function to call with result. |

<a name="Storage.save"></a>

### Storage.save(key, value, callback)
!!! example "Save value to storage"
    ```{ .js linenums="0" }
    Storage.save(Storage.keys.recent, recentObj, callback);
    ```

**Kind**: static method of [<code>Storage</code>](#Storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | One of  [keys](#Storage.keys). |
| value | <code>\*</code> | Value to save. |
| callback | <code>function</code> | Called after save operation has completed. |

<a name="Config"></a>

## .Config : <code>Object</code>
Application configurations.

**Kind**: static constant  
**Read only**: true  

* [.Config](#Config) : <code>Object</code>
    * [.SVGIcons](#Config.SVGIcons) : <code>enum</code>
    * [.ContextMenuOptions](#Config.ContextMenuOptions) : <code>enum</code>
    * [.recentIntervalMillis](#Config.recentIntervalMillis) : <code>number</code>

<a name="Config.SVGIcons"></a>

### Config.SVGIcons : <code>enum</code>
App icons svg paths.

**Kind**: static enum of [<code>Config</code>](#Config)  
<a name="Config.ContextMenuOptions"></a>

### Config.ContextMenuOptions : <code>enum</code>
List of options to display in the context menu.
Links will open in new tab when width/height (ww/wh) are not
specified. Otherwise, links will open in a window of specified
size.

**Kind**: static enum of [<code>Config</code>](#Config)  
<a name="Config.recentIntervalMillis"></a>

### Config.recentIntervalMillis : <code>number</code>
When a link clicked within last X milliseconds,
it is considered "recently used".

**Kind**: static constant of [<code>Config</code>](#Config)  
