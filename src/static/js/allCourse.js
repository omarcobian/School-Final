// Obtener la referencia a la tabla en el HTML
const tableBody = document.querySelector('#tcourse');

// Función para cargar los cursos y mostrarlos en la tabla
function loadCourses() {
    fetch('http://localhost:3000/api/courses')
        .then(response => response.json())
        .then(courses => {
            tableBody.innerHTML = '';
            courses.forEach(course => {
                const row = createCourseRow(course);
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para crear una fila de curso en la tabla
function createCourseRow(course) {
    const row = document.createElement('tr');
    row.innerHTML = `   
        <td>${course.id_course}</td>
        <td>${course.name}</td>
        <td>${course.schedule}</td>
        <td>${course.course_group}</td> 
        <td>
            <button type="button" class="btn btn-success" onclick="editCourse(${course.id_course})">Editar</button>
        </td>
    `;
    row.setAttribute("id", course.id_course);
    return row;
}

// Función para cargar los cursos filtrados y mostrarlos en la tabla
function loadFilteredCourses() {
    const id = document.getElementById('inputID').value;
    const nombre = document.getElementById('inputNombre').value;

    // Construye la URL con los parámetros de filtrado
    let url = `http://localhost:3000/api/courses/`;
    if (id) {
        url += `${id}`;
    } else if (nombre) {
        url += `byname/${nombre}`;
    }

    // Realiza la solicitud GET al servidor con los parámetros de filtrado
    fetch(url)
        .then(response => response.json())
        .then(courses => {
            // Limpia la tabla antes de agregar los resultados filtrados
            tableBody.innerHTML = '';
            // Verifica si la respuesta es un solo objeto o un array de objetos
            if (Array.isArray(courses)) {
                // Itera sobre cada curso y crea una fila para cada uno
                courses.forEach(course => {
                    const row = createCourseRow(course);
                    tableBody.appendChild(row);
                });
            } else {
                // Si la respuesta es un solo objeto, crea una fila para ese curso
                const row = createCourseRow(courses);
                tableBody.appendChild(row);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Función para editar un curso
function editCourse(courseId) {
    console.log(courseId)
    // Redirigir al usuario a la página de edición del curso
    let currentRow = document.getElementById(courseId);

    let editButton = currentRow.children.item(4).children.item(0);
    editButton.setAttribute("class", "btn btn-success");
    editButton.innerHTML = "Save";

    // Cambiar el evento onclick para llamar a la función saveCourse con el ID del curso
    editButton.onclick = function () {
        saveCourse(courseId);
    };

    let nameCell = currentRow.children.item(1);
    let scheduleCell = currentRow.children.item(2);
    let courseGroupCell = currentRow.children.item(3);

    nameCell.setAttribute("contenteditable", "true");//cambiar propiedad de la tabla
    scheduleCell.setAttribute("contenteditable", "true");
    courseGroupCell.setAttribute("contenteditable", "true");

    currentRow.children.item(1).focus(); //Enfocar primer elemento editable para que el usuario sepa que puede editar ya
}

// Función para guardar un curso editado
function saveCourse(courseId) {
    let currentRow = document.getElementById(courseId);

    let nameCell = currentRow.children.item(1);
    let scheduleCell = currentRow.children.item(2);
    let courseGroupCell = currentRow.children.item(3);

    const editedCourse = {
        id_course: courseId,
        name: nameCell.innerHTML,
        schedule: scheduleCell.innerHTML,
        course_group: courseGroupCell.innerHTML
    };

    const updateUrl = `http://localhost:3000/api/courses/${courseId}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedCourse)
    };

    fetch(updateUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Necesitas devolver el JSON de la respuesta
        })
        .then(data => {
            loadCourses(); // Recargar la lista de cursos después de guardar los cambios
        })
        .catch(error => {
            console.log("Error: ", error)
        });
}

// Cargar los cursos al cargar la página
window.onload = loadCourses;

// Agregar un listener al botón de filtrar
document.getElementById('btnFiltrar').addEventListener('click', loadFilteredCourses);
