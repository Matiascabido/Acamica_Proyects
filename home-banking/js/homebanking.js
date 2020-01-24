//Declaración de variables

var nombreUsuario;

var colorNombre = "#eb6841";

var saldo = 30000 ;

var extraido;

var depositado;

var limiteExtraccion = 30000;

var digitoamigo = '00020';

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    if(!nombreUsuario && document.cookie){
        nombreUsuario = getParameterByName('usuario');
        saldo = getParameterByName('saldo');
        limiteExtraccion = saldo;
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
        
        
    }else{
        location.href="index.html";
    }
    
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    limite = document.getElementById("limite").value;

    comprobarLimite(limite);
    document.getElementById("limite").value = "";

}

function extraerDinero() {

    limite = limiteExtraccion;
    
    if(saldo){
       
        extraido =  document.getElementById("montoIngresar").value;
       

        if(comprobarSaldo(extraido) && extraido && ComprobarExtracionlimite(extraido,limite)) { 
            
            if(parseFloat(saldo - extraido) >= 0){
                
                saldo =  extraccion(saldo, extraido);

                limiteExtraccion = saldo;
                actualizarSaldoEnPantalla();
                actualizarLimiteEnPantalla();

                //ALERTA DE TRANSACCION EXITOSA
                alert('Extraccion exitosa, Extrajo: $ ' + extraido);
            }
            else
            alert('No dispone de ese dinero para extraer');

            //LIMPIAR CAMPO
            document.getElementById("montoIngresar").value = "";
        }else{
            alert('Ingrese monto correspondiente a extraer');
        }

    }else{
        alert('Usted no Posee saldo sufuciente');
        //LIMPIAR CAMPO
        document.getElementById("montoIngresar").value = "";
    }
}

function depositarDinero() { 
    
    depositado =  document.getElementById("montoDepositar").value;


    if(depositado && comprobarSaldo(depositado)) { 
        
        if(parseFloat(saldo) + parseFloat(depositado) >= 0){
            
            saldo = deposito(saldo,depositado);
            limiteExtraccion = saldo;
            actualizarSaldoEnPantalla();
            actualizarLimiteEnPantalla();

            //ALERTA DE TRANSACCION EXITOSA
            alert('Deposito exitoso, Deposito: $ ' + depositado);
        }

        //LIMPIAR CAMPO
        document.getElementById("montoDepositar").value = "";
    }else{
        alert('Ingrese monto correspondiente a extraer');
    }


}

function pagarServicio() {
    service = document.getElementById("service").value;
    switch (service) {
        case '0':
            alert('Debe seleccionar un servicio antes de abonar');
            break;
        case '1':
            if(comprobarSaldo(saldo) && ComprobarExtracionlimite(2000,limiteExtraccion)){
                saldo = extraccion(saldo, 2000);
                if(saldo >= 0){
                    limiteExtraccion = saldo;
                    actualizarSaldoEnPantalla();
                    actualizarLimiteEnPantalla();
                    alert('Abono el agua por $2000 correctamente');
                }
                else{
                    alert('No posee el saldo para realizar el pago');
                    saldo += 2000; 
                }
               
               
            } break;
        case '2':
            if(comprobarSaldo(saldo) && ComprobarExtracionlimite(1000,limiteExtraccion)){
                saldo = extraccion(saldo, 1000);
                if(saldo >= 0){
                    limiteExtraccion = saldo;
                    alert('Abono la luz por $1000 correctamente');
                    actualizarSaldoEnPantalla();
                    actualizarLimiteEnPantalla();
                }
                else{
                    saldo += 1000; 
                    alert('No posee el saldo para realizar el pago');
                }
            } break;   
        case '3':
            if(comprobarSaldo(saldo) && ComprobarExtracionlimite(5000,limiteExtraccion)){
                console.log(saldo);
                saldo = extraccion(saldo, 5000);
                console.log(saldo);
                if(saldo >= 0){
                    limiteExtraccion = saldo;
                    alert('Abono el gas por $5000 correctamente');
                    actualizarSaldoEnPantalla();
                    actualizarLimiteEnPantalla();
                }else{
                    alert('No posee el saldo para realizar el pago');
                    saldo += 5000; 
                }
            } break;
        case '4':
            if(comprobarSaldo(saldo) && ComprobarExtracionlimite(300,limiteExtraccion)){
                saldo = extraccion(saldo, 300);
                if(saldo >= 0){
                    limiteExtraccion = saldo;
                    alert('Abono el telefono por $300 correctamente');
                    actualizarSaldoEnPantalla();
                    actualizarLimiteEnPantalla();
                }
                else{
                    
                    saldo += 300; 
                }
                
                
            } break;
        default:
           
            break;
    }
}

