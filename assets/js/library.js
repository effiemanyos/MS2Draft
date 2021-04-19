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
                        alert("There are no results... Please try again!")
                    }
                }
            })
        }
    })
})