import getAPI from '../../method/DrawUtil.js';

export default function(context,data,options){
    let len = data.length;
    let margin = context.canvas.width*0.05;
    let pxWidth = (context.canvas.width-2*margin)/len;
    let api = getAPI(context,data,options);
    
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(!api.isPositionPoint(i,j)) {
                continue;
            }
            if(api.getValue(i,j)){
                context.fillRect(Math.ceil(i*pxWidth)-0.5,Math.ceil(j*pxWidth)-0.5,Math.ceil(pxWidth)+1,Math.ceil(pxWidth)+1);
            }
        }
    }
};
