function canvasarea(){
	$("#instruction").css("display","block")
}


var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var canvas2 = document.getElementById('imageCanvas2');
var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var len = 500;
var source = "";
function handleImage(e){
	

    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        
        img.onload = function(){
        	var ratio = img.height/img.width;
            var reduce = img.height/500;
            canvas.width = 500/ratio;
            canvas.height = 500;
            canvas2.width = 200;
	    	canvas2.height = 200;
            len = canvas.width;
            $("#drag2").width(canvas.width-$("#drag").width()+"px");
            ctx.drawImage(img,0,0,500/ratio,500);
            ctx2.drawImage(img,0,0,100*reduce,100*reduce,0,0,200,200);
            $("#img_url").attr('value',canvas2.toDataURL('image/png').replace("data:image/png;base64,", ""));
        }
        img.src = event.target.result;
        source = img.src;
        
    }
    
    reader.readAsDataURL(e.target.files[0]); 
    $("#log").css("display","block");    
}
function generate(x,y,w,h){
	
	var img2 = new Image();
	img2.onload = function(){
		var ratio = img2.height/img2.width;
		var reduce = img2.height/500;
		canvas.width = 500/ratio;
        canvas.height = 500;
        len = canvas.width;
	    canvas2.width = 200;
	    canvas2.height = 200;
	    ctx.drawImage(img2,0,0,500/ratio,500);
	    console.log(x+ " "+ y+ " "+w+" "+h);
	    ctx2.drawImage(img2,x*reduce,y*reduce,w*reduce,h*reduce,0,0,200,200);
	}
	if (source!=""){
		img2.src = source;
	}
	$("#img_url").attr('value',canvas2.toDataURL('image/png').replace("data:image/png;base64,", ""));
}


  

