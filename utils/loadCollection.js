'use strict';

// Load collection or create one
const loadCollection = function(colName, Loki) {
    return new Promise(resolve => {
        Loki.loadDatabase({}, () => {
            const _collection = Loki.getCollection(colName) || Loki.addCollection(colName);
            resolve(_collection);
        });
    });
};

module.exports = loadCollection;
