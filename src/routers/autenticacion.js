const express = require('express');
const router = express.Router()
const passport = require('passport');
const {isLoggedIn,notLoggedIn} = require('../lib/auth')

router.get('/signup', notLoggedIn,(req,res) => {
    res.render('auth/signup')
})

router.post('/signup',notLoggedIn,passport.authenticate('local.signup',{
    successRedirect:'/profile',
    failureRedirect:'/signup',
    failureFlash:true
}))

router.get('/signin',notLoggedIn,(req,res)=>{
    res.render('auth/signin')
})

router.post('/signin',notLoggedIn,(req,res)=>{
    passport.authenticate('local.signin',{
        successRedirect:'/profile',
        failureRedirect:'/signin',
        failureFlash:true
    })(req,res)
})



//aplicar una funcion qu ejecute una funcion, si va vien renderiza mi vista
router.get('/profile',isLoggedIn ,(req, res)=>{
    res.render('profile')}
)
// router.post('/signup', (req,res)=>{
//     res.send('recivido')
//     console.log(req.body);
// })
router.get('/logout',isLoggedIn,(req,res)=>{
    req.logOut()
    res.redirect('/signin')
})


module.exports = router