'use strict';

const r = {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Simple Hapi Uploader');
    }
};

exports.routes = server => server.route(r);
