const express       = require('express'),
      bodyParser    = require('body-parser'),
      app           = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(process.env.PORT || 3000, console.log('Server running on 3000!'));