const StudentCourse = sequelize.define('StudentCourse', {
    Id_student: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: 'ID_student'
      }
    },
    Id_course: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: 'ID_course'
      }
    },
    degree: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'student_course',
    timestamps: false // Si no tienes campos de timestamps en la tabla
  });
  
  // Define la relación entre Student y StudentCourse
  Student.belongsToMany(Course, { through: StudentCourse, foreignKey: 'Id_student' });
  Course.belongsToMany(Student, { through: StudentCourse, foreignKey: 'Id_course' });
  