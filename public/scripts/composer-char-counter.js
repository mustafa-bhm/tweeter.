$(document).ready(function () {
  const tweetText = $("#tweet-text");
  tweetText.on("input", function () {
    const NumberOfChara = 140;
    const textLength = $(this).val().length;
    const remainingChara = NumberOfChara - textLength;
    const counter = $(this.parentElement.counter);
    const counterUpdating = $(counter).val(remainingChara);

    /// to turn the counter to red when exedding the max characters
    if (counterUpdating.val() < 0) {
      counter.addClass("redCounter");
    } else {
      counter.removeClass("redCounter");
    }
  });
});
