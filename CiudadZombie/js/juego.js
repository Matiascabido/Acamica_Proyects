/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */

var Juego = {
  // Aca se configura el tamanio del canvas del juego
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  // Indica si el jugador gano
  ganador: false,

  obstaculosCarretera: [
    /*Aca se van a agregar los obstaculos visibles. Tenemos una valla horizontal
    de ejemplo, pero podras agregar muchos mas. *///sprite, x, y, ancho, alto, potencia
    new Obstaculo('imagenes/valla_horizontal.png', 70, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 230, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 230, 470, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 163, 325, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 743, 350, 30, 30, 1),

  ],
  /* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
   Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
   que son invisibles. No tenes que preocuparte por ellos.*/
  bordes: [
    // // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 2),
    new Obstaculo('', 69, 507, 690, 52, 2),
    new Obstaculo('', 587, 147, 173, 360, 2),
    new Obstaculo('', 346, 147, 241, 52, 2),
    new Obstaculo('', 196, 267, 263, 112, 2),
    new Obstaculo('', 196, 23, 83, 244, 2),
    new Obstaculo('', 279, 23, 664, 56, 2),
    new Obstaculo('', 887, 79, 56, 480, 2)
  ],
  // Los enemigos se agregaran en este arreglo.
  enemigos: [
    zombie_H_a = new ZombieConductor('imagenes/auto_verde_abajo.png', 800, 280, 20, 35, 4,{desdeX: 20, hastaX: 940, desdeY:100, hastaY:500},'V'),
    zombie_H_b = new ZombieConductor('imagenes/auto_verde_derecha.png', 343, 120, 40, 20, 4,{desdeX: 343, hastaX: 841, desdeY: 20, hastaY: 557},'H'),
    zombie_H_c = new ZombieConductor('imagenes/auto_verde_derecha.png', 343, 430, 40, 20, 4,{desdeX: 300, hastaX: 541, desdeY: 20, hastaY: 557},'H'),
    zombie_T = new ZombieConductor('imagenes/tren_vertical.png', 675, 500, 30, 70, 4,{desdeX: 20, hastaX: 940, desdeY:20, hastaY:557},'V'),
    zombie_T = new ZombieConductor('imagenes/tren_vertical.png', 643, 500, 30, 70, 5,{desdeX: 20, hastaX: 940, desdeY:20, hastaY:557},'V'),
    zombie_H = new ZombieConductor('imagenes/tren_horizontal.png', 643, 325, 70, 30, 5,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},'H'),
    zombie   = new ZombieCaminante("imagenes/zombie1.png",175,200,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}),
    zombie_1 = new ZombieCaminante("imagenes/zombie2.png",200,500,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}),
    zombie_2 = new ZombieCaminante("imagenes/zombie3.png",75,300,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}),
    zombie_3 = new ZombieCaminante("imagenes/zombie4.png",275,00,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}),
    zombie_4 = new ZombieCaminante("imagenes/zombie1.png",715,200,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}),
    zombie_5 = new ZombieCaminante("imagenes/zombie2.png",20,500,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}),
    zombie_6 = new ZombieCaminante("imagenes/zombie3.png",375,300,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}),
    zombie_7 = new ZombieCaminante("imagenes/zombie4.png",740,100,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}),
    zombie_8 = new ZombieCaminante("imagenes/zombie3.png",775,400,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}),
    zombie_9 = new ZombieCaminante("imagenes/zombie4.png",740,500,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}),

  ],

  iniciarRecursos () {
    Resources.load([
      'imagenes/mapa.png',
      'imagenes/mensaje_gameover.png',
      'imagenes/Splash.png',
      'imagenes/bache.png',
      'imagenes/tren_horizontal.png',
      'imagenes/tren_vertical.png',
      'imagenes/valla_horizontal.png',
      'imagenes/valla_vertical.png',
      'imagenes/zombie1.png',
      'imagenes/zombie2.png',
      'imagenes/zombie3.png',
      'imagenes/zombie4.png',
      'imagenes/auto_rojo_abajo.png',
      'imagenes/auto_rojo_arriba.png',
      'imagenes/auto_rojo_derecha.png',
      'imagenes/auto_rojo_izquierda.png',
      'imagenes/auto_verde_abajo.png',
      'imagenes/auto_verde_derecha.png'
    ]);
    Resources.onReady(this.comenzar.bind(Juego));
  },

  obstaculos() {
    return this.obstaculosCarretera.concat(this.bordes);
  },

  comenzar() {
    // Inicializar el canvas del juego
    Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
    /* El bucle principal del juego se llamara continuamente para actualizar
    los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
    ataques, colisiones, etc*/
    this.buclePrincipal();
  },

  buclePrincipal() {

    // Con update se actualiza la logica del juego, tanto ataques como movimientos
    this.update();
    // Funcion que dibuja por cada fotograma a los objetos en pantalla.
    this.dibujar();
    // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
    window.requestAnimationFrame(this.buclePrincipal.bind(this));
  },

  update () {
    this.calcularAtaques();
    this.moverEnemigos();
  },

  dibujar() {
    // Borrar el fotograma actual
    Dibujante.borrarAreaDeJuego();
    //Se pinta la imagen de fondo segun el estado del juego
    this.dibujarFondo();
  
  
    /* Aca hay que agregar la logica para poder dibujar al jugador principal
    utilizando al dibujante y los metodos que nos brinda.
    "Dibujante dibuja al jugador" */
    Dibujante.dibujarEntidad(this.jugador);
    /* Completar */
  
    // Se recorren los obstaculos de la carretera pintandolos
    this.obstaculosCarretera.forEach(function(obstaculo) {
      Dibujante.dibujarEntidad(obstaculo);
    });
  
    // Se recorren los enemigos pintandolos
    this.enemigos.forEach(function(enemigo) {
      Dibujante.dibujarEntidad(enemigo);
      /* Completar */
    });
  
    // El dibujante dibuja las vidas del jugador
    var tamanio = this.anchoCanvas / this.vidasInicial;
    Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);
    for (var i = 0; i < this.jugador.vidas; i++) {
      var x = tamanio * i
      Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
    }
  },

  intersecan(elemento1, elemento2, x, y) {
    var izquierda1 = elemento1.x
    var derecha1 = izquierda1 + elemento1.ancho
    var techo1 = elemento1.y
    var piso1 = techo1 + elemento1.alto
    var izquierda2 = x
    var derecha2 = izquierda2 + elemento2.ancho
    var techo2 = y
    var piso2 = y + elemento2.alto
  
    return ((piso1 >= techo2) && (techo1 <= piso2) && (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
  },

  chequearColisiones (x, y) {
    var puedeMoverse = true
    this.obstaculos().forEach(function(obstaculo) {
      if (this.intersecan(obstaculo, this.jugador, x, y)) {
        puedeMoverse = false
      }
    }, this)
  
    return puedeMoverse
  },

  capturarMovimiento (tecla) {
    var movX = 0;
    var movY = 0;
    var velocidad = this.jugador.velocidad;
  
    // El movimiento esta determinado por la velocidad del jugador
    if (tecla == 'izq') {
      movX = -velocidad;
    }
    if (tecla == 'arriba') {
      movY = -velocidad;
    }
    if (tecla == 'der') {
      movX = velocidad;
    }
    if (tecla == 'abajo') {
      movY = velocidad;
    }
  
  
    // Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento
    if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
      /* Aca tiene que estar la logica para mover al jugador invocando alguno
      de sus metodos  */ 
      this.jugador.movilidad(movX,movY,tecla);
      /* COMPLETAR */
    }else{
      this.jugador.perderVidas();
    }
  },

  moverEnemigos() {
    Juego.enemigos.forEach(ene =>{
      ene.mover();
    });
  },

  calcularAtaques() {
    this.enemigos.forEach(function(enemigo) {
      if(this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
        /* Si el enemigo colisiona debe empezar su ataque
        COMPLETAR */
        enemigo.comenzarAtaque(this.jugador);
      } else {
        /* Sino, debe dejar de atacar
        COMPLETAR */
        enemigo.dejarDeAtacar();
      }
    }, this);
    
  },

  dibujarFondo() {
    // Si se termino el juego hay que mostrar el mensaje de game over de fondo
    if (this.terminoJuego()) {
  
      Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
      document.getElementById('reiniciar').style.visibility = 'visible';
    }
  
    // Si se gano el juego hay que mostrar el mensaje de ganoJuego de fondo
    else if (this.ganoJuego()) {
      this.enemigos = []
      this.obstaculosCarretera=[];
      this.jugador.sprite = '' ;
      Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
      document.getElementById('reiniciar').style.visibility = 'visible';
    } else {
      Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    }
  },

  terminoJuego() {
    if(this.jugador.vidas === 0){
      this.enemigos = []
      this.obstaculosCarretera=[];
      this.jugador.sprite = '' ;
    }
    return this.jugador.vidas <= 0;
  },

  ganoJuego() {
    
    return (this.jugador.y + this.jugador.alto) > 530;
  },
}




Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}