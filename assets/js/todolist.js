$(document).ready(function () {
    $("input[type=checkbox]").removeAttr("checked"); // Removes checks from checkboxes
    $("#projects").tabs();
    $("ul").sortable({
        axis: "x",
        containment: "#projects"
    });
    $("ol").sortable({
        axis: "y",
        containment: "#projects"
    });
    // Deletes tasks once they are clicked on dinamically added elements
    // Event delegation (delegating responsibility)
    $("#projects").on("click", ".tasks-delete", function () {
        $(this).closest("li").slideUp(function () {
            $(this).remove();
        });
    });
    // Event delegatiion - for new tasks implementation
    $("#projects").on("click", "input[type=checkbox]", function () {
        $(this).next().toggleClass("checked");
    });
    // Deletes project tabs and its respective tasks
    $("#projects").on("click", "span.ui-icon-close", function () {
        var index = $(this).closest("li").index();
        var id = $("#main li:eq(" + index + ") a").attr("href");
        $("#main li:eq(" + index + ")").remove();
        $(id).remove();
        $("#projects").tabs("refresh");
    });
    // Add tasks button
    $("#btnAddTask").click(function () {
        $("#task-dialog").dialog({
            width: 400,
            resizable: false,
            modal: true,
            buttons: {
                "Add New Book": function () {
                    $("#projects").tabs("refresh");
                    var activeTab = $("#projects").tabs("option", "active");
                    var title = $("#main > li:nth-child(" + (activeTab + 1) + ") > a").attr("href");
                    $("#projects " + title).append("<li> <input class='checkbox' type='checkbox'>" + "<span class='task-text'><i class='book-icon fa fa-book'></i>" + $("#new-task").val() + "</span>" + "<span><button class='tasks-delete'><i class='fa fa-trash'></i></button><button class='tasks-edit'><i class='fa fa-pencil'></i></button></span></li>");
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
    // Add project button
    $("#btnAddProject").click(function () {
        $("#project-dialog").dialog({
            width: 400,
            resizable: false,
            modal: true,
            buttons: {
                "Add New Category": function () {
                    var projectName = $("#new-project").val();
                    // Allows having spaces in the project name + adding new tasks in those projects
                    var replaceName = projectName.split(" ").join("_");
                    $("<li><a href='#" + replaceName + "'>" + projectName + "</a><span class='ui-icon ui-icon-close'></span></li>").appendTo("#main");
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