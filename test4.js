'use strict';

const Client = require('./src/Client');

const client = new Client();

(async () => {

    await client.getWithProxy();

    try {
        const page = await client.newPage();

        await page.goto('https://google.com');

        console.log(await page.content());

        await client.close();
    } catch (e) {
        await client.close();
        console.log(e.message);
    }


})();