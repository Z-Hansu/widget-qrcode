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
    let drawItem = function(x,y,pxWidth){
        let unit = pxWidth*0.6;
        let unit_p = pxWidth*0.55;
        context.beginPath();
        for (let n = 0; n < 5; n++) {
            context.lineTo(x+Math.cos((18+n*72)/180*Math.PI)*unit+unit_p,y-Math.sin((18+n*72)/180*Math.PI)*unit+unit_p);
            context.lineTo(x+Math.cos((54+n*72)/180*Math.PI)*0.4*unit+unit_p,y-Math.sin((54+n*72)/180*Math.PI)*0.4*unit+unit_p);
        }
        context.closePath();
        context.fill();
    };
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(!api.isPositionPoint(i,j)) {
                continue;
            }
            
            if(api.getValue(i,j)==1){
                if(api.isPositionPoint(i,j)==1){
                    context.fillStyle = innerColor;
                }else if(api.isPositionPoint(i,j)==2){
                    // let color = colors[(i+j)%colors.length];
                    // let outerColor = options.outerColor||color;
                    context.fillStyle = outerColor;
                }else{
                    let fillColor = colors[(i+j)%colors.length];
                    if(!options.foregroundColor&&resources.foregroundImage){
                        fillColor = foregroundImage;
                    }
                    context.fillStyle = fillColor;
                }
                if(api.getRangeTrue(i,j,3,3)){
                    drawItem(i*pxWidth-0.55*pxWidth,j*pxWidth-0.45*pxWidth,3.8*pxWidth);
                    api.setRangeDisabled(i,j,3,3);
                }else if(api.getRangeTrue(i,j,2,2)){
                    drawItem(i*pxWidth-0.15*pxWidth,j*pxWidth-0.12*pxWidth,2*pxWidth);
                    api.setRangeDisabled(i,j,2,2);
                }else{
                    drawItem(i*pxWidth,j*pxWidth,pxWidth);
                }
            }
        }
    }
};
