'use strict';

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1500,
        height: 1100
    });
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36');

    await page.goto('https://twitter.com/Vitaliy_Klychko');
    await page.waitForSelector('img');
    await page.screenshot({path: './screenshots/example.png'});
    const html = await page.content();
    console.log(html);
    await browser.close();
})();