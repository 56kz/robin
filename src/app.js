const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();


//importar routes
const customerRoutes = require('./routes/customer');


//port
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//middleware
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: 3306,
  database: 'bancoderobin'
}, 'single'));
app.use(express.urlencoded({ extended: false}));





//customerRoutes
app.use('/', customerRoutes);

//Startrting server
app.listen(app.get('port'), () => {
  console.log('Server on port 3000');
})
