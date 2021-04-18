$(document).ready(function () {
    $("input[type=checkbox]").removeAttr("checked"); // Removes checks from checkboxes
    $("#categories").tabs();
    $("ul").sortable({
        axis: "x",
        containment: "#categories"
    });
    $("ol").sortable({
        axis: "y",
        containment: "#categories"
    });
    // Deletes tasks once they are clicked on dinamically added elements
    // Event delegation (delegating responsibility)
    $("#categories").on("click", ".tasks-delete", function () {
        $(this).closest("li").slideUp(function () {
            $(this).remove();
        });
    });
    // Event delegatiion - for new tasks implementation
    $("#categories").on("click", "input[type=checkbox]", function () {
        $(this).next().toggleClass("checked");
    });
    // Deletes category tabs and its respective tasks
    $("#categories").on("click", "span.ui-icon-close", function () {
        var index = $(this).closest("li").index();
        var id = $("#main li:eq(" + index + ") a").attr("href");
        $("#main li:eq(" + index + ")").remove();
        $(id).remove();
        $("#categories").tabs("refresh");
    });
    // Add tasks button
    $("#btnAddTask").click(function () {
        $("#task-dialog").dialog({
            width: 400,
            resizable: false,
            modal: true,
            buttons: {
                "Add New Task": function () {
                    $("#categories").tabs("refresh");
                    var activeTab = $("#categories").tabs("option", "active");
                    var title = $("#main > li:nth-child(" + (activeTab + 1) + ") > a").attr("href");
                    $("#categories" + title).append("<li> <input class='checkbox' type='checkbox'>" + "<span class='task-text'><i class='book-icon fa fa-book'></i>" + $("#new-task").val() + "</span>" + "<span><button class='tasks-delete'><i class='fa fa-trash'></i></button><button class='tasks-edit'><i class='fa fa-pencil'></i></button></span></li>");
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
    // Add category button
    $("#btnAddCategory").click(function () {
        $("#category-dialog").dialog({
            width: 400,
            resizable: false,
            modal: true,
            buttons: {
                "Add New Category": function () {
                    var categoryName = $("#new-category").val();
                    // Allows having spaces in the category name + adding new tasks in those categories
                    var replaceName = categoryName.split(" ").join("_");
                    $("<li><a href='#" + replaceName + "'>" + categoryName + "</a><span class='ui-icon ui-icon-close'></span></li>").appendTo("#main");
                    $("<ol id='" + replaceName + "'></ol>").appendTo("#categories").sortable();
                    $("#categories").tabs("refresh");
                    var tabCount = $("#categories .ui-tabs-nav li").length;
                    $("#categories").tabs("option", "active", tabCount - 1);
                    $("#new-category").val("");
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $("#new-category").val("");
                    $(this).dialog("close");
                }
            }
        });
    });
});