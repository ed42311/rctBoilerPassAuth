import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

const port = process.env.PORT || '3000'
const config =
  process.env.NODE_ENV === "production" ?
   {
    "dbUri" : process.env.MONGODB_URI,
    "jwtSecret" : process.env.JWT_SECRET
   }
   :
   require('./config');

const app = express();

require('./server/models').connect(config.dbUri);
app.use('/', express.static(__dirname));

// app.use(express.static('./server/static/'));
// app.use(express.static('./client/dist/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.set('port', port);

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
