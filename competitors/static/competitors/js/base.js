$(function() {
  	$("#nav_search").autocomplete({
    source: "api/autocomplete/",
    minLength: 2,
    autoFill: true,
    mustMatch: true,
    matchContains: true,
    scrollHeight: 220,
  });
});