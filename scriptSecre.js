const CLAVE_ALUMNOS = "lista_alumnos_secre";

/*PARTE 1: LÓGICA DE LA LISTA (index.html)*/
const listaUl = document.querySelector(".guiSecretaria-lista ul");

if (listaUl) {
    cargarAlumnos();
}

function cargarAlumnos() {
    const alumnos = JSON.parse(localStorage.getItem(CLAVE_ALUMNOS)) || [];
    listaUl.innerHTML = ""; 

    if (alumnos.length === 0) {
    listaUl.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">No hay alumnos registrados.</p>';
    return;
    }

    const colores = ["bg-blue", "bg-purple", "bg-green"];

    alumnos.forEach((alumno, index) => {
        const colorClase = colores[index % colores.length];
        const li = document.createElement("li");
        
        li.innerHTML = `
            <div class="card-img ${colorClase}">
                <ion-icon name="school-outline"></ion-icon>
            </div>
            
            <div class="card-info">
                <p style="text-transform:uppercase; font-size:0.75rem; font-weight:bold; color:#777;">
                    ${alumno.sede} • ${alumno.anio}
                </p>
                <h3>${alumno.nombre}</h3>
                <p><strong>Carrera:</strong> ${alumno.carrera}</p>
                <p>DNI: ${alumno.dni}</p>
            </div>

            <div class="card-menu">
                <ion-icon name="ellipsis-vertical"></ion-icon>
            </div>
        `;
        listaUl.appendChild(li);
    });
}
/* PARTE 2: GUARDAR ALUMNO (agregarAlumno.html)*/

const formulario = document.querySelector("form");

if (formulario) {
    formulario.addEventListener("submit", function(e) {
        e.preventDefault(); 

        const nuevoAlumno = {
            nombre: document.getElementById("nombre").value,
            dni: document.getElementById("dni").value,
            codigo: document.getElementById("codigo").value,
            sede: document.getElementById("sede").value,
            carrera: document.getElementById("carrera").value,
            anio: document.getElementById("anio").value,
            correo: document.getElementById("correo").value,
            celular: document.getElementById("celular").value,
            observaciones: document.getElementById("observaciones").value
        };


        const alumnosGuardados = JSON.parse(localStorage.getItem(CLAVE_ALUMNOS)) || [];
        alumnosGuardados.push(nuevoAlumno);
        localStorage.setItem(CLAVE_ALUMNOS, JSON.stringify(alumnosGuardados));

        alert("Alumno guardado correctamente");
        window.location.href = "guiSecretaria.html"; 
    });
}