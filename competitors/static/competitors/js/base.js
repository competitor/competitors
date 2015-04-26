$(function() {
  	$("#nav_search").autocomplete({
    source: "/search_autocomplete/",
    minLength: 2,
    autoFill: true,
    mustMatch: true,
    matchContains: true,
    scrollHeight: 220,
  });
});