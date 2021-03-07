const express = require('express');
const storage = require('node-persist');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use((error, req, res, next) => {
  return res.status(500).json({ error: error.toString() });
});

const checkJwt = jwt({
  // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Retrieve current user count
app.get('/', checkJwt, async (req, res) => {
  try {
    await storage.init();
    const userCount = await storage.getItem('userCount');
    res.send({userCount: userCount});
  } catch (error) {
    next(error);
  }
});


// Increase the user count
app.post('/', checkJwt, async (req, res) => {
  try {
    await storage.init();
    let oldUserCount = await storage.getItem('userCount') || 0;
    oldUserCount++;
    const newUserCount = await storage.setItem('userCount', oldUserCount);
    const userCount = newUserCount.content.value;
    res.send({userCount});
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
