'use strict';

const Config = require('../config');
const uuid = require('uuid');
const fs = require('fs');

const uploader = function(file, options) {
    // Check if a file is selected for upload.
    if (!file) {
        throw new Error('No file to upload');
        return;
    }
    return _fileHandler(file, options);
};

const _fileHandler = function(file, options) {
    const originalname = file.hapi.filename; // Get file original name
    const filename = `${uuid.v1()}.${_extension(originalname)}`; // Create a unique file name
    const path = `${options.dest}${filename}`; // Set Path

    // Check if just images can be uploaded (from configuration), otherwise write file.
    if (Config.db.imagesOnly && _imageFilter(originalname)) {
        throw new Error('This type of file is invalid, try with an image.'); 
        return;
    } else {
        // Write file on disk
        const filestream = fs.createWriteStream(path);
        // Return file data
        return new Promise((resolve, reject) => {
            file.on('error', function (err) {
                reject(err);
            });
            file.pipe(filestream);
            file.on('end', function(err) {
                const fileDetails = {
                    fieldname: file.hapi.name,
                    originalname: file.hapi.filename,
                    filename: filename,
                    mimetype: file.hapi.headers['content-type'],
                    destination: `${options.dest}`,
                    path: path,
                    size: fs.statSync(path).size,
                }
                resolve(fileDetails);
            });
        });
    }
};

// Filter just image type files.
const _imageFilter = function (fileName) {
    if(fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
        return false;
    }
    return true;
};

// Get file extension.
const _extension = function(fileName) {
    const arr = fileName.split('.');
    const last = arr.length - 1;
    return arr[last];
}

module.exports = uploader;
