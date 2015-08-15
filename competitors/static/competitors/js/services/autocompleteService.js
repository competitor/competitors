competitorsApp.service('autocompleteService', function() {
	$(".cp-search-tp").autocomplete({
		    source: "/api/autocomplete/",
		    minLength: 3,
		    autoFill: true,
		    mustMatch: true,
		    matchContains: true,
		    scrollHeight: 220,
	}); 

});