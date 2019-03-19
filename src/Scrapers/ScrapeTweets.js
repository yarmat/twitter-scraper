'use strict';

const cheerio = require('cheerio');
const helpers = require('./../helpers');

exports = module.exports = class ScraperTweets {

    constructor(client, data, account, min_date) {
        this.html = data;
        this.client = client;
        this.account = account;
        this.min_date = min_date;
    }

    async get() {

        const $ = cheerio.load(this.html);
        const items = [];

        const page = await this.client.newPage('small');

        // await page.setViewport({
        //     width: 420,
        //     height: 740
        // });
        //
        // await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36');

        const unscraped_tweets = [];

        const getItems = async () => {
            $('#stream-items-id .tweet').each(async (i, item) => {
                const tweet_published = $(item).find('.js-short-timestamp').attr('data-time-ms');

                if (tweet_published <= this.min_date) return false; // break like php

                const tweet_id = $(item).attr('data-item-id');

                if (await this.issetItems(tweet_id)) {
                    unscraped_tweets.push(tweet_id);
                    return;
                }

                const tweet_url = 'https://twitter.com' + $(item).attr('data-permalink-path');
                const tweet_content = $(item).find('.tweet-text').text();
                const tweet_screen = 'screenshots/' + tweet_id + '.jpeg';
                items.push({
                    tweet_id: tweet_id,
                    tweet_url: tweet_url,
                    tweet_content: tweet_content,
                    tweet_screen: tweet_screen,
                    tweet_published: parseInt(tweet_published)
                });

            });
        };

        await getItems();

        for (let key in items) {
            try {
                console.log('Start scrape tweet with id - ' + items[key].tweet_id);

                await page.goto('https://mobile.twitter.com/' + this.account.id_account + '/status/' + items[key].tweet_id, {"waitUntil": "networkidle0"});
                await page.screenshot({type: 'jpeg', path: './screenshots/' + items[key].tweet_id + '.jpeg'});
                await helpers.sleep(1200);

                console.log('Finish scrape tweet with id - ' + items[key].tweet_id);
            } catch (e) {
                console.log('Tweet from account "' + this.account.id_account + '" with id - ' + items[key].tweet_id + ' has error: ' + e.message);
                items.splice(key, 1);
            }
        }

        const old_items = await this.getOldItems();

        const removed_items = await this.getRemovedItems(page, unscraped_tweets);
        // const removed_items = [];

        return {
            items: items,
            old_items: old_items,
            removed_items: removed_items
        }
    }


    async issetItems(id) {
        for (let key in this.account.tweets) {

            const item = this.account.tweets[key];

            if (item.tweet_id === id) return true;
        }

        return false;
    }

    async getOldItems() {
        const old_items = [];

        for (let key in this.account.tweets) {

            const item = this.account.tweets[key];

            if (item.published_at < this.min_date) old_items.push(item);

        }

        return old_items;
    }

    async getRemovedItems(page, except_tweets) {
        const items = [];

        for (let key in this.account.tweets) {

            const item = this.account.tweets[key];

            if (except_tweets.includes(item.tweet_id)) continue;

            console.log('Start check if isset tweet yet with id - ' + item.tweet_id);

            const response = await page.goto(item.url);

            if (response.status() === 404) items.push(item);

            console.log('Finish check if isset tweet yet with id - ' + item.tweet_id);

            await helpers.sleep(3000);
        }

        return items;
    }
};

