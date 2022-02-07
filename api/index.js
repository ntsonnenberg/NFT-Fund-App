/*
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path);
    next();
});

app.use(express.json());

app.use(express.text());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    const contentType = req.header('Content-Type');

    if (contentType === 'application/json' || contentType === 'text/plain') {
        console.log('Request Body: ', req.body);
        res.send('Content Type: ' + contentType + '\n' +
            'Request Body: ' + JSON.stringify(req.body));
    } else {
        res.sendStatus(400);
    }
});

app.listen(3001, () => {
    console.log('Listening on port 3001');
});
*/

///*
const app = require('./server');

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
//*/