const express = require('express');
const router = express.Router()


//send es muestra en pantalla 'form ejemplo'
//renderzar una arc hbs con res.render
router.get('/', (req, res)=> {
    res.render('index')
})


module.exports = router