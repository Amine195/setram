// Package required
const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

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
const {select, generateTime} = require('./helpers/handlebars-helpers');

// Set View Engine
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, generateTime: generateTime}}));
app.set('view engine', 'handlebars');

// Upload Middleware
app.use(upload());

// Morgan Middleware
app.use(logger('dev'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Method Override Middleware
app.use(methodOverride('_method'));

// Session & Flash Middleware
app.use(session({
  secret: 'sqlplus8041999220473',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Local Variables Using Middleware
app.use((req, res, next) =>{
  res.locals.success_message = req.flash('success_message');
  next();
});

// Load Route
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');

// Use Route
app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.use('/admin/categories',categories);

// Server listen
app.listen(3000, ()=>{
    console.log(`listening on port 3000`);
});