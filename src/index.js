import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
const LocalStrategy  = require('passport-local').Strategy;
import cors from 'cors';
import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);
app.use(cors());
//middleware
//parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

//passport config
app.use(passport.initialize());
let Account = require('./model/user');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//api routes v1
app.use('/v1', routes);

// Base URL test endpoint to see if API is running
app.get('/', (req, res) => {
  res.json({ message: 'API is ALIVE!' })
});

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

module.exports = {
  app
}