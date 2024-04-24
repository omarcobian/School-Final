const { Router } = require('express');
const router = Router();
const path = require('path');

// Ruta para cargar el archivo HTML de la página principal
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'html', 'index.html'));
});

// Ruta para cargar el achivo HTML de la página de contacto
router.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'html', 'contact.html'));
});

// Ruta para cargar el archivo HTML de la página de todos los estudiantes
router.get('/home/students', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'html', 'createStudent.html'));
});

// Ruta para cargar el archivo HTML de la página de todos los estudiantes
router.get('/allStudents', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'html', 'allStudents.html'));
});

//Ruta para cargar el archivo HTML para crear un maestro
router.get('/home/teacher', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'static', 'html', 'createTeacher.html'));
});

//Ruta para cargar el archivo HTML de la página de todos los maestros
router.get('/allTeacher', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'html', 'allTeacher.html'));
});

module.exports = router;

