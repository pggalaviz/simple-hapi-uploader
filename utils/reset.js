'use strict';

const Config = require('../config');
const del = require('del');

const reset = function (folderPath) {
    del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

module.exports = reset;
