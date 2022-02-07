const Enforcer = require('openapi-enforcer');
const EnforcerMiddleware = require('openapi-enforcer-middleware');
const express = require('express');
const path = require('path');
const { Http2ServerRequest } = require('http2');

exports.server = async function () {
    const app = express();

    const openapiPath = path.resolve(__dirname, '../openapi.yaml');
    const enforcer = await Enforcer(openapiPath, { hideWarnings: true });
    const enforcerMiddleware = EnforcerMiddleware(enforcer);

    app.use(express.json())

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

    app.use(enforcerMiddleware.route({
        // The "users" is mapped via "x-controller" value.
        accounts: {
            async login (req, res) {
                const user = function () {
                    return {
                        id: 1,
                        username: 'ntsonnenberg',
                        password: 'password-here',
                        isManager: false
                    }
                }

                res.enforcer.send(user);
            }
        }
    }));

    app.use(enforcerMiddleware.mock());

    return app;
}