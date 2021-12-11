## Modules

<dl>
<dt><a href="#module_ContextMenu">ContextMenu</a></dt>
<dd><p>This module adds custom options to chrome browser action context menu
(right click on extension icon next to address bar). <code>contextMenus</code>
permissions is required in<code>manifest.json</code>. Instantiate <code>new ContextMenu()</code>
to activate this functionality.</p>
</dd>
<dt><a href="#module_Background">Background</a></dt>
<dd><p>This module is responsible for setting up all event handlers
and actions that happen in the background context of the extension.</p>
<p>Currently this module sets up extension context menu.</p>
<p>Instantiate <code>new Background()</code> to enable this functionality.</p>
</dd>
<dt><a href="#module_Dragging">Dragging</a></dt>
<dd><p>This module makes childNodes of some DOM Element
draggable using native HTML5 drag and drop.</p>
</dd>
<dt><a href="#module_Helpers">Helpers</a></dt>
<dd><p>This module contains various menu panel (static) helper methods.</p>
</dd>
<dt><a href="#module_Menu">Menu</a></dt>
<dd><p>Menu panel is a DOM elements that shows a list of links.
This menu panel is drawn dynamically by creating all menu
elements programmatically upon calling <code>menuObj.render()</code>. The
parent instantiating the menu will call render. Parent must then
add the returned menu to DOM tree to display it to user.</p>
</dd>
<dt><a href="#module_Popup">Popup</a></dt>
<dd><p>This is the main class for the popup window that shows
when user clicks extension icon. This class is responsible for:</p>
<ul>
<li>saving/restoring persistent data and</li>
<li>rendering the menu panel</li>
</ul>
<p>This popup view can easily be extended to display other content, but
currently it renders the menu panel only.</p>
</dd>
<dt><a href="#module_RecentLinks">RecentLinks</a></dt>
<dd><p>Recent links is a list of URL that were used recently (based on config).
They become stale after some time and then get removed from the recent list.</p>
</dd>
<dt><a href="#module_Storage">Storage</a></dt>
<dd><p>Application storage for persisting data.
Currently persisted data includes:</p>
<ol>
<li>pinned links (user preference)</li>
<li>recently used links (based on user behavior)</li>
</ol>
<p>This storage is stored in chrome sync storage, which is specific to current
user, and will sync between devices if user is signed in and sync is enabled.
<a href="https://developer.chrome.com/docs/extensions/reference/storage/#usage">https://developer.chrome.com/docs/extensions/reference/storage/#usage</a></p>
</dd>
</dl>

<a name="module_ContextMenu"></a>

## ContextMenu
This module adds custom options to chrome browser action context menu
(right click on extension icon next to address bar). `contextMenus`
permissions is required in`manifest.json`. Instantiate `new ContextMenu()`
to activate this functionality.


