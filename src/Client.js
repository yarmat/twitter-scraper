'use strict';
const puppeteer = require('puppeteer');
const proxyList = require('./../config/proxy');
const userAgentList = require('./../config/userAgent');
const helpers = require('./helpers');

exports = module.exports = class Client {
    constructor() {
        this.browser = null;
        this.page = null;
        this.proxy = null;
    }

    async getWithProxy() {
        await this.withRandomProxyServer();

        this.browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            args: [
                "--proxy-server=" + this.proxy.type + "://" + this.proxy.server + ":" + this.proxy.port,
                // "--proxy-server=socks4://177.22.246.28:4145",
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        });
    }

    async get() {
        this.browser = await puppeteer.launch();
    }

    async newPage(size = 'big') { // big, small
        this.page = await this.browser.newPage();
        await this.withRandomUserAgent();

        if (this.proxy !== null && this.proxy.authenticate) {
            await this.withAuthenticate();
        }

        if (size === 'big') await this.withBigScreen();
        if (size === 'small') await this.withSmallScreen();

        return this.page;
    }

    async close() {
        await this.browser.close();
    }

    async withRandomUserAgent() {
        await this.page.setUserAgent(userAgentList[helpers.getRandomInt(0, userAgentList.length)]);
    }

    async withAuthenticate() {
        await this.page.authenticate(this.proxy.username, this.proxy.password);
    }

    async withRandomProxyServer() {
        this.proxy = proxyList[helpers.getRandomInt(0, proxyList.length)];
        console.log('Using proxy: ' + this.proxy.server);
    }


    async withBigScreen() {
        await this.page.setViewport({
            width: 1500,
            height: 1100
        });
    }

    async withSmallScreen() {
        await this.page.setViewport({
            width: 420,
            height: 740
        });
    }


};