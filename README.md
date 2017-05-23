# Simple hapi uploader
Simple file uploader made with Hapi.js
### Current paths:
- **GET '/'** Returns app title just to check if API is online.
- **POST '/upload'** Route to upload file, accepts a '**file**' key.
- **GET '/files'** Returns array with all current files.
- **GET '/files/{id}'** Returns a single file or error if not found.
- **DELETE '/files/{id}'** Delete a single file.
- **POST '/reset'** Resets DB and deletes all files.
### Working Demo
A working demo can be found here:
[simple-hapi-uploader.herokuapp.com](https://simple-hapi-uploader.herokuapp.com/)

You can upload your files with **Postman** app or by creating a frontend that interacts with the
above API. A current working frontend made with **Vue** can be found here: [github.com/pggalaviz/simple-vue-uploader](https://github.com/pggalaviz/simple-vue-uploader)
