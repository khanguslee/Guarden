// Initialise server
const express = require('express');
const app = express();
var fs = require('fs');
var path = require('path');
var mongodb = require('mongodb');

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
app.use(bodyParser.json());
app.use(upload.any());

var db;
var mongodb_url = "mongodb://localhost:27017/sensor_data";
mongodb.MongoClient.connect(process.env.MONGODB_URI || mongodb_url, (err, client) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    db = client.db();
    console.log('Database connection ready!');

    // Initialise app
    var server = app.listen(PORT, () => {
        console.log("Example app listening at", server.address().port);
    });
})

// Endpoint for main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Endpoint to upload jpg file
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

// Endpoint to get image file
app.get('/image.jpg', (req, res) => {
    res.sendFile(path.resolve('./uploads/image.jpg'))
})

// Endpoint to get CSS file
app.get('/index.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.css'));
});

// Endpoint to get js file
app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.js'));
});

app.post('/api/sensor', (req, res) => {
    var data = req.body;
    console.log(data);
    res.end();
});
