'use strict';

const jwksClient = require('jwks-rsa');

const client = jwksCLient({
  jwksUri: 'https://anvayb.us.auth0.com/.well-known/jwks.json'
});

module.exports = (header, callback) => {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}