var Reserva = function(id, horario, cant_personas, precio_persona, codigo) {
  this.id = id;
  this.horario = horario;
  this.cant_personas = cant_personas;
  this.precio_persona = precio_persona;
  this.codigo = codigo;
}

//El precio base de una reserva es igual a la cantidad de personas por el precio por persona.
Reserva.prototype.precioBase = function(){
   return this.cant_personas * this.precio_persona;
}

//La reserva debe ser capaz de responder el precio final: precio final = precio base + adicionales - descuentos
Reserva.prototype.precioTotal = function(){
  // let hora =  this.horario.getHours();
  // //console.log(hora);
  // let fecha = this.horario
  // //console.log(fecha);
  // let days = ['Lunes','Martes','Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  // let totalAdicional = 0;
  //let totalDescuento = 0;
  // let dia = days[fecha.getUTCDay()-1];
  // //console.log(dia);

  // if ((hora >= 13 && hora <= 14) ||  (hora >= 20 && hora <= 21)){
  //   totalAdicional +=  this.precioBase()*0,5
  // }

  // if(dia === 'Viernes' || dia === 'Sábado' || dia === 'Domingo'){
  //   totalAdicional +=  (this.precioBase()/10);
  // }

  // if((this.personas >= 4 && this.personas <= 6)){
  //   totalDescuento +=  this.precioBase() * 0,5
  // }
  // if((this.personas >= 7 && this.personas <= 8)){
  //   totalDescuento +=  this.precioBase() / 10
  // }

  // if(this.personas <= 8){
  //   totalDescuento +=  ((this.precioBase() * 15) / 100)
  // }

  // if(this.codigo === "DES15"){ totalDescuento +=  ((this.precioBase() * 15) / 100)}
  // else if( this.codigo === "DES200"){totalDescuento +=  200}
  // else if( this.codigo === "DES1"){totalDescuento +=  this.precioBase()}

  //return this.precioBase() + totalAdicional - totalDescuento;

  return this.precioBase() + this.adicional() - this.descuento();
}


//Adicional por horario: las franjas horarias de 13 a 14 y de 20 a 21 horas son muy concurridas. Se agrega un adicional del 5% si la reserva fue hecha para un horario dentro de esos rangos.
//Adicional por fin de semana: si la reserva fue realizada para alguno de los días del fin de semana (viernes, sábado o domingo) se le agrega un adicional del 10%.
Reserva.prototype.adicional = function(){

  let hora =  this.horario.getHours();
  //console.log(hora);
  let fecha = this.horario
  //console.log(fecha);
  let days = ['Lunes','Martes','Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  let total = 0;
  let dia = days[fecha.getUTCDay()-1];
  //console.log(dia);

  if ((hora >= 13 && hora <= 14) ||  (hora >= 20 && hora <= 21)){
    total +=  this.precioBase()*0,5
  }

  if(dia === 'Viernes' || dia === 'Sábado' || dia === 'Domingo'){
    total +=  (this.precioBase()/10);
  }
  return total;
}

// Descuento por grupos grandes: si la cantidad de personas de la reserva está entre 4 y 6 personas, se agrega un 5% de descuento. Para grupos entre de 7 y 8 personas un 10% de descuento y para grupos de más de 8 personas un 15% de descuento.
// Descuento por código: algunas reservas pueden tener un código de descuento asociado. Si no tienen ninguno, no se les otorga ningún descuento. Los códigos son:
// DES15: obtiene un 15% de descuento.
// DES200: obtiene $200 de descuento.
// DES1: obtiene de descuento el valor equivalente al precio de una persona.

Reserva.prototype.descuento = function(){

  let total = 0;

  if((this.personas >= 4 && this.personas <= 6)){
    total +=  this.precioBase() * 0,5
  }
  if((this.personas >= 7 && this.personas <= 8)){
    total +=  this.precioBase() / 10
  }

  if(this.personas <= 8){
    total +=  ((this.precioBase() * 15) / 100)
  }

  switch (this.codigo) {
    case "DES15":
      total +=  ((this.precioBase() * 15) / 100)
      break;
    case "DES200":
      total +=  200;
      break;
    case "DES1":
      total += this.precioBase();
      break;

    default:total += 0;
      break;
  }
  
  return total;
}