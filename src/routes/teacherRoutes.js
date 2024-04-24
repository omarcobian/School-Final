const { Router } = require('express');
const router = Router();

const teacherController = require('../controllers/teacherController.js');

//Crear un profesor nuevo
router.post('/api/teacher', teacherController.createTeacher);

//Mostrar todos los maestros
router.get('/api/teacher', teacherController.getAllTeacher);

//Buscar maestro por ID
router.get('/api/teacher/:id', teacherController.getTeacherById);

//Buscar a maestro por Nombre
router.get('/api/teacher/searchname/:findbyname', teacherController.getTeacherByName);

//Buscar a maestro por apellido
router.get('/api/teacher/searchlastname/:findbylastname', teacherController.getTeacherByLastName);

//Actualizar un maestro
router.put('/api/teacher/:id', teacherController.updateTeacher);

//Eliminar un maestro
router.delete('/api/teacher/:id', teacherController.deleteTeacher);

module.exports = router;