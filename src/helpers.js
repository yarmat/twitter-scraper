exports = module.exports = {
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    time() {
        return parseInt(new Date().getTime() / 1000)
    },
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};