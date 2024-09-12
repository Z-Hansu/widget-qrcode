import getAPI from '../../method/DrawUtil.js';

export default function(context,data,options,resources){
    let len = data.length;
    let margin = context.canvas.width*0.05;
    let pxWidth = (context.canvas.width-2*margin)/len;
    let api = getAPI(context,data,options);
    
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(!api.isPositionPoint(i,j)) {
                continue;
            }
            if (api.getValue(i,j)){
                let cx = i * pxWidth;
                let cy = j * pxWidth + pxWidth / 2;
                context.beginPath();
                context.moveTo(cx, cy);
                if ((api.getValue(i-1, j) ||api.getValue(i , j-1)) || (api.getValue(i - 1, j - 1))) {
                    api.drawRightAngle(i, j, 0, pxWidth);
                } else {
                    api.drawRoundBrick(i, j, 0, pxWidth);
                }
                if ((api.getValue(i, j - 1) || api.getValue(i+1, j)) || (api.getValue(i + 1, j - 1))) {
                    api.drawRightAngle(i, j, 1, pxWidth);
                } else {
                    api.drawRoundBrick(i, j, 1, pxWidth);
                }
                if ((api.getValue(i , j + 1) || api.getValue(i + 1, j)) || (api.getValue(i + 1, j + 1))) {
                    api.drawRightAngle(i, j, 2, pxWidth);
                } else {
                    api.drawRoundBrick(i, j, 2, pxWidth);
                }
                if ((api.getValue(i, j + 1) || api.getValue(i - 1, j)) || (api.getValue(i - 1, j + 1))) {
                    api.drawRightAngle(i, j, 3, pxWidth);
                } else {
                    api.drawRoundBrick(i, j, 3, pxWidth);
                }
                context.closePath();
                context.fill();
                context.stroke();
            }else if(!api.isPositionPoint(i, j, len)){
                if (api.getValue(i, j - 1) &&api.getValue(i - 1, j)) {
                    api.fillRound(i, j, 0, pxWidth);
                }
                if (api.getValue(i, j + 1) && api.getValue(i - 1, j)) {
                    api.fillRound(i, j, 3, pxWidth);
                }
                if (api.getValue(i, j + 1) && api.getValue(i + 1, j)) {
                    api.fillRound(i, j, 2, pxWidth);
                }
                if (api.getValue(i, j - 1) && api.getValue(i + 1, j)) {
                    api.fillRound(i, j, 1, pxWidth);
                }
            }
        }
    }
};
