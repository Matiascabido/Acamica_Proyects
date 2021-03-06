/* Para insipirarte para la implementacion del ZombieConductor podes usar
al ZombieCaminante de ejemplo. Tene en cuenta que tendra algunas diferencias.
Por ejemplo, la cantidad parametros que recibe su constructor. En ZombieConductor
no son exactamente los mismos parametros que en el objeto Enemigo, a diferencia
del ZombieCaminante que eran los mismos. */

var ZombieConductor = function(sprite, x, y, ancho, alto, velocidad, rangoMov, tipo/*, parametro/s extra de ZombieConductor*/) {
  /* Completar constructor a partir de Enemigo */
  this.tipo = tipo
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov,tipo);
  /* No olvidar agregar la/s propiedad/es unicas de ZombieConductor necesarias */
}


ZombieConductor.prototype = Object.create(Enemigo.prototype);
ZombieConductor.prototype.constructor = ZombieConductor

ZombieConductor.prototype.mover = function() {
  /* Los movimientos estan basados en un numero aleatorio
  La direccion horizontal es siempre la misma y va ondulando verticalmente.
  Esto hasta llegar a sus limites, donde se invierte su direccion horizontal */
  if (this.tipo === 'V') {
    this.y += this.velocidad;
  } 
  if (this.tipo === 'H') {
    this.x += this.velocidad;
  } 
  

  /* En esta parte lo que hacemos es invertir la direccion horizontal si
  toca uno de sus limites, modificando su velocidad. Si multiplicamos por -1 la
  velocidad lo que estamos haciendo es invertir su direccion.*/
  if ((this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX)){
    this.velocidad *= -1;
  }
  // Si sobrepasa el rangoY, lo manda al centro entre ambos rangos
  if ((this.y < this.rangoMov.desdeY) || (this.y > this.rangoMov.hastaY)) {
   
    //this.y = this.rangoMov.desdeY + (this.rangoMov.hastaY - this.rangoMov.desdeY)/2;
    this.velocidad *= -1;
  }
}


// ZombieConductor.prototype.atacar = function (jugador) {
//   this.atacando = true
//   console.log('atacando - por zombie conductor ' );
// }

/* Completar creacion del ZombieConductor */

/* Completar metodos para el movimiento y el ataque */
/* Aca podes encontrar al zombie caminante cuyo codigo esta completo. Podes
modificarlo para hacer que se comporte de la forma que mas te guste.
Este zombie recibe los mismos parametros que el objeto Enemigo. Podes consultar
el archivo Enemigo.js para entender que es cada uno. */