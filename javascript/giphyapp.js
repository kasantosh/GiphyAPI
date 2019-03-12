$(document).ready(function() {
  var animalArray = ["Dog", "Tiger", "Lion", "Cat", "Skunk"];
  var i = 0;
  var j = 5;

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
    animalArray.push(searchTag);
    $(newBtn).text(searchTag);
    $(newBtn).attr("id", "id-" + j);
    $(newBtn).addClass("btnClass");
    j++;
    $("#btnsdiv").append(newBtn);
    console.log(animalArray);
  }); //--------------------------end of searchButton click function

  $("#btnsdiv :button").on("click", function() {
    var animalQuery = this.innerHTML;
    console.log(animalQuery);
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      animalQuery +
      "&api_key=LUVAX7z5WrsSlE8rbSgpuLSkE3KeteFM&limit=10&rating=g";
    //var queryURL = animalArray[this];
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
  }); //---------------------------------end of button:this
}); //--------------------------end of document.ready function
