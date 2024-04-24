const Course = require('../models/courseModel');

//Controlador para obtener todos los cursos
exports.getAllCourse = async (req, res) =>{
    try{
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        console.error('Error al obtener todos los cursos', error);
        res.status (500).json({ message: 'Ocurrio un error al obtener todos los datos'});
    }
};
//Controlaor para crear un nuevo curso
exports.createCourse = async (req, res) =>{
    try{
        const newCourse = await Course.create(req.body);
        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error al crear Curso', error);
        res.status(500).json({message: 'Ocurrio un error al crear el curso'});
    }
};
// Controlador para obtener un curso por su ID
exports.getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const courses = await Course.findByPk(id);
        if (!courses) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json(courses);
    } catch (error) {
        console.error('Error al obtener curso por ID:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener curso por ID' });
    }
};

// Controlador para obtener curso por nombre
exports.findCourseByName = async (req, res) => {
    const { nombre } = req.params; // Usar req.params en lugar de req.query
    try {
        const courses = await Course.findAll({
            where: {
                name: nombre
            }
        });
        res.json(courses);
    } catch (error) {
        console.error('Error al obtener el curso por nombre:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener curso por nombre' });
    }
};

// Controlador para actualizar un estudiante existente
exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { name, schedule, course_group} = req.body;
    try {
        const courses = await Course.findByPk(id);
        if (!courses) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        await courses.update({
            name,
            schedule,
            course_group
        });
        res.json(courses);
    } catch (error) {
        console.error('Error al actualizar el curso:', error);
        res.status(500).json({ message: 'Ocurrió un error al actualizar el curso' });
    }
};