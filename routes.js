'use strict';

const Async = require('async');
const fs = require('fs');
const path = require('path');
const jsFile = /\.(js)$/;
const routesDir = `${__dirname}/routes`;

exports.register = (server, options, next) => {
    return fs.readdir(routesDir, (err, list) => {
        if (err) {
            throw err;
        }
        return Async.each(list, (file, callback) => {
            if (!file.match(jsFile)) {
                return callback();
            }
            const fileModule = path.join(routesDir, file);
            const routeFile = require(fileModule);
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
