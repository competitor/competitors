!function(a){a.fn.hoverIntent=function(b,c,d){var e={interval:100,sensitivity:7,timeout:0};e="object"==typeof b?a.extend(e,b):a.isFunction(c)?a.extend(e,{over:b,out:c,selector:d}):a.extend(e,{over:b,out:b,selector:c});var f,g,h,i,j=function(a){f=a.pageX,g=a.pageY},k=function(b,c){return c.hoverIntent_t=clearTimeout(c.hoverIntent_t),Math.abs(h-f)+Math.abs(i-g)<e.sensitivity?(a(c).off("mousemove.hoverIntent",j),c.hoverIntent_s=1,e.over.apply(c,[b])):(h=f,i=g,c.hoverIntent_t=setTimeout(function(){k(b,c)},e.interval),void 0)},l=function(a,b){return b.hoverIntent_t=clearTimeout(b.hoverIntent_t),b.hoverIntent_s=0,e.out.apply(b,[a])},m=function(b){var c=jQuery.extend({},b),d=this;d.hoverIntent_t&&(d.hoverIntent_t=clearTimeout(d.hoverIntent_t)),"mouseenter"==b.type?(h=c.pageX,i=c.pageY,a(d).on("mousemove.hoverIntent",j),1!=d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){k(c,d)},e.interval))):(a(d).off("mousemove.hoverIntent",j),1==d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){l(c,d)},e.timeout)))};return this.on({"mouseenter.hoverIntent":m,"mouseleave.hoverIntent":m},e.selector)}}(jQuery);
var showNotice,adminMenu,columns,validateForm,screenMeta;!function(a,b){adminMenu={init:function(){},fold:function(){},restoreMenuState:function(){},toggle:function(){},favorites:function(){}},columns={init:function(){var b=this;a(".hide-column-tog","#adv-settings").click(function(){var c=a(this),d=c.val();c.prop("checked")?b.checked(d):b.unchecked(d),columns.saveManageColumnsState()})},saveManageColumnsState:function(){var b=this.hidden();a.post(ajaxurl,{action:"hidden-columns",hidden:b,screenoptionnonce:a("#screenoptionnonce").val(),page:pagenow})},checked:function(b){a(".column-"+b).show(),this.colSpanChange(1)},unchecked:function(b){a(".column-"+b).hide(),this.colSpanChange(-1)},hidden:function(){return a(".manage-column").filter(":hidden").map(function(){return this.id}).get().join(",")},useCheckboxesForHidden:function(){this.hidden=function(){return a(".hide-column-tog").not(":checked").map(function(){var a=this.id;return a.substring(a,a.length-5)}).get().join(",")}},colSpanChange:function(b){var c,d=a("table").find(".colspanchange");d.length&&(c=parseInt(d.attr("colspan"),10)+b,d.attr("colspan",c.toString()))}},a(document).ready(function(){columns.init()}),validateForm=function(b){return!a(b).find(".form-required").filter(function(){return""===a("input:visible",this).val()}).addClass("form-invalid").find("input:visible").change(function(){a(this).closest(".form-invalid").removeClass("form-invalid")}).size()},showNotice={warn:function(){var a=commonL10n.warnDelete||"";return confirm(a)?!0:!1},note:function(a){alert(a)}},screenMeta={element:null,toggles:null,page:null,init:function(){this.element=a("#screen-meta"),this.toggles=a(".screen-meta-toggle a"),this.page=a("#wpcontent"),this.toggles.click(this.toggleEvent)},toggleEvent:function(b){var c=a(this.href.replace(/.+#/,"#"));b.preventDefault(),c.length&&(c.is(":visible")?screenMeta.close(c,a(this)):screenMeta.open(c,a(this)))},open:function(b,c){a(".screen-meta-toggle").not(c.parent()).css("visibility","hidden"),b.parent().show(),b.slideDown("fast",function(){b.focus(),c.addClass("screen-meta-active").attr("aria-expanded",!0)}),a(document).trigger("screen:options:open")},close:function(b,c){b.slideUp("fast",function(){c.removeClass("screen-meta-active").attr("aria-expanded",!1),a(".screen-meta-toggle").css("visibility",""),b.parent().hide()}),a(document).trigger("screen:options:close")}},a(".contextual-help-tabs").delegate("a","click",function(b){var c,d=a(this);return b.preventDefault(),d.is(".active a")?!1:(a(".contextual-help-tabs .active").removeClass("active"),d.parent("li").addClass("active"),c=a(d.attr("href")),a(".help-tab-content").not(c).removeClass("active").hide(),void c.addClass("active").show())}),a(document).ready(function(){function c(a){var b,c,d,e,f,g,h,i=a.find(".wp-submenu");f=a.offset().top,g=x.scrollTop(),h=f-g-30,b=f+i.height()+1,c=A.height(),d=60+b-c,e=x.height()+g-50,b-d>e&&(d=b-e),d>h&&(d=h),d>1?i.css("margin-top","-"+d+"px"):i.css("margin-top","")}function d(a){var b=x.scrollTop(),c=!a||"scroll"!==a.type;if(!(t||v||B.data("wp-responsive"))){if(N.menu+N.adminbar<N.window||N.menu+N.adminbar+20>N.wpwrap)return void f();if(M=!0,N.menu+N.adminbar>N.window){if(0>b)return void(J||(J=!0,K=!1,z.css({position:"fixed",top:"",bottom:""})));if(b+N.window>w.height()-1)return void(K||(K=!0,J=!1,z.css({position:"fixed",top:"",bottom:0})));b>I?J?(J=!1,L=z.offset().top-N.adminbar-(b-I),L+N.menu+N.adminbar<b+N.window&&(L=b+N.window-N.menu-N.adminbar),z.css({position:"absolute",top:L,bottom:""})):!K&&z.offset().top+N.menu<b+N.window&&(K=!0,z.css({position:"fixed",top:"",bottom:0})):I>b?K?(K=!1,L=z.offset().top-N.adminbar+(I-b),L+N.menu>b+N.window&&(L=b),z.css({position:"absolute",top:L,bottom:""})):!J&&z.offset().top>=b+N.adminbar&&(J=!0,z.css({position:"fixed",top:"",bottom:""})):c&&(J=K=!1,L=b+N.window-N.menu-N.adminbar-1,L>0?z.css({position:"absolute",top:L,bottom:""}):f())}I=b}}function e(){N={window:x.height(),wpwrap:A.height(),adminbar:H.height(),menu:z.height()}}function f(){!t&&M&&(J=K=M=!1,z.css({position:"",top:"",bottom:""}))}function g(){e(),B.data("wp-responsive")?(y.removeClass("sticky-menu"),f()):N.menu+N.adminbar>N.window?(d(),y.removeClass("sticky-menu")):(y.addClass("sticky-menu"),f())}var h,i,j,k,l,m,n,o,p,q=!1,r=a("input.current-page"),s=r.val(),t=/iPhone|iPad|iPod/.test(navigator.userAgent),u=-1!==navigator.userAgent.indexOf("Android"),v=a(document.documentElement).hasClass("ie8"),w=a(document),x=a(b),y=a(document.body),z=a("#adminmenuwrap"),A=a("#wpwrap"),B=a("#adminmenu"),C=a("#wp-responsive-overlay"),D=a("#wp-toolbar"),E=D.find('a[aria-haspopup="true"]'),F=a(".meta-box-sortables"),G=!1,H=a("#wpadminbar"),I=0,J=!1,K=!1,L=0,M=!1,N={window:x.height(),wpwrap:A.height(),adminbar:H.height(),menu:z.height()};B.on("click.wp-submenu-head",".wp-submenu-head",function(b){a(b.target).parent().siblings("a").get(0).click()}),a("#collapse-menu").on("click.collapse-menu",function(){var c,d,e=a(document.body);a("#adminmenu div.wp-submenu").css("margin-top",""),c=b.innerWidth?Math.max(b.innerWidth,document.documentElement.clientWidth):961,c&&960>c?e.hasClass("auto-fold")?(e.removeClass("auto-fold").removeClass("folded"),setUserSetting("unfold",1),setUserSetting("mfold","o"),d="open"):(e.addClass("auto-fold"),setUserSetting("unfold",0),d="folded"):e.hasClass("folded")?(e.removeClass("folded"),setUserSetting("mfold","o"),d="open"):(e.addClass("folded"),setUserSetting("mfold","f"),d="folded"),a(document).trigger("wp-collapse-menu",{state:d})}),("ontouchstart"in b||/IEMobile\/[1-9]/.test(navigator.userAgent))&&(m=t?"touchstart":"click",a(document.body).on(m+".wp-mobile-hover",function(b){B.data("wp-responsive")||a(b.target).closest("#adminmenu").length||B.find("li.opensub").removeClass("opensub")}),B.find("a.wp-has-submenu").on(m+".wp-mobile-hover",function(b){var d=a(this).parent();B.data("wp-responsive")||d.hasClass("opensub")||d.hasClass("wp-menu-open")&&!(d.width()<40)||(b.preventDefault(),c(d),B.find("li.opensub").removeClass("opensub"),d.addClass("opensub"))})),t||u||(B.find("li.wp-has-submenu").hoverIntent({over:function(){var b=a(this),d=b.find(".wp-submenu"),e=parseInt(d.css("top"),10);isNaN(e)||e>-5||B.data("wp-responsive")||(c(b),B.find("li.opensub").removeClass("opensub"),b.addClass("opensub"))},out:function(){B.data("wp-responsive")||a(this).removeClass("opensub").find(".wp-submenu").css("margin-top","")},timeout:200,sensitivity:7,interval:90}),B.on("focus.adminmenu",".wp-submenu a",function(b){B.data("wp-responsive")||a(b.target).closest("li.menu-top").addClass("opensub")}).on("blur.adminmenu",".wp-submenu a",function(b){B.data("wp-responsive")||a(b.target).closest("li.menu-top").removeClass("opensub")}).find("li.wp-has-submenu.wp-not-current-submenu").on("focusin.adminmenu",function(){c(a(this))})),p=a("div.wrap h2:first"),p.nextAll("div.updated, div.error, div.notice").addClass("below-h2"),a("div.updated, div.error, div.notice").not(".below-h2, .inline").insertAfter(p),screenMeta.init(),a("tbody").children().children(".check-column").find(":checkbox").click(function(b){if("undefined"==b.shiftKey)return!0;if(b.shiftKey){if(!q)return!0;h=a(q).closest("form").find(":checkbox"),i=h.index(q),j=h.index(this),k=a(this).prop("checked"),i>0&&j>0&&i!=j&&(l=j>i?h.slice(i,j):h.slice(j,i),l.prop("checked",function(){return a(this).closest("tr").is(":visible")?k:!1}))}q=this;var c=a(this).closest("tbody").find(":checkbox").filter(":visible").not(":checked");return a(this).closest("table").children("thead, tfoot").find(":checkbox").prop("checked",function(){return 0===c.length}),!0}),a("thead, tfoot").find(".check-column :checkbox").on("click.wp-toggle-checkboxes",function(b){var c=a(this),d=c.closest("table"),e=c.prop("checked"),f=b.shiftKey||c.data("wp-toggle");d.children("tbody").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked",function(){return a(this).is(":hidden")?!1:f?!a(this).prop("checked"):e?!0:!1}),d.children("thead,  tfoot").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked",function(){return f?!1:e?!0:!1})}),a("td.post-title, td.title, td.comment, .bookmarks td.column-name, td.blogname, td.username, .dashboard-comment-wrap").focusin(function(){clearTimeout(n),o=a(this).find(".row-actions"),o.addClass("visible")}).focusout(function(){n=setTimeout(function(){o.removeClass("visible")},30)}),a("#default-password-nag-no").click(function(){return setUserSetting("default_password_nag","hide"),a("div.default-password-nag").hide(),!1}),a("#newcontent").bind("keydown.wpevent_InsertTab",function(b){var c,d,e,f,g,h=b.target;if(27==b.keyCode)return void a(h).data("tab-out",!0);if(!(9!=b.keyCode||b.ctrlKey||b.altKey||b.shiftKey)){if(a(h).data("tab-out"))return void a(h).data("tab-out",!1);c=h.selectionStart,d=h.selectionEnd,e=h.value;try{this.lastKey=9}catch(i){}document.selection?(h.focus(),g=document.selection.createRange(),g.text="	"):c>=0&&(f=this.scrollTop,h.value=e.substring(0,c).concat("	",e.substring(d)),h.selectionStart=h.selectionEnd=c+1,this.scrollTop=f),b.stopPropagation&&b.stopPropagation(),b.preventDefault&&b.preventDefault()}}),a("#newcontent").bind("blur.wpevent_InsertTab",function(){this.lastKey&&9==this.lastKey&&this.focus()}),r.length&&r.closest("form").submit(function(){-1==a('select[name="action"]').val()&&-1==a('select[name="action2"]').val()&&r.val()==s&&r.val("1")}),a('.search-box input[type="search"], .search-box input[type="submit"]').mousedown(function(){a('select[name^="action"]').val("-1")}),a("#contextual-help-link, #show-settings-link").on("focus.scroll-into-view",function(a){a.target.scrollIntoView&&a.target.scrollIntoView(!1)}),function(){function b(){c.prop("disabled",""===d.map(function(){return a(this).val()}).get().join(""))}var c,d,e=a("form.wp-upload-form");e.length&&(c=e.find('input[type="submit"]'),d=e.find('input[type="file"]'),b(),d.on("change",b))}(),t||(x.on("scroll.pin-menu",d),w.on("tinymce-editor-init.pin-menu",function(a,b){b.on("wp-autoresize",e)})),b.wpResponsive={init:function(){var c=this;w.on("wp-responsive-activate.wp-responsive",function(){c.activate()}).on("wp-responsive-deactivate.wp-responsive",function(){c.deactivate()}),a("#wp-admin-bar-menu-toggle a").attr("aria-expanded","false"),a("#wp-admin-bar-menu-toggle").on("click.wp-responsive",function(b){b.preventDefault(),A.toggleClass("wp-responsive-open"),A.hasClass("wp-responsive-open")?(a(this).find("a").attr("aria-expanded","true"),a("#adminmenu a:first").focus()):a(this).find("a").attr("aria-expanded","false")}),B.on("click.wp-responsive","li.wp-has-submenu > a",function(b){B.data("wp-responsive")&&(a(this).parent("li").toggleClass("selected"),b.preventDefault())}),c.trigger(),w.on("wp-window-resized.wp-responsive",a.proxy(this.trigger,this)),x.on("load.wp-responsive",function(){var a=navigator.userAgent.indexOf("AppleWebKit/")>-1?x.width():b.innerWidth;782>=a&&c.disableSortables()})},activate:function(){g(),y.hasClass("auto-fold")||y.addClass("auto-fold"),B.data("wp-responsive",1),this.disableSortables()},deactivate:function(){g(),B.removeData("wp-responsive"),this.enableSortables()},trigger:function(){var a;b.innerWidth&&(a=Math.max(b.innerWidth,document.documentElement.clientWidth),782>=a?G||(w.trigger("wp-responsive-activate"),G=!0):G&&(w.trigger("wp-responsive-deactivate"),G=!1),480>=a?this.enableOverlay():this.disableOverlay())},enableOverlay:function(){0===C.length&&(C=a('<div id="wp-responsive-overlay"></div>').insertAfter("#wpcontent").hide().on("click.wp-responsive",function(){D.find(".menupop.hover").removeClass("hover"),a(this).hide()})),E.on("click.wp-responsive",function(){C.show()})},disableOverlay:function(){E.off("click.wp-responsive"),C.hide()},disableSortables:function(){if(F.length)try{F.sortable("disable")}catch(a){}},enableSortables:function(){if(F.length)try{F.sortable("enable")}catch(a){}}},b.wpResponsive.init(),g(),w.on("wp-window-resized.pin-menu postboxes-columnchange.pin-menu postbox-toggled.pin-menu wp-collapse-menu.pin-menu wp-scroll-start.pin-menu",g)}),function(){function c(){a(document).trigger("wp-window-resized")}function d(){b.clearTimeout(e),e=b.setTimeout(c,200)}var e;a(b).on("resize.wp-fire-once",d)}(),function(){if("-ms-user-select"in document.documentElement.style&&navigator.userAgent.match(/IEMobile\/10\.0/)){var a=document.createElement("style");a.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),document.getElementsByTagName("head")[0].appendChild(a)}}()}(jQuery,window);
"undefined"!=typeof jQuery?("undefined"==typeof jQuery.fn.hoverIntent&&!function(a){a.fn.hoverIntent=function(b,c,d){var e={interval:100,sensitivity:7,timeout:0};e="object"==typeof b?a.extend(e,b):a.isFunction(c)?a.extend(e,{over:b,out:c,selector:d}):a.extend(e,{over:b,out:b,selector:c});var f,g,h,i,j=function(a){f=a.pageX,g=a.pageY},k=function(b,c){return c.hoverIntent_t=clearTimeout(c.hoverIntent_t),Math.abs(h-f)+Math.abs(i-g)<e.sensitivity?(a(c).off("mousemove.hoverIntent",j),c.hoverIntent_s=1,e.over.apply(c,[b])):(h=f,i=g,c.hoverIntent_t=setTimeout(function(){k(b,c)},e.interval),void 0)},l=function(a,b){return b.hoverIntent_t=clearTimeout(b.hoverIntent_t),b.hoverIntent_s=0,e.out.apply(b,[a])},m=function(b){var c=jQuery.extend({},b),d=this;d.hoverIntent_t&&(d.hoverIntent_t=clearTimeout(d.hoverIntent_t)),"mouseenter"==b.type?(h=c.pageX,i=c.pageY,a(d).on("mousemove.hoverIntent",j),1!=d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){k(c,d)},e.interval))):(a(d).off("mousemove.hoverIntent",j),1==d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){l(c,d)},e.timeout)))};return this.on({"mouseenter.hoverIntent":m,"mouseleave.hoverIntent":m},e.selector)}}(jQuery),jQuery(document).ready(function(a){var b,c,d,e=a("#wpadminbar"),f=!1;b=function(b,c){var d=a(c),e=d.attr("tabindex");e&&d.attr("tabindex","0").attr("tabindex",e)},c=function(b){e.find("li.menupop").on("click.wp-mobile-hover",function(c){var d=a(this);d.parent().is("#wp-admin-bar-root-default")&&!d.hasClass("hover")?(c.preventDefault(),e.find("li.menupop.hover").removeClass("hover"),d.addClass("hover")):d.hasClass("hover")||(c.stopPropagation(),c.preventDefault(),d.addClass("hover")),b&&(a("li.menupop").off("click.wp-mobile-hover"),f=!1)})},d=function(){var b=/Mobile\/.+Safari/.test(navigator.userAgent)?"touchstart":"click";a(document.body).on(b+".wp-mobile-hover",function(b){a(b.target).closest("#wpadminbar").length||e.find("li.menupop.hover").removeClass("hover")})},e.removeClass("nojq").removeClass("nojs"),"ontouchstart"in window?(e.on("touchstart",function(){c(!0),f=!0}),d()):/IEMobile\/[1-9]/.test(navigator.userAgent)&&(c(),d()),e.find("li.menupop").hoverIntent({over:function(){f||a(this).addClass("hover")},out:function(){f||a(this).removeClass("hover")},timeout:180,sensitivity:7,interval:100}),window.location.hash&&window.scrollBy(0,-32),a("#wp-admin-bar-get-shortlink").click(function(b){b.preventDefault(),a(this).addClass("selected").children(".shortlink-input").blur(function(){a(this).parents("#wp-admin-bar-get-shortlink").removeClass("selected")}).focus().select()}),a("#wpadminbar li.menupop > .ab-item").bind("keydown.adminbar",function(c){if(13==c.which){var d=a(c.target),e=d.closest("ab-sub-wrapper");c.stopPropagation(),c.preventDefault(),e.length||(e=a("#wpadminbar .quicklinks")),e.find(".menupop").removeClass("hover"),d.parent().toggleClass("hover"),d.siblings(".ab-sub-wrapper").find(".ab-item").each(b)}}).each(b),a("#wpadminbar .ab-item").bind("keydown.adminbar",function(c){if(27==c.which){var d=a(c.target);c.stopPropagation(),c.preventDefault(),d.closest(".hover").removeClass("hover").children(".ab-item").focus(),d.siblings(".ab-sub-wrapper").find(".ab-item").each(b)}}),a("#wpadminbar").click(function(b){("wpadminbar"==b.target.id||"wp-admin-bar-top-secondary"==b.target.id)&&(b.preventDefault(),a("html, body").animate({scrollTop:0},"fast"))}),a(".screen-reader-shortcut").keydown(function(b){var c,d;13==b.which&&(c=a(this).attr("href"),d=navigator.userAgent.toLowerCase(),-1!=d.indexOf("applewebkit")&&c&&"#"==c.charAt(0)&&setTimeout(function(){a(c).focus()},100))}),"sessionStorage"in window&&a("#wp-admin-bar-logout a").click(function(){try{for(var a in sessionStorage)-1!=a.indexOf("wp-autosave-")&&sessionStorage.removeItem(a)}catch(b){}}),navigator.userAgent&&-1===document.body.className.indexOf("no-font-face")&&/Android (1.0|1.1|1.5|1.6|2.0|2.1)|Nokia|Opera Mini|w(eb)?OSBrowser|webOS|UCWEB|Windows Phone OS 7|XBLWP7|ZuneWP7|MSIE 7/.test(navigator.userAgent)&&(document.body.className+=" no-font-face")})):!function(a,b){var c,d=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,function(){return c.call(a,window.event)})},e=new RegExp("\\bhover\\b","g"),f=[],g=new RegExp("\\bselected\\b","g"),h=function(a){for(var b=f.length;b--;)if(f[b]&&a==f[b][1])return f[b][0];return!1},i=function(b){for(var d,i,j,k,l,m,n=[],o=0;b&&b!=c&&b!=a;)"LI"==b.nodeName.toUpperCase()&&(n[n.length]=b,i=h(b),i&&clearTimeout(i),b.className=b.className?b.className.replace(e,"")+" hover":"hover",k=b),b=b.parentNode;if(k&&k.parentNode&&(l=k.parentNode,l&&"UL"==l.nodeName.toUpperCase()))for(d=l.childNodes.length;d--;)m=l.childNodes[d],m!=k&&(m.className=m.className?m.className.replace(g,""):"");for(d=f.length;d--;){for(j=!1,o=n.length;o--;)n[o]==f[d][1]&&(j=!0);j||(f[d][1].className=f[d][1].className?f[d][1].className.replace(e,""):"")}},j=function(b){for(;b&&b!=c&&b!=a;)"LI"==b.nodeName.toUpperCase()&&!function(a){var b=setTimeout(function(){a.className=a.className?a.className.replace(e,""):""},500);f[f.length]=[b,a]}(b),b=b.parentNode},k=function(b){for(var d,e,f,h=b.target||b.srcElement;;){if(!h||h==a||h==c)return;if(h.id&&"wp-admin-bar-get-shortlink"==h.id)break;h=h.parentNode}for(b.preventDefault&&b.preventDefault(),b.returnValue=!1,-1==h.className.indexOf("selected")&&(h.className+=" selected"),d=0,e=h.childNodes.length;e>d;d++)if(f=h.childNodes[d],f.className&&-1!=f.className.indexOf("shortlink-input")){f.focus(),f.select(),f.onblur=function(){h.className=h.className?h.className.replace(g,""):""};break}return!1},l=function(a){var b,c,d,e,f,g;if(!("wpadminbar"!=a.id&&"wp-admin-bar-top-secondary"!=a.id||(b=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,1>b)))for(g=b>800?130:100,c=Math.min(12,Math.round(b/g)),d=Math.round(b>800?b/30:b/20),e=[],f=0;b;)b-=d,0>b&&(b=0),e.push(b),setTimeout(function(){window.scrollTo(0,e.shift())},f*c),f++};d(b,"load",function(){c=a.getElementById("wpadminbar"),a.body&&c&&(a.body.appendChild(c),c.className&&(c.className=c.className.replace(/nojs/,"")),d(c,"mouseover",function(a){i(a.target||a.srcElement)}),d(c,"mouseout",function(a){j(a.target||a.srcElement)}),d(c,"click",k),d(c,"click",function(a){l(a.target||a.srcElement)}),d(document.getElementById("wp-admin-bar-logout"),"click",function(){if("sessionStorage"in window)try{for(var a in sessionStorage)-1!=a.indexOf("wp-autosave-")&&sessionStorage.removeItem(a)}catch(b){}})),b.location.hash&&b.scrollBy(0,-32),navigator.userAgent&&-1===document.body.className.indexOf("no-font-face")&&/Android (1.0|1.1|1.5|1.6|2.0|2.1)|Nokia|Opera Mini|w(eb)?OSBrowser|webOS|UCWEB|Windows Phone OS 7|XBLWP7|ZuneWP7|MSIE 7/.test(navigator.userAgent)&&(document.body.className+=" no-font-face")})}(document,window);
/**
 * Attempt to re-color SVG icons used in the admin menu or the toolbar
 *
 */

