import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as Promise from 'bluebird'; 
import { Modal } from './Modal';
export function createModalService(el) {
    let o = null;
    let _resolve, _reject;
    let lastVal = null;
    let _props = {
        visible: false,
        hasClose: false,
        onSuccess: null,
        onCancel: null
    };
    function show(cfg) {
        return new Promise((resolve, reject) => {
            let props = cfg.props || {};
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
            ReactDOM.render(React.createElement(Modal, _props, cfg.content(onSuccess, onCancel)), el);
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
        ReactDOM.render(React.createElement(Modal, _props, null), el);
        return o;
    }
    function getLastValue() {
        return lastVal;
    }
    ReactDOM.render(React.createElement(Modal, _props, null), el);
    o = {
        show,
        hide,
        getLastValue,
    };
    return o;
}
