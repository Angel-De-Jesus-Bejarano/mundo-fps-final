//Archivos controladorde rutas

const express = require('express');

var router = express.Router();

//importar models  de bbd(models)
const Alumnos = require('../models/Alumnos');

//callbacks de rutas


//ruta index
router.get('/colecciones', async (req , res) =>{
    const listaRegistro = await Alumnos.find();
    console.log('Los registros en  bdd: ' + listaRegistro);
    res.render('index', {
        listaRegistro
    });
});

//callback ruta Formulario
router.get('/Formulario' , (req , res) => {
    res.render('Formulario');
});

//callback para controlar la ruta add
router.post('/add', async (req , res) => {
    console.log(new Alumnos(req.body));
    const objAlumnos = new Alumnos(req.body);
    await objAlumnos.save();
    res.render('Formulario' , {
        mensaje : 'Los datos han sido guardados'
    });
});

//callback para editar (1)
router.get('/Edicion' , async (req,res) =>{
    const listaRegistro = await Alumnos.find();
    res.render('Edicion',{
        listaRegistro
    });
});

//callback para editar(2)
router.get('/Edicion/:id' , async (req , res)=>{
    const { id } = req.params;
    const listaRegistro = await Alumnos.find();
    const Alumno = await Alumnos.findById({_id : id});
    res.render('Actualizar_info', {
        Alumno
    });
});

//callback para editar(3)
router.post('/Edicion/:id' , async (req , res) =>{
    const { id } = req.params;
    await Alumnos.updateOne({_id : id} , req.body);
    res.redirect('/colecciones');
});

//callback para eliminar (1)
router.get('/Eliminar' , async (req,res) =>{
    const listaRegistro = await Alumnos.find();
    res.render('Eliminar',{
        listaRegistro
    });
});

//callback para eliminar (2)
router.get('/Eliminar/:id' , async (req , res) =>{
    const id = req.params.id;
    await Alumnos.remove({_id : id});
    res.redirect('/Eliminar');
});


//exportar
module.exports = router;