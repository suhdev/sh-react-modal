/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Modal_1 = __webpack_require__(1);
	exports.Modal = Modal_1.Modal;
	var ModalService_1 = __webpack_require__(3);
	exports.createModalService = ModalService_1.createModalService;
	if (typeof window !== "undefined") {
	    (function (ShReact, W, D) {
	        ShReact.Modal = Modal_1.Modal;
	        ShReact.createModalService = ModalService_1.createModalService;
	    }(window.ShReact = window.ShReact || {}, window, document));
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Modal = (function (_super) {
	    __extends(Modal, _super);
	    function Modal(props) {
	        var _this = _super.call(this, props) || this;
	        _this.state = {};
	        return _this;
	    }
	    Modal.prototype.render = function () {
	        var props = this.props, closeOnBackdrop = typeof props.closeOnBackdrop !== "undefined" ? props.closeOnBackdrop : true;
	        return (React.createElement("div", { className: "sh-react-modal", "data-visible": props.visible, "data-hasclose": props.hasClose },
	            React.createElement("div", { className: "sh-react-backdrop", onClick: closeOnBackdrop ? this.props.onClose : undefined }),
	            React.createElement("div", { className: "content-container" },
	                React.createElement("div", { className: "close-button", onClick: this.props.onClose },
	                    React.createElement("i", { className: "fa fa-times fa-lg" })),
	                React.createElement("div", { className: "content-wrapper" }, props.children))));
	    };
	    return Modal;
	}(React.Component));
	exports.Modal = Modal;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(4);
	var Modal_1 = __webpack_require__(1);
	function createModalService(el) {
	    var o = null;
	    var _callback = null;
	    var _props = {
	        visible: false,
	        hasClose: false,
	        onClose: hide,
	    };
	    function show(cfg) {
	        var props = cfg.props || {};
	        _props.visible = true;
	        _props.hasClose = props.hasClose;
	        _props.closeOnBackdrop = props.closeOnBackdrop;
	        _callback = cfg.callback;
	        ReactDOM.render(React.createElement(Modal_1.Modal, _props, cfg.content(hide)), el);
	        return o;
	    }
	    function hide(val) {
	        _props.visible = false;
	        if (_callback) {
	            _callback.apply(null, Array.prototype.slice.call(arguments, 0));
	        }
	        ReactDOM.render(React.createElement(Modal_1.Modal, _props, null), el);
	        return o;
	    }
	    ReactDOM.render(React.createElement(Modal_1.Modal, _props, null), el);
	    o = {
	        show: show,
	        hide: hide,
	    };
	    return o;
	}
	exports.createModalService = createModalService;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ }
/******/ ]);