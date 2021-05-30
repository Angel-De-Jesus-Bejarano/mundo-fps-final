
const express = require('express')
const app = express();
const indexRoutes = require('./routes/index');
const fs = require('fs');
const bodyParser = require('body-parser');

var mongoose = require('mongoose');

const port = process.env.port || 4000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }))
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //definimos ejs como motor de plantillas
app.use('/', indexRoutes);

app.get('/', function (req, res) {
    res.send('SERVIDOR CORRECTO!');
})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Benji:duquehpta@cluster0.mrzmk.mongodb.net/prueba?retryWrites=true&w=majority', 
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: true
                },
                (error) => {
                    if(error) {
                        throw error
                    }
                    console.log("NICE");
                })
    
app.post('/Mostrarnumeros', (req, res) => {
    let num = req.body.numero;
    num = parseInt(num);
    let TablaMulti = ` Tabla multiplicar\n `;
    for (let i = 1; i < 11; i++) {
        TablaMulti += `${num} X ${i} = ${num * i} \n`;

    }

    fs.writeFile('ArchivoNuevo.txt', TablaMulti, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Archivo de texto , creado y guardado!!');
        }
    });

    //Mostrar Tabla en el index.html
    let TablaWeb = ` <h1>RESULTADO TABLA</h1>\n`;
    for (let i = 1; i < 11; i++) {
        TablaWeb += `<p>${num} X ${i} = ${num * i}</p><br>`;
    }


    res.send(`<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <link rel="preconnect" href="https://fonts.gstatic.com">
       <link href="https://fonts.googleapis.com/css2?family=Electrolize&display=swap" rel="stylesheet">
       <link rel="preconnect" href="https://fonts.gstatic.com">
       <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">
       <link rel="preconnect" href="https://fonts.gstatic.com">
       <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet">
   
       <link rel="stylesheet" href="assets/css/Normalize.css">
       <link rel="stylesheet" href="assets/css/modelado.css">
   
   </head>
   <body>
       <header class="header-inicio">
           <div class="header">
               <div class="contenedor contenido-header">
                   <div class="menu-barra">
                       <div class="organizacion-logo">
                           <h1>MundoFPS</h1>
                           <a href="index.html">
                               <img src="assets/Imagenes/logo.png" alt="">   
                           </a>
                       </div>
                       
                       <nav class="navegacion">
                           <a href="">Categorias</a>
                           <a href="">Noticias </a>
                           <a href="">Comunidad</a>
                           <a href="">Mas</a>
                           <a href="Tabla.html">TablaX</a>
                       </nav>
                   </div>
               </div>
           </div>
   
       </header>
   
       <main class="contenedor contenedor-resultado borde-cajas">
       
        
         <div class="contenedor-form tabla-resultado borde-cajas">
             <p> ${TablaWeb}</p>
 
             <h2 class="texto-centrado">IMPORTANTE</h2>
             <p>
             Archivo Txt generado!<br> Contenido : Tabla de Multiplicar 
             <br> Ubicacion : carpeta principal del proyecto(MundoFps) 
             </p>
             <a class="hover" href="Tabla.html">
                 <img src="assets/Imagenes/Icono-Regreso.png" alt="">
             </a>
 
         </div>
           
           
           
       </main>
       
       <footer class="sitio-footer borde-cajas ">
   
           <div class="contenedor-footer">
               <nav class="navegacion">
               <a href="">Categorias</a>
               <a href="">Noticias </a>
               <a href="">Comunidad</a>
               <a href="">Mas</a>
               </nav>
           </div>
           <div class="redes-sociales">  
               <h4>Siguenos en nuestras redes sociales : </h4>
               <a href="">
                   <img src="assets/Imagenes/facebook.png" alt="">        
               </a>
               <a href="">
                   <img src="assets/Imagenes/twitter.png" alt="">
               </a>
              <a href="">
                   <img src="assets/Imagenes/instagram.png" alt="">
               </a>
               <a href="">
                   <img src="assets/Imagenes/whatsapp.png" alt="">
               </a>
               <a href="">
                   <img src="assets/Imagenes/youtube.png" alt="">
               </a>
   
           </div> 
           <p class="copyrigth">Todos los derechos reservados &copy;</p>
           
       </footer>
      
        
       </script>
   </body>
   </html>`
    );

});

app.listen(port, () => {
    console.log(`servidor corriendo en puerto : ${port}`);
});