/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  //form data security, protect from HTML manipulation
  const escape = function(str) {
    let div = document.createElement('div')
    div.appendChild(document.createTextNode(str))
    return div.innerHTML
  }

  //toggle new tweet entry box with compose button
  $('#toggle').click(function() {
    $('.new-tweet').toggle('slow', function() {
      $('.tweet-text').select()
    })
  })

  //function to input the tweet data into the tweet template
  //also converts the millisecond string in to a legible date format
  const createTweetElement = function(tweet) {
    let date = tweet.created_at
    let parsedDate = new Date(parseInt(date,10))
    
    //tweet template
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
            <p class="date">${escape(parsedDate)}
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
  
  //function for getting tweets from database
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

  //function for posting tweets to database
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
  let $form = $('#submit')
  $form.on('submit', function (ev) {
    ev.preventDefault()
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

  //calling function to load tweets on page load
  loadTweets()

})