//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const service  = require('./controladores/allmovies');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});


app.get('/peliculas/recomendacion',(req ,res)=>{


  service.buscarRecomendacion(req.query).then(resul =>{
    res.send(resul);
  });
  
  
});

app.get('/peliculas/:id',(req ,res)=>{
  service.buscarPorId(req.params.id).then(
    resul => {
     // console.log(resul);
      var peliculas = {
        pelicula:resul[0],
        genero : resul[0].genero,
        actores : []
      }
    
      resul.forEach(element => {
        peliculas.actores.push(element.nombre);
      });
      

    
      res.json(peliculas);
    }
  );
});


app.get('/peliculas',(req ,res)=>{
  service.buscarPorParametro(req.query.cantidad,req.query.titulo,req.query.genero,req.query.columna_orden,req.query.anio,req.query.tipo_orden).then(
    resul => {
      var peliculas  = {}
      peliculas = resul;
      res.json(peliculas);
    }
  );
});


app.get('/generos',(req ,res)=>{

  service.buscarTodos('genero').then(
    resul => {
     // data.generos.push(resul);
      //console.log(resul);      
      res.json(resul);
    }
  );
});

