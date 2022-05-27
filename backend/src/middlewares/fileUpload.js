const fileUpload = require('express-fileupload');

exports.Upload = fileUpload({
    useTempFiles: true,
    tempFileDir: './src/tmp'
})
