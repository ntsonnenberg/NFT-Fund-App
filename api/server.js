require("dotenv/config");

const Enforcer = require("openapi-enforcer");
const EnforcerMiddleware = require("openapi-enforcer-middleware");
const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const Accounts = require("./controllers/account");
const Authentication = require("./controllers/authentication");
const Funds = require("./controllers/fund");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const DatabaseAccounts = require("./database/account");
const PgSession = require("connect-pg-simple")(session);

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

passport.use(
  new LocalStrategy((username, password, done) => {
    DatabaseAccounts.getAccountByUsername(pool, username)
      .then(async (account) => {
        if (account === undefined) {
          done(null, false);
        } else {
          const match = await bcrypt.compare(password, account.password);

          if (match) {
            done(null, {
              id: account.account_id,
              username: account.username,
              isManager: account.is_manager,
            });
          } else {
            const hash = await bcrypt.hash(password, 10);
            const m2 = await bcrypt.compare(password, hash);

            done(null, false);
          }
        }
      })
      .catch((err) => {
        done(err, null);
      });
  })
);

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     if (username && password === "pass") {
//       return done(null, { username: username });
//     }

//     return done(null, false);
//   })
// );

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((id, done) => {
  done(null, JSON.parse(id));
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

app.use(
  session({
    store: new PgSession({
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2592000000, // 30 days written in milliseconds
    },
  })
);

// app.use(
//   session({ secret: "secret key", resave: false, saveUninitialized: true })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  const { operation } = req.enforcer;

  if (operation.security !== undefined) {
    const sessionIsRequired = operation.security.find(
      (obj) => obj.cookieAuth !== undefined
    );

    if (sessionIsRequired && !req.user) {
      res.sendStatus(401);
      return;
    }
  }

  next();
});

app.use(
  enforcerMiddleware.route({
    accounts: Accounts(pool),
    authentication: Authentication(passport),
    funds: Funds(pool),
  })
);

app.use(enforcerMiddleware.mock());

module.exports = app;
