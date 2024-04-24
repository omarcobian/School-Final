// Obtener la referencia a la tabla en el HTML
const tableBody = document.querySelector('#tteacher');

// Función para cargar los maestros y mostrarlos en la tabla
function loadTeacher() {
    fetch('http://localhost:3000/api/teacher')
        .then(response => response.json())
        .then(teachers => {
            renderTeachers(teachers);
        })
        .catch(error => console.error('Error: ', error));
}

// Función para cargar los maestros filtrados
function loadFilteredTeacher() {
    const id = document.getElementById('inputID').value;
    const nombre = document.getElementById('inputName').value;
    const apellido = document.getElementById('inputLastName').value;

    // Construir la URL con los parámetros del filtrado
    let url = 'http://localhost:3000/api/teacher/';

    if (id) {
        url += `${id}`;
    } else if (nombre) {
        url += `searchname/${nombre}`;
    } else if (apellido) {
        url += `searchlastname/${apellido}`;
    }

    // Realizar la solicitud GET al servidor con los parámetros de filtrado
    fetch(url)
        .then(response => response.json())
        .then(teachers => {
            try {
                renderTeachers(teachers);
            } catch (error) {
                renderTeachers(teachers);
            }
        })
        .catch(error => console.error('Error: ', error));
}

// Función para renderizar los maestros en la tabla
function renderTeachers(teachers) {
    // Limpiar la tabla antes de agregar los resultados
    tableBody.innerHTML = '';
    
    // Verificar si se recibieron datos válidos
    if (Array.isArray(teachers) && teachers.length > 0) {
        teachers.forEach(teacher => {
            const row = document.createElement('tr');
            row.innerHTML =`
                <td>${teacher.id_teacher}</td>
                <td>${teacher.name}</td>
                <td>${teacher.lastname}</td>
                <td>${teacher.birthday}</td>
                <td>${teacher.email}</td>
                <td>${teacher.phonenumber}</td>
                <td>${teacher.specialty}</td>
                <td>
                    <button type="button" class="btn btn-success" onclick="editTeacher(${teacher.id_teacher})">Editar</button>
                    <button type="button" class="btn btn-danger" onclick="deleteTeacher(${teacher.id_teacher})">Eliminar</button>
                </td>
            `;
            row.setAttribute("id",teacher.id_teacher);
            tableBody.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
            row.innerHTML =`
                <td>${teachers.id_teacher}</td>
                <td>${teachers.name}</td>
                <td>${teachers.lastname}</td>
                <td>${teachers.birthday}</td>
                <td>${teachers.email}</td>
                <td>${teachers.phonenumber}</td>
                <td>${teachers.specialty}</td>
                <td>
                    <button type="button" class="btn btn-success" onclick="editTeacher(${teachers.id_teacher})">Editar</button>
                    <button type="button" class="btn btn-danger" onclick="deleteTeacher(${teachers.id_teacher})">Eliminar</button>
                </td>
            `;
            row.setAttribute("id",teachers.id_teacher);
            tableBody.appendChild(row);
        console.log('No se encontraron maestros.');
    }
}

// Función para editar un maestro
function editTeacher(teacherId) {
    console.log(teacherId);

    let currentRow = document.getElementById(teacherId);

    let editButton = currentRow.children.item(7).children.item(0);
    editButton.setAttribute("class","btn btn-success");
    editButton.innerHTML = "Save";

    editButton.onclick = function() {
        saveTeacher(teacherId);
    }; 

    let cells = currentRow.getElementsByTagName('td');
    for (let i = 1; i < cells.length - 1; i++) {
        cells[i].setAttribute("contenteditable","true");
    }

    cells[1].focus();
}

// Función para guardar los cambios de un maestro
function saveTeacher(teacherId) {
    let currentRow = document.getElementById(teacherId);

    let cells = currentRow.getElementsByTagName('td');

    const editedTeacher = {
        id: teacherId,
        name: cells[1].innerHTML,
        lastname: cells[2].innerHTML,
        birthday: cells[3].innerHTML,
        email: cells[4].innerHTML,
        phonenumber: cells[5].innerHTML,
        specialty: cells[6].innerHTML
    };

    const updateUrl = `http://localhost:3000/api/teacher/${teacherId}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedTeacher)
    };

    fetch(updateUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response;
        })
        .then(data => {
            loadTeacher();
        })
        .catch(error => {
            console.log("Error: ", error);
        });
}

// Función para eliminar un maestro
function deleteTeacher(teacherId) {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este maestro?");
    
    if (confirmDelete) {
        fetch(`http://localhost:3000/api/teacher/${teacherId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert("Maestro eliminado exitosamente.");
                window.location.reload();
            } else {
                throw new Error("Error al eliminar maestro");
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

// Cargar los maestros al cargar la página
window.onload = loadTeacher;

// Agregar un listener al botón de filtrar
document.getElementById('btnFiltrar').addEventListener('click', loadFilteredTeacher);
