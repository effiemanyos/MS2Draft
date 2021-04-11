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
    // Deletes tasks once they are clicked (completed) = CHANGE IT TO LINE-THROUGH EFFECT 
    // https://stackoverflow.com/questions/36459824/strike-through-on-specific-list-item-jquery
    $("input[type=checkbox").click(function () {
        $(this).closest("li").slideUp(function () {
            $(this).remove();
        });
    })
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
                    // Allows having spaces in the project name + adding new tasks in those projects
                    var replaceName = projectName.split(" ").join("_");
                    $("<li><a href='#" + replaceName + "'>" + projectName + "</a></li>").appendTo("#main");
                    $("<ol id='" + replaceName + "'></ol>").appendTo("#projects").sortable();
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