$("#id_content").addClass("form-control")
$("#id_content").attr("rows",'3')
$("label").addClass("sr-only")
function deleteit(id){
	if(confirm("Are you sure you want to delete this comment?")){
		var token = $("input[name=csrfmiddlewaretoken]").val();
		var next = $("input[name=redirect]").val();
		$.ajax({                                                                                                                           
		     type:"POST",                                                                                                                    
		     url: "/delete_comment/"+id,                                                                                                    
		     data: {'csrfmiddlewaretoken': token},                                                                                     
		     success: function(response){                                                                      
					window.location.replace(next)                                                                                                
		     },                                                                                                                              
		     error: function(response){
		      	window.location.replace(next) 
		  	}, 
		 });  
	}

}


var pagesize = 30;
$('#comment_body').twbsPagination({
        totalPages: Math.ceil(parseInt($("#totalposts").attr("value"))/pagesize),
        visiblePages: 7,
        startPage:parseInt($("#page").attr("value")),
        onPageClick: function (event, page) {
            window.location.replace(next+"?&page="+page);
        }
});