
/*
var jfn=jQuery.fn;
/**
 * [Tabs]
 *//*
jfn.tabs=function(){
    var $children=this.children();
    $children.first().addClass('active');
    $children.on('click',$children,function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
}*/

/**
 * [Mouse tracking]
 *//*
jfn.mouseTracking=function(){
    var flag = 0;
    var offsetX,offsetY; 
    $mouse=this;
    $mouse.mousedown(function(e){
        flag=1;
        offsetX=e.offsetX;
        offsetY=e.offsetY;
    }).mouseup(function(){flag=0;});
    $('body').mousemove(function (e) {
        if (flag) {
            $mouse.css({
                'top': e.clientY - offsetY,
                'left': e.clientX - offsetX
            })
        }
    });
}*/

var express=require('express');
var app=express();
app.listen(8008);

app.get('/',(req,res)=>{
    var frame=req.query.callback[0];
    console.log(frame);
    // res.writeHead({});
    var data='hello world'
    res.write(`${frame}('${data}')`);
    res.end();
});