const express = require('express');
const router = express.Router();
const { Student, StudentCourse } = require('../models/studentCourse'); // Asegúrate de importar los modelos correctos

// Ruta para obtener estudiantes con calificaciones
router.get('/students-with-grades', async (req, res) => {
    try {
        // Consulta para obtener los estudiantes con sus calificaciones utilizando el método de asociación
        const studentsWithGrades = await Student.findAll({
            include: [{ model: StudentCourse }] // Esto cargará las calificaciones asociadas con cada estudiante
        });
        res.json(studentsWithGrades); // Devolver los datos como JSON
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' }); // Manejar errores
    }
});

module.exports = router;
