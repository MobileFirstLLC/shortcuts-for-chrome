## Classes

<dl>
<dt><a href="#Background">Background</a></dt>
<dd><p>This module sets up all functionality and event handlers in the background
context of the extension. Currently, this module sets up extension context menu.
Instantiate background to activate this functionality.</p>
</dd>
<dt><a href="#Dragging">Dragging</a></dt>
<dd><p>Makes child nodes of some DOM element draggable, using native
HTML drag and drop.</p>
</dd>
<dt><a href="#Menu">Menu</a></dt>
<dd><p>Menu panel is a DOM elements that shows a list of links. This menu panel
is drawn dynamically by creating all menu elements programmatically on <code>render()</code>.
The parent instantiating the menu will call render. Parent must then add the returned
menu to DOM tree to display it to user.</p>
</dd>
<dt><a href="#Popup">Popup</a></dt>
<dd><p>This is the main class for the popup window that shows when user
clicks extension icon. This class is responsible for:</p>
<ol>
<li>saving/restoring persistent data and</li>
<li>rendering the menu panel.</li>
</ol>
<p>This popup view can easily be extended to display other content, but currently it
renders the menu panel only.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#Config">Config</a> : <code>Object</code></dt>
<dd><p>Application configurations.</p>
</dd>
</dl>

<a name="Background"></a>

## Background
This module sets up all functionality and event handlers in the background
context of the extension. Currently, this module sets up extension context menu.
Instantiate background to activate this functionality.

**Kind**: global class  
<a name="new_Background_new"></a>

### new Background()
Initialize background scripts.

**Example**  
```js title="Initialize background"
new Background();
```
<a name="Dragging"></a>

## Dragging
Makes child nodes of some DOM element draggable, using native
HTML drag and drop.

**Kind**: global class  
<a name="new_Dragging_new"></a>

### new Dragging(idAttribute, container, onElementRender, onDragEndCallback)
Create a new draggable.


| Param | Type | Description |
| --- | --- | --- |
| idAttribute | <code>string</code> | For each draggable element, this attribute will provide its id, for example `id` when element is expected to have such attribute e.g. `<span id='label-1'>example</span>`. |
| container | <code>Element</code> | The first parent of all draggable elements -> provide a DOM element reference. |
| onElementRender | <code>function</code> | After drag events have been attached, other remaining action handlers still need to be attached. This callback function will allow initiator to bind additional events to draggable elements. |
| onDragEndCallback | <code>function</code> | After drag is done, this callback function notifies initiator that the item order within the draggable area has changed. |

**Example**  
``` js title="Creating a new draggable"
new Draggable(
   "id",
   containerElement,
   onElementRender(element: Element) { ... },
   onDragEndCallback(ids: Array<String>) { ... }
);
```
<a name="Menu"></a>

## Menu
Menu panel is a DOM elements that shows a list of links. This menu panel
is drawn dynamically by creating all menu elements programmatically on `render()`.
The parent instantiating the menu will call render. Parent must then add the returned
menu to DOM tree to display it to user.

**Kind**: global class  

