let totalChars = 0

//checking text box for chars, updating counter in bottom right corner of compose
//if counter is less than 0, number turns red. when counter is zero or greater, red colour is //removed
$(document).ready(function(textArea) {
  $('.text-area').keyup(function () {
    totalChars = this.value.length
    $('.counter').html(140 - totalChars)
    let number = parseInt($('.counter').text());
    if (number < 0) {
      $('.counter').addClass('red');
    } else if (number >= 0) {
      $('.counter').removeClass('red');
    };
  });
});