function transferirDinero() {
    
    var numero_transferencia = document.getElementById("nroCuenta").value;
    var monto_transferencia = document.getElementById("montoTransferir").value;

    if(comprobarCuenta(numero_transferencia)){

        if(comprobarSaldo(monto_transferencia)){

            if(ComprobarExtracionlimite(monto_transferencia,parseInt(limiteExtraccion))){
                saldo =  extraccion(saldo, monto_transferencia);
                limiteExtraccion = saldo;
                actualizarSaldoEnPantalla();
                actualizarLimiteEnPantalla();
                alert('Su transferencia se realizo correctamente');
            }
            else 
               alert('No puede transferir mas alla de los limites');
                
        }
    }else{
        alert('Esta cuenta no pertenece a tus amigos');
    }


   
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
    document.getElementById("nombre").style.color = colorNombre;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldo;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}



//FUNCIONES PARA:

//COMPROBAR SI MI SALDO A EXTRAER ES MAYOR A CERO Y MULTIPLO DE 100

function comprobarSaldo(valor){

    if(parseFloat(valor) == 0) { 
        alert('Su monto debe ser mayor a cero');
        document.getElementById("montoIngresar").value = "";
        return false;
    }else if(parseFloat(valor) < 0){
        alert('Su monto no puede ser negativo');
        document.getElementById("montoIngresar").value = "";
        return false;

    }else if((100 % parseFloat(valor)) == 0){
        alert('Su monto debe ser multiplo de 100');
        document.getElementById("montoIngresar").value = "";
        return false;

    }else
    return true;

    


}

//SUMAR SALDO MAS LO DEPOSITADO
function deposito(saldo, deposito){

    var total = parseFloat(saldo) + parseFloat(deposito);
    return total;
}

//RESTAR EL SALDO CON LO EXTRAIDO
function extraccion(saldo, extraccion){
    var total;
    if(parseFloat(saldo - extraccion) >= 0)
        total = parseFloat(saldo) - parseFloat(extraccion);
    else
        total = -1;

    return total;
}

//COMPROBAR SI MI NUEVO LIMITE DE EXTRACION ES VALIDO
function comprobarLimite(limite){

    if(parseFloat(limite) ==  0){
        alert('No puede colocar 0 como limite');
    } else
    if(parseFloat(limite) < 0){
        alert('No puede colocar un numero negativo como limite');
    }else
    if(parseFloat(limite) > saldo){
        alert('No dispone de ese dinero para colocarlo como limite');
    }else 
    if(parseFloat(limite) > 0 && (parseFloat(limite) < saldo)){
        limiteExtraccion = limite;
        actualizarLimiteEnPantalla();
    }else{
        alert('Coloque un numero antes de continuar');
    }

}

//COMPROBAR SI EL MONTO QUE VOY A EXTRAER SUPERA O NO MI LIMITE
function ComprobarExtracionlimite(Aextraer,limite){
    console.log(Aextraer,limite);
    if(Aextraer > limite){
        alert('Supera su limite de Extraccion');
        document.getElementById("montoIngresar").value = "";
        return false;
    }else
        return true;

}

function comprobarCuenta(numero_transferencia){
    console.log(numero_transferencia.substr(0,4));
    console.log(digitoamigo);
    if(numero_transferencia.length == 22){
        if(numero_transferencia.substr(0,5) == digitoamigo)
            return true;
        else
            return false;
    
    }else{
        alert('El numero de cuenta no tiene el largo esperado');
        return false;
    }

   
}





//OBTENER DATOS DE LA URL (https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

  
//FUNCIONES QUE GENERAN EL INGRESO, UNICAMENTE DE NUMEROS DENTRO DE LOS IMPUTS
function soloNumeros(e){
    var key = e.charCode;
    return key >= 48 && key <= 57;
}

extraerx = document.querySelector('#montoIngresar');
depositarx = document.querySelector('#montoDepositar');
limitarx = document.querySelector('#limite');
nroCuenta  = document.querySelector('#nroCuenta');
montoTransferir =  document.querySelector('#montoTransferir');


montoTransferir.addEventListener('keypress', function (e){
	if (!soloNumeros(event)){
  	e.preventDefault();
  }
})
nroCuenta.addEventListener('keypress', function (e){
	if (!soloNumeros(event)){
  	e.preventDefault();
  }
})
extraerx.addEventListener('keypress', function (e){
	if (!soloNumeros(event)){
  	e.preventDefault();
  }
})
depositarx.addEventListener('keypress', function (e){
	if (!soloNumeros(event)){
  	e.preventDefault();
  }
})
limitarx.addEventListener('keypress', function (e){
	if (!soloNumeros(event)){
  	e.preventDefault();
  }
})

