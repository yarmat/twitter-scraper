'use strict';

const Scrapper = require('./src/Scrapers/Scraper');

const {
    setIntervalAsync,
    clearIntervalAsync
} = require('set-interval-async/dynamic');


setIntervalAsync( // Same Cron - It start script every minute
    async () => {
        const accounts = [
            {
                id_account: 'Vitaliy_Klychko',
                reload_time: 1000 * 60 * 3, // 3 minutes
                available_time: 1000 * 60 * 5, // 5 minutes
                count_per_time: 5
            },
            {
                id_account: 'Klitschko',
                reload_time: 1000 * 60 * 3, // 3 minutes
                available_time: 1000 * 60 * 5, // 5 minutes
                count_per_time: 2
            },
        ];
        const scrapper = new Scrapper(accounts);
        await scrapper.run();
    },
    1000 * 60 // Check one time per minute
);

