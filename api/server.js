const Enforcer = require('openapi-enforcer');
const EnforcerMiddleware = require('openapi-enforcer-middleware');
const express = require('express');
const path = require('path');

exports.server = async function () {
    const app = express();

    const openapiPath = path.resolve(__dirname, '../openapi.yml');
    const enforcer = await Enforcer(openapiPath, { hideWarnings: true });
    const enforcerMiddleware = EnforcerMiddleware(enforcer);

    app.use(exporess.json())

    app.use((req, res, next) => {
        console.log(req.method + ' ' + req.path, req.headers, req.body);
        next();
    });

    app.use(enforcerMiddleware.init());

    // Catch errors.
    enforcerMiddleware.on('error', err => {
        console.error(err);
        process.exit(1);
    });

    app.use(enforcerMiddleware.mock());

    return app;
}