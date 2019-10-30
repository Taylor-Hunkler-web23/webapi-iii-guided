const express = require('express'); // importing a CommonJS module

const helmet = require('helmet');

const morgan = require ('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//
// function log (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// }

//the three amigos
// function dateLogger(req, res, next){
// console.log(new Date().toISOString())

//   next();
// }

//global middleware


// function gateKeeper(req, res, next) {
  // data can come in the body, url parameters, query string, headers
  // new way of reading data sent by the client


  // change the gatekeeper to return a 400 if no password is provided and a message
// that says please provide a password
// if a password is provided and it is mellon, call next, otherwise return a 401
// and the you shall not pass message
function gateKeeper(req, res, next) {
  // data can come in the body, url parameters, query string, headers
  // new way of reading data sent by the client
  const password = req.headers.password || '';
  if (password.toLowerCase() === 'mellon') {
    next();
  } 
  else if(password === ''){
  res.status(400).json({ you: 'please provide a password' });
}
  else  {
    res.status(401).json({ you: 'shall not pass' });
  }
}


server.use(helmet());// third party
server.use(express.json());//built in
server.use(gateKeeper);
server.use(morgan('dev'));
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
