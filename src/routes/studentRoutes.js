const { Router } = require('express');
const router = Router();

const studentController = require('../controllers/studentController');

// Obtener todos los estudiantes
router.get('/api/students', studentController.getAllStudents);

// Obtener un estudiante por ID
router.get('/api/students/:id', studentController.getStudentById);

// Obtener estudiantes por nombre
router.get('/api/students/search/:nombre', studentController.findStudentByName);

// Crear un nuevo estudiante
router.post('/api/students', studentController.createStudent);

// Actualizar un estudiante existente
router.put('/api/students/:id', studentController.updateStudent);

// Eliminar un estudiante
router.delete('/api/students/:id', studentController.deleteStudent);

module.exports = router;