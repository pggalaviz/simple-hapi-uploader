// Simple configuration, host: '0.0.0.0' works for heroku deployments
'use strict';

module.exports = {
    server: {
        port: 3000,
        host: '0.0.0.0'
    },
    db: {
        name: 'db.json',
        collection: 'files',
        path: 'uploads',
        imagesOnly: false,
    }
};
