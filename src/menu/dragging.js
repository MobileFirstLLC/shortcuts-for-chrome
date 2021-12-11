/**
 * @description This module makes childNodes of some DOM Element draggable,
 * using native HTML drag and drop.
 *
 * @example
 * ```js
 * new Draggable(
 *    "id",
 *    containerElement,
 *    onElementRender(element: Element) { ... },
 *    onDragEndCallback(ids: Array<String>) { ... }
 * );
 * ```
 * @param {string} idAttribute - for each draggable element, this attribute will
 * provide its id, for example `id123`.
 *
 * @param {Element} container - the first parent of all draggable elements ->
 * provide a DOM element reference.
 *
 * @param {function} onElementRender - after drag events have been attached,
 * other remaining action handlers still need to be attached. This callback
 * function will allow initiator to bind additional events to draggable elements.
 *
 * @param {function} onDragEndCallback - after drag is done, this callback
 * function notifies initiator that the item order within the draggable area
 * has changed.
 *
 * @class Dragging
 * @kind module
 */
export default class Dragging {

    constructor(idAttribute, container, onElementRender, onDragEndCallback) {
        this.idAttribute = idAttribute;
        this.container = container;
        this.onElementRender = onElementRender;
        this.onDragEndCallback = onDragEndCallback;
        this.notifyParent = this.notifyParent.bind(this);
        this.addDragHandlers = this.addDragHandlers.bind(this);
        [].forEach.call(this.container.childNodes, this.addDragHandlers);
    }

    /**
     * @private
     * @static
     * @description Get or set the element that is being actively dragged
     * @returns {Dragging|null}
     */
    static get dragSourceElement() {
        return this._activedragSrcEl;
    }

    static set dragSourceElement(value) {
        this._activedragSrcEl = value;
    }

    /**
     * @private
     * @static
     * @description Tell the initiating module that element order has changed
     * as a result of drag/drop. This method has some added latency to make sure
     * the DOM nodes have updated before this event fires.
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
     * @description Attach drag and drop events to some DOM element
     * @param {Element} element - DOM element
     */
    addDragHandlers(element) {
        element.setAttribute('draggable', 'true');
        element.addEventListener('dragstart', this.handleDragStart, false);
        element.addEventListener('dragover', this.handleDragOver, false);
        element.addEventListener('dragleave', this.handleDragLeave, false);
        element.addEventListener('dragend', this.handleDragEnd, false);
        element.addEventListener('drop', this.handleDrop, false);
        element.addEventListener('drop', this.notifyParent, false);
        this.onElementRender(element);
    }

    /**
     * @private
     * @static
     * @description The drop event is fired when an element or text selection is dropped
     * on a valid drop target. When this event occurs, move the dragged element to new
     * DOM location.
     *
     * @param {Event} event - drop event
     */
    handleDrop(event) {
        event.stopPropagation();
        Dragging.removeClasses(this);
        let dragSrc = Dragging.dragSourceElement;

        if (dragSrc !== this) {
            if (Dragging.isBefore(dragSrc, this)) {
                this.parentNode.insertBefore(dragSrc, this.nextSibling);
            } else {
                this.parentNode.insertBefore(dragSrc, this);
            }
        }
        return false;
    }

    /**
     * @private
     * @static
     * @description The dragstart event is fired when the user starts dragging an
     * element or text selection.
     * @param {Object} event - dragStart event
     */
    handleDragStart(event) {
        Dragging.dragSourceElement = this;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', this.outerHTML);
    }

    /**
     * @private
     * @static
     * @description The dragover event is fired when an element or text selection is being
     * dragged over a valid drop target (every few hundred milliseconds). The event is fired
     * on the drop target(s).
     * @param {Event} event - dragover event
     */
    handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        if (Dragging.dragSourceElement !== this) {
            let isBefore = Dragging.isBefore(Dragging.dragSourceElement, this);

            this.classList.add(isBefore ? 'after' : 'before');
        }
        return false;
    }

    /**
     * @private
     * @static
     * @description The dragleave event is fired when a dragged element or text
     * selection leaves a valid drop target.
     */
    handleDragLeave() {
        Dragging.removeClasses(this);
    }

    /**
     * @private
     * @static
     * @description The dragend event is fired when a drag operation is being
     * ended (by releasing a mouse button or hitting the escape key).
     */
    handleDragEnd() {
        Dragging.removeClasses(this);
    }

    /**
     * @private
     * @static
     * @description Test if some node `a` exists before another `b` in the DOM tree
     * @param {Element} a - DOM Element
     * @param {Element} b - DOM Element
     * @returns {boolean} true if `a` exists before `b`
     */
    static isBefore(a, b) {
        for (let cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) return false;
        }
        return true;
    }

    /**
     * @private
     * @static
     * @description Remove classes that indicate active dragging
     * @param {Dragging} element - DOM node for which classes will be removed
     */
    static removeClasses(element) {
        element.classList.remove('before');
        element.classList.remove('after');
    }
}