* [ContextMenu](#module_ContextMenu)
    * [~ContextMenu](#module_ContextMenu..ContextMenu)
        * [new ContextMenu()](#new_module_ContextMenu..ContextMenu_new)

<a name="module_ContextMenu..ContextMenu"></a>

### ContextMenu~ContextMenu
**Kind**: inner class of [<code>ContextMenu</code>](#module_ContextMenu)  
<a name="new_module_ContextMenu..ContextMenu_new"></a>

#### new ContextMenu()
Initialize the context menu

<a name="module_Background"></a>

## Background
This module is responsible for setting up all event handlers
and actions that happen in the background context of the extension.

Currently this module sets up extension context menu.

Instantiate `new Background()` to enable this functionality.


* [Background](#module_Background)
    * [~Background](#module_Background..Background)
        * [new Background()](#new_module_Background..Background_new)

<a name="module_Background..Background"></a>

### Background~Background
**Kind**: inner class of [<code>Background</code>](#module_Background)  
<a name="new_module_Background..Background_new"></a>

#### new Background()
Instantiate Background to bind background behavior.

<a name="module_Dragging"></a>

## Dragging
This module makes childNodes of some DOM Element
draggable using native HTML5 drag and drop.

**Example**  
```js
new Draggable("id",
 containerElement,
 onElementRender(Element element) {
            // attach other event handlers to element
         },
 onDradEndCallback(Array<String> ids) {
             // do something with ids after drag even has completed
         })
 );
```

* [Dragging](#module_Dragging)
    * [~Dragging](#module_Dragging..Dragging)
        * [new Dragging(idAttribute, container, onElementRender, onDragEndCallback)](#new_module_Dragging..Dragging_new)

<a name="module_Dragging..Dragging"></a>

### Dragging~Dragging
**Kind**: inner class of [<code>Dragging</code>](#module_Dragging)  
<a name="new_module_Dragging..Dragging_new"></a>

#### new Dragging(idAttribute, container, onElementRender, onDragEndCallback)
Create element whose children can be dragged and dropped


| Param | Type | Description |
| --- | --- | --- |
| idAttribute | <code>String</code> | for each draggable element, this attribute will provide its id, for example `id` |
| container | <code>Element</code> | the first parent of all draggable elements -> provide a DOM element reference |
| onElementRender | <code>function</code> | after drag events have been attached, all other action handlers still need to be attached. This callback function will allow initiator to bind additional events to draggble elements. |
| onDragEndCallback | <code>function</code> | after drag is done, this callback function notifies initiator that item order within draggable area has changed order |

<a name="module_Helpers"></a>

## Helpers
This module contains various menu panel (static) helper methods.


* [Helpers](#module_Helpers)
    * [.unpinnedItemIcon](#module_Helpers.unpinnedItemIcon) ⇒ <code>string</code>
    * [.pinnedItemIcon](#module_Helpers.pinnedItemIcon) ⇒ <code>string</code>
    * [.generateIcon(icon, className)](#module_Helpers.generateIcon) ⇒ <code>string</code>
    * [.localizedSort(linkList)](#module_Helpers.localizedSort) ⇒ <code>Array.&lt;Array.&lt;String&gt;&gt;</code>
    * [.translateLabel(name)](#module_Helpers.translateLabel) ⇒ <code>String</code>
    * [.appendDivider(panel)](#module_Helpers.appendDivider)

<a name="module_Helpers.unpinnedItemIcon"></a>

### Helpers.unpinnedItemIcon ⇒ <code>string</code>
Generate SVG icon for unpinned link.

**Kind**: static property of [<code>Helpers</code>](#module_Helpers)  
**Returns**: <code>string</code> - icon element as HTML  
<a name="module_Helpers.pinnedItemIcon"></a>

### Helpers.pinnedItemIcon ⇒ <code>string</code>
Generate SVG icon for pinned link.

**Kind**: static property of [<code>Helpers</code>](#module_Helpers)  
**Returns**: <code>string</code> - icon element as HTML  
<a name="module_Helpers.generateIcon"></a>

### Helpers.generateIcon(icon, className) ⇒ <code>string</code>
Given some icon name, this function returns SVG element

**Kind**: static method of [<code>Helpers</code>](#module_Helpers)  
**Returns**: <code>string</code> - icon element as HTML  

| Param | Type | Description |
| --- | --- | --- |
| icon | <code>Object</code> | one of [`<constants.SVGIcons>`](https://oss.mobilefirst.me/shortcuts-for-chrome/SVGIconPaths.html) |
| className | <code>String</code> | element class |

<a name="module_Helpers.localizedSort"></a>

### Helpers.localizedSort(linkList) ⇒ <code>Array.&lt;Array.&lt;String&gt;&gt;</code>
Sort a list of links by localized label.

**Kind**: static method of [<code>Helpers</code>](#module_Helpers)  
**Returns**: <code>Array.&lt;Array.&lt;String&gt;&gt;</code> - sorted list of "tuples"
(String arrays of length 2) where first element is localized
label, second element is the original link.  

| Param | Type | Description |
| --- | --- | --- |
| linkList | <code>Array.&lt;String&gt;</code> | list of links |

<a name="module_Helpers.translateLabel"></a>

### Helpers.translateLabel(name) ⇒ <code>String</code>
Get the translated dictionary value for some link.

**Kind**: static method of [<code>Helpers</code>](#module_Helpers)  
**Returns**: <code>String</code> - translated label  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | link name (dictionary key) |

<a name="module_Helpers.appendDivider"></a>

### Helpers.appendDivider(panel)
Create a horizontal menu divider element and append
it to the end of the provided panel element (in place). This method
returns nothing. After calling this method panel will have a divider
as its last DOM child.

**Kind**: static method of [<code>Helpers</code>](#module_Helpers)  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>Element</code> | DOM element where to append the divider |

<a name="module_Menu"></a>

## Menu
Menu panel is a DOM elements that shows a list of links.
This menu panel is drawn dynamically by creating all menu
elements programmatically upon calling `menuObj.render()`. The
parent instantiating the menu will call render. Parent must then
add the returned menu to DOM tree to display it to user.


| Param | Type | Description |
| --- | --- | --- |
| getLinks | <code>function</code> | function that returns currently pinned/unpinned links |
| onPinToggle | <code>function</code> | callback when pin is turned on/off |
| onPinOrderChange | <code>function</code> | callback when pins are rearranged |
| getRecent | <code>function</code> | function that returns recent links |


* [Menu](#module_Menu)
    * _static_
        * [.name](#module_Menu.name) ⇒ <code>string</code>
        * [.idAttr](#module_Menu.idAttr) ⇒ <code>string</code>
        * [.render()](#module_Menu.render) ⇒ <code>Element</code>
    * _inner_
        * [~Menu](#module_Menu..Menu)
            * [new Menu(getLinks, onPinToggle, onPinOrderChange, getRecent)](#new_module_Menu..Menu_new)

<a name="module_Menu.name"></a>

### Menu.name ⇒ <code>string</code>
name of this menu view

**Kind**: static property of [<code>Menu</code>](#module_Menu)  
**Access**: public  
<a name="module_Menu.idAttr"></a>

### Menu.idAttr ⇒ <code>string</code>
DOM attribute for getting the unique id of a link

**Kind**: static property of [<code>Menu</code>](#module_Menu)  
**Access**: public  
<a name="module_Menu.render"></a>

### Menu.render() ⇒ <code>Element</code>
Programmatically draws the menu panel and its links

**Kind**: static method of [<code>Menu</code>](#module_Menu)  
**Returns**: <code>Element</code> - - DOM element representing the menu.  
**Access**: public  
<a name="module_Menu..Menu"></a>

### Menu~Menu
**Kind**: inner class of [<code>Menu</code>](#module_Menu)  
<a name="new_module_Menu..Menu_new"></a>

#### new Menu(getLinks, onPinToggle, onPinOrderChange, getRecent)
**Returns**: <code>Object</code> - - Menu panel reference  

| Param | Type | Description |
| --- | --- | --- |
| getLinks | <code>function</code> | function that returns all links |
| onPinToggle | <code>function</code> | callback function for when link is pinned/unpinned |
| onPinOrderChange | <code>function</code> | callback function for when links are re-ordered |
| getRecent | <code>function</code> | function that returns list of recent links |

<a name="module_Popup"></a>

## Popup
This is the main class for the popup window that shows
when user clicks extension icon. This class is responsible for:

- saving/restoring persistent data and
- rendering the menu panel

This popup view can easily be extended to display other content, but
currently it renders the menu panel only.


* [Popup](#module_Popup)
    * _static_
        * [.pinned](#module_Popup.pinned) ⇒ <code>Array.&lt;String&gt;</code>
        * [.unpinned](#module_Popup.unpinned) ⇒ <code>Array.&lt;String&gt;</code>
        * [.recent](#module_Popup.recent) ⇒ <code>Array.&lt;String&gt;</code>
        * [.activeView](#module_Popup.activeView) ⇒ <code>Element</code>
        * [.renderTarget](#module_Popup.renderTarget)
        * [.drawCurrentView()](#module_Popup.drawCurrentView)
        * [.onPinToggle(key)](#module_Popup.onPinToggle)
        * [.onPinOrderChange(newOrder, callback)](#module_Popup.onPinOrderChange)
        * [.getLinks()](#module_Popup.getLinks) ⇒ <code>Object</code>
        * [.getRecent()](#module_Popup.getRecent) ⇒ <code>Array.&lt;String&gt;</code>
    * _inner_
        * [~Popup](#module_Popup..Popup)
            * [new Popup()](#new_module_Popup..Popup_new)

<a name="module_Popup.pinned"></a>

### Popup.pinned ⇒ <code>Array.&lt;String&gt;</code>
Get pinned links

**Kind**: static property of [<code>Popup</code>](#module_Popup)  
<a name="module_Popup.unpinned"></a>

### Popup.unpinned ⇒ <code>Array.&lt;String&gt;</code>
Get unpinned links

**Kind**: static property of [<code>Popup</code>](#module_Popup)  
<a name="module_Popup.recent"></a>

### Popup.recent ⇒ <code>Array.&lt;String&gt;</code>
Get recent links

**Kind**: static property of [<code>Popup</code>](#module_Popup)  
<a name="module_Popup.activeView"></a>

### Popup.activeView ⇒ <code>Element</code>
Get the view that is currently active in the Popup

**Kind**: static property of [<code>Popup</code>](#module_Popup)  
<a name="module_Popup.renderTarget"></a>

### Popup.renderTarget
Get DOM element where to render content.
This will also clear all existing children from that element,
meaning you can always assume this element is empty.

**Kind**: static property of [<code>Popup</code>](#module_Popup)  
<a name="module_Popup.drawCurrentView"></a>

### Popup.drawCurrentView()
Draw the currently active view in the render target.

**Kind**: static method of [<code>Popup</code>](#module_Popup)  
<a name="module_Popup.onPinToggle"></a>

### Popup.onPinToggle(key)
Handler for when user pins/unpins a link.

**Kind**: static method of [<code>Popup</code>](#module_Popup)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | id of the pin that was clicked |

<a name="module_Popup.onPinOrderChange"></a>

### Popup.onPinOrderChange(newOrder, callback)
Handler for when user rearranges pins, update and save new pin order.

**Kind**: static method of [<code>Popup</code>](#module_Popup)  

| Param | Type | Description |
| --- | --- | --- |
| newOrder | <code>Array.&lt;String&gt;</code> | list of link ids and their new order |
| callback | <code>function</code> | callback function (optional); specify this callback if you need to perform some action after new order has been persisted. |

<a name="module_Popup.getLinks"></a>

### Popup.getLinks() ⇒ <code>Object</code>
Get menu links

**Kind**: static method of [<code>Popup</code>](#module_Popup)  
<a name="module_Popup.getRecent"></a>

### Popup.getRecent() ⇒ <code>Array.&lt;String&gt;</code>
Get recently used links

**Kind**: static method of [<code>Popup</code>](#module_Popup)  
<a name="module_Popup..Popup"></a>

### Popup~Popup
**Kind**: inner class of [<code>Popup</code>](#module_Popup)  
<a name="new_module_Popup..Popup_new"></a>

#### new Popup()
instantiate Popup window

<a name="module_RecentLinks"></a>

## RecentLinks
Recent links is a list of URL that were used recently (based on config).
They become stale after some time and then get removed from the recent list.


* [RecentLinks](#module_RecentLinks)
    * [.isStillRecent(timestamp)](#module_RecentLinks.isStillRecent) ⇒ <code>boolean</code>
    * [.addRecent(url, callback)](#module_RecentLinks.addRecent)
    * [.getRecent(callback)](#module_RecentLinks.getRecent)

<a name="module_RecentLinks.isStillRecent"></a>

### RecentLinks.isStillRecent(timestamp) ⇒ <code>boolean</code>
Determine if some timestamp still qualifies as "recent"

**Kind**: static method of [<code>RecentLinks</code>](#module_RecentLinks)  
**Returns**: <code>boolean</code> - - true if link is still valid  

| Param | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | millis since epoch |

<a name="module_RecentLinks.addRecent"></a>

### RecentLinks.addRecent(url, callback)
Mark some URL as recently used. Will either add or
update the link, depending if it already exists
as a recently used link.

**Kind**: static method of [<code>RecentLinks</code>](#module_RecentLinks)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | link URL |
| callback | <code>function</code> | handler for when function is done |

<a name="module_RecentLinks.getRecent"></a>

### RecentLinks.getRecent(callback)
Get all recent items; note that this methods returns
everything that is "not-stale". It doesn't check if
link is pinned or not. That should be done at display time.

**Kind**: static method of [<code>RecentLinks</code>](#module_RecentLinks)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | result handler |

<a name="module_Storage"></a>

## Storage
Application storage for persisting data.
Currently persisted data includes:

1. pinned links (user preference)
2. recently used links (based on user behavior)

This storage is stored in chrome sync storage, which is specific to current
user, and will sync between devices if user is signed in and sync is enabled.
[https://developer.chrome.com/docs/extensions/reference/storage/#usage](https://developer.chrome.com/docs/extensions/reference/storage/#usage)


* [Storage](#module_Storage)
    * [.keys](#module_Storage.keys) ⇒
    * [.get(keys, callback)](#module_Storage.get)
    * [.save(key, value, callback)](#module_Storage.save)

<a name="module_Storage.keys"></a>

### Storage.keys ⇒
List of storage keys. Only these keys can be
stored in this storage. For more details, @see:
[https://developer.chrome.com/docs/extensions/reference/storage/](https://developer.chrome.com/docs/extensions/reference/storage/)

**Kind**: static property of [<code>Storage</code>](#module_Storage)  
**Returns**: Object  
<a name="module_Storage.get"></a>

### Storage.get(keys, callback)
get some property from storage

**Kind**: static method of [<code>Storage</code>](#module_Storage)  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Object</code> | must be one of: A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in null to get the entire contents of storage. |
| callback | <code>function</code> | function to call with result |

<a name="module_Storage.save"></a>

### Storage.save(key, value, callback)
save some property in storage

**Kind**: static method of [<code>Storage</code>](#module_Storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | one of `storage.keys` |
| value | <code>\*</code> | value to save |
| callback | <code>function</code> | called after save operation has completed |

