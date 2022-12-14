/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const createTweetElement = function(data) {
    /// prevent XSS using Escaping
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    //// to creat tweets dynamicly
    const time = timeago.format(data.created_at);
    const $tweet = `<section class="old-tweets">
    <article>
      <header class="old-tweet-header">
        <div class="user-profile">
          <img
            class="users-image"
            src="${data.user.avatars}"
            alt="user-image"
          />

          <p>${data.user.name}</p>
        </div>
        <div class="users-name">
          <p><b>${data.user.handle}</b></p>
        </div>
      </header>
      <div class="old-tweet-content">
        <p>
          ${escape(data.content.text)}</p>
      </div>
      <footer class="old-twwets-footer">
        <div ><p class= "time">${time}</p></div>
        <div class="tweets-icons">
          <i class="fas fa-flag"></i><i class="fas fa-retweet"></i
          ><i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  </section>`;
    return $tweet;
  };

  //// rendering tweets

  const renderTweets = function(dataBase) {
    //// rendering tweets
    console.log(dataBase);
    $(".tweets-container").empty();
    dataBase.forEach((tweets) => {
      const $tweet = createTweetElement(tweets);
      $(".tweets-container").prepend($tweet);
    });
  };
  /// Loading/fetching tweets from /tweets/
  const loadTweets = function() {
    $.ajax({
      url: "/tweets/",
      method: "GET",
    })
      .then((response) => {
        renderTweets(response);
        console.log("==== fetching tweets ");
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  loadTweets();

  //// Form Submission using JQuery
  $("form").on("submit", function(event) {
    event.preventDefault();

    const input = $("#tweet-text").val();
    const tweetCount = $(this.counter).val();

    console.log("++++", tweetCount);
    if (input === "") {
      $("#empty-tweet").removeClass("display").slideDown(); /// validation Error - removing a class to display the error.
    } else if (tweetCount < 0) {
      $("#too-long").removeClass("display").slideDown(); /// validation Error - removing a class to display the error.
    } else {
      $("#empty-tweet").addClass("display"); /// adding the class back to hide the error msg
      $("#too-long").addClass("display"); /// adding the class back to hide the error msg
      const newTweet = $(this).serialize();
      $.ajax({
        url: "/tweets/",
        method: "POST",
        data: newTweet,
        success: function(data) {
          $("#tweet-text").val(""); /// to clear  text area
          $(".counter").val("140"); /// set counter back to initial value
          loadTweets();
        },
      });
    }
  });
});
