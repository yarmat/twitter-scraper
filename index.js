'use strict';

const Scrapper = require('./src/Scrapers/Scraper');
const Sequelize = require('sequelize');


const sequelize = new Sequelize('twitter', 'root', 'root', {
    dialect: 'mysql'
});

const Account = sequelize.import('./src/Models/Account');
const Tweet = sequelize.import('./src/Models/Tweet');

Account.hasMany(Tweet, {foreignKey: 'account_id'});

const {
    setIntervalAsync,
    clearIntervalAsync
} = require('set-interval-async/dynamic');

(async () => {

    try {
        const accounts = await Account.scope('updateable').findAll({
            include: [Tweet]
        });

        const scrapper = new Scrapper(accounts);
        const tweets = await scrapper.get();

        for (let key in tweets) {
            const account_id = tweets[key].account_id;

            for (let tweet_key in tweets[key].items) {
                const tweet = tweets[key].items[tweet_key];

                Tweet.create({
                    tweet_id: tweet.tweet_id,
                    content: tweet.tweet_content,
                    url: tweet.tweet_url,
                    account_id: account_id,
                    published_at: new Date(tweet.tweet_published)
                });
            }
        }

        for (let key in accounts) {
            const account = accounts[key];

            Account.update({
                next_update: new Date(new Date() + 1000 * 60 * 60),
            }, {
                where: {
                    id: account.id
                }
            });

        }

    } catch (e) {
        console.log(e.message);
    }

})();


// setIntervalAsync( // Same Cron - It start script every minute
//     async () => {
//
//         try {
//             const accounts = await Account.scope('updateable').findAll({
//                 include: [ Tweet ]
//             });
//
//             const scrapper = new Scrapper(accounts);
//             const tweets = await scrapper.get();
//
//             for(let key in tweets) {
//                 const tweet = tweets[key];
//                 Tweet.create({
//                     tweet_id: tweet.tweet_id,
//                     content: tweet.tweet_content,
//                     url: tweet.tweet_url,
//                     account_id: key,
//                     published_at: tweet.tweet_published
//                 });
//             }
//
//             console.log(tweets);
//
//         } catch(e) {
//             console.log(e.message);
//         }
//
//
//     },
//     1000 * 60 // Check one time per minute
// );

