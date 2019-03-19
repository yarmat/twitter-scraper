const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 400,
        height: 800
    });
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36');

    const url = 'https://twitter.com/Vitaliy_Klychko/status/1078728616190664705';

    const response = await page.goto(url);

    console.log(response);

    browser.close();

})();