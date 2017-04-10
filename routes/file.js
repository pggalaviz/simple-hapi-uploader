'use strict';

const Boom = require('boom');
const fs = require('fs');
const path = require('path');
const Config = require('../config');
const loadCollection = require('../utils/loadCollection');

const r = {
    method: 'GET',
    path: '/files/{id}',
    handler: async function(request, reply){
        try {
            const db = request.server.app.db;
            const col = await loadCollection(Config.db.collection, db);
            const result = col.get(request.params['id']);

            if (!result) {
                reply(Boom.notFound());
                return;
            }
            
            reply(fs.createReadStream(path.join(Config.db.path, result.filename)))
                .header('content-type', result.mimetype); // Important
        } catch (err) {
            reply(Boom.badRequest(err.message, err));
        }
    }
};

exports.routes = server => server.route(r);
