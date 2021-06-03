'use strict';

const { AccessToken } = require('twilio');

function createAccessToken(identity, options) {
  options = options || {};
  // we want to extract the room name
  const arr = identity.split('_');

  // found environment variables mismatch - add TWILIO prefix
  //console.log('AccountSid=' + process.env.TWILIO_ACCOUNT_SID)

  const accessTokenGenerator = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    options);
  accessTokenGenerator.identity = identity;
  accessTokenGenerator.addGrant(new AccessToken.VideoGrant());
  return accessTokenGenerator.toJwt();
}

module.exports = createAccessToken;
