// Obtener la referencia a la tabla en el HTML
const tableBody = document.querySelector('#talumnos');

// Función para cargar los estudiantes y mostrarlos en la tabla
function loadStudents() {
    fetch('http://localhost:3000/api/students')
        .then(response => response.json())
        .then(students => {
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id_student}</td>
                    <td>${student.name}</td>
                    <td>${student.lastname}</td>
                    <td>${student.birthday}</td> 
                    <td>${student.email}</td>
                    <td>${student.phonenumber}</td>
                    <td>${student.address}</td>
                    <td>${student.status}</td>
                    <td>
                        <button type="button" class="btn btn-success" onclick="editStudent(${student.id_student})">Editar</button>
                        <button type="button" class="btn btn-danger" onclick="deleteStudent(${student.id_student})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para editar un estudiante
function editStudent(studentId) {
    // Redirigir al usuario a la página de edición del estudiante
    window.location.href = `editStudent.html?id=${studentId}`;
}

// Función para eliminar un estudiante
function deleteStudent(studentId) {
    // Mostrar una confirmación al usuario
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este estudiante?");
    
    // Si el usuario confirma la eliminación
    if (confirmDelete) {
        // Enviar una solicitud DELETE al servidor para eliminar al estudiante
        fetch(`http://localhost:3000/api/students/${studentId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Actualizar la interfaz de usuario o mostrar un mensaje de éxito
                alert("Estudiante eliminado exitosamente.");
                // O recargar la página para reflejar los cambios
                window.location.reload();
            } else {
                throw new Error("Error al eliminar estudiante");
            }
        })
        .catch(error => console.error('Error:', error));
    }
}


// Cargar los estudiantes al cargar la página
window.onload = loadStudents;