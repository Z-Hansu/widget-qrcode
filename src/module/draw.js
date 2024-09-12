import getAPI from './method/DrawUtil.js';

import eye_default from './template/eye/default.js';
import eye_water from './template/eye/water.js';
import eye_star from './template/eye/star.js';
import eye_rect from './template/eye/rect.js';
import eye_diamond from './template/eye/diamond.js';
import eye_hexagon from './template/eye/hexagon.js';
import eye_bar from './template/eye/bar.js';
import eye_heart from './template/eye/heart.js';
import eye_glitter from './template/eye/glitter.js';
import eye_fusion from './template/eye/fusion.js';
import eye_stroke from './template/eye/stroke.js';

import point_default from './template/point/default.js';
import point_water from './template/point/water.js';
import point_star from './template/point/star.js';
import point_rect from './template/point/rect.js';
import point_diamond from './template/point/diamond.js';
import point_hexagon from './template/point/hexagon.js';
import point_bar from './template/point/bar.js';
import point_heart from './template/point/heart.js';
import point_glitter from './template/point/glitter.js';
import point_fusion from './template/point/fusion.js';
import point_stroke from './template/point/stroke.js';

//基础绘制
const drawQrcode = {
    'eye_default':eye_default,
    'eye_water':eye_water,
    'eye_star':eye_star,
    'eye_rect':eye_rect,
    'eye_diamond':eye_diamond,
    'eye_hexagon':eye_hexagon,
    'eye_bar':eye_bar,
    'eye_heart':eye_heart,
    'eye_glitter':eye_glitter,
    'eye_fusion':eye_fusion,
    'eye_stroke':eye_stroke,
    'point_default':point_default,
    'point_water':point_water,
    'point_star':point_star,
    'point_rect':point_rect,
    'point_diamond':point_diamond,
    'point_hexagon':point_hexagon,
    'point_bar':point_bar,
    'point_heart':point_heart,
    'point_glitter':point_glitter,
    'point_fusion':point_fusion,
    'point_stroke':point_stroke
};

export default function(context,data,options){
    let len = data.length;
    let margin = context.canvas.width*0.05;
    let pxWidth = (context.canvas.width-2*margin)/len;
    let x = margin;
    let y = margin;
    let api = getAPI(context,data,options);
    let resourcesMap = {};
    if(options.foregroundImage){
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if(options.backgroundImage){
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if(options.logo){
        resourcesMap['logo'] = options.logo;
    }
    
    api.imageReady(resourcesMap).then(function(resources){
        let backgroundColor = options.backgroundColor||'#ffffff';
        let foregroundColor = options.foregroundColor||'#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if(!options.foregroundColor&&resources.foregroundImage){
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        if(colors.length>1){
            let gradient = context.createLinearGradient(0,0,context.canvas.width,context.canvas.height);
            let length = colors.length-1;
            colors.forEach(function(value,index){
                gradient.addColorStop(index/length,value);
            });
            foregroundImage = gradient;
        }
        let innerColor = options.innerColor||foregroundImage;
        let outerColor = options.outerColor||foregroundImage;
        let backgroundImage = backgroundColor;
        if(!options.backgroundColor&&resources.backgroundImage){
            backgroundImage = api.getImageBrush(resources.backgroundImage);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0,0,context.canvas.width,context.canvas.height);
        context.restore();
        context.save();
        context.translate(x,y);
        for(let i=0;i<len;i++){
            for(let j=0;j<len;j++){
                if(api.isPositionPoint(i,j)==1){
                    context.fillStyle = innerColor;
                    context.strokeStyle = innerColor;
                }else if(api.isPositionPoint(i,j)==2){
                    context.fillStyle = outerColor;
                    context.strokeStyle = outerColor;
                }else{
                    context.fillStyle = foregroundImage;
                    context.strokeStyle = foregroundImage;
                }
            }
        }

        drawQrcode[`eye_${options.eye || 'default'}`](context,data,options,resources);
        drawQrcode[`point_${options.point || 'default'}`](context,data,options,resources);
        context.restore();
        context.save();
        api.setText();
        if(resources.logo){
            api.setLogo(resources.logo);
        }
        context.restore();
    });
};
