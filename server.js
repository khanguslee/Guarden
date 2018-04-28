// Initialise server
const express = require('express');
const app = express();
var fs = require('fs');
var path = require('path');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, "image.jpg")
    }
});
var upload = multer({dest: '/uploads/', storage: storage});
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser({extended: false}));
app.use(upload.any());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/api/upload', (req, res) => {
    var filename = req.files[0].filename;
    var file = path.join(__dirname, filename);
    fs.readFile(file, (err, data) => {
        fs.writeFile(file, data, (err) => {
            if (err){
                console.log(err);
            } else {
                response = {
                    message: "File uploaded successfully",
                    filename:   "image.jpg"
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
});

app.get('/image.png', (req, res) => {
    res.sendFile(path.resolve('./uploads/image.jpg'))
})

var server = app.listen(PORT, () => {
    console.log("Example app listening at ", PORT);
});