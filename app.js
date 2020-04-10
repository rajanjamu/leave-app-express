const express       = require('express'),
      bodyParser    = require('body-parser'),
      app           = express();

const indexRoutes   = require('./routes/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use(indexRoutes);
app.listen(process.env.PORT || 3000, console.log('Server running on 3000!'));