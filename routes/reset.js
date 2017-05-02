'use strict';

const Boom = require('boom');
const Reset = require('../utils/reset');
const Config = require('../config');

const r = {
    method: 'POST',
    path: '/reset',
    handler: async function(request, reply) {
        try {
            // Delete all files and DB
            await Reset(Config.db.path);
            reply({
                statusCode: 200,
                message: 'Succesfully reseted DB'
            });
        } catch (err) {
            reply(Boom.badRequest(err.message, err)); 
        }  
    }
};

exports.routes = server => server.route(r);
