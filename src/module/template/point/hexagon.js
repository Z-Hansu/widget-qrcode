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
    let backgroundImage = backgroundColor;
    if(!options.backgroundColor&&resources.backgroundImage){
        backgroundImage = api.getImageBrush(resources.backgroundImage);
    }
    let sqrt3 = 1.5;//Math.sqrt(3);
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(api.isPositionPoint(i,j)) {
                continue;
            }

            if(api.getValue(i,j)==1){
                let fillColor = colors[(i+j)%colors.length];
                if(!options.foregroundColor&&resources.foregroundImage){
                    fillColor = foregroundImage;
                }
                context.fillStyle = fillColor;
                context.strokeStyle = fillColor;
                
                context.beginPath();
                if(i%2){
                    context.moveTo(i*pxWidth-pxWidth/sqrt3+0.5*pxWidth,j*pxWidth+0.25*pxWidth);
                    context.lineTo(i*pxWidth-pxWidth/sqrt3/2+0.5*pxWidth,j*pxWidth-0.25*pxWidth);
                    context.lineTo(i*pxWidth+pxWidth/sqrt3/2+0.5*pxWidth,j*pxWidth-0.25*pxWidth);
                    context.lineTo(i*pxWidth+pxWidth/sqrt3+0.5*pxWidth,j*pxWidth+0.25*pxWidth);
                    context.lineTo(i*pxWidth+pxWidth/sqrt3/2+0.5*pxWidth,j*pxWidth+0.75*pxWidth);
                    context.lineTo(i*pxWidth-pxWidth/sqrt3/2+0.5*pxWidth,j*pxWidth+0.75*pxWidth);
                }else{
                    context.moveTo(i*pxWidth-pxWidth/sqrt3+0.5*pxWidth,j*pxWidth+0.75*pxWidth);
                    context.lineTo(i*pxWidth-pxWidth/sqrt3/2+0.5*pxWidth,j*pxWidth+0.25*pxWidth);
                    context.lineTo(i*pxWidth+pxWidth/sqrt3/2+0.5*pxWidth,j*pxWidth+0.25*pxWidth);
                    context.lineTo(i*pxWidth+pxWidth/sqrt3+0.5*pxWidth,j*pxWidth+0.75*pxWidth);
                    context.lineTo(i*pxWidth+pxWidth/sqrt3/2+0.5*pxWidth,j*pxWidth+1.25*pxWidth);
                    context.lineTo(i*pxWidth-pxWidth/sqrt3/2+0.5*pxWidth,j*pxWidth+1.25*pxWidth);
                }
                context.closePath();
                context.fill();
                context.stroke();
            }
        }
    }
}
