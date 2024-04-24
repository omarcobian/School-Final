function teacherRegistrer(){
    const formTeacherName = document.getElementById("teacherName").value;
    const formTeacherLastName = document.getElementById("teacherLastName").value;
    const formTeacherBirthDay = document.getElementById("teacherBirthDay").value;
    const formTeacherEmail = document.getElementById("teacherEmail").value;
    const formTeacherPhoneNumber = document.getElementById("teacherPhoneNumber").value;
    const formTeacherSpecialty = document.getElementById("teacherSpecialty").value;

    const apiUrl = "http://localhost:3000/api/teacher";

    //Crear el objeto con los datos del estudiante
    const teacherData = {
        name: formTeacherName,
        lastname: formTeacherLastName,
        birthday: formTeacherBirthDay,
        email: formTeacherEmail,
        phonenumber: formTeacherPhoneNumber,
        specialty: formTeacherSpecialty
    };

    console.log(teacherData);

    //Configurar las opciones de la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacherData)
    };
    //Relizar la solicitud POST a la API
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error Status: " + response.status + " - " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Imprimir los datos recibidos en la consola
            // Limpiar campos del formulario después de enviar la solicitud
            document.getElementById("teacherName").value = "";
            document.getElementById("teacherLastName").value = "";
            document.getElementById("teacherBirthDay").value = "";
            document.getElementById("teacherEmail").value = "";
            document.getElementById("teacherPhoneNumber").value = "";
            document.getElementById("teacherSpecialty").value = "";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
