"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal(props) {
        var _this = _super.call(this, props) || this;
        _this.dragging = false;
        _this.onButtonClick = _this.onButtonClick.bind(_this);
        _this.onCloseClick = _this.onCloseClick.bind(_this);
        _this.onMouseDown = _this.onMouseDown.bind(_this);
        _this.onMouseMove = _this.onMouseMove.bind(_this);
        _this.onMouseOut = _this.onMouseOut.bind(_this);
        _this.onTitleAction = _this.onTitleAction.bind(_this);
        _this.state = {};
        return _this;
    }
    Modal.prototype.onMouseDown = function (e) {
        this.dragging = true;
        this._x0 = e.clientX;
        this._y0 = e.clientY;
        this._parentBB = this.refs['parent'].getBoundingClientRect();
    };
    Modal.prototype.onTitleAction = function (e) {
        var props = this.props;
        var el = e.currentTarget;
        var idx = parseInt(el.getAttribute("data-index"));
        props.onTitleAction(props.titleBarActions[idx]);
    };
    Modal.prototype.onMouseMove = function (e) {
        if (this.dragging) {
            var el = this.refs['container'], bb = el.getBoundingClientRect(), pBB = this._parentBB, dx = e.clientX - this._x0, dy = e.clientY - this._y0, left = (bb.left + dx), top_1 = (bb.top + dy);
            // left = left < 0?0:(left > (pBB.width - bb.width))?(pBB.width-bb.width):left;
            // top = top < 0?0:(top > (pBB.height - bb.height))?(pBB.height-bb.height):top;
            el.style.transform = 'scale(1)';
            el.style.left = left + 'px';
            el.style.top = top_1 + 'px';
            this._x0 = e.clientX;
            this._y0 = e.clientY;
        }
    };
    Modal.prototype.onMouseOut = function () {
        this.dragging = false;
    };
    Modal.prototype.onCloseClick = function () {
        var props = this.props;
        props.onCancel && props.onCancel(-1);
    };
    Modal.prototype.render = function () {
        var _this = this;
        var props = this.props, closeOnBackdrop = typeof props.closeOnBackdrop !== "undefined" ? props.closeOnBackdrop : true;
        return (React.createElement("div", { className: "sh-react-modal", ref: "parent", "data-type": props.type || "default", "data-visible": props.visible, "data-hasclose": props.hasClose },
            React.createElement("div", { className: "sh-react-backdrop", onClick: closeOnBackdrop ? this.onCloseClick : undefined }),
            React.createElement("div", { className: "modal-content-container", ref: "container", onMouseOut: this.onMouseOut, onMouseLeave: this.onMouseOut },
                React.createElement("div", { className: "modal-content-wrapper" },
                    props.viewForTitleBar ? props.viewForTitleBar(props.title, this.onMouseDown, this.onMouseOut, this.onMouseMove, this.onCloseClick) : (React.createElement("div", { className: "modal-title-bar", onMouseDown: this.onMouseDown, onMouseUp: this.onMouseOut, onMouseMove: this.onMouseMove },
                        React.createElement("div", { className: "modal-title-wrapper" },
                            React.createElement("span", { className: "modal-title" }, props.title),
                            props.titleBarActions ? (React.createElement("span", { className: "modal-actions-wrapper" }, props.titleBarActions.map(function (e, i) {
                                return (React.createElement("div", { className: "modal-title-action", key: e.key, "data-index": i, onClick: _this.onTitleAction }, e.label));
                            }))) : null),
                        React.createElement("div", { className: "modal-close-button", onClick: this.onCloseClick }, props.closeButton ?
                            (typeof props.closeButton === "function" ?
                                props.closeButton() : props.closeButton) : 'x'))),
                    React.createElement("div", { className: "modal-content" }, props.children),
                    props.buttons ? (React.createElement("div", { className: "modal-buttons-wrapper" }, props.buttons.map(function (e, i) {
                        return (React.createElement("div", { className: e.className || "modal-button", "data-type": e.type || "default", "data-index": i, key: e.key, onClick: _this.onButtonClick, "data-key": e.key }, e.label));
                    }))) : null))));
    };
    Modal.prototype.onButtonClick = function (e) {
        var props = this.props;
        var el = e.currentTarget;
        var idx = parseInt(el.getAttribute("data-index"));
        props.onSuccess(props.buttons[idx]);
    };
    return Modal;
}(React.Component));
exports.Modal = Modal;
