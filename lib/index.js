"use strict";
var Modal_1 = require("./Modal");
exports.Modal = Modal_1.Modal;
var ModalService_1 = require("./ModalService");
exports.createModalService = ModalService_1.createModalService;
if (typeof window !== "undefined") {
    (function (ShReact, W, D) {
        ShReact.Modal = Modal_1.Modal;
        ShReact.createModalService = ModalService_1.createModalService;
    }(window.ShReact = window.ShReact || {}, window, document));
}
