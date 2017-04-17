
'use strict';

const Boom = require('boom');
const fs = require('fs');
const path = require('path');
const Config = require('../config');
const loadCollection = require('../utils/loadCollection');

const r = {
    method: 'DELETE',
    path: '/files/{id}',
    handler: async function(request, reply){
        try {
            const db = request.server.app.db;
            const col = await loadCollection(Config.db.collection, db);
            const file = col.get(request.params['id']);

            if (!file) {
                reply(Boom.notFound());
                return;
            }

            // Delete file
            const _path = `${Config.db.path}/${file.filename}`;
            fs.unlinkSync(_path);

            // Delete file from DB
            const result = col.remove(file);
            db.saveDatabase();

            reply({
               "statusCode": 200,
               "message": "File deleted successfully",
               "fileName": result.filename,
            });
            
        } catch (err) {
            reply(Boom.badRequest(err.message, err));
        }
    }
};

exports.routes = server => server.route(r);
