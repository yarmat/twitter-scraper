'use strict';

const CronJob = require('cron').CronJob;
const Scrapper = require('./src/Scrapers/Scraper');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize('twitter', 'root', 'root', {
    dialect: 'mysql'
});

const Account = sequelize.import('./src/Models/Account');
const Tweet = sequelize.import('./src/Models/Tweet');

Account.hasMany(Tweet, {foreignKey: 'account_id'});


// (async () => {
//     try {
//         const accounts = await Account.scope('updateable').findAll({
//             include: [Tweet]
//         });
//
//         console.log(accounts);
//
//         if(accounts.length < 1) {
//             console.log('Nothing to scrape');
//             return false;
//         }
//
//         for (let key in accounts) {
//             const account = accounts[key];
//
//             Account.update({
//                 next_update: new Date(new Date().getTime() + 1000 * account.update_time),
//             }, {
//                 where: {
//                     id: account.id
//                 }
//             });
//         }
//
//         const scrapper = new Scrapper(accounts);
//         const tweets = await scrapper.get();
//
//         for (let key in tweets) {
//             const account_id = tweets[key].account_id;
//
//             for (let tweet_key in tweets[key].items) {
//                 const tweet = tweets[key].items[tweet_key];
//
//                 Tweet.create({
//                     tweet_id: tweet.tweet_id,
//                     content: tweet.tweet_content,
//                     url: tweet.tweet_url,
//                     account_id: account_id,
//                     published_at: new Date(tweet.tweet_published)
//                 });
//             }
//         }
//
//     } catch (e) {
//         console.log(e.message);
//     }
// })();


const job = new CronJob('*/1 * * * *', async () => {

    try {

        const accounts = await Account.findAll({
            where: {
                next_update: {
                    [Op.or]: {
                        [Op.lt]: new Date(),
                        [Op.eq]: null
                    }
                }
            },
            include: [Tweet]
        });


        if (accounts.length < 1) {
            console.log('Nothing to scrape');
            return false;
        }

        for (let key in accounts) {
            const account = accounts[key];

            Account.update({
                next_update: new Date(new Date().getTime() + 1000 * account.update_time),
            }, {
                where: {
                    id: account.id
                }
            });
        }

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

    } catch (e) {
        console.log(e.message);
    }
});


job.start();
