$(function() {
  	$("#search").autocomplete({
    source: "api/autocomplete/",
    minLength: 3,
    autoFill: true,
    mustMatch: true,
    matchContains: true,
    scrollHeight: 220,
  });
});

$(".player-box").each(function(){
	var index = $(".player-box").index($(this));
	// console.log(index)
	if (index % 2==0){
		// console.log(index);
		$(this).after("<div class=\"col-sm-2\"></div>")
	}
})




