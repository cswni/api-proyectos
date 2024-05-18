const mysql = require('mysql'); // USar la libreria

// Configuracion de la base de datos
const config = mysql.createConnection({
    host: '127.0.0.1', //127.0.0.1 
    user: 'root',
    password: 'carlos2024',
    database: 'proyectos'
});

//Verify the connection
config.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = config; // Exportar la configuracion