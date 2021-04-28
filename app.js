'use strict';

const express = require('express');
const path = require('path');
const createAccessToken = require('./token');

require('dotenv').load();

const app = express();

app.use(express.static('public'));

// start of token handling 
function createToken(req) {
  const urlParameters = req.query;
  const identity = urlParameters.identity;

  //identity is aka user name eg Jon
  //console.log('tokenID:' + identity);

  const options = {};
  if (typeof urlParameters.ttl === 'string') {
    options.ttl = parseInt(urlParameters.ttl);
  }

  return createAccessToken(identity, options);
}

function handleAccessTokenRequest(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(createToken(req));
}

app.get('/token', handleAccessTokenRequest);
// end of token handling

app.get('/dorothy', (req, res) => {
	// check dotenv loads data ok
	//res.send(`Hello dorothy on sid ${process.env.TWILIO_ACCOUNT_SID}`);
	// check path resolution
	//res.send(`Hello dorothy __dirname=${__dirname}`);
	// point at client side files, defaults to index.html 
	res.redirect(302, '/dorothy');
});

app.get('/', (req, res) => {
	res.send(`
		<html>
		  <head>
			<title>J B Data Solutions</title>
		  </head>
		  <body>
			<p>
				Holding page for<br/><br/>
				Jon Beckett<br/>
				J B Data Solutions<br/>
				Bay House<br/>
				Stonegate, Whixley<br/>
				York YO26 8AS<br/>
				M 07714 071186<br/>
				O 01423 330746<br/>
				E sales@jbds.co.uk<br/>
			</p>
		  </body>
		</html>
	`);
});

app.listen();