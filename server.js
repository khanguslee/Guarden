// Initialise server
const express = require('express');
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
const PORT = process.env.PORT || 5000;

app.use(
    bodyParser({
        uploadDir:'./temp/images'
    })
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/api/upload', (req, res) => {
    var temp_path = req.files.file.path,
    target_path = path.resolve('./uploads/image.jpg');
    if (path.extname(req.files.file.name).toLowerCase() === '.jpg') {
        fs.rename(temp_path, target_path, (err) => {
            if (err) throw err;
            console.error("Upload completed!");
        });
    } else {
        fs.unlink(temp_path, () => {
            if (err) throw err;
            console.error("Only .jps files are allowed!");
        })
    }
});

app.get('/image.png', (req, res) => {
    res.sendfile(path.resolve('./uploads/image.jpg'))
})

var server = app.listen(PORT, () => {
    console.log("Example app listening at ", PORT);
});