'use strict';

const Scrapper = require('./../src/Scrapers/Scraper');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var fs = require('fs');


const sequelize = new Sequelize('twitter', 'root', 'root', {
    dialect: 'mysql',
    operatorsAliases: false
});

const Account = sequelize.import('./../src/Models/Account');
const Tweet = sequelize.import('./../src/Models/Tweet');

Account.hasMany(Tweet, {foreignKey: 'account_id'});


(async () => {
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

            for (let tweet_key in result[key].result.items) { // create new tweets
                const tweet = result[key].result.items[tweet_key];

                Tweet.create({
                    tweet_id: tweet.tweet_id,
                    content: tweet.tweet_content,
                    url: tweet.tweet_url,
                    account_id: account_id,
                    published_at: new Date(tweet.tweet_published)
                });
            }


            for (let tweet_key in result[key].result.old_items) { // remove old tweets
                const tweet = result[key].result.old_items[tweet_key];

                const screenshot = __dirname + '/screenshots/' + tweet.tweet_id + '.jpeg';

                fs.unlink(screenshot, (err) => {
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
})();