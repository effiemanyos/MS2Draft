$(document).ready(function () {
    $(".btn-group .btn").click(function () {
        var inputValue = $(this).find("input").val();
        if (inputValue != 'all') {
            var target = $('table tr[data-status="' + inputValue + '"]');
            $("table tbody tr").not(target).hide();
            target.fadeIn();
        } else {
            $("table tbody tr").fadeIn();
        }
    });
    // Changeing the class of status label to support bootstrap 4
    var bs = $.fn.tooltip.Constructor.VERSION;
    var support = bs.split(".");
    if (str[0] == 4) {
        $(".label").each(function () {
            var classStr = $(this).attr("class");
            var newClassStr = classStr.replace(/label/g, "badge");
            $(this).removeAttr("class").addClass(newClassStr);
        });
    }
});