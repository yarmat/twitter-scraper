const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1500,
        height: 1100
    });
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36');

    const url = 'https://twitter.com/Vitaliy_Klychko';

    await page.goto(url);

    const minimum_date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365).getTime();

    let html = await page.content();

    let $ = cheerio.load(html);

    let last_item_date = $('#stream-items-id .tweet')
        .eq($('#stream-items-id .tweet').length - 1)
        .find('.js-short-timestamp')
        .attr('data-time-ms');

    while (last_item_date > minimum_date) {
        await page.evaluate(_ => {
            window.scrollBy(0, window.innerHeight);
        });

        html = await page.content();

        $ = cheerio.load(html);

        last_item_date = $('#stream-items-id .tweet')
            .eq($('#stream-items-id .tweet').length - 1)
            .find('.js-short-timestamp')
            .attr('data-time-ms');
    }


    console.log($('#stream-items-id .tweet').length);

    console.log(new Date(parseInt(last_item_date)), new Date(minimum_date));


    // const $ = cheerio.load(html);


    // while (length < 60) {
    //
    //     await page.evaluate(_ => {
    //         window.scrollBy(0, window.innerHeight);
    //     });
    //
    //     const html = await page.content();
    //
    //     const $ = cheerio.load(html);
    //
    //     length = $('#stream-items-id .tweet').length;
    // }


    // const test = $('#stream-items-id .tweet')
    //     .eq($('#stream-items-id .tweet').length - 1)
    //     .find('.js-short-timestamp')
    //     .attr('data-time-ms');

    // console.log(length);

    browser.close();

})();