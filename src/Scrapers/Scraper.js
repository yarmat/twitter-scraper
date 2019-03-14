'use strict';

const puppeteer = require('puppeteer');
const Scrapper = require('./ScrapeTweets');
const cheerio = require('cheerio');


exports = module.exports = class Scraper {
    constructor(accounts) {
        this.accounts = accounts;
    }

    async get() {
        const accounts = this.accounts;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({
            width: 1500,
            height: 1100
        });
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36');

        const account_tweets = [];

        for (let key in accounts) {
            console.log('Start scrape - ' + 'https://twitter.com/' + accounts[key].id_account);

            try {
                await page.goto('https://twitter.com/' + accounts[key].id_account);

                const min_date = new Date(new Date().getTime() - 1000 * 60 * 60 * accounts[key].available_time).getTime();

                const html = await this.getHtml(page, min_date);

                const scrapper = new Scrapper(browser, html, accounts[key], min_date);

                let result = await scrapper.get();

                account_tweets.push({result: result, account_id: accounts[key].id});

            } catch (e) {
                console.log(e.message);
            }

            console.log('Finish scrape - ' + 'https://twitter.com/' + accounts[key].id_account);
        }

        await browser.close();

        return account_tweets;
    }

    async getHtml(page, min_date) {

        let html = await page.content();

        let $ = cheerio.load(html);

        const tweet_placeholder = '#stream-items-id .tweet';

        let last_item_date = $(tweet_placeholder)
            .eq($(tweet_placeholder).length - 1)
            .find('.js-short-timestamp')
            .attr('data-time-ms');

        while (last_item_date > min_date) { // Scroll page
            await page.evaluate(_ => {
                window.scrollBy(0, window.innerHeight);
            });

            html = await page.content();

            $ = cheerio.load(html);

            last_item_date = $(tweet_placeholder)
                .eq($(tweet_placeholder).length - 1)
                .find('.js-short-timestamp')
                .attr('data-time-ms');
        }

        return html;
    }
};
