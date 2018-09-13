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
const passport = require('passport');

// Config database
const {mongoDbUrl} = require('./config/database');

// Connect to the db
mongoose.Promise = global.Promise;
mongoose.connect(mongoDbUrl, {useNewUrlParser:true});

// Testing Connection with db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database is connected')
});

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Call Helpers
const {select, generateTime, paginate} = require('./helpers/handlebars-helpers');

// Set View Engine
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, generateTime: generateTime, paginate: paginate}}));
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

// Passport Midlleware
app.use(passport.initialize());
app.use(passport.session());



// Local Variables Using Middleware
app.use((req, res, next) =>{
  res.locals.user = req.user || null;
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.form_errors = req.flash('form_errors');
  res.locals.error = req.flash('error');
  next();
});

// Load Route Admin
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');
const comments = require('./routes/admin/comments');
const users = require('./routes/admin/users');
const constats = require('./routes/admin/constats');
const pasfs = require('./routes/admin/pasfs');
// Load Route User
const home = require('./routes/home/index');
const auth = require('./routes/user/auth');

// Use Route
app.use('/',home);
app.use('/auth',auth)
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.use('/admin/categories',categories);
app.use('/admin/comments',comments);
app.use('/admin/users',users);
app.use('/admin/constats',constats);
app.use('/admin/pasfs',pasfs);

// Server listen
app.listen(3000, ()=>{
    console.log(`listening on port 3000`);
});