const { Student, StudentCourse } = require('../models/courseModel');

// Método para obtener todos los estudiantes con sus calificaciones
const getAllStudentsWithGrades = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [{
        model: StudentCourse,
        attributes: ['degree'] // Selecciona solo el atributo 'degree' de StudentCourse
      }]
    });

    res.status(200).json(students);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllStudentsWithGrades
};
