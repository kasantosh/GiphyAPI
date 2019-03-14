$(document).ready(function() {
  var animalArray = [
    "Dog",
    "Tiger",
    "Lion",
    "Cat",
    "Skunk",
    "Camel",
    "Giraffe",
    "Penguin",
    "Ostrich",
    "Eagle",
    "Raccoon",
    "Bear",
    "Coyote",
    "cougar",
    "snake"
  ];
  var i = 0;
  var j = animalArray.length;
  var newDiv;
  var newImg;
  var gifImage;
  var gifImageStill;

  $.each(animalArray, function() {
    var newBtn1 = $("<button>");
    //console.log(this);
    $(newBtn1).text(this);
    $(newBtn1).attr("id", "id-" + i);
    $(newBtn1).addClass("btnClass");
    $("#btnsdiv").append(newBtn1);
    i++;
  });

  $("#searchButton").on("click", function(event) {
    event.preventDefault();
    var newBtn = $("<button>");
    var searchTag = $("#searchQuery")
      .val()
      .trim();
    if (searchTag === "") {
      $("#errorDisplay").text("Please enter a valid animal name");
    } else {
      animalArray.push(searchTag);
      $(newBtn).text(searchTag);
      $(newBtn).attr("id", "id-" + j);
      $(newBtn).addClass("btnClass");
      j++;
      $("#btnsdiv").append(newBtn);
      console.log(animalArray);
    }
  }); //--------------------------end of searchButton click function

  $(document).on("click", ".btnClass", function() {
    var animalQuery = $(this).text();
    console.log(animalQuery);
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      animalQuery +
      "&api_key=LUVAX7z5WrsSlE8rbSgpuLSkE3KeteFM&limit=10&rating=g";
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $("#populate").empty();
      for (var i = 0; i < 10; i++) {
        newDiv = $("<div class = 'displayAnimal'>");
        newImg = $("<img>");
        gifImage = response.data[i].images.fixed_width.url;
        //console.log(gifImage);
        //gifImageStill = response.data[i].images.fixed_width_still.url;
        //console.log(gifImageStill);
        newImg.attr("src", gifImage);
        var title = $('<span class = "title">');
        title.text(response.data[i].title);
        title.addClass("title");
        var rating = response.data[i].rating;
        newDiv
          .append("Title: ", title)
          .append("<br>")
          .append(newImg)
          .append("<br>")
          .append("Rating: ", rating);

        $("#populate").append(newDiv);
      }
    }); //--------------------------- end of Ajax
  }); //---------------------------------end of document.on(Click)
  $(document).on("click", "img", function() {
    var src = $(this).attr("src");
    if (src.includes("_s.gif")) {
      src = src.replace(/_s.gif/g, ".gif");
      $(this).attr("src", src);
    } else {
      src = src.replace(/.gif/g, "_s.gif");
      $(this).attr("src", src);
    }
  });
}); //--------------------------end of document.ready function
