const express = require('express');
const router = express.Router()

//de index digo que cuando haya un endpoint use las ruta que aqui pongo
const pool = require('../database');//db
const { isLoggedIn } = require('../lib/auth');


router.get('/add',isLoggedIn ,(req,res)=>{//agg la ruta /add despues de la ruta links ,endpoint ...links/add 
    res.render('links/add.hbs')//ruta del arc hbs a mostrar 
    //send coje un text y lo envia asi domas, render para que coja el cuerpo hbs de un arc, le paso el link
})


//agg link
router.post('/add',isLoggedIn , async (req,res)=>{
    //console.log(req.body);
    const {tilte , url,description} = req.body
    const newLink = {
        tilte,url,description,user_id: req.user.id
    }
    await pool.query('INSERT INTO links set ?',[newLink])
    req.flash('success', 'Link saved succefully')// aqui activo el success y puedo ejecutar la logica
    res.redirect('/links')
})

router.get('/',isLoggedIn ,  async (req,res)=>{
    const links = await  pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id])
    console.log(links);
    res.render('links/list.hbs', {links})
})


//eliminar
router.get('/delete/:id',isLoggedIn ,async (req,res)=>{
    const {id} = req.params
    await pool.query('DELETE FROM links WHERE ID = ?', id);
    req.flash('success','Deleted successfully') 
    res.redirect('/links')  
}) 

//actualizar
router.get('/edit/:id',isLoggedIn ,  async (req,res)=>{
    const {id} = req.params
    //id puede estar [id] pero no lo he probado
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id])
    console.log(links[0]);//devuelve el objeto 0 del arreglo de mi db
    res.render('links/edit.hbs', {link: links[0]});
    //{link:links} link es la variable de links[0]
    
})

router.post('/edit/:id', isLoggedIn , async (req,res)=>{
    const {id} = req.params
    const {tilte, description,url} = req.body    
    const newlinks = {
        tilte,description,url
    }
    pool.query('UPDATE links set ? WHERE id = ?',[newlinks,id])
    req.flash('success','Link updated successfully')
    res.redirect('/links')
})
module.exports = router