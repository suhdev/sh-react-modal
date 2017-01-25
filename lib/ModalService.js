"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var Modal_1 = require("./Modal");
function createModalService(el) {
    var o = null;
    var _resolve, _reject;
    var lastVal = null;
    var _props = {
        visible: false,
        hasClose: false,
        onSuccess: null,
        onCancel: null
    };
    function show(cfg) {
        return new Promise(function (resolve, reject) {
            var props = cfg.props || {};
            _props.visible = true;
            _props.hasClose = props.hasClose;
            _props.onCancel = onCancel;
            _props.title = props.title;
            _props.type = props.type;
            _props.onSuccess = onSuccess;
            _props.closeOnBackdrop = props.closeOnBackdrop;
            _props.buttons = props.buttons;
            _resolve = resolve;
            _reject = reject;
            ReactDOM.render(React.createElement(Modal_1.Modal, _props, cfg.content(onSuccess, onCancel)), el);
        });
    }
    function onSuccess(val) {
        lastVal = val;
        hide();
        _resolve(val);
    }
    function onCancel(val) {
        lastVal = val;
        hide();
        _reject(val);
    }
    function hide(val) {
        _props.visible = false;
        ReactDOM.render(React.createElement(Modal_1.Modal, _props, null), el);
        return o;
    }
    function getLastValue() {
        return lastVal;
    }
    ReactDOM.render(React.createElement(Modal_1.Modal, _props, null), el);
    o = {
        show: show,
        hide: hide,
        getLastValue: getLastValue,
    };
    return o;
}
exports.createModalService = createModalService;
