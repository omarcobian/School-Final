const express = require('express');
const app = express();
const path = require('path'); // Importa el módulo path

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Servir archivos estáticos desde la carpeta static
app.use(express.static(path.join(__dirname, 'static')));    

//routes
app.use(require('./routes/studentRoutes'));
app.use(require('./routes/vistaRoutes'));
app.use(require('./routes/teacherRoutes'));
app.use(require('./routes/courseRoutes'));

app.listen(3000);
console.log('Server On Port 3000');