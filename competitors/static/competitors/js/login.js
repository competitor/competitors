function cancelSign(){

    G("sign_div").style.display = 'none';

    G("cover_div").style.display = 'none';

   document.body.style.overflow = '';

};

function G(id){
    return document.getElementById(id);
};

function GC(t){
   return document.createElement(t);
};

String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, '');
};

function isIE(){
      return (document.all && window.ActiveXObject && !window.opera) ? true : false;
}

var loginDivWidth = 402; 

var token = $("[name='csrfmiddlewaretoken']").val();

console.log(token);

var next = $("[name='redirect']").val();

console.log(next);

var sign_in_flow = '<div id="login_window">'
      +'<div id="login_header">'
      +'<h3>Login</h3>'
      +'<a href="#" id="login_cancel" onclick="cancelSign();"><span class="glyphicon glyphicon-remove"></span></a>'
      +'</div><form method="post" action="">'
      +'<div><form action="login()">'
      +'<label class="sr-only">username:*</label>'

       + '<input type="text"  name="username" required placeholder="Username"/>'

       + '</div>'
       +'<div>'
        +'<label class="sr-only">password:*</label>'
        +'<input type="password" name="password" required  placeholder="Password"/>'

        + '</div>'
        +'<div id="login_window_buttons">'
        +'<div>'
        +'<button id="signin" value="login" class="btn btn-success"  >Sign In</button>   '
        + '<a href="/register"><input id="signup" type="button" class="btn btn-primary" value="Sign Up"/</a>  '

        + '</div><div>'

        + '<a href="/change_password"><input type="button" id="forget" class="btn btn-danger" value="Forget Username/Password"/></a></div>'

        + '<input type="hidden" name="csrfmiddlewaretoken" value="'+token+'">'

        + '<input type="hidden" name="next" value="'+next+'">'
        + '</form></div>';

        

        




function signFlow(isSignIn){

    var error = '';

    var htmlText = null;

    if (isSignIn == 1) {

     if (error == ''){

      error = checkPwd();

     }

     htmlText = sign_in_flow;

    } else if (isSignIn == 0) {

     if (error == ''){

      error = checkPwd();

      if (error == ''){

       error = checkRePwd();

      }

     }

     htmlText = sign_up_flow;

    } else if (isSignIn == 2) {

    htmlText = forget_pwd_flow;

    }

    var eMailValue = G("sign_email").value.trim();

   if (error == '') {

    } else {

    G("sign_div").innerHTML = error + htmlText;

    G("sign_email").value = eMailValue;

    }

};

function popCoverDiv(){

   if (G("cover_div")) {

    G("cover_div").style.display = '';

   } else {

    var coverDiv = GC('div');

    document.body.appendChild(coverDiv);

    coverDiv.id = 'cover_div';

    with(coverDiv.style) {

     position = 'absolute';

     background = '#CCCCCC';

     left = '0px';

     top = '0px';

     var bodySize = getBodySize();

     width = '100%'

     height = '100%'

     zIndex = 98;

     if (isIE()) {

      filter = "Alpha(Opacity=60)";

     } else {

      opacity = 0.6;

     }

    }

   }

}

function getBodySize(){

   var bodySize = [];

   with(document.documentElement) {

    bodySize[0] = (scrollWidth>clientWidth)?scrollWidth:clientWidth;

    bodySize[1] = (scrollHeight>clientHeight)?scrollHeight:clientHeight;

   }

   return bodySize;

}

function popSign(isLogin){

   if (G("sign_div")) {

    G("sign_div").style.display = '';

   } else {

    var signDiv = GC('form');

    $("#navbar").append(signDiv);

    signDiv.id = 'sign_div';

    signDiv.align = "center";

    signDiv.method = "post";

    signDiv.action = "/login"

    signDiv.onkeypress = function(evt){

          var e = window.event?window.event:evt;

          if (e.keyCode==13 || e.which==13) {

           if (G("sign_button")) {

            G("sign_div").focus();

            G("sign_button").click();

           }

          }

         };

    with (signDiv.style) {

     margin = '100px auto'

     position = 'relative';

     width = loginDivWidth + 'px';

     zIndex = 99;

     background = '#FFFFFF';

     border = '#66CCFF solid 1px';

    }

   }


    G("sign_div").innerHTML = sign_in_flow;

   

  

}

function popSignFlow(isLogin) {

   popCoverDiv();  

   popSign(isLogin);  

   document.body.style.overflow = "hidden";

     
      

}




