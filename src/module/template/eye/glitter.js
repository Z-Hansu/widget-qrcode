import getAPI from '../../method/DrawUtil.js';

export default function(context,data,options,resources){
    let len = data.length;
    let margin = context.canvas.width*0.05;
    let pxWidth = (context.canvas.width-2*margin)/len;
    let x = margin;
    let y = margin;
    let api = getAPI(context,data,options);
    
    let backgroundColor = options.backgroundColor||'#ffffff';
    let foregroundColor = options.foregroundColor||'#000000';
    let colors = foregroundColor.split(',');
    let foregroundImage = colors[0];
    if(!options.foregroundColor&&resources.foregroundImage){
        foregroundImage = api.getImageBrush(resources.foregroundImage);
    }
    let innerColor = options.innerColor||colors?.[1]||foregroundImage;
    let outerColor = options.outerColor||foregroundImage;
    let backgroundImage = backgroundColor;
    if(!options.backgroundColor&&resources.backgroundImage){
        backgroundImage = api.getImageBrush(resources.backgroundImage);
    }
    context.fillStyle = colors[0];
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(!api.isPositionPoint(i,j)) {
                continue;
            }

            if(api.isPositionPoint(i,j)==1){
                context.fillStyle = innerColor;
            }else if(api.isPositionPoint(i,j)==2){
                context.fillStyle = outerColor;
            }else{
                let fillColor = colors[(i+j)%colors.length];
                if(!options.foregroundColor&&resources.foregroundImage){
                    fillColor = foregroundImage;
                }
                context.fillStyle = fillColor;
            }
            if(api.getValue(i,j)==1){
                if(api.isPositionPoint(i,j)){
                    context.beginPath();
                    context.arc((i+3.5)*pxWidth,(j+3.5)*pxWidth,3.5*pxWidth,0,2*Math.PI);
                    context.closePath();
                    context.fill();
                    context.fillStyle = backgroundImage;
                    context.beginPath();
                    context.arc((i+3.5)*pxWidth,(j+3.5)*pxWidth,2.6*pxWidth,0,2*Math.PI);
                    context.closePath();
                    context.fill();
                    context.fillStyle = innerColor;
                    context.beginPath();
                    context.arc((i+1)*pxWidth,(j+1)*pxWidth,2.5*pxWidth,0,0.5*Math.PI);
                    context.arc((i+6)*pxWidth,(j+1)*pxWidth,2.5*pxWidth,0.5*Math.PI,Math.PI);
                    context.arc((i+6)*pxWidth,(j+5)*pxWidth+pxWidth,2.5*pxWidth,Math.PI,1.5*Math.PI);
                    context.arc((i+1)*pxWidth,(j+5)*pxWidth+pxWidth,2.5*pxWidth,1.5*Math.PI,2*Math.PI);
                    context.closePath();
                    context.fill();
                    api.setRangeDisabled(i,j,7,7);
                }else{
                    if((i+j)%2){
                        context.beginPath();
                        context.arc(i*pxWidth,j*pxWidth,0.5*pxWidth,0,0.5*Math.PI);
                        context.arc(i*pxWidth+pxWidth,j*pxWidth,0.5*pxWidth,0.5*Math.PI,Math.PI);
                        context.arc(i*pxWidth+pxWidth,j*pxWidth+pxWidth,0.5*pxWidth,Math.PI,1.5*Math.PI);
                        context.arc(i*pxWidth,j*pxWidth+pxWidth,0.5*pxWidth,1.5*Math.PI,2*Math.PI);
                        context.closePath();
                        context.fill();
                    }else{
                        context.beginPath();
                        context.arc((i+0.5)*pxWidth,(j+0.5)*pxWidth,0.5*pxWidth,0,2*Math.PI);
                        context.closePath();
                        context.fill();
                    }
                }
            }
        }
    }
};
