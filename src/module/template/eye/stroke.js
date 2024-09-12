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
    let innerColor = options.innerColor||foregroundImage;
    let outerColor = options.outerColor||colors?.[1]||foregroundImage;
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
            
            if(api.getValue(i,j)==1){
                if((i+j)%2&&!api.getValue(i-1,j)&&!api.getValue(i+1,j)&&!api.getValue(i,j-1)&&!api.getValue(i,j+1)){
                    context.beginPath();
                    context.arc((i+0.5)*pxWidth,(j+0.5)*pxWidth,0.25*pxWidth,0,2*Math.PI);
                    context.closePath();
                    context.fill();
                }else{
                    for(let m=9;m;m--){
                        for(let n=9;n;n--){
                            if(api.getRangeTrue(i,j,m,n)){
                                context.fillRect((i+0.05)*pxWidth,(j+0.05)*pxWidth,(m-0.1)*pxWidth,(n-0.1)*pxWidth);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    let map = JSON.parse(JSON.stringify(data));
    let render = function(i,j){
        if(api.getValue(i,j)&&map[i][j]==1){
            if((i+j)%2&&!api.getValue(i-1,j)&&!api.getValue(i+1,j)&&!api.getValue(i,j-1)&&!api.getValue(i,j+1)){
            }else{
                for(let m=9;m;m--){
                    for(let n=9;n;n--){
                        if(api.getRangeTrue(i,j,m,n)){
                            context.fillRect((i+0.15)*pxWidth,(j+0.15)*pxWidth,(m-0.3)*pxWidth,(n-0.3)*pxWidth);
                            break;
                        }
                    }
                }
            }
            //寻找附近
            map[i][j]=2;
            render(i-1,j);
            render(i+1,j);
            render(i,j-1);
            render(i,j+1);
        }
    };
    context.lineWidth = 1;
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(!api.isPositionPoint(i,j)) {
                continue;
            }

            if(api.getValue(i,j)==1){
                if(api.isPositionPoint(i,j)==1){
                    context.fillStyle = innerColor;
                }else if(api.isPositionPoint(i,j)==2){
                    context.fillStyle = outerColor;
                }else{
                    let fillColor = colors[1+(i*j)%(colors.length-1)];
                    if(!options.foregroundColor&&resources.foregroundImage){
                        fillColor = foregroundImage;
                    }
                    context.fillStyle = fillColor;
                }
                render(i,j);
            }
        }
    }
};
