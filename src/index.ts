import {Modal} from './Modal'; 
import {createModalService,ModalService} from './ModalService'; 
export {Modal,createModalService} 

if (typeof window !== "undefined"){
    (function(ShReact:any,W,D){
        ShReact.Modal = Modal; 
        ShReact.createModalService = createModalService; 
    }((window as any).ShReact = (window as any).ShReact || {},window,document));
}