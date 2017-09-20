/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

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
  //form data security
  const escape = function(str) {
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

  //taking in the array of tweets and utilizing the createTweetElement function
  //to render the tweets within the template
  const renderTweets = function(arr){
    for (let tweet of arr) {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }
  }
  
  const loadTweets = function() {
    $.get('/tweets')
    .done(function(result) {
      $('.tweet-container').empty()
      renderTweets(result)
    })
    .fail(function(error) {
      console.error(error)
    })
  }

  //
  const postTweets = function(formData) {
    $.post('/tweets', formData)
    .done(function(result) {
      loadTweets()
    })
    .fail(function(error) {
      console.log(error)
    })
  }

  //prevent page from changing after submitting new tweet and storing data in tweet database,
  //form validation
  let $form = $('#submit');
  $form.on('submit', function (ev) {
    ev.preventDefault()
    console.log($('.tweet-text').val())
    if ($('.tweet-text').val().length == 0) {
      alert("Please enter your tweet")
      return
    } else if ($('.tweet-text').val().length > 140) {
      alert("Please enter 140 characters or less")
      return
    } else {
      let formData = $form.serialize()
      postTweets(formData)
    }
  })

  loadTweets()

})