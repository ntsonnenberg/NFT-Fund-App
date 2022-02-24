require("dotenv/config");

const Enforcer = require("openapi-enforcer");
const EnforcerMiddleware = require("openapi-enforcer-middleware");
const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const Accounts = require("./controllers/account");
const Funds = require("./controllers/fund");

const pool = new Pool({
  host: process.env.DB_URL,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log("Database connected");
  }
});

const app = express();

const openapiPath = path.resolve(__dirname, "../openapi.yaml");
const enforcer = Enforcer(openapiPath, { hideWarnings: true });
const enforcerMiddleware = EnforcerMiddleware(enforcer);

app.use(express.json());

app.use(enforcerMiddleware.init({ baseUrl: "/api" }));

enforcerMiddleware.on("error", (err) => {
  console.log(err);
  process.exit(1);
});

// app.use((req, res, next) => {
//   const { operation } = req.enforcer;

//   if (operation.security !== undefined) {
//     const sessionIsRequired = operation.security.find(
//       (obj) => obj.cookieAuth !== undefined
//     );

//     if (sessionIsRequired) {
//       const cookie = req.cookies.todoSessionId;

//       if (cookie === undefined || req.user === undefined) {
//         res.status(401).send();

//         return;
//       }
//     }
//   }

//   next();
// });

app.use(
  enforcerMiddleware.route({
    accounts: Accounts(pool),
    funds: Funds(pool),
  })
);

app.use(enforcerMiddleware.mock());

module.exports = app;
