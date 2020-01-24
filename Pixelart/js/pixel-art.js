var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');
//VARIABLES GLOBALES
let indicadorPersonalizado = document.getElementById('indicador-de-color');
let coloresPallet = document.getElementById('paleta');
let Grilla = document.getElementById('grilla-pixeles');
let colorElegido;
let inputTag;
let cuadrilla = 1750;

colorPersonalizado.addEventListener('change', (function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;

    //CAMBIA EL COLOR LUEGO DE SELECCIONARLO EN LA RUEDA
    indicadorPersonalizado.setAttribute("style","background:"+colorActual); 

    $('#indicador-de-color-mensaje').text('Pincel '+'('+colorPersonalizado.value+')');

    colorElegido = colorPersonalizado.value;

  })
);

//RECORRE EL ARREGLO DE NOMBRES
nombreColores.forEach(function(color){
  var colores = color.toLocaleLowerCase();
  inputTag = document.createElement('div'); 
  inputTag.setAttribute("id",colores); 
  inputTag.setAttribute("class","cursor-personalizado");
  inputTag.setAttribute("onClick","changePiker('"+colorToHex(colores)+"')");
  inputTag.setAttribute("style","width:15px; background:"+colorToHex(colores));
  inputTag.style.color = colorToRGBA(colores);
  coloresPallet.appendChild(inputTag);
});

//GENERACION DE LA CUADRILLA
for (let i = 0; i < cuadrilla; i++) {
  Grilla2 = document.createElement('div');
  Grilla2.setAttribute("id",i);
  Grilla2.setAttribute("class","grilla");
  Grilla2.setAttribute("style","margin:0; padding:0; background:white; border:0.3px solid black");
  Grilla2.setAttribute("onClick","changeColor("+i+")");
  Grilla.append(Grilla2);
}

//CAMBIO DE COLOR DEL PINCEL (REFERENCIA)
function changePiker(c){
  $('#indicador-de-color-mensaje').text('Pincel '+'('+colorToHex(c)+')');
  indicadorPersonalizado.setAttribute("style","background:"+colorToHex(c));
  colorElegido = colorToHex(c);
}

//CAMIBO DE COLOR DEL DIV EN LA GRILLA
function changeColor(i){
  Grilla3 = document.getElementById(i);
  Grilla3.setAttribute("style","margin:0; padding:0; border:0.3px solid black; background:"+colorElegido);  
}

//PINTAR SIN LEVANTAR EL MOSUE
document.addEventListener("mousemove", function(e){
  if(e.which === 1 && e.target.classList.value === "grilla"){
    changeColor(e.target.id);
  }
});


//BLANQUEA LA PLANTILLA
function toWhite(){
  for (let i = 0; i < document.getElementsByClassName('grilla').length; i++) {
    document.getElementsByClassName('grilla')[i].style.backgroundColor = '#fff';
  }
  
}

//TRANSFORMA EL NOMBRE DEL COLOR AL RGBA DEL COLOR
function colorToRGBA(color) {
  var cvs, ctx;
  cvs = document.createElement('canvas');
  cvs.height = 1;
  cvs.width = 1;
  ctx = cvs.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  return ctx.getImageData(0, 0, 1, 1).data;
}

//TRANSFORMA EL BYTE DEL COLOR AL RGBA DEL COLOR
function byteToHex(num) {
  return ('0'+num.toString(16)).slice(-2);
}

//TRANSFORMA EL NOMBRE DEL COLOR AL HEX DEL COLOR
function colorToHex(color) {
  var rgba, hex;
  rgba = colorToRGBA(color);
  hex = [0,1,2].map(
      function(idx) { return byteToHex(rgba[idx]); }
      ).join('');
  return "#"+hex;
}




// FUNTE DE LAS FUNCIONES colorToRGBA // byteToHex //colorToHex : https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes/24390910

