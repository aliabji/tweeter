/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  const createTweetElement = function(tweet) {
    var $tweet =    
  
      ` <article class=“posted-tweets”>
          <header>
            <div>
              <img src=${tweet.user.avatars.small} >
            </div>
            <h2>${tweet.user.name}</h2>
            <h4> ${tweet.user.handle}</h4>
          </header>
          <div>
           <p>${tweet.content.text}</p>
          </div>

          <footer>
            <p>${tweet.created_at}
            <i class="fa fa-heart" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-flag" aria-hidden="true"></i>
            </p>
          </footer>
        </article>`
    
   return $tweet
  }



  var tweetData = {
    "user": {
      "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
    "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('.tweet-container').append($tweet);

})

// const renderTweets = function(arr){
//   for (let tweet of arr) {
//     let $tweet = createTweetElement(tweet);
//     $('.container').append($tweet);
//   }
// }