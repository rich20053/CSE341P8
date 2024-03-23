const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');

dotenv.config();

  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: 'https://dev-eoeqs0i46b7m7dfa.us.auth0.com'
  };

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/api-docs', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    // Session is authenticated, proceed with the request
    next();
  } else {
    // Session not authenticated
    return res.status(401).json({ error: 'Unauthorized' });
  }
});