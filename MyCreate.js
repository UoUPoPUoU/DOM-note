/**
 * Created by Administrator on 2017/1/13 0013.
 */

// 封装 加载函数
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}


// 封装：在目标元素后面的函数
function insertAfter(newElement,tagName){
    var parent = tagName.parentNode;
    if(parent.lastChild == tagName){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement, tagName.nextSibling);
    }
}

//封装：获取下一个节点元素
function getNextElement(node){
    if(node.nodeType == 1){
        return node;
    }
    if(node.nextSibling){
        return getNextElement(node.nextSibling);
    }
    return null;
}


//封装：追加class属性值
 function addClass(element,value){
    if(! element.className){
        element.className = value;
    }else {
        var newClassName = "element.className" + value;
        element.className = newClassName;
    }
 }

//封装：移动图片，动画效果
function moveElement(elementID,final_x,final_y,interval) {
    var elem = document.getElementById(elementID);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;
    clearTimeout(elem.movement);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        xpos = xpos + (Math.ceil((final_x - xpos)/10));
    }
    if (xpos > final_x) {
        xpos = xpos - (Math.ceil((xpos - final_x)/10));
    }
    if (ypos < final_y) {
        ypos = ypos + (Math.ceil((final_y - ypos)/10));
    }
    if (ypos > final_y) {
        ypos = ypos - (Math.ceil((ypos - final_y)/10));
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat ="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,interval);
}

// 图片灰色被触碰变彩色
function  convertTOGS(img) {
    // 如果没有canvas 就退出
    if(!Modernizr.canvas) return;
    // 参数的颜色就是参数的路劲
    img.color = img.src;
    // 设置参数的灰度
    img.grayscale = createGSCanvas(img);
    img.onmouseover = function(){
        this.src = this.color;
    };
    img.onmouseout = function(){
        this.src =this.grayscale;
    };
    img.onmouseout();
}
function createGSCanvas(imG) {
    // 创建canvas标签
    var canvas = document.createElement("canvas");
    canvas.width = imG.width;
    canvas.height = imG.height;
    var ctx = canvas.getContext("2d");
    // 在0,0位置上绘制图像
    ctx.drawImage(imG, 0, 0);
    // 复制画布上指定图像的像素数据
    var c = ctx.getImageData(0, 0, imG.width, imG.height);
    // 处理像素数据
    for(var i =0; i < c.data.length; i += 4){
        var r = c.data[i],
            g = c.data[i + 1],
            b = c.data[i + 2];
        c.data[i] = c.data[i + 1] = c.data[i + 2] = (r + g +b)/3;
    }
    // 将图像数据放回画布的x+y的坐标位置
    ctx.putImageData(c,0,0);
    // 转换格式
    return canvas.toDataURL();
}

//自定义音频控件
function  videoControls(){
    // 获取所有video标签 进行设置
    var vids = document.getElementsByTagName('video');
    for(var i = 0; i < vids.length;i++){
        addControls(vids[i]);
    }
}
function addControls(vid) {
    // 删除当前标签的控制属性
    vid.removeAttribute('controls');
    vid.height = vid.videoHeight;
    vid.windth = vid.videoWidth;
    vid.parentNode.style.height = vid.videoHeight + 'px';
    vid.parentNode.style.width = vid.videoWidth + 'px';

    var controls = document.createElement('div');
    controls.setAttribute('class','controls');

    var play = document.createElement('button');
    play.setAttribute('title','play');
    play.innerHTML = '&#x25BA;';

    controls.appendChild(play);
    vid.parentNode.insertBefore(controls,vid);

    play.onclick = function(){
        if(vid.ended){
            vid.currentTime = 0;
        }
        if(vid.paused){
            vid.play();
        }else {
            vid.pause();
        }
    };
    vid.addEventListener('play',function () {
        play.innerHTML = '| |';
    },false);
    vid.addEventListener('pause',function(){
        play.innerHTML = '&#x25BA';
        play.innerHTML.style.textAlign = 'center';
    },false);
    vid.addEventListener('ended',function(){
        vid.pause();
    },false);
}

//兼容不支持H5  placeholder属性的方法
function placeholder(){
if(!Modernizr.input.placeholder){
    var input = document.getElementById('input');
    input.onfocus = function(){
        var text = this.placeholder || this.getAttribute('placeholder');
        if(this.value == text){
            this.value = '';
        }
    };
    input.onblur = function(){
        if(this.value == ''){
            this.value = this.placeholder || this.getAttribute('placehloder');
        }
    };
    input.onblur();
}
}
//    重叠就隐藏的封装
function isOverlap(idOne,idTwo){
    var objOne=$("#"+idOne),
        objTwo=$("#"+idTwo),
        offsetTwo = objTwo.offset(),
        topTwo=offsetTwo.top,
        heightOne = objOne.height();
    if( heightOne >= topTwo){
        objTwo.hide();
    }
    else {
        objTwo.show();
    }
}
isOverlap("one","two");

// Carousel
function move(moveX,prevX,nextX){
    var divFather = $(moveX),
        divs = divFather.children(".imgFloat"),
        prev = divFather.children(prevX),
        next = divFather.children(nextX),
        divFir = divs.eq(0),
        divLat = divs.eq(5);
    prev.click(function () {
        if (divFir) {
            divFather.append($(moveX + ' div:nth-of-type(1)'));
        }
    });
    next.click(function () {
        if (divLat) {
            divFather.prepend($(moveX + ' div:nth-of-type(6)'));
        }
    });
}
move(".moveOne",".prevOne",".nextOne");
move(".moveTwo",".prevTwo",".nextTwo");
move(".moveThree",".prevThree",".nextThree");