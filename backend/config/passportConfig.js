const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const { id, displayName, emails } = profile;
                const email = emails[0].value;

                // Check if a user exists with this email
                let user = await User.findOne({ email });

                if (user) {
                    // If user exists but does not have Google ID, link it
                    if (!user.googleId) {
                        user.googleId = id;
                        await user.save();
                    }
                } else {
                    // Create a new user if no account exists
                    user = await User.create({
                        googleId: id,
                        name: displayName,
                        email,
                        role: 'buyer',
                    });
                }

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

// Facebook Strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
            profileFields: ['id', 'displayName', 'emails'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const { id, displayName, emails } = profile;
                const email = emails ? emails[0].value : null;

                if (!email) {
                    return done(new Error('Facebook did not provide an email address'), null);
                }

                // Check if a user exists with this email
                let user = await User.findOne({ email });

                if (user) {
                    // If user exists but does not have Facebook ID, link it
                    if (!user.facebookId) {
                        user.facebookId = id;
                        await user.save();
                    }
                } else {
                    // Create a new user if no account exists
                    user = await User.create({
                        facebookId: id,
                        name: displayName,
                        email,
                        role: 'buyer',
                    });
                }

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
