const methodOverride        = require('method-override'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      express               = require('express'),
      app                   = express(),
      flash                 = require('connect-flash'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose');

// MODELS
const User  = require('./models/user'),
      Leave = require('./models/leave');

// ROUTES
const indexRoutes   = require('./routes/index'),
      leaveRoutes   = require('./routes/leave');

// App Config
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/leave_app', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(flash());

// Passport Configurations
app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use(leaveRoutes);
app.listen(process.env.PORT || 3000, console.log('Server running on 3000!'));