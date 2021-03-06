/** * * * * * * * * * * * * * * * * * * * *
 * Shortcuts for Chrome
 * Custom navigation menu for Chrome browser
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * Vanilla drag and drop implementation
 * to enable dragging links within their
 * container element.
 * * * * * * * * * * * * * * * * * * * * */

/**
 * @module
 * @name Dragging
 * @description This module makes childNodes of some DOM Element
 * draggble using native HTML5 drag and drop.
 *
 * @example new Draggable("id",
 containerElement,
 onElementRender(Element element) {
            // attach other event handlers to element
         },
 onDradEndCallback(Array<String> ids) {
             // do something with ids after drag even has completed
         })
 );
 */
export default class Dragging {

    /**
     * @constructor
     * @name Dragging
     * @description Create element whose children can be dragged and dropped
     *
     * @param {String} idAttribute - for each draggble element, this
     * attribute will provide its id, for example `id`
     * @param {Element} container - the first parent of all draggable
     * elements -> provide a DOM element reference
     * @param {function} onElementRender - after drag events have been
     * attached, all other action handlers still need to be attached.
     * This callback function will allow initiator to bind additional
     * events to draggble elements.
     * @param {function} onDragEndCallback - after drag is done, this
     * callback function notifies initiator that item order within
     * draggable area has changed order
     */
    constructor(idAttribute, container, onElementRender, onDragEndCallback) {

        this.idAttribute = idAttribute;
        this.container = container;
        this.onElementRender = onElementRender;
        this.onDragEndCallback = onDragEndCallback;
        this.notifyParent = this.notifyParent.bind(this);
        this.addDnDHandlers = this.addDnDHandlers.bind(this);

        [].forEach.call(this.container.childNodes, (elem) => {
            this.addDnDHandlers(elem);
        });
    }

    /**
     * @private
     * @static
     * @description get the element that is being actively dragged
     */
    static get dragSrcEl() {
        return this._activedragSrcEl;
    }

    /**
     * @private
     * @static
     * @description set the element that is being actively dragged
     */
    static set dragSrcEl(value) {
        this._activedragSrcEl = value;
    }

    /**
     * @private
     * @static
     * @description Tell the initiating module that element order
     * has changed as a result of dnd.
     * This method has some added latency to make sure the DOM
     * nodes have updated before this event fires.
     */
    notifyParent() {
        let newOrder = [];

        setTimeout(() => {
            [].forEach.call(this.container.childNodes, (elem) => {
                newOrder.push(elem.getAttribute(this.idAttribute));
            });
            this.onDragEndCallback(newOrder);
        }, 1);
    }

    /**
     * @private
     * @static
     * @description Attach drag and drop events to some element
     * @param {Element} elem - DOM element to which we attach event handlers
     */
    addDnDHandlers(elem) {
        elem.setAttribute('draggable', 'true');
        elem.addEventListener('dragstart', this.handleDragStart, false);
        elem.addEventListener('dragover', this.handleDragOver, false);
        elem.addEventListener('dragleave', this.handleDragLeave, false);
        elem.addEventListener('dragend', this.handleDragEnd, false);
        elem.addEventListener('drop', this.handleDrop, false);
        elem.addEventListener('drop', this.notifyParent, false);
        this.onElementRender(elem);
    };

    /**
     * @private
     * @static
     * @description The drop event is fired when an element or text selection is dropped
     * on a valid drop target.
     *
     * When this event occurs we want to moved the dragged element to new DOM location
     * @param {Object} e - drop event
     */
    handleDrop(e) {
        e.stopPropagation();
        Dragging.removeClasses(this);
        let dragSrc = Dragging.dragSrcEl;

        if (dragSrc !== this) {
            if (Dragging.isBefore(dragSrc, this)) {
                this.parentNode.insertBefore(dragSrc, this.nextSibling);
            } else {
                this.parentNode.insertBefore(dragSrc, this);
            }
        }
        return false;
    };

    /**
     * @private
     * @static
     * @description The dragstart event is fired when the user starts dragging an
     * element or text selection.
     * @param {Object} e - dragStart event
     */
    handleDragStart(e) {
        Dragging.dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);
    };

    /**
     * @private
     * @static
     * @description The dragover event is fired when an element or text selection is being
     * dragged over a valid drop target (every few hundred milliseconds). The event is fired
     * on the drop target(s).
     * @param {Object} e - dragover event
     */
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (Dragging.dragSrcEl !== this) {
            let isBefore = Dragging.isBefore(Dragging.dragSrcEl, this);

            this.classList.add(isBefore ? 'after' : 'before');
        }
        return false;
    };

    /**
     * @private
     * @static
     * @description The dragleave event is fired when a dragged element or text selection
     * leaves a valid drop target.
     * @param {Object} e - dragLeave event
     */
    handleDragLeave(e) {
        Dragging.removeClasses(this);
    };

    /**
     * @private
     * @static
     * @description The dragend event is fired when a drag operation is being
     * ended (by releasing a mouse button or hitting the escape key).
     * @param {Object} e - dragEnd event
     */
    handleDragEnd(e) {
        Dragging.removeClasses(this);
    };

    /**
     * @private
     * @static
     * @description Test if some node exists before another in the DOM tree
     * @param {Element} a - DOM Element
     * @param {Element} b - DOM Element
     * @returns {boolean} - true if `a` exists before `b`
     */
    static isBefore(a, b) {
        for (let cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) {
                return false;
            }
        }
        return true;
    };

    /**
     * @private
     * @static
     * @description Remove classes that indicate active dragging
     * @param {Element} el - DOM node for which classes will be removed
     */
    static removeClasses(el) {
        el.classList.remove('before');
        el.classList.remove('after');
    }
}