* [Menu](#Menu)
    * [new Menu(getLinks, onPinToggle, onPinOrderChange, getRecent)](#new_Menu_new)
    * [.name](#Menu.name) ⇒ <code>string</code>
    * [.idAttr](#Menu.idAttr) ⇒ <code>string</code>
    * [.render()](#Menu.render) ⇒ <code>Element</code>

<a name="new_Menu_new"></a>

### new Menu(getLinks, onPinToggle, onPinOrderChange, getRecent)
Create a menu of navigation links.

**Returns**: <code>Object</code> - Menu panel reference.  

| Param | Type | Description |
| --- | --- | --- |
| getLinks | <code>function</code> | Function that returns all links. |
| onPinToggle | <code>function</code> | Callback function for when link is pinned/unpinned. |
| onPinOrderChange | <code>function</code> | Callback function for when links are re-ordered. |
| getRecent | <code>function</code> | Function that returns list of recent links. |

**Example**  
```js title="Create menu of links"
const menu = new Menu(getLinks, onPinToggle, onPinOrderChange, getRecent);
```
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
**Access**: public  
**Example**  
```js title="Render menu"
// render the menu, then append to document body
body.append(menu.render());
```
<a name="Popup"></a>

## Popup
This is the main class for the popup window that shows when user
clicks extension icon. This class is responsible for:

1. saving/restoring persistent data and
2. rendering the menu panel.

This popup view can easily be extended to display other content, but currently it
renders the menu panel only.

**Kind**: global class  
<a name="new_Popup_new"></a>

### new Popup()
Create a popup

**Example**  
```js title="Create popup"
new Popup()
```
<a name="Config"></a>

## Config : <code>Object</code>
Application configurations.

**Kind**: global constant  

* [Config](#Config) : <code>Object</code>
    * [.SVGIcons](#Config.SVGIcons) : <code>enum</code>
    * [.ContextMenuOptions](#Config.ContextMenuOptions) : <code>enum</code>
    * [.recentIntervalMillis](#Config.recentIntervalMillis) : <code>number</code>

<a name="Config.SVGIcons"></a>

### Config.SVGIcons : <code>enum</code>
App icons svg paths.

**Kind**: static enum of [<code>Config</code>](#Config)  
<a name="Config.ContextMenuOptions"></a>

### Config.ContextMenuOptions : <code>enum</code>
List of options to display in the context menu. Links will open
in new tab when width/height (ww/wh) are not specified. Otherwise, links will
open in a window of specified size.

**Kind**: static enum of [<code>Config</code>](#Config)  
<a name="Config.recentIntervalMillis"></a>

### Config.recentIntervalMillis : <code>number</code>
When a link clicked within last X milliseconds,
it is considered "recently used".

**Kind**: static constant of [<code>Config</code>](#Config)  
<a name="ContextMenu"></a>

## .ContextMenu
This module adds custom options to Chrome browser action context menu

**Kind**: static class  
**See**: [ chrome.contextMenus API](https://developer.chrome.com/docs/extensions/reference/contextMenus/)

!!! info
    This feature requires `contextMenus` permission in extension manifest.  

* [.ContextMenu](#ContextMenu)
    * [.initialize()](#ContextMenu.initialize)
    * [.generateOption(key, value)](#ContextMenu.generateOption)
    * [.generateUrl(option)](#ContextMenu.generateUrl)
    * [.contextMenuOnClick(info)](#ContextMenu.contextMenuOnClick)

<a name="ContextMenu.initialize"></a>

### ContextMenu.initialize()
Initialize extension context menu

**Kind**: static method of [<code>ContextMenu</code>](#ContextMenu)  
**Example**  
```js
ContextMenu.initialize();
```
<a name="ContextMenu.generateOption"></a>

### ContextMenu.generateOption(key, value)
Make context menu option.

**Kind**: static method of [<code>ContextMenu</code>](#ContextMenu)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Option key/id. |
| value | <code>Object</code> |  |
| value.title | <code>string</code> | Option title. |
| value.id | <code>string</code> \| <code>number</code> | Option id. |
| value.parentId | <code>string</code> \| <code>number</code> | Option parent id. |

<a name="ContextMenu.generateUrl"></a>

### ContextMenu.generateUrl(option)
Generates an absolute url for a menu option.

**Kind**: static method of [<code>ContextMenu</code>](#ContextMenu)  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>Object</code> |  |
| option.url | <code>string</code> | URL of context menu link. |

<a name="ContextMenu.contextMenuOnClick"></a>

### ContextMenu.contextMenuOnClick(info)
Handles context menu option click.

**Kind**: static method of [<code>ContextMenu</code>](#ContextMenu)  
**See**

- [ onClicked](https://developer.chrome.com/docs/extensions/reference/contextMenus/#event-onClicked)
- [ OnClickData](https://developer.chrome.com/docs/extensions/reference/contextMenus/#type-OnClickData)


| Param | Type | Description |
| --- | --- | --- |
| info | <code>Object</code> |  |
| info.menuItemId | <code>string</code> \| <code>number</code> | The ID of the menu item that was clicked. |

<a name="Helpers"></a>

## .Helpers
This module contains various, static menu panel helper methods.

**Kind**: static class  

* [.Helpers](#Helpers)
    * [.unpinnedItemIcon](#Helpers.unpinnedItemIcon) ⇒ <code>string</code>
    * [.pinnedItemIcon](#Helpers.pinnedItemIcon) ⇒ <code>string</code>
    * [.generateIcon(icon, className)](#Helpers.generateIcon) ⇒ <code>string</code>
    * [.localizedSort(linkList)](#Helpers.localizedSort) ⇒ <code>Array.&lt;Array.&lt;String&gt;&gt;</code>
    * [.translateLabel(name)](#Helpers.translateLabel) ⇒ <code>string</code>
    * [.appendDivider(panel)](#Helpers.appendDivider)

<a name="Helpers.unpinnedItemIcon"></a>

### Helpers.unpinnedItemIcon ⇒ <code>string</code>
Generate SVG icon for unpinned link.

**Kind**: static property of [<code>Helpers</code>](#Helpers)  
**Returns**: <code>string</code> - Icon element as HTML.  
<a name="Helpers.pinnedItemIcon"></a>

### Helpers.pinnedItemIcon ⇒ <code>string</code>
Generate SVG icon for pinned link.

**Kind**: static property of [<code>Helpers</code>](#Helpers)  
**Returns**: <code>string</code> - Icon element as HTML.  
<a name="Helpers.generateIcon"></a>

### Helpers.generateIcon(icon, className) ⇒ <code>string</code>
Given an icon name, this function returns SVG element.

**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Returns**: <code>string</code> - Icon element as HTML string.  

| Param | Type | Description |
| --- | --- | --- |
| icon | [<code>SVGIcons</code>](#Config.SVGIcons) | One of |
| className | <code>string</code> | Element class. |

<a name="Helpers.localizedSort"></a>

### Helpers.localizedSort(linkList) ⇒ <code>Array.&lt;Array.&lt;String&gt;&gt;</code>
Sort a list of links by their localized label.

**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Returns**: <code>Array.&lt;Array.&lt;String&gt;&gt;</code> - Sorted list of tuples, where

- first element is localized label
- second element is the original link  

| Param | Type | Description |
| --- | --- | --- |
| linkList | <code>Array.&lt;string&gt;</code> | List of links. |

<a name="Helpers.translateLabel"></a>

### Helpers.translateLabel(name) ⇒ <code>string</code>
Get the translated dictionary value for some link.

**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Returns**: <code>string</code> - Translated label.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Link name (dictionary key). |

<a name="Helpers.appendDivider"></a>

### Helpers.appendDivider(panel)
Create a horizontal menu divider element and append
it to the end of the provided panel element (in place). This method
returns nothing. After calling this method panel will have a divider
as its last DOM child.

**Kind**: static method of [<code>Helpers</code>](#Helpers)  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>Element</code> | DOM element where to append the divider. |

<a name="RecentLinks"></a>

## .RecentLinks
Recent links is a list of URL that were used recently (based on config).
They become stale after some time and then get removed from the recent list.

**Kind**: static class  

* [.RecentLinks](#RecentLinks)
    * [.isStillRecent(timestamp)](#RecentLinks.isStillRecent) ⇒ <code>boolean</code>
    * [.addRecent(url, callback)](#RecentLinks.addRecent)
    * [.getRecent(callback)](#RecentLinks.getRecent)

<a name="RecentLinks.isStillRecent"></a>

### RecentLinks.isStillRecent(timestamp) ⇒ <code>boolean</code>
Determine if some timestamp still qualifies as "recent".

**Kind**: static method of [<code>RecentLinks</code>](#RecentLinks)  
**Returns**: <code>boolean</code> - True if link is still valid relative to current time.  

| Param | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | Milliseconds since epoch when link was last accessed. |

**Example**  
``` js title="Check if recent"
const timestamp = Date.now(); // capture timestamp

// ... a few minutes later:
console.log(RecentLinks.isStillRecent(timestamp));
```
<a name="RecentLinks.addRecent"></a>

### RecentLinks.addRecent(url, callback)
Mark some URL as recently used. Will either add or update the link,
depending on if it already exists as a recently used link.

**Kind**: static method of [<code>RecentLinks</code>](#RecentLinks)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | Link URL. |
| callback | <code>function</code> | Handler for when function is done. |

<a name="RecentLinks.getRecent"></a>

### RecentLinks.getRecent(callback)
Get all recent items; note that this methods returns everything
that is "not-stale". It doesn't check if link is pinned or not. That should
be done at display time.

**Kind**: static method of [<code>RecentLinks</code>](#RecentLinks)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Result handler |

<a name="Storage"></a>

## .Storage
Application storage for persisting data. Persisted data includes:

1. pinned links (user preference)
2. recently used links (based on user behavior).

This storage is stored in chrome sync storage, which is specific to current
user, and will sync between devices if user is signed in and sync is enabled.

**Kind**: static class  
**See**: [ Chrome storage](https://developer.chrome.com/docs/extensions/reference/storage/#usage)

!!! info
    This feature requires `storage` permission in extension manifest.  

* [.Storage](#Storage)
    * [.keys](#Storage.keys) ⇒ <code>Object</code>
    * [.get(keys, callback)](#Storage.get)
    * [.save(key, value, callback)](#Storage.save)

<a name="Storage.keys"></a>

### Storage.keys ⇒ <code>Object</code>
List of storage keys. Only these keys can be stored in this storage.

**Kind**: static enum of [<code>Storage</code>](#Storage)  
<a name="Storage.get"></a>

### Storage.get(keys, callback)
Get some property from storage.

**Kind**: static method of [<code>Storage</code>](#Storage)  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>Object</code> | Must be one of: A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in null to get the entire contents of storage. |
| callback | <code>function</code> | Function to call with result. |

**Example**  
```js title="Get values from storage"
Storage.get([Storage.keys.recent], items => {
  // do something with items
});
```
<a name="Storage.save"></a>

### Storage.save(key, value, callback)
Save some property in storage.

**Kind**: static method of [<code>Storage</code>](#Storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | One of  [keys](#Storage.keys). |
| value | <code>\*</code> | Value to save. |
| callback | <code>function</code> | Called after save operation has completed. |

**Example**  
```js title="Save value to storage"
Storage.save(Storage.keys.recent, recentObj, callback);
```
