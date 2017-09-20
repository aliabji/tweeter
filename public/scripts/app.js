/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //function to input the tweet data into the tweet template
  const createTweetElement = function(tweet) {
    let $tweet =    
  
      ` <article class=“posted-tweets”>
          <header>
            <div>
              <img src=${escape(tweet.user.avatars.small)} >
            </div>
            <h2>${escape(tweet.user.name)}</h2>
            <h4> ${escape(tweet.user.handle)}</h4>
          </header>
          <div>
           <p>${escape(tweet.content.text)}</p>
          </div>

          <footer>
            <p>${escape(tweet.created_at)}
            <i class="fa fa-heart" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-flag" aria-hidden="true"></i>
            </p>
          </footer>
        </article>`
    
   return $tweet
  }

  let data = [
    {
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
        "text": "If you have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  //taking in the array of tweets and utilizing the createTweetElement function
  //to render the tweets within the template
  const renderTweets = function(arr){
    for (let tweet of arr) {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }
  }

  renderTweets(data);

  //prevent page from changing after submitting new tweet and storing data in new var
  let $form = $('#submit');
  $form.on('submit', function (ev) {
    ev.preventDefault()
    let formData = $form.serialize()
    return formData
  })



})