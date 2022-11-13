// Se declaran las variables para cada modulo que se va a utilizar

const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const exp = require('constants');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// Inicializar
const app = express();
require('./database');
require('./passport/local-auth');

// Configuraciones del servidor para ser usado en el puerto 3000
app.set('views',path.join(__dirname,'views')); 
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false

}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');

    next();

});

//Rutas
app.use('/',require('./routes/index'));
require('./routes/index');


app.listen(app.get('port'), ()=>{
    console.log('Servidor en PUERTO', app.get('port'));
});