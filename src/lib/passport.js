const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const  pool = require('../database.js')
const helpers = require('../lib/helpers.js')


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'contraseña',
    passReqToCallback:true,

}, async (req,username,contraseña,done)=>{
    console.log(username);
    console.log(req.body);
    console.log(contraseña);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?',[username])
    if(rows.length > 0){
        const user = rows[0]
        const valid_password = await helpers.matchPassword(contraseña,user.contraseña)
        if(valid_password){
            done(null, user,req.flash('success',`Welcome ${user.username}`))
        }else{
            done(null,false,req.flash('message','contraseña incorrecta'))
        }
    }else{
        return done(null,false,req.flash('message','El usuario no existe '))
    }
}
))


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'contraseña',
    //password es en el nombre de name de mi input de la contra 
    passReqToCallback:true,
},  async (req,username,contraseña,done)=> {
    const {fullname} = req.body
    const newUser = {
        username,
        contraseña,
        fullname    
    }
    newUser.contraseña = await helpers.encryptPassword(contraseña)     
    const result = await pool.query('INSERT INTO users SET ?',[newUser])
    console.log(result);
    newUser.id = result.insertId;
    return done(null,newUser)
}
))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id = ?',[id])
    done(null,rows[0])
})


