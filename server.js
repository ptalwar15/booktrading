
//CALL THE PACKAGES --------------------
var express = require('express');
app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config.js');
var path = require('path');

//APP CONFIGURATION
//use body-parser so we can grab information from post requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configure our app to handle CORS requests
app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
 Authorization');
   next();
 });

 //log all our requests to console
 app.use(morgan('dev'));

//DB Configuration
var User = require('./app/models/user.js');
mongoose.connect(config.database);
//logging to file=========================================

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
//end of logging to a file==================================
 // ROUTES FOR OUR API
 // =============================

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

 // API ROUTES ------------------------
 var userApiRoutes = require('./app/routes/userApi')(app, express);
 app.use('/api', userApiRoutes);

 var bookApiRoutes = require('./app/routes/bookApi')(app, express);
 app.use('/api', bookApiRoutes);

 // MAIN CATCHALL ROUTE --------------- 
 // SEND USERS TO FRONTEND ------------
 // has to be registered after API ROUTES
 app.get('*', function(req, res) {
   res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
 });


 // START THE SERVER
 // ===============================
 app.listen(config.port);
 console.log('Magic happens on port ' + config.port);