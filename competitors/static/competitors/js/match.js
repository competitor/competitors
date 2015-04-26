$("#match_comments textarea").attr("rows","2");
// var exist = 0;
// if ($(".match_comments_item"))
// 	exist = $(".match_comments_item:first-child").attr("value")
// console.log(exist)
// if (typeof(exist)=="undefined")
// 	exist = 0;
// console.log(exist)
function addlivecomments(){
	var exist = 0;
	if ($(".match_comments_item").length>0){
		exist = $(".match_comments_item:first-child").attr("value");
		console.log($(".match_comments_item:first-child"));
	}
	console.log(exist)
	var content = $("#id_content").val();
	var token = $("[name=csrfmiddlewaretoken]").val();
	console.log(token);
	var id = $("#matchid").val()
	$.ajax({
		type: 'POST',
		url: "/addlivecomments/"+id,
		data:"data="+content+"&exist="+exist+"&csrfmiddlewaretoken="+token,
		dataType : "json",
		success: function(items) {
			$(items).each(function(){
			var d=new Date(this.fields.time).toLocaleString('en-us',{year: 'numeric', month: 'long', day: 'numeric', hour:'numeric',minute:'numeric',hour12:true}).replace('AM','a.m.').replace('PM','p.m.');
			$("#match_commentsarea").prepend('<div class="panel match_comments_item" value=\"'+this.pk+'\"><p><a href="/see_profile/'+this.fields.user+'">'+this.fields.user+'</a>:'+this.fields.content+'</p><p>'+d+'</p></div>');
		})
	    
		}
	})

}

window.setInterval(getlivecomments,5000);
window.setInterval(getliveevents,5000);
window.setInterval(getlivescore,5000);


function getliveevents(){
	var id = $("#matchid").val()
	var exist = 0;
	if ($(".match_event").length>0){
		exist = $(".match_event:first-child").attr("value");
	}
	var token = $("[name=csrfmiddlewaretoken]").val();
		$.ajax({
			type: "POST",
	        url: "/getliveevents/"+id,
	        data: "exist="+exist+"&csrfmiddlewaretoken="+token,
	        dataType : "json",
	        success: function( items ) {
	            $(items).each(function() {            
					$("#match_events").prepend('<div class="panel match_event" value="'+this.pk+'"><h5>'+this.fields.content+'</h5><h5>'+this.fields.time+'</h5></div>')
	            });
	        }
	    });
}

function getlivecomments(){
	var id = $("#matchid").val()
	var exist = 0;
	if ($(".match_comments_item").length>0){
		exist = $(".match_comments_item:first-child").attr("value");
	}
	var token = $("[name=csrfmiddlewaretoken]").val();
		$.ajax({
			type: "POST",
	        url: "/getlivecomments/"+id,
	        data: "exist="+exist+"&csrfmiddlewaretoken="+token,
	        dataType : "json",
	        success: function( items ) {
	            $(items).each(function() {            
					var d=new Date(this.fields.time).toLocaleString('en-us',{year: 'numeric', month: 'long', day: 'numeric', hour:'numeric',minute:'numeric',hour12:true}).replace('AM','a.m.').replace('PM','p.m.');
					$("#match_commentsarea").prepend('<div class="panel match_comments_item" value=\"'+this.pk+'\"><p><a href="/see_profile/'+this.fields.user+'">'+this.fields.user+'</a>:'+this.fields.content+'</p><p>'+d+'</p></div>');
	            });
	        }
	    });
}

function getlivescore(){
	var id = $("#matchid").val()
	var token = $("[name=csrfmiddlewaretoken]").val();
		$.ajax({
			type: "GET",
	        url: "/getlivescore/"+id,
	        // data: "exist="+exist+"&csrfmiddlewaretoken="+token,
	        success: function( items ) {
	        	$('#match_head h2').text(items)
	        }
	    });
}
