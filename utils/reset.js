'use strict';

const Config = require('../config');
const del = require('del');

// Delete (reset) items on uploads path
const reset = function (folderPath) {
    del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

module.exports = reset;
