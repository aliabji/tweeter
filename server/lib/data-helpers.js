"use strict"

// Defines helper functions for saving and getting tweets, using mongoDB
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to mongoDB
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet)
          callback(null, true)
      },

    // Get all tweets in mongoDB, sorted by newest first with 
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => b.created_at - a.created_at;
      db.collection("tweets").find().toArray((err, results) => {
        callback(null, results.sort(sortNewestFirst))
      })
    }
  }
}
