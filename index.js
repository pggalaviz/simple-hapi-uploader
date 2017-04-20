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

const _PORT = process.env.PORT || Config.server.port || 3000;
const _HOST = process.env.HOST || Config.server.host || '0.0.0.0';

internals.main = function () {
    
    // Instantiate hapi.js server
    const server = new Hapi.Server();
    server.connection({
        host: _HOST, 
        port: _PORT, 
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
