$("#id_title").addClass("form-control")
$("#id_title").attr("placeholder",'Title Here')
$("#id_title").prop("required")
$("textarea").addClass("form-control")
$("form div").css("margin-left","0")

$("label").addClass("sr-only")

CKEDITOR.stylesSet.add( 'style_updates', [
    // ATTEMPT 1
    // Block-level styles...this is for the dropdown menu (not shown in current config)
    { name: 'Body Margin Fix', element: 'body', styles: { margin: '10000px' } }
]);
$(".cke_editable_themed").css("background","red")