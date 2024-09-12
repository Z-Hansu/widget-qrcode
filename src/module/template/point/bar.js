import getAPI from '../../method/DrawUtil.js';

export default function(context,data,options,resources){
    let len = data.length;
    let margin = context.canvas.width*0.05;
    let pxWidth = (context.canvas.width-2*margin)/len;
    let api = getAPI(context,data,options);
    let backgroundColor = options.backgroundColor||'#ffffff';
    let foregroundColor = options.foregroundColor||'#000000';
    let colors = foregroundColor.split(',');
    let foregroundImage = colors[0];
    if(!options.foregroundColor&&resources.foregroundImage){
        foregroundImage = api.getImageBrush(resources.foregroundImage);
    }
    let innerColor = options.innerColor||colors?.[1]||foregroundImage;
    let backgroundImage = backgroundColor;
    if(!options.backgroundColor&&resources.backgroundImage){
        backgroundImage = api.getImageBrush(resources.backgroundImage);
    }
    let drawItem = function(x,y,width,height){
        context.beginPath();
        context.arc(x*pxWidth+0.5*pxWidth,y*pxWidth+0.5*pxWidth,0.4*pxWidth,1*Math.PI,1.5*Math.PI);
        context.arc((x+width-1)*pxWidth+0.5*pxWidth,y*pxWidth+0.5*pxWidth,0.4*pxWidth,1.5*Math.PI,0*Math.PI);
        context.arc((x+width-1)*pxWidth+0.5*pxWidth,(y+height-1)*pxWidth+0.5*pxWidth,0.4*pxWidth,0*Math.PI,0.5*Math.PI);
        context.arc(x*pxWidth+0.5*pxWidth,(y+height-1)*pxWidth+0.5*pxWidth,0.4*pxWidth,0.5*Math.PI,1*Math.PI);
        context.closePath();
        context.fill();
        api.setRangeDisabled(x,y,width,height);
    };
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(api.isPositionPoint(i,j)) {
                continue;
            }

            if(api.getValue(i,j)==1){
                if(api.isPositionPoint(i,j)){
                    context.beginPath();
                    context.arc((i+3)*pxWidth+0.5*pxWidth,(j+3)*pxWidth+0.5*pxWidth,3.5*pxWidth,0,2*Math.PI);
                    context.closePath();
                    context.fill();
                    context.fillStyle = backgroundImage;
                    context.beginPath();
                    context.arc((i+3)*pxWidth+0.5*pxWidth,(j+3)*pxWidth+0.5*pxWidth,2.5*pxWidth,0,2*Math.PI);
                    context.closePath();
                    context.fill();
                    context.fillStyle = innerColor;
                    context.beginPath();
                    context.arc((i+3)*pxWidth+0.5*pxWidth,(j+3)*pxWidth+0.5*pxWidth,1.5*pxWidth,0,2*Math.PI);
                    context.closePath();
                    context.fill();
                    api.setRangeDisabled(i,j,7,7);
                }else{
                    [[4,4],[4,3],[4,3],[4,1],[3,4],[3,3],[3,2],[3,1],[2,4],[2,3],[2,2],[2,1],[1,4],[1,3],[1,2],[1,1]].forEach(function(coord){
                        if(api.getRangeTrue(i,j,coord[0],coord[1])){
                            drawItem(i,j,coord[0],coord[1]);
                        }
                    });
                }
            }
        }
    }
}
