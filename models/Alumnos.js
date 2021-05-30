
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//esquema de base de datos

 const AlumnoSchema = new Schema({
     nombre : String,
     apellido: String,
     pais: String,
     correo: String,
     comentario : String
 });



 module.exports = mongoose.model('Alumnos' , AlumnoSchema);
