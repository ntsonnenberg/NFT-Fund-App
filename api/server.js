const Enforcer = require('openapi-enforcer');
const EnforcerMiddleware = require('openapi-enforcer-middleware');
const express = require('express');
const path = require('path');
const { Http2ServerRequest } = require('http2');

const app = express();

const openapiPath = path.resolve(__dirname, '../openapi.yaml');
const enforcer = Enforcer(openapiPath, { hideWarnings: true });
const enforcerMiddleware = EnforcerMiddleware(enforcer);

app.use(express.json());
app.use(express.text());

app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path, req.headers, req.body);
    next();
});

app.use(enforcerMiddleware.init({ baseUrl: '/api' }));

/*
app.post('/accounts', (req, res) => {
    if (req.enforcer.body) {
        res.enforcer.status(201).send('Account created');
    } else {
        res.enforcer.status(400).send('Invalid request.');
    }
});

app.delete('/account/:accountId', (req, res) => {
    let accoundId = req.enforcer.params;

    if (accoundId) {
        res.enforcer.status(204).send('Account deleted.');
    } else {
        res.enforcer.status(401).send('Not authenticated.');
    }
});

app.put('/account/:accountId/login', (req, res) => {
    let accoundId = req.enforcer.params;

    if (accoundId) {
        res.enforcer.status(204).send('Account deleted.');
    } else {
        res.enforcer.status(401).send('Not authenticated.');
    }
});

app.put('/account/:accountId/logout', (req, res) => {
    let accountId = req.enforcer.params;

    if (accountId) {
        res.enforcer.status(200).send('Logged out.');
    } else {
        res.enforcer.status(403).send('Access denied.');
    }
});

app.post('/funds', (req, res) => {
    if (req.body) {
        res.enforcer.status(201).send(req.body);
    } else {
        res.enforcer.status(400).send('Invalid request.');
    }
});

app.get('/funds/:fundId', (req, res) => {
    let fundId = req.enforcer.params;

    if (fundId && req.body) {
        res.enforcer.status(200).send(req.body);
    } else {
        res.enforcer.status(400).send('Invalid request.');
    }
});

// Catch errors.
enforcerMiddleware.on('error', err => {
    console.error(err);
    process.exit(1);
});


app.use(enforcerMiddleware.route({
    // 
    accounts: {
        async createAccount (req, res) {
            const user = req.body;
            console.log('inside create account function')

            if (user) {
                res.enforcer.status(201).send('Account created.');
            } else {
                res.enforcer.status(400).send('Invalid request.');
            }
        },
        async deleteAccount (req, res) {
            const accoundId = req.enforcer.params;

            if (accoundId == "1") {
                res.enforcer.status(204).send('Account deleted.');
            } else {
                res.enforcer.status(401).send('Not authenticated.');
            }
        }
    }
}));*/

app.use(enforcerMiddleware.mock());

module.exports = app;