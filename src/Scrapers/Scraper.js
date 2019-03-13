'use strict';

const puppeteer = require('puppeteer');
const Scrapper = require('./ScrapeTweets');

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

                const html = await page.content();

                const scrapper = new Scrapper(browser, html, accounts[key]);

                let items = await scrapper.get();

                account_tweets.push({items: items, account_id: accounts[key].id});

            } catch (e) {
                console.log(e.message);
            }

            console.log('Finish scrape - ' + 'https://twitter.com/' + accounts[key].id_account);
        }

        await browser.close();

        return account_tweets;
    }
};
