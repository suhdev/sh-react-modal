import * as React from 'react';

export interface ButtonDef{
    key:string;
    label:string;
    type:string;
    className?:string;
}

export interface ModalProps { 
    closeOnBackdrop?:boolean;
    closeButton?:React.ReactElement<any>|(()=>React.ReactElement<any>); 
    onSuccess?:(res:any)=>void;
    onCancel?:(res:number)=>void; 
    visible?:boolean; 
    type?:string;
    viewForTitleBar?:(title:string|React.ReactElement<any>,onMouseDown:(e:React.MouseEvent)=>void,
        onMouseUp:(e:React.MouseEvent)=>void,
        onMouseMove:(e:React.MouseEvent)=>void,
        onClose:()=>void)=>void;
    title?:string|React.ReactElement<any>;
    titleBarActions?:ButtonDef[];
    onTitleAction?:(e:ButtonDef)=>void;
    buttons?:ButtonDef[]; 
    hasClose?:boolean;
}

export interface ModalState {

}


export class Modal extends React.Component<ModalProps,ModalState>{
    dragging:boolean;
    _x0:number;
    _y0:number;
    _parentBB:ClientRect;
   constructor(props:ModalProps){
        super(props);
        this.dragging = false;
        this.onButtonClick = this.onButtonClick.bind(this); 
        this.onCloseClick = this.onCloseClick.bind(this); 
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this); 
        this.onTitleAction = this.onTitleAction.bind(this);
        this.state = {
           
        }; 
    }

    onMouseDown(e:React.MouseEvent){
        this.dragging = true; 
        this._x0 = e.clientX; 
        this._y0 = e.clientY;
        this._parentBB = (this.refs['parent'] as HTMLElement).getBoundingClientRect();
    }

    onTitleAction(e:React.SyntheticEvent){
        let props = this.props; 
        let el = e.currentTarget as HTMLElement; 
        let idx = parseInt(el.getAttribute("data-index")); 
        props.onTitleAction(props.titleBarActions[idx]);
    }

    onMouseMove(e:React.MouseEvent){
        if (this.dragging){
            let el = this.refs['container'] as HTMLElement, 
                bb = el.getBoundingClientRect(), 
                pBB = this._parentBB,
                dx = e.clientX - this._x0,
                dy = e.clientY - this._y0,
                left = (bb.left + dx),
                top = (bb.top + dy); 
            // left = left < 0?0:(left > (pBB.width - bb.width))?(pBB.width-bb.width):left;
            // top = top < 0?0:(top > (pBB.height - bb.height))?(pBB.height-bb.height):top;
            el.style.transform = 'scale(1)';
            el.style.left = left +'px'; 
            el.style.top = top+'px';
            this._x0 = e.clientX;
            this._y0 = e.clientY;
        }
    }

    onMouseOut(){
        this.dragging = false;
    }

    onCloseClick(){
        let props = this.props; 
        props.onCancel && props.onCancel(-1);
    }

    render(){
        let props = this.props,
            closeOnBackdrop = typeof props.closeOnBackdrop !== "undefined"?props.closeOnBackdrop:true; 
        return (
            <div className="sh-react-modal" ref="parent" 
                data-type={props.type || "default"} 
                data-visible={props.visible} 
                data-hasclose={props.hasClose}>
                <div className="sh-react-backdrop" onClick={closeOnBackdrop?this.onCloseClick:undefined}></div>
                <div className="modal-content-container" ref="container" onMouseOut={this.onMouseOut} 
                    onMouseLeave={this.onMouseOut}>
                    <div className="modal-content-wrapper">
                        {props.viewForTitleBar?props.viewForTitleBar(props.title,this.onMouseDown,
                        this.onMouseOut,this.onMouseMove,this.onCloseClick):(
                        <div className="modal-title-bar" onMouseDown={this.onMouseDown} 
                            onMouseUp={this.onMouseOut} onMouseMove={this.onMouseMove}>
                            <div className="modal-title-wrapper">
                                <span className="modal-title">{props.title}</span>
                                {props.titleBarActions?(
                                    <span className="modal-actions-wrapper">
                                        {props.titleBarActions.map((e,i)=>{
                                            return (
                                                <div className="modal-title-action" 
                                                    key={e.key}
                                                    data-index={i}
                                                    onClick={this.onTitleAction}>{e.label}</div>
                                            );
                                        })}
                                    </span>):null}
                            </div>
                            <div className="modal-close-button" 
                                onClick={this.onCloseClick}>{props.closeButton?
                                        (typeof props.closeButton === "function"?
                                            props.closeButton():props.closeButton):'x'}</div>
                        </div>)}
                        <div className="modal-content">
                        {props.children}
                        </div>
                        {props.buttons?(
                            <div className="modal-buttons-wrapper">
                            {props.buttons.map((e,i)=>{
                                return (
                                <div className={e.className||"modal-button"}
                                        data-type={e.type || "default"}
                                        data-index={i}
                                        key={e.key}
                                        onClick={this.onButtonClick} 
                                        data-key={e.key}>{e.label}</div>
                                );
                            })}
                            </div>
                        ):null}
                    </div>
                </div>
            </div>
        ); 
    }

    onButtonClick(e:React.SyntheticEvent){
        let props = this.props; 
        let el = e.currentTarget as HTMLElement; 
        let idx = parseInt(el.getAttribute("data-index")); 
        props.onSuccess(props.buttons[idx]);
    }
    
}