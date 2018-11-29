var list = [
  "Neon Genesis Evangelion",
  "Future Diary",
  "Shokugeki no Soma",
  "Naruto Shippuden",
  "Pokemon",
  "Ouran High School Host Club",
  "Himouto! Umaru-chan",
  "Sailor Moon",
  "Sword Art Online",
  "Cowboy Bebop",
  "Attack On Titan"
];

function renderButtons() {
  $("#buttonsArea").empty(); // empties the buttonsArea div so we don't make duplicates

  // creates a button with attributes for every item in the list array
  for (var i = 0; i < list.length; i++) {
    var button = $("<button>");
    button.html(list[i]);
    button.addClass("btn btn-outline-secondary");
    button.attr("id", "tv-btn");
    button.attr("tv-title", list[i]);
    $("#buttonsArea").append(button);
  }
}

function displayGifs() {
  var thisAnime = $(this).attr("tv-title");
  console.log(thisAnime);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    thisAnime +
    "&api_key=YN24RMehnd2HYVUUhzc3PTXaCfLSqMXL";

  // ajax call that gets and returns the response object from the query url
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var response = response.data;

    // creates a div that contains a still image gif and rating info for each response item
    for (var i = 0; i < response.length; i++) {
      var gifDiv = $("<div>");
      gifDiv.addClass("gifDiv");

      var rating = response[i].rating;
      var p = $("<p>").html("Rating: " + rating);
      p.addClass("text-center");

      var gifImage = $("<img>");
      gifImage.addClass("gif");
      gifImage.attr("src", response[i].images.fixed_height_still.url);
      gifImage.attr("data-still", response[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", response[i].images.fixed_height.url);
      gifImage.attr("data-state", "still");

      // places the image and the rating text in the gifDiv
      gifDiv.append(p);
      gifDiv.prepend(gifImage);

      // places the gifDiv at the top of the mainArea div
      $("#mainArea").prepend(gifDiv);
    }
  });
}

// when the submit button is clicked, the input value is pushed to the tvShows array and rendered into a new button
$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  var newAnime = $("#userInput")
    .val()
    .trim();
  list.push(newAnime);
  renderButtons();
});

// listens for a click of any button with an id of tv-btn, then performs the displayGifs function
$(document).on("click", "#tv-btn", displayGifs);

// starts and stops the animated gif on click
$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

renderButtons();