var state = 0;
var down = false;
var x = 0;
var y = 0;
$(document).mousedown(function( d){
            down = true;
            // console.log(down);


});
$(document).mouseup(function(){
        down = false;
        state = 0;
        // console.log(down);
});
$("#log").mousemove(function(e){
	
	console.log(len)
    $('html,body').css('cursor','default');
    var vertical="";
    var horizontal="";
    var position = $("#drag").position();
    var width = $("#drag").width();
    var height = $("#drag").height();
   var parentOffset = $(this).parent().offset(); 
   var top = position.top;
    var left = position.left;
   // console.log(e.pageX+ " "+e.pageY);
   // console.log(parentOffset.left+ " "+parentOffset.top);
   var relX = e.pageX - parentOffset.left;
   var relY = e.pageY - parentOffset.top;
   // console.log(relX+ " "+relY);
   // console.log(top+ " "+left);
   if (down == true)
        change(state,relX,relY);
   
   if (Math.abs(top-relY)<5 && relX>=left && relX<=left+width){
        vertical = 'top';
        if (down == false)
            state = 1; 
        
    }
   if (Math.abs(top+height-relY)<5 && relX>=left && relX<=left+width){
        vertical = 'bottom';
        if (down == false)
            state = 2; 
        
    }
   if (Math.abs(left-relX)<5 && relY>=top && relY<=top+height){
        horizontal = "left";
        if (down == false)
            state = 1; 
        
    }
   if (Math.abs(left+width-relX)<5 && relY>=top && relY<=top+height){
        horizontal = "right";
        if (down == false)
            state = 2; 
        
       } 
    if (relX<=left+width-5 && relX>=left+5 && relY>=top+5 && relY<=top+height-5){
        if (down == false)
            state = 3;
        $('html,body').css('cursor','all-scroll');
      
    }
    if ((vertical == 'top' && horizontal == 'left') || (vertical == 'bottom' && horizontal == 'right'))
        $('html,body').css('cursor','nwse-resize');
    else if (vertical == 'top'|| vertical == 'bottom')
        $('html,body').css('cursor','ns-resize');
    else if (horizontal == 'left'|| horizontal == 'right')
        $('html,body').css('cursor','ew-resize');
    x = relX;
    y = relY;

});
function change(state,relX,relY){
   
    if (state == 1 ){
        
        var vtop = parseInt($("#drag3").height());
        var hleft= parseInt($("#drag1").width());
        var width = parseInt($("#drag").width());
        var height = parseInt($("#drag").height());
        var speedx = relX-x;
        var speedy = relY-y;
        var speed = Math.max(Math.abs(speedx),Math.abs(speedy));
        if (speedx<=0 && speedy<=0){
            speed = -speed;
        }else if (speedx>=0 && speedy>=0){
            speed = speed;
        }else{
            speed = 0;
        }
        var min = Math.min(vtop+height,hleft+width);
        newwidth= Math.min(Math.max(50,width-speed),min);
        newheight = Math.min(Math.max(50,height-speed),min);
        $("#drag").width(parseInt(newwidth)+"px");
        $("#drag").height(parseInt(newheight)+"px");
        $("#drag1").width(parseInt(hleft+width-newwidth)+"px");
        $("#drag3").height(parseInt(vtop+height-newheight)+"px");
        $("#drag").css("top",parseInt($("#drag3").height()) + "px");
        $("#drag").css("left",parseInt($("#drag1").width()) + "px");
        $("#drag3").css("left",parseInt($("#drag1").width()) + "px");
        $("#drag4").css("left",parseInt($("#drag1").width()) + "px");
        $("#drag3").width(parseInt($("#drag").width()) + "px");
        $("#drag4").width(parseInt($("#drag").width()) + "px");
    }
    if (state == 2 ){
        
        var vtop = parseInt($("#drag3").height());
        var hleft= parseInt($("#drag1").width());
        var width = parseInt($("#drag").width());
        var height = parseInt($("#drag").height());
        var speedx = relX-x;
        var speedy = relY-y;
        var speed = Math.max(Math.abs(speedx),Math.abs(speedy));
        if (speedx<=0 && speedy<=0){
            speed = -speed;
        }else if (speedx>=0 && speedy>=0){
            speed = speed;
        }else{
            speed = 0;
        }
        var min = Math.min(500-vtop,len-hleft);
        // console.log(height+speed);
        newwidth= Math.min(Math.max(50,width+speed),min);
        newheight = Math.min(Math.max(50,height+speed),min);
        $("#drag").width(parseInt(newwidth)+"px");
        $("#drag").height(parseInt(newheight)+"px");
        $("#drag3").width($("#drag").width());
        $("#drag4").width($("#drag").width());
        $("#drag2").css("left",newwidth+hleft + "px");
        $("#drag2").width(len-newwidth-hleft + "px");
        $("#drag4").css("top",newheight+vtop + "px");
        $("#drag4").height(500-newheight-vtop + "px");
    }
    if (state == 3){
        var vtop=0;
        var hleft=0;
        var width = parseInt($("#drag").width());
        var height = parseInt($("#drag").height());
        if (parseInt($("#drag3").height())+relY-y+height>500)
            vtop = 500-height;
        else if (parseInt($("#drag").css("top"))+relY-y<0)
            vtop = 0;
        else
            vtop = parseInt($("#drag").css("top"))+relY-y;

        if (parseInt($("#drag1").width())+relX-x+width>len)
            hleft = len-width;
        else if (parseInt($("#drag").css("left"))+relX-x<0)
            hleft = 0;
        else
            hleft = parseInt($("#drag").css("left"))+relX-x;

        // console.log(vtop);
        // console.log(hleft);
        $("#drag").css("top",vtop + "px");
        $("#drag").css("left",hleft + "px");
        $("#drag1").width(hleft+"px");
        $("#drag2").width((len-hleft-width)+"px");
        $("#drag2").css("left",(hleft+width) + "px");
        $("#drag3").height(vtop+"px");
        $("#drag3").css("left",hleft + "px");
        $("#drag4").height((500-vtop-height)+"px");
        $("#drag4").css("top",(vtop+height) + "px");
        $("#drag4").css("left",hleft + "px");
    }
    var hleft= parseInt($("#drag").css("left"));
    var vtop = parseInt($("#drag").css("top"));
    var width = parseInt($("#drag").width());
    var height = parseInt($("#drag").height());
    generate(hleft,vtop,width,height);
}

var token = $('input[name="csrfmiddlewaretoken"]').prop('value');
function save_pic(){
    console.log(name)
    var file = $("#img_url").attr('value')
        $.ajax({
            type: "post",
            url: "/save_pic",
            data: {
                'userAdjustedImage': file,
                'csrfmiddlewaretoken': token,
                },

            enctype: 'multipart/form-data',

            success: function() {
                     location.reload(true)
                 },
            error: function() {
                    alert("Oh no! There seems to have been some problem with the picture you uploaded");
                  },
        })
}