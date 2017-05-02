'use strict';

// Load dependencies & files
const Hapi = require('hapi');
const Boom = require('boom');
const Loki = require('lokijs');
const fs = require('fs');
const path = require('path');
const Config = require('./config');
const Routes = require('./routes');

// Declare internals
const internals = {};

// DB setup, write to disk
const db = new Loki(`${Config.db.path}/${Config.db.name}`, { persistenceMethod: 'fs' });

// If files folder doesn't exists, create it
if (!fs.existsSync(Config.db.path)) {
    fs.mkdirSync(Config.db.path);
}

// Port and Host 
const _PORT = process.env.PORT || Config.server.port || 3000;
const _HOST = process.env.HOST || Config.server.host || 'localhost';

internals.main = function () {
    
    // Instantiate hapi.js server
    const server = new Hapi.Server();
    // Concetion setup
    server.connection({
        host: _HOST, 
        port: _PORT, 
        routes: {
            cors: { // Accept CORS
                origin: ['*'],
            }
        }
    });
    // Save DB object to app instance for future calls
    server.app.db = db;
    // Register hapi.js plugins
    server.register([
        // Register our routes plugin './routes.js' 
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
// Call server functions
internals.main();
