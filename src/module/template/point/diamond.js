import getAPI from '../../method/DrawUtil.js';

export default function(context,data,options){
    let len = data.length;
    let margin = context.canvas.width*0.05;
    let pxWidth = (context.canvas.width-2*margin)/len;
    let api = getAPI(context,data,options);
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(api.isPositionPoint(i,j)) {
                continue;
            }

            if(api.getValue(i,j)){
                context.beginPath();
                context.moveTo(i*pxWidth,j*pxWidth+0.5*pxWidth);
                if(api.getValue(i-1,j)||api.getValue(i,j-1)){
                    context.lineTo(i*pxWidth,j*pxWidth);
                }
                context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth);
                if(api.getValue(i+1,j)||api.getValue(i,j-1)){
                    context.lineTo(i*pxWidth+pxWidth,j*pxWidth);
                }
                context.lineTo(i*pxWidth+pxWidth,j*pxWidth+0.5*pxWidth);
                if(api.getValue(i+1,j)||api.getValue(i,j+1)){
                    context.lineTo(i*pxWidth+pxWidth,j*pxWidth+pxWidth);
                }
                context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth+pxWidth);
                if(api.getValue(i-1,j)||api.getValue(i,j+1)){
                    context.lineTo(i*pxWidth,j*pxWidth+pxWidth);
                }
                context.closePath();
                context.fill();
                context.stroke();
            }else{
                if(api.getValue(i-1,j)&&api.getValue(i,j-1)&&api.getValue(i-1,j-1)){
                    context.beginPath();
                    context.moveTo(i*pxWidth,j*pxWidth);
                    context.lineTo(i*pxWidth,j*pxWidth+0.5*pxWidth);
                    context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth);
                    context.closePath();
                    context.fill();
                    context.stroke();
                }
                if(api.getValue(i+1,j)&&api.getValue(i,j-1)&&api.getValue(i+1,j-1)){
                    context.beginPath();
                    context.moveTo(i*pxWidth+pxWidth,j*pxWidth);
                    context.lineTo(i*pxWidth+pxWidth,j*pxWidth+0.5*pxWidth);
                    context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth);
                    context.closePath();
                    context.fill();
                    context.stroke();
                }
                if(api.getValue(i-1,j)&&api.getValue(i,j+1)&&api.getValue(i-1,j+1)){
                    context.beginPath();
                    context.moveTo(i*pxWidth,j*pxWidth+pxWidth);
                    context.lineTo(i*pxWidth,j*pxWidth+0.5*pxWidth);
                    context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth+pxWidth);
                    context.closePath();
                    context.fill();
                    context.stroke();
                }
                if(api.getValue(i+1,j)&&api.getValue(i,j+1)&&api.getValue(i+1,j+1)){
                    context.beginPath();
                    context.moveTo(i*pxWidth+pxWidth,j*pxWidth+pxWidth);
                    context.lineTo(i*pxWidth+pxWidth,j*pxWidth+0.5*pxWidth);
                    context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth+pxWidth);
                    context.closePath();
                    context.fill();
                    context.stroke();
                }
            }
            
            // if(api.getValue(i,j)){
            //     context.beginPath();
            //     context.moveTo(i*pxWidth-0.5*pxWidth,j*pxWidth);
            //     if(api.getValue(i-1,j)||api.getValue(i,j-1)){
            //         context.lineTo(i*pxWidth-0.5*pxWidth,j*pxWidth-0.5*pxWidth);
            //     }
            //     context.lineTo(i*pxWidth,j*pxWidth-0.5*pxWidth);
            //     if(api.getValue(i+1,j)||api.getValue(i,j-1)){
            //         context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth-0.5*pxWidth);
            //     }
            //     context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth);
            //     if(api.getValue(i+1,j)||api.getValue(i,j+1)){
            //         context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth+0.5*pxWidth);
            //     }
            //     context.lineTo(i*pxWidth,j*pxWidth+0.5*pxWidth);
            //     if(api.getValue(i-1,j)||api.getValue(i,j+1)){
            //         context.lineTo(i*pxWidth-0.5*pxWidth,j*pxWidth+0.5*pxWidth);
            //     }
            //     context.closePath();
            //     context.fill();
            //     context.stroke();
            // }else{
            //     if(api.getValue(i-1,j)&&api.getValue(i,j-1)&&api.getValue(i-1,j-1)){
            //         context.beginPath();
            //         context.moveTo(i*pxWidth-0.5*pxWidth,j*pxWidth-0.5*pxWidth);
            //         context.lineTo(i*pxWidth-0.5*pxWidth,j*pxWidth);
            //         context.lineTo(i*pxWidth,j*pxWidth-0.5*pxWidth);
            //         context.closePath();
            //         context.fill();
            //         context.stroke();
            //     }
            //     if(api.getValue(i+1,j)&&api.getValue(i,j-1)&&api.getValue(i+1,j-1)){
            //         context.beginPath();
            //         context.moveTo(i*pxWidth+0.5*pxWidth,j*pxWidth-0.5*pxWidth);
            //         context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth);
            //         context.lineTo(i*pxWidth,j*pxWidth-0.5*pxWidth);
            //         context.closePath();
            //         context.fill();
            //         context.stroke();
            //     }
            //     if(api.getValue(i-1,j)&&api.getValue(i,j+1)&&api.getValue(i-1,j+1)){
            //         context.beginPath();
            //         context.moveTo(i*pxWidth-0.5*pxWidth,j*pxWidth+0.5*pxWidth);
            //         context.lineTo(i*pxWidth-0.5*pxWidth,j*pxWidth);
            //         context.lineTo(i*pxWidth,j*pxWidth+0.5*pxWidth);
            //         context.closePath();
            //         context.fill();
            //         context.stroke();
            //     }
            //     if(api.getValue(i+1,j)&&api.getValue(i,j+1)&&api.getValue(i+1,j+1)){
            //         context.beginPath();
            //         context.moveTo(i*pxWidth+0.5*pxWidth,j*pxWidth+0.5*pxWidth);
            //         context.lineTo(i*pxWidth+0.5*pxWidth,j*pxWidth);
            //         context.lineTo(i*pxWidth,j*pxWidth+0.5*pxWidth);
            //         context.closePath();
            //         context.fill();
            //         context.stroke();
            //     }
            // }
        }
    }
}
