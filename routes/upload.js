'use strict';

const Boom = require('boom');
const Config = require('../config');
const uploader = require('../utils/uploader');
const loadCollection = require('../utils/loadCollection');

const r = {
    method: 'POST',
    path: '/upload',
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data',
        },
        handler: async function (request, reply) {
            try {
                const db = request.server.app.db;
                const data = request.payload;
                const file = data['file'];
                const fileOptions = {
                    dest: `${Config.db.path}/`,
                };
                // Upload file
                const fileDetails = await uploader(file, fileOptions);
                // Save data to database
                const col = await loadCollection(Config.db.collection, db);
                const result = col.insert(fileDetails);
                db.saveDatabase();

                reply({
                    id: result.$loki,
                    fileName: result.filename,
                    originalName: result.originalname,
                    size: result.size,
                });

            } catch (err) {
                reply(Boom.badRequest(err.message, err));
            };
        },
    },
};

exports.routes = server => server.route(r); 
