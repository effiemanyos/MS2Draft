$(document).ready(function () {
    $("#projects").tabs();
    $("ul").sortable({
        axis: "x",
        containment: "#projects"
    });
    $("ol").sortable({
        axis: "y",
        containment: "#projects"
    });
    $("#btnAddProject").click(function () {
        $("#project-dialog").dialog({
            width: 400,
            resizable: false,
            modal: true,
            buttons: {
                "Add New Project": function () {
                    var projectName = $("#new-project").val();
                    $("<li><a href='#" + projectName + "'>" + projectName + "</a></li>").appendTo("#main");
                    $("<ol id='" + projectName + "'></ol>").appendTo("#projects")
                    $("#projects").tabs("refresh");
                    var tabCount = $("#projects .ui-tabs-nav li").length;
                    $("#projects").tabs("option", "active", tabCount - 1);
                    $("#new-project").val("");
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $("#new-project").val("");
                    $(this).dialog("close");
                }
            }
        });
    });
});