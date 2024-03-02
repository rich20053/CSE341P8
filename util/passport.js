const GoogleStrategy = require ("passport-google-oauth20").strategy;


/*/ Configure Google OAuth 2.0 Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback'
  },
  (accessToken: any, refreshToken: any, profile: any, done: any) => {
    // Handle user authentication
    // This function is called after successful authentication
    // You can save user information to your database here
    return done(null, profile);
  }
));*/