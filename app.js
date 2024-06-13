const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const db = require('./models');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const investorRoutes = require('./routes/investorRoutes');
const cardOwnerRoutes = require('./routes/cardOwnerRoutes');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config/config').development;
const authController = require('./controllers/authController');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(session({ secret: process.env.JWT_SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: config.googleCallbackURL
}, async (accessToken, refreshToken, profile, done) => {
    await authController.googleAuth(profile, done);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/investor', investorRoutes);
app.use('/api/card-owner', cardOwnerRoutes);

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
