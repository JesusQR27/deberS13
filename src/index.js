const {engine}  = require('express-handlebars')
const flash = require('connect-flash')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const MySQLStore = require('express-mysql-session')
const {database_config} = require('./keys.js')
const session = require('express-session')//almacena informacion de la session en el servidor en el db tambien se puede
const passport = require('passport')

//init      
const app= express()
require('./lib/passport')

//settings 
app.set('port',process.env.PORT || 5000)
app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.set('views'), 'layouts'),
    partialsDir: path.join(app.set('views'), 'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars.js')
    })
)

//USAR MOTOR    
app.set('view engine', '.hbs')

//middelewares peticiones
app.use(session({
    secret : 'faztmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database_config)
}))
app.use(flash())    
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

//variables globales
app.use((req,res,next)=>{
    //hacer disponible el mensaje success para todas mis vistas
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user
    next();
})
 

//rutas  
app.use(require('./routers')) 
app.use(require('./routers/autenticacion')) 
app.use('/links',require('./routers/links'))
//public
app.use(express.static(path.join(__dirname,'public')))




//start sever
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
})