import * as React from 'react';
export class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.dragging = false;
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onTitleAction = this.onTitleAction.bind(this);
        this.state = {};
    }
    onMouseDown(e) {
        this.dragging = true;
        this._x0 = e.clientX;
        this._y0 = e.clientY;
        this._parentBB = this.refs['parent'].getBoundingClientRect();
    }
    onTitleAction(e) {
        let props = this.props;
        let el = e.currentTarget;
        let idx = parseInt(el.getAttribute("data-index"));
        props.onTitleAction(props.titleBarActions[idx]);
    }
    onMouseMove(e) {
        if (this.dragging) {
            let el = this.refs['container'], bb = el.getBoundingClientRect(), pBB = this._parentBB, dx = e.clientX - this._x0, dy = e.clientY - this._y0, left = (bb.left + dx), top = (bb.top + dy);
            // left = left < 0?0:(left > (pBB.width - bb.width))?(pBB.width-bb.width):left;
            // top = top < 0?0:(top > (pBB.height - bb.height))?(pBB.height-bb.height):top;
            el.style.transform = 'scale(1)';
            el.style.left = left + 'px';
            el.style.top = top + 'px';
            this._x0 = e.clientX;
            this._y0 = e.clientY;
        }
    }
    onMouseOut() {
        this.dragging = false;
    }
    onCloseClick() {
        let props = this.props;
        props.onCancel && props.onCancel(-1);
    }
    render() {
        let props = this.props, closeOnBackdrop = typeof props.closeOnBackdrop !== "undefined" ? props.closeOnBackdrop : true;
        return (React.createElement("div", { className: "sh-react-modal", ref: "parent", "data-type": props.type || "default", "data-visible": props.visible, "data-hasclose": props.hasClose },
            React.createElement("div", { className: "sh-react-backdrop", onClick: closeOnBackdrop ? this.onCloseClick : undefined }),
            React.createElement("div", { className: "modal-content-container", ref: "container", onMouseOut: this.onMouseOut, onMouseLeave: this.onMouseOut },
                React.createElement("div", { className: "modal-content-wrapper" },
                    props.viewForTitleBar ? props.viewForTitleBar(props.title, this.onMouseDown, this.onMouseOut, this.onMouseMove, this.onCloseClick) : (React.createElement("div", { className: "modal-title-bar", onMouseDown: this.onMouseDown, onMouseUp: this.onMouseOut, onMouseMove: this.onMouseMove },
                        React.createElement("div", { className: "modal-title-wrapper" },
                            React.createElement("span", { className: "modal-title" }, props.title),
                            props.titleBarActions ? (React.createElement("span", { className: "modal-actions-wrapper" }, props.titleBarActions.map((e, i) => {
                                return (React.createElement("div", { className: "modal-title-action", key: e.key, "data-index": i, onClick: this.onTitleAction }, e.label));
                            }))) : null),
                        React.createElement("div", { className: "modal-close-button", onClick: this.onCloseClick }, props.closeButton ?
                            (typeof props.closeButton === "function" ?
                                props.closeButton() : props.closeButton) : 'x'))),
                    React.createElement("div", { className: "modal-content" }, props.children),
                    props.buttons ? (React.createElement("div", { className: "modal-buttons-wrapper" }, props.buttons.map((e, i) => {
                        return (React.createElement("div", { className: e.className || "modal-button", "data-type": e.type || "default", "data-index": i, key: e.key, onClick: this.onButtonClick, "data-key": e.key }, e.label));
                    }))) : null))));
    }
    onButtonClick(e) {
        let props = this.props;
        let el = e.currentTarget;
        let idx = parseInt(el.getAttribute("data-index"));
        props.onSuccess(props.buttons[idx]);
    }
}
