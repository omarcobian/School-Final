const teacher = require('../models/teacherModel');

//Controlador para crear un estudiante
exports.createTeacher = async (req, res) => {
    try {
        const newTeacher = await teacher.create(req.body);
        res.status(201).json(newTeacher);
    } catch (error){
        console.error('Error al crear Profesor', error);
        res.status(500).json({nessage: 'Ocurrio un error al crear al profesor'});
    }
};
//Controlador para obtener todos los maestros
exports.getAllTeacher = async (req, res) => {
    try{
        const getTeacher = await teacher.findAll();
        res.json(getTeacher);
    } catch (error) {
        console.error('Error al obtener todos los maestros', error);
        res.status(500).json({message: 'Ocurrió un error al obtener todos los maestros'});
    }
};
//Controlador para obtener un maestro por ID
exports.getTeacherById = async (req, res) => {
    const { id } = req.params;
    try{
        const findteacher = await teacher.findByPk(id);
        if (!findteacher) {
            return res.status(404).json({message: 'Maestro no encontrado'});
        }
        res.json(findteacher);
    } catch (error) {
        console.error('Erorr al obtener el maestro por ID:',error);
        res.status(500).json({ Message: 'Ocurrió un error al obtener el maestro por ID'});

    }
};
//Obtener maestro por nombre
exports.getTeacherByName = async (req, res) => {
    const { findbyname } = req.params;

    try {
        const findteacher = await teacher.findAll({
            where: {
                name : findbyname
            }
        });
        if (findteacher.length === 0) {
            return res.status(404).json({ message: 'Maestro no encontrado' });
        }
        res.json(findteacher);
    } catch (error) {
        console.error('Erorr al obtener al maestro por nombre:', error);
        res.status(500).json({ message: 'Ocurrio un error al obtener al maestro por nombre'});
    }
};
//Controlador para buscar un maestro por apellido
exports.getTeacherByLastName = async (req, res) => {
    const { findbylastname } = req.params;
    try {
        const findteacher = await teacher.findAll({
            where: {
                lastname: findbylastname
            }
        });
        if (findteacher.length === 0){//Valida si la longitud de la respuesta es 0
            return res.status(404).json({ message: 'Maestro no encontrado'});
        }
        res.json(findteacher);//Regresa valor del objeto encontrado
    } catch (error) {
        console.error('Error al obtener al maestro por nombre', error);
        res.status(500).json({message: 'Ocurrió un error al obtener el maestro por nombre'});   
    }
};
//Actualizar profesor
exports.updateTeacher = async (req, res) =>{
    const { id } = req.params;
    const { name, lastname, birthday, email, phonenumber, specialty } = req.body;
    try {
        const findteacher = await teacher.findByPk(id);
        if (!findteacher) {
            return res.status(404).json({ message: 'Maestro no encontrado' });
        }
        await findteacher.update({
            name,
            lastname,
            birthday,
            email,
            phonenumber,
            specialty
        });
        res.json(findteacher);
    } catch (error) {
        console.error('Error al actualizar al maestro:', error);
        res.status(500).json({ message: 'Ocurrió un error al actualizar al maestro' });
    }
};
//Eliminar profesor
exports.deleteTeacher = async (req, res) =>{
    const { id } = req.params;
    try {
        const findteacher = await teacher.findByPk(id);
        if (!findteacher) {
            return res.status(404).json({ message: 'Maestro no encontrado' });
        }
        await findteacher.destroy();
        res.json({ message: 'Maestro eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar al maestro:', error);
        res.status(500).json({ message: 'Ocurrió un error al eliminar maestro' });
    }
};