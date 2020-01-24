const expect = chai.expect;

describe('Reservar un horario de un restaurante.',function(){
  it('El horario correspondiente se elimina del arreglo',function(){
    // const res =  new Restaurant(listado.obtenerRestaurantes("Asiática","Nueva York",null));
    // let horario = "15:30";
    // const res = new Restaurant(123,"chia","pasta","centro", ["10:00","11:00"],"../img/asiatica1.jpg",[4,2.3,3]);
    let horario = "13:00"
    const res = listado.restaurantes[0];
    //console.log(res);
    //console.log(res.horarios[0]);
    res.reservarHorario(res.horarios[0]);
    expect(res.horarios[0]).to.equal(horario);
   
  })
  
  it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.',function(){
    // const res =  new Restaurant(listado.obtenerRestaurantes("Asiática","Londres",null));
    //const res2 = new Restaurant(123,"chia","pasta","centro", ["10:00","11:00","12:00"],"../img/asiatica1.jpg",[4,2.3,3]);
    const res2 = listado.restaurantes[1];
    res2.reservarHorario("13:00");
    expect(res2.horarios.length).to.equal(3);
  })

  it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.',function(){
    // const res =  new Restaurant(listado.obtenerRestaurantes("null","Nueva York",null));
   // const res3 = new Restaurant(123,"chia","pasta","centro", ["10:00","11:00","12:00"],"../img/asiatica1.jpg",[4,2.3,3]);
    const res3 = listado.restaurantes[3];
    res3.reservarHorario();
    expect(res3.horarios.length).to.equal(3);
  })

  it('el arreglo se mantenga igual, exactamente con los mismos elementos.',function(){
    // const res =  new Restaurant(listado.obtenerRestaurantes("Asiática","Nueva York",null));
  //  const res4 = new Restaurant(123,"chia","pasta","centro", ["10:00","11:00","12:00","12:30"],"../img/asiatica1.jpg",[4,2.3,3]);
    const res4 = listado.restaurantes[6];
    const horarios = res4.horarios;
    res4.reservarHorario("13:00");
    expect(res4.horarios).to.equal(horarios);
  })

})

describe('Obtener la puntuacion de un restaurante.',function(){

  it('Dado un restaurant con determinadas calificaciones, la puntuación se calcula correctamente',function(){
   // const res = new Restaurant(123,"chia","pasta","centro", ["10:00","11:00"],"../img/asiatica1.jpg",[4,5,3]);
    const res = listado.restaurantes[7];
    let promedio = 7.6;
   // console.log(res.horarios[0]);
    let total = res.obtenerPuntuacion();
    expect(total).to.equal(promedio);
   
  })

  it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.',function(){
   // const res = new Restaurant(123,"chia","pasta","centro", ["10:00","11:00"],"../img/asiatica1.jpg",[]);
    const res = listado.restaurantes[7];
    res.calificaciones = [];
    let promedio = 0;
   // console.log(res.horarios[0]);
    let total = res.obtenerPuntuacion();
    expect(total).to.equal(promedio);
   
  })

})

describe('Calificar un restaurante.',function(){

  it('Dado un restaurant con calificaciones mayores a 10 o menores a 0, no se agregan al arreglo',function(){
   // const res = new Restaurant(123,"chia","pasta","centro", ["10:00","11:00"],"../img/asiatica1.jpg",[]);
    const res = listado.restaurantes[9];
    let calificaciones = res.calificaciones;
    //console.log(calificaciones);

    //calificacion mayor a 10
    res.calificar(11);
    expect(res.calificaciones).to.equal(calificaciones);

    //calificacion menor a 0
    res.calificar(-1);
    expect(res.calificaciones).to.equal(calificaciones);
  })

  it('Dado un restaurant con calificaciones se agregan al arreglo correctamente',function(){
    //const res = new Restaurant(123,"chia","pasta","centro", ["10:00","11:00"],"../img/asiatica1.jpg",[]);
    const res = listado.restaurantes[9];
    res.calificar(5);
    expect(res.calificaciones.length).to.equal(6);
  })



})
  
describe('Buscar un restaurante por id.',function(){

  it('Dado un id que no exista, que se retorne un mensaje',function(){
    let resultado = listado.buscarRestaurante(40);
    let mensaje = "No se ha encontrado ningún restaurant";
    expect(resultado).to.equal(mensaje);
  })

  it('Dado un id, se retorne restaurante',function(){
    const restaurante = listado.restaurantes[4];
    //console.log(restaurante);
    let resultado = listado.buscarRestaurante(5);
    expect(resultado).to.equal(restaurante);
  })

})
  
describe('Listado los Restaurantes',function(){

  it('Si no se pasan filtros, retorna todo el arreglo de restaurantes',function(){
    let res = listado.restaurantes;
    let resFiltrados = listado.obtenerRestaurantes(null,null,null);
    expect(resFiltrados).to.equal(res);
  })

  it('Obtener el listado de restaurantes que concuerde con la busqueda',function(){
    let res = listado.restaurantes[0];
   // console.log(res.id);
    let resFiltrados = listado.obtenerRestaurantes("Asiática","Nueva York",null);
   // console.log(resFiltrados[0].id);
    expect(resFiltrados[0].id).to.equal(res.id);
  })

  

})

describe('Funciones Obtener',function(){

  it('Obtener la suma de las calificaciones (Funcion del restaurante)',function(){
    let res = listado.restaurantes[0];
    //res.sumatoria();
    //console.log(res.sumatoria());
    expect(res.sumatoria()).to.equal(37);
  })

  it('Obtener el promedio de las calificaciones (Funcion del restaurante)',function(){
    let res = listado.restaurantes[0];
   //res.promedio();
   //console.log(res.promedio());
    expect(res.promedio()).to.equal(7.4);
  })
  
  it('Obtener el Rubro (Funcion del listado)',function(){
    let res = listado;
    // console.log(res.obtenerRubro());
    // let rubros = ["Asiática", "Desayuno", "Ensalada", "Hamburguesa", "Pasta", "Pizza"];
    // console.log(rubros);
    expect(res.obtenerRubro().length).to.equal(6);
  })

  it('Obtener el Ciudades (Funcion del listado)',function(){
    let res = listado;
    //console.log(res.obtenerCiudades());
    
    // console.log(rubros);
    expect(res.obtenerCiudades().length).to.equal(5);
  })

  it('Obtener el Horarios (Funcion del listado)',function(){
    let res = listado;
   // console.log(res.obtenerHorarios());
    
    // console.log(rubros);
    expect(res.obtenerHorarios().length).to.equal(21);
  })

})


describe('Funciones de Reserva',function(){

  it('Que un restaurante calcule correctamente su precio base',function(){
    let reserva = new Reserva (1,new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
    let totalBase = 2800
    //console.log(reserva.precioBase());
    expect(reserva.precioBase()).to.equal(totalBase);
  })

  it('Que un restaurante calcule correctamente su precio final, contemplando bien los descuentos y los adicionales.',function(){
    let reserva3 = new Reserva (2,new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
    let totalFull = 100;
    //console.log(reserva3.precioTotal());
    expect(reserva3.precioTotal()).to.equal(totalFull);
  })

 
})
