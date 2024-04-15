function studentRegister() {
    const formStudentName = document.getElementById("studentName").value;
    const formStudentLastName = document.getElementById("studentLastName").value;
    const formStudentEmail = document.getElementById("studentEmail").value;
    const formStudentBirthDay = document.getElementById("studentBirthDay").value;
    const formStudentPhoneNumber = document.getElementById("studentPhoneNumber").value;
    const formStudentAddress = document.getElementById("studentAddress").value;

    const apiUrl = "http://localhost:3000/api/students"; // Ajusta la URL de tu API

    // Crear el objeto con los datos del estudiante
    const studentData = {
        name: formStudentName,
        lastname: formStudentLastName,
        email: formStudentEmail,
        birthday: formStudentBirthDay,
        phonenumber: formStudentPhoneNumber,
        address: formStudentAddress,
    };

    console.log(studentData);

    // Configurar las opciones de la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    };

    // Realizar la solicitud POST a la API
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error Status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Imprimir los datos recibidos en la consola
            // Aquí puedes agregar cualquier lógica adicional después de enviar los datos
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Limpiar los campos del formulario después de enviar la solicitud
    document.getElementById("studentName").value = "";
    document.getElementById("studentLastName").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentBirthDay").value = "";
    document.getElementById("studentPhoneNumber").value = "";
    document.getElementById("studentAddress").value = "";
}
