const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
})

var server = app.listen(PORT, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at ", port);
})