window.wp = window.wp || {};

wp.svgPainter = ( function( $, window, document, undefined ) {
	'use strict';
	var selector, base64, painter,
		colorscheme = {},
		elements = [];

	$(document).ready( function() {
		// detection for browser SVG capability
		if ( document.implementation.hasFeature( 'http://www.w3.org/TR/SVG11/feature#Image', '1.1' ) ) {
			$( document.body ).removeClass( 'no-svg' ).addClass( 'svg' );
			wp.svgPainter.init();
		}
	});

	/**
	 * Needed only for IE9
	 *
	 * Based on jquery.base64.js 0.0.3 - https://github.com/yckart/jquery.base64.js
	 *
	 * Based on: https://gist.github.com/Yaffle/1284012
	 *
	 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
	 * Licensed under the MIT license
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	base64 = ( function() {
		var c,
			b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
			a256 = '',
			r64 = [256],
			r256 = [256],
			i = 0;

		function init() {
			while( i < 256 ) {
				c = String.fromCharCode(i);
				a256 += c;
				r256[i] = i;
				r64[i] = b64.indexOf(c);
				++i;
			}
		}

		function code( s, discard, alpha, beta, w1, w2 ) {
			var tmp, length,
				buffer = 0,
				i = 0,
				result = '',
				bitsInBuffer = 0;

			s = String(s);
			length = s.length;

			while( i < length ) {
				c = s.charCodeAt(i);
				c = c < 256 ? alpha[c] : -1;

				buffer = ( buffer << w1 ) + c;
				bitsInBuffer += w1;

				while( bitsInBuffer >= w2 ) {
					bitsInBuffer -= w2;
					tmp = buffer >> bitsInBuffer;
					result += beta.charAt(tmp);
					buffer ^= tmp << bitsInBuffer;
				}
				++i;
			}

			if ( ! discard && bitsInBuffer > 0 ) {
				result += beta.charAt( buffer << ( w2 - bitsInBuffer ) );
			}

			return result;
		}

		function btoa( plain ) {
			if ( ! c ) {
				init();
			}

			plain = code( plain, false, r256, b64, 8, 6 );
			return plain + '===='.slice( ( plain.length % 4 ) || 4 );
		}

		function atob( coded ) {
			var i;

			if ( ! c ) {
				init();
			}

			coded = coded.replace( /[^A-Za-z0-9\+\/\=]/g, '' );
			coded = String(coded).split('=');
			i = coded.length;

			do {
				--i;
				coded[i] = code( coded[i], true, r64, a256, 6, 8 );
			} while ( i > 0 );

			coded = coded.join('');
			return coded;
		}

		return {
			atob: atob,
			btoa: btoa
		};
	})();

	return {
		init: function() {
			painter = this;
			selector = $( '#adminmenu .wp-menu-image, #wpadminbar .ab-item' );

			this.setColors();
			this.findElements();
			this.paint();
		},

		setColors: function( colors ) {
			if ( typeof colors === 'undefined' && typeof window._wpColorScheme !== 'undefined' ) {
				colors = window._wpColorScheme;
			}

			if ( colors && colors.icons && colors.icons.base && colors.icons.current && colors.icons.focus ) {
				colorscheme = colors.icons;
			}
		},

		findElements: function() {
			selector.each( function() {
				var $this = $(this), bgImage = $this.css( 'background-image' );

				if ( bgImage && bgImage.indexOf( 'data:image/svg+xml;base64' ) != -1 ) {
					elements.push( $this );
				}
			});
		},

		paint: function() {
			// loop through all elements
			$.each( elements, function( index, $element ) {
				var $menuitem = $element.parent().parent();

				if ( $menuitem.hasClass( 'current' ) || $menuitem.hasClass( 'wp-has-current-submenu' ) ) {
					// paint icon in 'current' color
					painter.paintElement( $element, 'current' );
				} else {
					// paint icon in base color
					painter.paintElement( $element, 'base' );

					// set hover callbacks
					$menuitem.hover(
						function() {
							painter.paintElement( $element, 'focus' );
						},
						function() {
							// Match the delay from hoverIntent
							window.setTimeout( function() {
								painter.paintElement( $element, 'base' );
							}, 100 );
						}
					);
				}
			});
		},

		paintElement: function( $element, colorType ) {
			var xml, encoded, color;

			if ( ! colorType || ! colorscheme.hasOwnProperty( colorType ) ) {
				return;
			}

			color = colorscheme[ colorType ];

			// only accept hex colors: #101 or #101010
			if ( ! color.match( /^(#[0-9a-f]{3}|#[0-9a-f]{6})$/i ) ) {
				return;
			}

			xml = $element.data( 'wp-ui-svg-' + color );

			if ( xml === 'none' ) {
				return;
			}

			if ( ! xml ) {
				encoded = $element.css( 'background-image' ).match( /.+data:image\/svg\+xml;base64,([A-Za-z0-9\+\/\=]+)/ );

				if ( ! encoded || ! encoded[1] ) {
					$element.data( 'wp-ui-svg-' + color, 'none' );
					return;
				}

				try {
					if ( 'atob' in window ) {
						xml = window.atob( encoded[1] );
					} else {
						xml = base64.atob( encoded[1] );
					}
				} catch ( error ) {}

				if ( xml ) {
					// replace `fill` attributes
					xml = xml.replace( /fill="(.+?)"/g, 'fill="' + color + '"');

					// replace `style` attributes
					xml = xml.replace( /style="(.+?)"/g, 'style="fill:' + color + '"');

					// replace `fill` properties in `<style>` tags
					xml = xml.replace( /fill:.*?;/g, 'fill: ' + color + ';');

					if ( 'btoa' in window ) {
						xml = window.btoa( xml );
					} else {
						xml = base64.btoa( xml );
					}

					$element.data( 'wp-ui-svg-' + color, xml );
				} else {
					$element.data( 'wp-ui-svg-' + color, 'none' );
					return;
				}
			}

			$element.attr( 'style', 'background-image: url("data:image/svg+xml;base64,' + xml + '") !important;' );
		}
	};

})( jQuery, window, document );

!function(a,b,c){var d=function(){function d(){var c,d,f,h;"string"==typeof b.pagenow&&(z.screenId=b.pagenow),"string"==typeof b.ajaxurl&&(z.url=b.ajaxurl),"object"==typeof b.heartbeatSettings&&(c=b.heartbeatSettings,!z.url&&c.ajaxurl&&(z.url=c.ajaxurl),c.interval&&(z.mainInterval=c.interval,z.mainInterval<15?z.mainInterval=15:z.mainInterval>120&&(z.mainInterval=120)),c.minimalInterval&&(c.minimalInterval=parseInt(c.minimalInterval,10),z.minimalInterval=c.minimalInterval>0&&c.minimalInterval<=600?1e3*c.minimalInterval:0),z.minimalInterval&&z.mainInterval<z.minimalInterval&&(z.mainInterval=z.minimalInterval),z.screenId||(z.screenId=c.screenId||"front"),"disable"===c.suspension&&(z.suspendEnabled=!1)),z.mainInterval=1e3*z.mainInterval,z.originalInterval=z.mainInterval,"undefined"!=typeof document.hidden?(d="hidden",h="visibilitychange",f="visibilityState"):"undefined"!=typeof document.msHidden?(d="msHidden",h="msvisibilitychange",f="msVisibilityState"):"undefined"!=typeof document.webkitHidden&&(d="webkitHidden",h="webkitvisibilitychange",f="webkitVisibilityState"),d&&(document[d]&&(z.hasFocus=!1),y.on(h+".wp-heartbeat",function(){"hidden"===document[f]?(l(),b.clearInterval(z.checkFocusTimer)):(m(),document.hasFocus&&(z.checkFocusTimer=b.setInterval(g,1e4)))})),document.hasFocus&&(z.checkFocusTimer=b.setInterval(g,1e4)),a(b).on("unload.wp-heartbeat",function(){z.suspend=!0,z.xhr&&4!==z.xhr.readyState&&z.xhr.abort()}),b.setInterval(o,3e4),y.ready(function(){z.lastTick=e(),k()})}function e(){return(new Date).getTime()}function f(a){var c,d=a.src;if(d&&/^https?:\/\//.test(d)&&(c=b.location.origin?b.location.origin:b.location.protocol+"//"+b.location.host,0!==d.indexOf(c)))return!1;try{if(a.contentWindow.document)return!0}catch(e){}return!1}function g(){z.hasFocus&&!document.hasFocus()?l():!z.hasFocus&&document.hasFocus()&&m()}function h(a,b){var c;if(a){switch(a){case"abort":break;case"timeout":c=!0;break;case"error":if(503===b&&z.hasConnected){c=!0;break}case"parsererror":case"empty":case"unknown":z.errorcount++,z.errorcount>2&&z.hasConnected&&(c=!0)}c&&!q()&&(z.connectionError=!0,y.trigger("heartbeat-connection-lost",[a,b]))}}function i(){z.hasConnected=!0,q()&&(z.errorcount=0,z.connectionError=!1,y.trigger("heartbeat-connection-restored"))}function j(){var c,d;z.connecting||z.suspend||(z.lastTick=e(),d=a.extend({},z.queue),z.queue={},y.trigger("heartbeat-send",[d]),c={data:d,interval:z.tempInterval?z.tempInterval/1e3:z.mainInterval/1e3,_nonce:"object"==typeof b.heartbeatSettings?b.heartbeatSettings.nonce:"",action:"heartbeat",screen_id:z.screenId,has_focus:z.hasFocus},z.connecting=!0,z.xhr=a.ajax({url:z.url,type:"post",timeout:3e4,data:c,dataType:"json"}).always(function(){z.connecting=!1,k()}).done(function(a,b,c){var d;return a?(i(),a.nonces_expired?void y.trigger("heartbeat-nonces-expired"):(a.heartbeat_interval&&(d=a.heartbeat_interval,delete a.heartbeat_interval),y.trigger("heartbeat-tick",[a,b,c]),void(d&&t(d)))):void h("empty")}).fail(function(a,b,c){h(b||"unknown",a.status),y.trigger("heartbeat-error",[a,b,c])}))}function k(){var a=e()-z.lastTick,c=z.mainInterval;z.suspend||(z.hasFocus?z.countdown>0&&z.tempInterval&&(c=z.tempInterval,z.countdown--,z.countdown<1&&(z.tempInterval=0)):c=12e4,z.minimalInterval&&c<z.minimalInterval&&(c=z.minimalInterval),b.clearTimeout(z.beatTimer),c>a?z.beatTimer=b.setTimeout(function(){j()},c-a):j())}function l(){z.hasFocus=!1}function m(){z.userActivity=e(),z.suspend=!1,z.hasFocus||(z.hasFocus=!0,k())}function n(){z.userActivityEvents=!1,y.off(".wp-heartbeat-active"),a("iframe").each(function(b,c){f(c)&&a(c.contentWindow).off(".wp-heartbeat-active")}),m()}function o(){var b=z.userActivity?e()-z.userActivity:0;b>3e5&&z.hasFocus&&l(),(z.suspendEnabled&&b>6e5||b>36e5)&&(z.suspend=!0),z.userActivityEvents||(y.on("mouseover.wp-heartbeat-active keyup.wp-heartbeat-active touchend.wp-heartbeat-active",function(){n()}),a("iframe").each(function(b,c){f(c)&&a(c.contentWindow).on("mouseover.wp-heartbeat-active keyup.wp-heartbeat-active touchend.wp-heartbeat-active",function(){n()})}),z.userActivityEvents=!0)}function p(){return z.hasFocus}function q(){return z.connectionError}function r(){z.lastTick=0,k()}function s(){z.suspendEnabled=!1}function t(a,b){var c,d=z.tempInterval?z.tempInterval:z.mainInterval;if(a){switch(a){case"fast":case 5:c=5e3;break;case 15:c=15e3;break;case 30:c=3e4;break;case 60:c=6e4;break;case 120:c=12e4;break;case"long-polling":return z.mainInterval=0,0;default:c=z.originalInterval}z.minimalInterval&&c<z.minimalInterval&&(c=z.minimalInterval),5e3===c?(b=parseInt(b,10)||30,b=1>b||b>30?30:b,z.countdown=b,z.tempInterval=c):(z.countdown=0,z.tempInterval=0,z.mainInterval=c),c!==d&&k()}return z.tempInterval?z.tempInterval/1e3:z.mainInterval/1e3}function u(a,b,c){return a?c&&this.isQueued(a)?!1:(z.queue[a]=b,!0):!1}function v(a){return a?z.queue.hasOwnProperty(a):void 0}function w(a){a&&delete z.queue[a]}function x(a){return a?this.isQueued(a)?z.queue[a]:c:void 0}var y=a(document),z={suspend:!1,suspendEnabled:!0,screenId:"",url:"",lastTick:0,queue:{},mainInterval:60,tempInterval:0,originalInterval:0,minimalInterval:0,countdown:0,connecting:!1,connectionError:!1,errorcount:0,hasConnected:!1,hasFocus:!0,userActivity:0,userActivityEvents:!1,checkFocusTimer:0,beatTimer:0};return d(),{hasFocus:p,connectNow:r,disableSuspend:s,interval:t,hasConnectionError:q,enqueue:u,dequeue:w,isQueued:v,getQueuedItem:x}};b.wp=b.wp||{},b.wp.heartbeat=new d}(jQuery,window);
!function(a){function b(){var b,d=a("#wp-auth-check"),f=a("#wp-auth-check-form"),g=e.find(".wp-auth-fallback-expired"),h=!1;f.length&&(a(window).on("beforeunload.wp-auth-check",function(a){a.originalEvent.returnValue=window.authcheckL10n.beforeunload}),b=a('<iframe id="wp-auth-check-frame" frameborder="0">').attr("title",g.text()),b.load(function(){var b,i;h=!0;try{i=a(this).contents().find("body"),b=i.height()}catch(j){return e.addClass("fallback"),d.css("max-height",""),f.remove(),void g.focus()}b?i&&i.hasClass("interim-login-success")?c():d.css("max-height",b+40+"px"):i&&i.length||(e.addClass("fallback"),d.css("max-height",""),f.remove(),g.focus())}).attr("src",f.data("src")),a("#wp-auth-check-form").append(b)),e.removeClass("hidden"),b?(b.focus(),setTimeout(function(){h||(e.addClass("fallback"),f.remove(),g.focus())},1e4)):g.focus()}function c(){a(window).off("beforeunload.wp-auth-check"),"undefined"==typeof adminpage||"post-php"!==adminpage&&"post-new-php"!==adminpage||"undefined"==typeof wp||!wp.heartbeat||wp.heartbeat.connectNow(),e.fadeOut(200,function(){e.addClass("hidden").css("display",""),a("#wp-auth-check-frame").remove()})}function d(){var a=parseInt(window.authcheckL10n.interval,10)||180;f=(new Date).getTime()+1e3*a}var e,f;a(document).on("heartbeat-tick.wp-auth-check",function(a,f){"wp-auth-check"in f&&(d(),!f["wp-auth-check"]&&e.hasClass("hidden")?b():f["wp-auth-check"]&&!e.hasClass("hidden")&&c())}).on("heartbeat-send.wp-auth-check",function(a,b){(new Date).getTime()>f&&(b["wp-auth-check"]=!0)}).ready(function(){d(),e=a("#wp-auth-check-wrap"),e.find(".wp-auth-check-close").on("click",function(){c()})})}(jQuery);
