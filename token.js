'use strict';

const { AccessToken } = require('twilio');

function createAccessToken(identity, options) {
  options = options || {};
  // we want to extract the room name
  const arr = identity.split('_');
  const roomname = arr[1].toUpperCase();
  const room1 = (process.env.DOROTHY_ROOM_1).toUpperCase();
  const room2 = (process.env.DOROTHY_ROOM_2).toUpperCase();
  const room3 = (process.env.DOROTHY_ROOM_3).toUpperCase();

  console.log('roomname:' + roomname);
  console.log('room2:' + room2);

  if (!(roomname === room1 || roomname === room2 || roomname === room3)) {
    // room is not validated, so abort and return error
    return 'error: not validated';
  }


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
