/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const createTweetElement = function (data) {
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
          ${data.content.text}</p>
      </div>
      <footer class="old-twwets-footer">
        <div><p>${time}</p></div>
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

  const renderTweets = function (dataBase) {
    //// rendering tweets
    console.log(dataBase);
    $(".tweets-container").empty();
    dataBase.forEach((tweets) => {
      const $tweet = createTweetElement(tweets);
      $(".tweets-container").prepend($tweet);
    });
  };
  /// Loading/fetching tweets from /tweets/
  const loadTweets = function () {
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
  $("form").on("submit", function (event) {
    event.preventDefault();

    const input = $("#tweet-text").val();
    const tweetCount = $(this.counter).val();

    console.log("++++", input);
    if (input === "") {
      alert("Your Tweet is empty.");
    } else if (tweetCount < 0) {
      alert("Your Tweet has exceeded maximum characters.");
    } else {
      const newTweet = $(this).serialize();
      $.ajax({
        url: "/tweets/",
        method: "POST",
        data: newTweet,
        success: function (data) {
          $("#tweet-text").val(""); /// to clear  text area
          loadTweets();
        },
      });
    }
  });
});
