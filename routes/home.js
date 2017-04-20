'use strict';

const r = {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Simple Hapi Uploader - Visit: https://github.com/pggalaviz/simple-hapi-uploader');
    }
};

exports.routes = server => server.route(r);
