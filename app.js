const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan'); //(Morgan sirve para hacer LOGs de las peticiones en la consola, solo lo ejecuto en desarrollo)
const exphbs = require('express-handlebars'); //Mi manejador de vistas
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); //para q no se caiga la seccion cada vez q reconecta
const connectDB = require('./config/db'); //Mi Js con la funcion de coneccion a la BD

//Para cargar la configuraciones
dotenv.config({ path: './config/config.env' });

//LLamo a la configuracion de passport
require('./config/passport')(passport); //paso passport como parametro al JS

connectDB(); //llamo al config/db.js que tiene la funcion de coneccion con la BD

// Inicializar la app
const app = express();

//(Morgan sirve para hacer LOGs de las peticiones en la consola, solo lo ejecuto en desarrollo)
if (process.env.NODE_ENV === 'desarrollo') {
    app.use(morgan('dev'))
};

// Register `hbs.engine` with the Express app.
app.engine('.hbs', exphbs({ defaulLayout: 'main', extname: '.hbs' })); //el parametro extname me deja usar la extencion hbs
app.set('view engine', '.hbs');

//inicializo el EXPRESS-SESSION
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }))

//Inicio el midleware de passport para los logins de usuario:
app.use(passport.initialize());
app.use(passport.session());

//Definicion de archivos estaticos:
//Una guia de esto: https://expressjs.com/es/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));

//Definicion de rutas
app.use('/', require('./routes/index')); //Para lo q empiece con / uso index
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT;

app.listen(
    PORT,
    console.log(`Servidor en puerto ${PORT} en ambiente ${process.env.NODE_ENV}`)
);