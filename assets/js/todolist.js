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
    $("#btnAddTask").click(function () {
        $("#task-dialog").dialog({
            width: 400,
            resizable: false,
            modal: true,
            buttons: {
                "Add New Task": function () {
                    $("#projects").tabs("refresh");
                    var activeTab = $("#projects").tabs("option", "active");
                    var title = $("#main > li:nth-child(" + (activeTab + 1) + ") > a").attr("href");
                    $("#projects " + title).append("<li> <input type='checkbox'>" + $("#new-task").val() + "</li>");
                    $("#new-task").val("");
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $("#new-task").val("");
                    $(this).dialog("close");
                }
            }
        });
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