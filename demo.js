var wrap = $('.wrapper');
var con = $('.content');
var imgCov = $('.imgCover');
var moveBox = $('.moveView');
var bigView = $('.bigView');
var oUl = $('ul');
var mul = 4;
var moveBoxW;
var imgW, imgH;
function init() {
    bindEvent();
    createView();
}
init();
// -------------------------------------**绑定事件(获得索引)(绑定mousemove,mouseleave事件)**
function bindEvent() {
    getIndex(0);
    oUl.find('li').on('click', function () {
        index = $(this).index();
        getIndex(index); //获得当前选中项索引
    })
    con.on('mousemove', function (e) {
        move(e);//调用MOVE函数
    }).on('mouseleave', function () {
        bigView.hide();
        moveBox.hide();
    })
}
// -------------------------------------**创建视窗**
function createView() {
    moveBoxW = 500 / mul;//***移动区域宽度 正方形
    moveBox.css({
        'width': moveBoxW + 'px',
        'height': moveBoxW + 'px'
    })
};
// ----------------------------------**获得当前项索引创建选中的图片**
function getIndex(index) {
    var styleCss;
    var img = new Image();
    var src = oUl.find('img').eq(index).attr('src');
    img.src = src;//地址传给新生成的img元素
    //去除所有li的class再给选中元素加上class
    oUl.find('li').removeClass('active').eq(index).addClass('active');
                            
    imgW = img.width;
    imgH = img.height;
    if (img.width >= img.height) {//宽大于高
        imgW = 500;
        imgH = imgH / imgW * 500;
        styleCss = 'top:50%;margin-top:' + (-imgH / 2) + 'px';
    } else {//宽小于于高
        imgH = 500;
        imgW = imgW / imgH * 500;
        styleCss = 'left:50%;margin-left:' + (-imgW / 2) + 'px';
    }

    imgCov.empty().append('<img src="' + src + '"width="' + imgW + '"height="' + imgH + '"style="' + styleCss + '"/>')

    bigView.empty().append('<img src="' + src + '"width="' + imgW * mul + '"height="' + imgH * mul + '"/>')
}
// ------------------------------------**移动元素**
function move(e) {
    var minXl = (500 - imgW) / 2;//左边距离
    var maxXr = 500 - minXl - moveBoxW;//右边距离
    var minYt = (500 - imgH) / 2;
    var maxYb = 500 - minYt - moveBoxW;

    var X = e.clientX - wrap.offset().left - moveBoxW / 2;
    var Y = e.clientY - wrap.offset().top - moveBoxW / 2;

    var endX = (X > minXl) ? (X < maxXr) ? X : maxXr : minXl;
    var endY = (Y > minYt) ? (Y < maxYb) ? Y : maxYb : minYt;

    moveBox.css({
        'left': endX,
        'top': endY,
        'display': 'block'
    }) 
    
    var posX = (endX - (500 - imgW) /2) * mul;
    var posY = (endY - (500 - imgH) /2) * mul;
    bigView.css({
        'display':'block'
    }).find('img').css({
        'margin-left':-posX,
        'margin-top':-posY
    })
}