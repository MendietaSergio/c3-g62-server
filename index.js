var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const mongoose = require('mongoose')
var app = express();
var cors = require('cors')
//habilitar cors
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config()

app.use('/', indexRouter);
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
const DB_MONGO = "mongodb+srv://Dev_SM:Mongodb1908@cluster0.fa0tl.mongodb.net/DB_C3-G62?retryWrites=true&w=majority"; 
mongoose.connect(DB_MONGO,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error) => {
  if(error){
    console.log("ERROR EN LA CONEXIÓN");
    console.log(error);
  }else{
    console.log("*** BASE DE DATOS CONECTADO ***");
  }
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(process.env.PORT || 3001, () => {
  console.log("Servidor corriendo en ", 3001);
});

