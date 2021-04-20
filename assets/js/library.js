$(document).ready(function () {
    var item, title, author, publisher, bookLink, bookImg;
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q="
    var placeHlder = ""
    var searchData;

    // Event listener for search button
    $("#search-button").click(function () {
        outputList.innerHTML = ""; // Empty html output
        document.body.style.backgroundImage = "url('')";
        searchData = $("#search-box").val();

        // Handeling empty search input field
        if (searchData === "" || searchData === null) {
            displayError();
        } else {
            // console.log(searchData);
            //$.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    if (response.totalItems === 0) {
                        alert("There are no results... Please try again!")
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
        $("#search-box").val(""); // Clear search box
    });

    /*
    Function to display results in index.html
    #param res
    */
    function displayResults(res) {
        for (var i = 0; i < res.items.length; i += 2) {
            item = res.items[i];
            book - title
        }
    }
})