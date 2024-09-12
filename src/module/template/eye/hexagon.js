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
    let sqrt3 = 1.5;//Math.sqrt(3);
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(!api.isPositionPoint(i,j)) {
                continue;
            }
            
            if(api.getValue(i,j)==1){
                if(api.isPositionPoint(i,j)==1){
                    context.fillStyle = innerColor;
                    context.strokeStyle = innerColor;
                }else if(api.isPositionPoint(i,j)==2){
                    context.fillStyle = outerColor;
                    context.strokeStyle = outerColor;
                }else{
                    let fillColor = colors[(i+j)%colors.length];
                    if(!options.foregroundColor&&resources.foregroundImage){
                        fillColor = foregroundImage;
                    }
                    context.fillStyle = fillColor;
                    context.strokeStyle = fillColor;
                }
                
                context.beginPath();
                context.moveTo(i*pxWidth,j*pxWidth+1.5*pxWidth);
                context.lineTo(i*pxWidth+3.5*pxWidth,j*pxWidth);
                context.lineTo(i*pxWidth+7*pxWidth,j*pxWidth+1.5*pxWidth);
                context.lineTo(i*pxWidth+7*pxWidth,j*pxWidth+5.5*pxWidth);
                context.lineTo(i*pxWidth+3.5*pxWidth,j*pxWidth+7*pxWidth);
                context.lineTo(i*pxWidth,j*pxWidth+5.5*pxWidth);
                context.closePath();
                context.fill();
                context.stroke();

                context.fillStyle = backgroundImage;
                context.strokeStyle = backgroundImage;
                context.beginPath();
                context.moveTo(i*pxWidth+pxWidth,j*pxWidth+2*pxWidth+1/14*pxWidth);
                context.lineTo(i*pxWidth+3.5*pxWidth,j*pxWidth+1*pxWidth);
                context.lineTo(i*pxWidth+6*pxWidth,j*pxWidth+2*pxWidth+1/14*pxWidth);
                context.lineTo(i*pxWidth+6*pxWidth,j*pxWidth+5*pxWidth-1/14*pxWidth);
                context.lineTo(i*pxWidth+3.5*pxWidth,j*pxWidth+6*pxWidth);
                context.lineTo(i*pxWidth+1*pxWidth,j*pxWidth+5*pxWidth-1/14*pxWidth);
                context.closePath();
                context.fill();
                context.stroke();

                context.fillStyle = innerColor;
                context.strokeStyle = innerColor;
                context.beginPath();
                context.moveTo(i*pxWidth+2*pxWidth,j*pxWidth+3*pxWidth-5/14*pxWidth);
                context.lineTo(i*pxWidth+3.5*pxWidth,j*pxWidth+2*pxWidth);
                context.lineTo(i*pxWidth+5*pxWidth,j*pxWidth+3*pxWidth-5/14*pxWidth);
                context.lineTo(i*pxWidth+5*pxWidth,j*pxWidth+4*pxWidth+5/14*pxWidth);
                context.lineTo(i*pxWidth+3.5*pxWidth,j*pxWidth+5*pxWidth);
                context.lineTo(i*pxWidth+2*pxWidth,j*pxWidth+4*pxWidth+5/14*pxWidth);
                context.closePath();
                context.fill();
                context.stroke();

                api.setRangeDisabled(i,j,7,7);
                // context.fillRect(i*pxWidth+0.25*pxWidth,j*pxWidth+0.25*pxWidth,pxWidth,pxWidth);
                // context.fillRect(i*pxWidth+6.25*pxWidth,j*pxWidth+0.25*pxWidth,pxWidth,pxWidth);
                // context.fillRect(i*pxWidth+0.25*pxWidth,j*pxWidth+6.25*pxWidth,pxWidth,pxWidth);
                // context.fillRect(i*pxWidth+6.25*pxWidth,j*pxWidth+6.25*pxWidth,pxWidth,pxWidth);
            }
        }
    }
}
