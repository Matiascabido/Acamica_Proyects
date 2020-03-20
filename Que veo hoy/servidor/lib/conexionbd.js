const Sequelize = require('sequelize');
// SE UTILIZO MYSQL LOCAL CON XAMPP, PARA TESTEAR DEBE INSTALAR XAMPP 
// Y REEMPLAZAR ESTA CADENA CON LA QUE PROVEEA SU XAMPP LOCAL
const sequelize = new Sequelize('mysql://root@localhost:3306/acamica');

// DEBE EJECUTAR npm i express mysql2 sequelize PARA OBTENER TODAS LAS LIBRERIAS 
// Y ASI PODER TESTEAR DE MANERA CORRECTA EL PROYECTO. 



// SE TESTEA DE MANERA LOCAL DEBIDO A QUE NO SE PROVEE UN SERVIDOR PUBLICO.
// POR LO TANTO SE TESTEA DE MANERA LOCAL.

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

module.exports = sequelize;