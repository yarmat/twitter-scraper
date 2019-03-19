const imgur = require('imgur');
const imgurConfig = require('./config/imgur');

imgur.setCredentials(imgurConfig.login, imgurConfig.password, imgurConfig.client_id);

imgur.uploadFile('./screenshots/1106616187956457473.jpeg')
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });