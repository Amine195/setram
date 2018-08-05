// Package required
const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');

// Connect to the db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/setram', {useNewUrlParser:true});

// Testing Connection with db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database is connected')
});

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Call Helpers
const {select} = require('./helpers/handlebars-helpers');

// Set View Engine
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select}}));
app.set('view engine', 'handlebars');

// Morgan Middleware
app.use(logger('dev'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Method Override Middleware
app.use(methodOverride('_method'));

// Load Route
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');

// Use Route
app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);

// Server listen
app.listen(3000, ()=>{
    console.log(`listening on port 3000`);
});