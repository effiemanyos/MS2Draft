$(document).ready(function () {
    var item, title, author, publisher, booklink, bookImg;
    var outputList = document.getElementById("list-output");
    var bookURL = "https://www.googleapis.com/books/v1/volumes?q="
    var placeHolder = ""
    var searchData;

    // Event listener for search button
    $("#search-button").click(function () {
        outputList.innerHTML = ""
        searchData = $("#search-box").val();

        // Handeling empty search input field
        if (searchData === "" || searchData === null) {
            displayError();
        } else {
            $.ajax({
                url: bookURL + searchData
                dataType: "json",
                success: function (res) {
                    console.log(res)
                    if (response.totalItem === 0) {
                        alert("There are no results... Please try again!");
                    } else {
                        $("#book-title").animate({
                            'margin-top': '5px'
                        }, 1000); // Search box animation
                        $(".book-list").css('visibility', 'visible');
                        displayResults(response);
                    }
                },
                error: function () {
                    alert("Something went wrong... <br>" + "Try again!");
                }
            });
        }
        $("#search-box").val(""); // Clearn search box
    });

    /*
    Function to display results in index.html
    #param res
    */

    function displayResults(res) {
        /*for (var i = 0; i < res.) {

        }*/
    }
})