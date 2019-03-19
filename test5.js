const Dropbox = require('dropbox').Dropbox;
const fs = require('fs');
const path = require('path');
global.fetch = require('node-fetch');

const dbx = new Dropbox({accessToken: 'nMs5OofPD3oAAAAAAAAFPoUfrSaiYvHLHDbc5mFb2oGvv-qL68GkhpwmHXBvzF-X'});

fs.readFile(path.join(__dirname, '/index.js'), 'utf8', function (err, contents) {
    if (err) {
        console.log('Error: ', err);
    }

    // This uploads basic.js to the root of your dropbox
    dbx.filesUpload({path: '/index.js', contents: contents})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });
});
