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
  //// Form Submission using JQuery
  $("form").on("submit", function (event) {
    event.preventDefault();
    // alert("nooooorefresh !");
    // console.log("no refresh");
    const newTweet = $(this).serialize();

    $.ajax({
      url: "http://localhost:8080/tweets/",
      method: "POST",
      data: newTweet,
      success: function (data) {
        console.log("success");
        console.log(this.data);
        $("#tweet-text").val(""); /// to clear tweet text area
        loadTweets();
      },
    });
  });
  const renderTweets = function (dataBase) {
    //// rendering tweets
    console.log(dataBase);
    dataBase.forEach((tweets) => {
      const $tweet = createTweetElement(tweets);
      $(".tweets-container").append($tweet);
    });
  };

  /// Loading/fetching tweets from /tweets/
  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets/",
      method: "GET",
    })
      .then((response) => {
        renderTweets(response);
        console.log("====");
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  loadTweets();
});
