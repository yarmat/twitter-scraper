'use strict';

const imgurConfig = require('./config/imgur');

const CronJob = require('cron').CronJob;
const Scrapper = require('./src/Scrapers/Scraper');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');

const imgur = require('imgur');
imgur.setCredentials(imgurConfig.login, imgurConfig.password, imgurConfig.client_id);



const sequelize = new Sequelize('twitter', 'root', 'root', {
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false
});

const Account = sequelize.import('./src/Models/Account');
const Tweet = sequelize.import('./src/Models/Tweet');
const RemovedTweet = sequelize.import('./src/Models/RemovedTweet');

Account.hasMany(Tweet, {foreignKey: 'account_id'});

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
                next_update: new Date(new Date().getTime() + 1000 * 60 * account.update_time),
            }, {
                where: {
                    id: account.id
                }
            });
        }

        const scrapper = new Scrapper(accounts);
        const result = await scrapper.get();

        for (let key in result) {
            const account_id = result[key].account_id;

            // console.log(result[key].result.removed_items); // console.log(tweets with status 404 (removed));

            for (let tweet_key in result[key].result.removed_items) { // save removed tweets
                const tweet = result[key].result.removed_items[tweet_key];

                const screen = __dirname + '/screenshots/' + tweet.tweet_id + '.jpeg';

                imgur.uploadFile(screen)
                    .then(function (json) {
                        fs.unlink(screen, (err) => {
                            if (!err) {

                                RemovedTweet.findOrCreate({
                                    where: {tweet_id: tweet.tweet_id},
                                    defaults: {
                                        content: tweet.content,
                                        url: json.data.link,
                                        account_id: tweet.account_id,
                                        published_at: new Date(tweet.published_at)
                                    }
                                });

                                Tweet.destroy({
                                    where: {
                                        id: tweet.id
                                    }
                                });

                                console.log('Founded removed tweet. Id - ' + tweet.tweet_id);
                            }
                        });
                    })
                    .catch(function (err) {
                        console.error(err.message);
                    });

            }


            for (let tweet_key in result[key].result.items) { // save new tweets
                const tweet = result[key].result.items[tweet_key];

                Tweet.findOrCreate({
                    where: {tweet_id: tweet.tweet_id},
                    defaults: {
                        content: tweet.tweet_content,
                        url: tweet.tweet_url,
                        account_id: account_id,
                        published_at: new Date(tweet.tweet_published)
                    }
                });

            }


            for (let tweet_key in result[key].result.old_items) { // remove old tweets
                const tweet = result[key].result.old_items[tweet_key];

                const screen = __dirname + '/screenshots/' + tweet.tweet_id + '.jpeg';

                fs.unlink(screen, (err) => {
                    if (!err) console.log("Screen " + tweet.tweet_id + ".jpeg deleted");
                }); // remove file of screen

                Tweet.destroy({
                    where: {
                        id: tweet.id
                    }
                });
            }


        }

    } catch (e) {
        console.log(e.message);
    }
});


job.start();
