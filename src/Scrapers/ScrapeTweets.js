'use strict';

const cheerio = require('cheerio');
const helpers = require('./../helpers');

exports = module.exports = class ScraperTweets {

    constructor(client, data, account) {
        this.html = data;
        this.client = client;
        this.account = account;
    }

    async get() {

        const $ = cheerio.load(this.html);
        const items = [];

        const page = await this.client.newPage();

        await page.setViewport({
            width: 420,
            height: 740
        });

        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36');

        const max_tweets = this.account.count_per_time;

        $('#stream-items-id .tweet').each((i, item) => {
            if (i >= max_tweets) return false;

            const tweet_id = $(item).attr('data-item-id');
            const tweet_url = 'https://twitter.com' + $(item).attr('data-permalink-path');
            const tweet_content = $(item).find('.tweet-text').text();
            const tweet_published = $(item).find('.js-short-timestamp').attr('data-time-ms');
            const tweet_screen = 'screenshots/' + tweet_id + '.jpeg';
            items.push({
                tweet_id: tweet_id,
                tweet_url: tweet_url,
                tweet_content: tweet_content,
                tweet_screen: tweet_screen,
                tweet_published: parseInt(tweet_published)
            });
        });

        for (let key in items) {
            try {
                await page.goto('https://mobile.twitter.com/' + this.account.id_account + '/status/' + items[key].tweet_id, {"waitUntil": "networkidle0"});
                await page.screenshot({type: 'jpeg', path: './screenshots/' + items[key].tweet_id + '.jpeg'});
                await helpers.sleep(3000);
            } catch (e) {
                console.log('Tweet from account "' + this.account.id_account + '" with id - ' + items[key].tweet_id + ' has error: ' + e.message);
            }
        }

        return items;
    }
};

