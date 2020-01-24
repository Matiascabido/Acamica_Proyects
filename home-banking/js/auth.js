var usuario;
var intento = 3;
var pass;

window.onload = function() {
    delete_cookie('user');
}


function login(){
    document.cookie = "user=";
    usuario = document.getElementById("user").value;
    pass = document.getElementById("pass").value;
    if(usuario && pass){
        if (intento > 1){
            if(parseInt(pass) == 123){ 
                alert('Bienvenido ' + usuario)
                document.cookie = "user="+usuario;
                location.href="homeBank.html?usuario="+usuario+"&saldo="+30000;
            }
            else {
                intento--;
                alert('Contraseaña erronea numero de intentos restantes ' + intento);
            }
            
        }else{
            alert('Supero su maximo de intentos, su dinero sera retenido');
            alert('Bienvenido ' + usuario)
            document.cookie = "user="+usuario;
            location.href="homeBank.html?usuario="+usuario+"&saldo="+0;
        }
       
        
    }else{
        alert('Coloque un Usuario y Contraseña');
    }
   

}

var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};