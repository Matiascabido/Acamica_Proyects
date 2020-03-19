const mysql = require('../lib/conexionbd');

module.exports = {
    buscarPorId : (id) => {
      return mysql.query(
         `SELECT p.id,anio,director,duracion,fecha_lanzamiento,g.nombre as genero,poster,puntuacion,titulo,trama,a.nombre
          FROM pelicula p 
         INNER JOIN genero g on g.id = p.genero_id 
         INNER JOIN actor_pelicula ap on ap.pelicula_id = p.id 
         INNER JOIN actor a on a.id = ap.actor_id 
         WHERE p.id = ${id}`, { type: mysql.QueryTypes.SELECT}, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results)});
    },
    buscarTodos : (tabla) => {
      return mysql.query( `SELECT * FROM ${tabla} LIMIT 52`, { type: mysql.QueryTypes.SELECT}, function (error, results, fields) {
        if (error) throw error;
      });
    },
    buscarPorParametro:(cantidad,titulo,genero,orden,anio,tipo_orden)=>{
      if(cantidad == 'undefined'){
        cantidad = 52;
      }
      var sql =  `SELECT * FROM pelicula p WHERE 1 `;
      titulo ? sql += `and titulo = '${titulo}'`: ``; 
      genero ? sql += `and genero_id = ${genero}`: ``;
      anio ? sql += `and anio = ${anio}`: ``; 
      orden &&  tipo_orden ? sql+= ` ORDER BY ${orden} ${tipo_orden}`: ``; 
      cantidad ? sql += ` LIMIT  ${cantidad}`: ``; 
      console.log('aca',sql);
      return mysql.query(sql, { type: mysql.QueryTypes.SELECT}, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0])});
    },
    buscarRecomendacion : (params) => {
      console.log(params); //genero puntuacion anio_inicio anio_fin
      var sql = `SELECT * FROM pelicula p INNER JOIN genero g on p.genero_id = g.id WHERE 1  `;
      if(params){
        params.genero ? sql +=  `AND g.nombre = '${params.genero}'  `: '';
        params.puntuacion ? sql +=  `AND p.puntuacion =  ${params.puntuacion}`: '';
        params.anio_inicio && params.anio_fin ? sql+= ` AND YEAR(p.fecha_lanzamiento) between  ${params.anio_inicio} and ${params.anio_fin} `: '';
      }
      sql += ' LIMIT 52';
      return mysql.query( sql, { type: mysql.QueryTypes.SELECT}, function (error, results, fields) {
        if (error) throw error;
      });
    },
    
};