'use strict';

const Boom = require('boom');
const Config = require('../config');
const loadCollection = require('../utils/loadCollection');

const r = {
    method: 'GET',
    path: '/files',
    handler: async function (request, reply){
        try {
            const db = request.server.app.db; 
            const col = await loadCollection(Config.db.collection, db);
            reply(col.data)
        } catch (err) {
            reply(Boom.badRequest(err.message, err));
        }
    }
};

exports.routes = server => server.route(r);
