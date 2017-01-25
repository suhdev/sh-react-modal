import { Modal } from './Modal';
import { createModalService } from './ModalService';
export { Modal, createModalService };
if (typeof window !== "undefined") {
    (function (ShReact, W, D) {
        ShReact.Modal = Modal;
        ShReact.createModalService = createModalService;
    }(window.ShReact = window.ShReact || {}, window, document));
}
