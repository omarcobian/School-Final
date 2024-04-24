const { Router } = require('express');
const router = Router();

const courseController = require('../controllers/courseController');

//Mostrar cursos
router.get('/api/courses', courseController.getAllCourse);

//Crear curso
router.post('/api/courses', courseController.createCourse);

//Filtar por ID
router.get('/api/courses/:id', courseController.getCourseById);

//Filtrar por nombre
router.get('/api/courses/byname/:nombre', courseController.findCourseByName);

//Actualizar
router.put('/api/courses/:id', courseController.updateCourse);


module.exports = router;