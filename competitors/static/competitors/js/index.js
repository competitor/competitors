$(function() {
  	$("#search").autocomplete({
    source: "/search_autocomplete/",
    minLength: 2,
    autoFill: true,
    mustMatch: true,
    matchContains: true,
    scrollHeight: 220,
  });
});

$(".player-box").each(function(){
	var index = $(".player-box").index($(this));
	if (index % 2==0){
		console.log(index);
		$(this).after("<div class=\"col-sm-2\"></div>")
	}
})




