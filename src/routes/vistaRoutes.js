const { Router } = require('express');
const router = Router();
const path = require('path');

// Ruta para cargar el archivo HTML de la página principal
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'html', 'index.html'));
});

// Ruta para cargar el archivo HTML de la página de todos los estudiantes
router.get('/home/students', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'html', 'createStudent.html'));
});

// Ruta para cargar el archivo HTML de la página de todos los estudiantes
router.get('/allStudents', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'html', 'allStudents.html'));
});

// Ruta para cargar el archivo HTML de la página de edición de estudiante por ID
router.get('/editStudent/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'html', 'editStudent.html'));
});

module.exports = router;

