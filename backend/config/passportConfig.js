const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const UserRoles = require('../utils/UserRoles');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const { id, displayName, emails } = profile;
                const email = emails[0].value;

                // Find or create user in database
                let user = await User.findOne({ googleId: id });
                if (!user) {
                    user = await User.create({ googleId: id, name: displayName, email, role: UserRoles.BUYER });
                }

                done(null, user); // Attach user to req.user
            } catch (error) {
                done(error, null); // Handle error
            }
        }
    )
);

// Serialize user to store user ID in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user to retrieve user from database
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
