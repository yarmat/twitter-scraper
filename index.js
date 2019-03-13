'use strict';

const puppeteer = require('puppeteer');
const Scrapper = require('./src/Scrapers/Scraper');


const accounts = [
    {
        id_account: 'Vitaliy_Klychko',
        reload_time: 60 * 3, // 3 minutes
        available_time: 60 * 5, // 5 minutes
        count_per_time: 5
    },
    {
        id_account: 'Klitschko',
        reload_time: 60 * 3, // 3 minutes
        available_time: 60 * 5, // 5 minutes
        count_per_time: 2
    },
];


(async () => {
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

            let items = await scrapper.run();

            account_tweets.push({[accounts[key].id_account]: items});


        } catch (e) {
            console.log(e.message);
        }

        console.log('Finish scrape - ' + 'https://twitter.com/' + accounts[key].id_account);
    }

    console.log(account_tweets);

    await browser.close();
})();