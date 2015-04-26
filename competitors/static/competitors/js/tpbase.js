$("#id_title").attr('placeholder','Post Title').prop("required","true")
$("#id_content").attr('placeholder','Post Content').prop("required","true")
$( "#tabs" ).tabs({
  active: $("#cid").val()
});

$('#tabs').tabs({
    activate: function(event ,ui){
    	// window.location.replace()
		var next = $("[name='redirect']").val();
		console.log(next);
    	history.pushState(null, "A new title!", 'http://localhost:8000'+next+'?cid='+ui.newTab.index())
    }
});

function deleteit(id){
	if(confirm("Are you sure you want to delete this comment?")){
		var token = $("input[name=csrfmiddlewaretoken]").val();
		var next = $("input[name=redirect]").val();
		$.ajax({                                                                                                                           
		     type:"POST",                                                                                                                    
		     url: "/delete_post/"+id,                                                                                                    
		     data: {'csrfmiddlewaretoken': token},                                                                                     
		     success: function(response){                                                                      
					window.location.replace(next+"?cid=3")                                                                                                
		     },                                                                                                                              
		     error: function(response){
		      	window.location.replace(next+"?cid=3") 
		  	}, 
		 });  
	}

}
var pagesize = 5;
$('#forum-posts').twbsPagination({
        totalPages: Math.ceil(parseInt($("#totalposts").attr("value"))/pagesize),
        visiblePages: 7,
        startPage:parseInt($("#page").attr("value")),
        onPageClick: function (event, page) {
            window.location.replace(next+"?cid=3&page="+page);
        }
});