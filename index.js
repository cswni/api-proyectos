// Crear un servidor con express
const express = require('express');

// Incluir el CORS
const cors = require('cors');

// Incluir el body-parser (Para procesar peticiones POST)
const bodyParser = require('body-parser');

//Incluir la configuracion de conexion a mysql
const config = require('./config');

//Crear un servidor con express
const app = express();

//Usar el CORS
app.use(cors());

// usar el body-parser para procesar peticiones POST
app.use(bodyParser.json()); 

//Usar el puerto 3000
const port = 3000;

//Crear una ruta por defecto
app.get('/', (req, res) => {
    res.send('Hello World');
});

//Crear un ruta para obtener todos los proyectos
app.get('/proyectos', (req, res) => {
    //Realizar la consulta a la base de datos
    config.query('SELECT * FROM proyectos', (err, filas) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener los proyectos');
        } else {
            res.json(filas);
        }
    });
});

//Store a project in the database
app.post('/proyecto', (req, res) => {
    // Get the data from the request
    const data = req.body;
    console.log(data);

    // Perform the query
    config.query('INSERT INTO proyectos SET ?', data, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al guardar el proyecto');
        } else {
            // Return the response
            res.json({
                id: result.insertId,
                ...data
            });
        }
    });
});

// Crear una ruta para obtener todos los miembros
app.get('/miembros', (req, res) => {
    //Realizar la consulta a la base de datos
    config.query('SELECT * FROM miembros', (err, filas) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener los miembros');
        } else {
            res.json(filas);
        }
    });
});

// Cargar las actividades de un proyecto pasando el id en la URL 
// luego en la query
// Cargar en esta misma ruta los miembros de un proyecto
app.get('/proyecto/:id/actividades', (req, res) => {
    //Realizar la consulta a la base de datos
    config.query('SELECT * FROM actividades WHERE proyecto_id = ?', req.params.id, (err, filas) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener las actividades');
        } else {
            // Return the response
            res.json(filas);
        }
    });
});



//Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});