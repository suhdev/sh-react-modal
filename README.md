# sh-react-modal 

A configurable modal component for ReactJS application written in TypeScript. 


```javascript 
var el = document.createElement('div');
        el.className = 'container'; 
        document.body.appendChild(el);
        var service = ShReact.createModalService(el); 
        service.show({
            content:(onSuccess,onHide)=>{
                return (
                    React.createElement('div',{className:'test',onClick:onSuccess,title:'Test Dialog'},'Test')
                );
            },
            props:{
                title:"Test Dialog",
                hasClose:true,
                closeOnBackdrop:false
            }})
            .then(function(em){
                return service.show({
                content:(onSuccess,onCancel)=>{
                    return (null);
                },
                props:{
                    buttons:[{
                        label:'OK',
                        key:'ok'
                    },{
                        label:'Cancel',
                        key:'cancel'
                    }]
                }});
            },function(ez){
                console.log(ez);
            })
            .then(function(et){
                console.log(et);
            });


```