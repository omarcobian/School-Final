const Student = require('../models/studentModel');

// Controlador para crear un estudiante
exports.createStudent = async (req, res) => {
    try {
        const newEstudiante = await Student.create(req.body);
        res.status(201).json(newEstudiante);
    } catch (error) {
        console.error('Error al crear estudiante:', error);
        res.status(500).json({ message: 'Ocurrió un error al crear estudiante' });
    }
};

// Controlador para obtener todos los estudiantes
exports.getAllStudents = async (req, res) => {
    try {
        const estudiantes = await Student.findAll();
        res.json(estudiantes);
    } catch (error) {
        console.error('Error al obtener todos los estudiantes:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener todos los estudiantes' });
    }
};

// Controlador para obtener un estudiante por su ID
exports.getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const estudiante = await Student.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.json(estudiante);
    } catch (error) {
        console.error('Error al obtener estudiante por ID:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener estudiante por ID' });
    }
};

// Controlador para obtener estudiantes por nombre
exports.findStudentByName = async (req, res) => {
    const { nombre } = req.params; // Usar req.params en lugar de req.query
    try {
        const estudiantes = await Student.findAll({
            where: {
                name: nombre
            }
        });
        res.json(estudiantes);
    } catch (error) {
        console.error('Error al obtener estudiantes por nombre:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener estudiantes por nombre' });
    }
};

//Controlador para obtener estudiantes por apellido
exports.findStudentByLastName = async (req, res) => {
    const { apellido } = req.params; // Usar req.params en lugar de req.query
    try {
        const estudiantes = await Student.findAll({
            where: {
                lastname: apellido
            }
        });
        res.json(estudiantes);
    } catch (error) {
        console.error('Error al obtener estudiantes por apellido:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener estudiantes por apellido' });
    }
};

// Controlador para actualizar un estudiante existente
exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, birthday, email, phonenumber, address, status } = req.body;
    try {
        const estudiante = await Student.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        await estudiante.update({
            name,
            lastname,
            birthday,
            email,
            phonenumber,
            address,
            status
        });
        res.json(estudiante);
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
        res.status(500).json({ message: 'Ocurrió un error al actualizar estudiante' });
    }
};

// Controlador para eliminar un estudiante
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const estudiante = await Student.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        await estudiante.destroy();
        res.json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        res.status(500).json({ message: 'Ocurrió un error al eliminar estudiante' });
    }
};