/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // const tweetData = [
  //   /// test database to be deleted later
  //   {
  //     user: {
  //       name: "Newton",
  //       avatars: "https://i.imgur.com/73hZDYK.png",
  //       handle: "@SirIsaac",
  //     },
  //     content: {
  //       text: "If I have seen further it is by standing on the shoulders of giants",
  //     },
  //     created_at: 1461116232227,
  //   },
  //   {
  //     user: {
  //       name: "Descartes",
  //       avatars: "https://i.imgur.com/nlhLi3I.png",
  //       handle: "@rd",
  //     },
  //     content: {
  //       text: "Je pense , donc je suis",
  //     },
  //     created_at: 1461113959088,
  //   },
  // ];

  const createTweetElement = function (data) {
    //// to creat tweets dynamicly
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
        <div><p>${data.created_at}</p></div>
        <div class="tweets-icons">
          <i class="fas fa-flag"></i><i class="fas fa-retweet"></i
          ><i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  </section>`;
    return $tweet;
  };
  const renderTweets = function (dataBase) {
    //// rendering tweets
    console.log(dataBase);
    dataBase.forEach((tweets) => {
      const $tweet = createTweetElement(tweets);
      $(".tweets-container").append($tweet);
    });
  };
  // renderTweets(tweetData);

  //// Form Submission using JQuery
  $("form").on("submit", function (event) {
    event.preventDefault();
    // alert("nooooorefresh !");
    console.log("no refresh");
    const newTweet = $(this).serialize();

    $.ajax({
      url: "/tweets/",
      method: "POST",
      data: newTweet,
      success: function (data) {
        console.log("success");
        console.log(this.data);
      },
    });
  });
  const loadTweets = function () {
    $.ajax({
      url: "/tweets/",
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
  /// Loading tweets from /tweets/
});
