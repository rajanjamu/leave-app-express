const methodOverride        = require('method-override'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      express               = require('express'),
      app                   = express(),
      flash                 = require('connect-flash'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose');

      
// ROUTES
const indexRoutes   = require('./routes/index');

// App Config
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use(indexRoutes);
app.listen(process.env.PORT || 3000, console.log('Server running on 3000!'));