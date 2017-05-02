// Simple plugin for registering routes

'use strict';

const Async = require('async');
const fs = require('fs');
const path = require('path');
const jsFile = /\.(js)$/;
const routesDir = `${__dirname}/routes`;

// Register 'routes' plugin
exports.register = (server, options, next) => {
    // Read all files (routes) from 'routes' folder
    return fs.readdir(routesDir, (err, list) => {
        if (err) {
            throw err;
        }
        return Async.each(list, (file, callback) => {
            // Check just for js files
            if (!file.match(jsFile)) {
                return callback();
            }

            const fileModule = path.join(routesDir, file);
            const routeFile = require(fileModule);

            // Add each file to the server routes
            routeFile.routes(server);

            return callback();
        }, () => {
            server.log( `Registered all routes in: ${routesDir}` );
            return next();
        });
    });
};

exports.register.attributes = {
    name: 'routes',
    version: '1.0.0'
};
