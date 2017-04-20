'use strict';

// Load dependencies & files
const Hapi = require('hapi');
const Boom = require('boom');
const Loki = require('lokijs');
const fs = require('fs');
const path = require('path');
const Config = require('./config');
const Routes = require('./routes');

const internals = {};

// DB setup
const db = new Loki(`${Config.db.path}/${Config.db.name}`, { persistenceMethod: 'fs' });

// If files folder doesn't exists, create it
if (!fs.existsSync(Config.db.path)) {
    fs.mkdirSync(Config.db.path);
}

internals.main = function () {
    
    // Instantiate hapi.js server
    const server = new Hapi.Server();
    server.connection({
        port: process.env.PORT || Config.server.port || 3000,
        host: process.env.HOST || Config.server.host || 'localhost',
        routes: { cors: true }
    });
    // Save DB object to app instance for future calls
    server.app.db = db;
    // Register hapi.js plugins
    server.register([
        // For routes 
        {
            register: Routes
        }
    ], (err) => {
        if (err) {
            throw err;
        }

        // Start server
        server.start((err) => {
            if (err) {
                throw err;
            }
            console.log(`Server running at: ${server.info.uri}`);
        });

    });
};

internals.main();
