// Obtener la referencia a la tabla en el HTML
const tableBody = document.querySelector('#talumnos');

// Función para cargar los estudiantes y mostrarlos en la tabla
function loadStudents() {
    fetch('http://localhost:3000/api/students')
        .then(response => response.json())
        .then(students => {
            tableBody.innerHTML = '';
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
                row.setAttribute("id",student.id_student)
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para cargar los estudiantes filtrados y mostrarlos en la tabla
function loadFilteredStudents() {
    const id = document.getElementById('inputID').value;
    const nombre = document.getElementById('inputNombre').value;
    const apellido = document.getElementById('inputApellido').value;

    // Construye la URL con los parámetros de filtrado
    let url = `http://localhost:3000/api/students/`;
    if (id) {
        url += `${id}`;
    } else if (nombre) {
        url += `searchbyname/${nombre}`;
    } else if (apellido) {
        url += `searchbylastname/${apellido}`;
    }

    // Realiza la solicitud GET al servidor con los parámetros de filtrado
    fetch(url)
        .then(response => response.json())
        .then(students => {
            // Limpia la tabla antes de agregar los resultados filtrados
            tableBody.innerHTML = '';
            try {
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
                    row.setAttribute("id",student.id_student)
                    tableBody.appendChild(row);
                    
                });
                
            } catch (error) {
                const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${students.id_student}</td>
                        <td>${students.name}</td>
                        <td>${students.lastname}</td>
                        <td>${students.birthday}</td> 
                        <td>${students.email}</td>
                        <td>${students.phonenumber}</td>
                        <td>${students.address}</td>
                        <td>${students.status}</td>
                        <td>
                            <button type="button" class="btn btn-success" onclick="editStudent(${students.id_student})">Editar</button>
                            <button type="button" class="btn btn-danger" onclick="deleteStudent(${students.id_student})">Eliminar</button>
                        </td>
                    `;
                    row.setAttribute("id",students.id_student)
                    tableBody.appendChild(row);
            }
            
        })
        .catch(error => console.error('Error:', error));
        //console.log("Error");
}


// Función para editar un estudiante
function editStudent(studentId) {
    console.log(studentId)
    // Redirigir al usuario a la página de edición del estudiante
    let curentRow = document.getElementById(studentId);

    //
    let editButton = curentRow.children.item(8).children.item(0);
    editButton.setAttribute("class","btn btn-success");
    editButton.innerHTML = "Save";

    editButton.setAttribute =('onClick',function() {
        saveStudent(studentId);
    }); 
    let nameCell = curentRow.children.item(1);
    let lastnameCell = curentRow.children.item(2);
    let birthdatCell = curentRow.children.item(3);
    let emailCell = curentRow.children.item(4);
    let phonenumberCell = curentRow.children.item(5);
    let addressCell = curentRow.children.item(6);
    let statusCell = curentRow.children.item(7);

    nameCell.setAttribute("contenteditable","true");//cambiar propiedad de la tabla
    lastnameCell.setAttribute("contenteditable","true");
    birthdatCell.setAttribute("contenteditable","true");
    emailCell.setAttribute("contenteditable","true");
    phonenumberCell.setAttribute("contenteditable","true");
    addressCell.setAttribute("contenteditable","true");
    statusCell.setAttribute("contenteditable","true");

    curentRow.children.item(1).focus(); //Enfocar primer elemento editable para que el usuario sepa que puede editar ya

    
}
function saveStudent(studentId) {

    let curentRow = document.getElementById(studentId);


    let nameCell = curentRow.children.item(1);
    let lastnameCell = curentRow.children.item(2);
    let birthdatCell = curentRow.children.item(3);
    let emailCell = curentRow.children.item(4);
    let phonenumberCell = curentRow.children.item(5);
    let addressCell = curentRow.children.item(6);
    let statusCell = curentRow.children.item(7);

    const editStudent = {
        id: studentId,
        name: nameCell.innerHTML,
        lastname: lastnameCell.innerHTML,
        birthday: birthdatCell.innerHTML,
        email: emailCell.innerHTML,
        phonenumber: phonenumberCell.innerHTML,
        address: addressCell.innerHTML,
        status: statusCell.innerHTML
    };

    // Hacer algo con el objeto editStudent, como enviarlo a una función de guardado o procesamiento

    const updateUrl = `http://localhost:3000/api/students/${studentId}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(editStudent)
    };

    fetch(updateUrl, requestOptions)
        .then(response =>{
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response;
        })
        .then(data=>{
            loadStudents();
        })
        .catch(error=>{
            console.log("Error: ",error)
        });

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

// Agregar un listener al botón de filtrar
document.getElementById('btnFiltrar').addEventListener('click', loadFilteredStudents);