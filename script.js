// Cargar libros desde LocalStorage o usar ejemplos
let libros = JSON.parse(localStorage.getItem("libros")) || [
  { titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", estado: "Leído", imagen: "" },
  { titulo: "El Principito", autor: "Antoine de Saint-Exupéry", estado: "Pendiente", imagen: "" },
  { titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", estado: "Leído", imagen: "" }
];

const listaLibros = document.getElementById("listaLibros");
const buscar = document.getElementById("buscar");

// Mostrar libros
function mostrarLibros(filtro = "") {
  listaLibros.innerHTML = "";
  libros
    .filter(libro => 
      libro.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      libro.autor.toLowerCase().includes(filtro.toLowerCase())
    )
    .forEach((libro, index) => {
      const div = document.createElement("div");
      div.className = "libro";
      div.innerHTML = `
        ${libro.imagen ? <img src="${libro.imagen}" alt="Portada"> : <img src="https://via.placeholder.com/100x150?text=Libro" alt="Portada">}
        <h3>${libro.titulo}</h3>
        <p>${libro.autor}</p>
        <span class="estado ${libro.estado === "Leído" ? "leido" : "pendiente"}">
          ${libro.estado}
        </span>
        <br><br>
        <button onclick="cambiarEstado(${index})">
          Cambiar a ${libro.estado === "Leído" ? "Pendiente" : "Leído"}
        </button>
        <button class="btn-eliminar" onclick="eliminarLibro(${index})">
          Eliminar
        </button>
      `;
      listaLibros.appendChild(div);
    });
}

// Agregar libro nuevo
function agregarLibro() {
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const imagen = document.getElementById("imagen").value;
  const estado = document.getElementById("estado").value;

  if (titulo && autor) {
    libros.push({ titulo, autor, estado, imagen });
    localStorage.setItem("libros", JSON.stringify(libros));
    mostrarLibros();
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("imagen").value = "";
    document.getElementById("estado").value = "Pendiente";
  } else {
    alert("Por favor completa título y autor");
  }
}

// Cambiar estado de un libro
function cambiarEstado(index) {
  libros[index].estado = libros[index].estado === "Leído" ? "Pendiente" : "Leído";
  localStorage.setItem("libros", JSON.stringify(libros));
  mostrarLibros(buscar.value);
}

// Eliminar libro
function eliminarLibro(index) {
  if (confirm("¿Seguro que quieres eliminar este libro?")) {
    libros.splice(index, 1);
    localStorage.setItem("libros", JSON.stringify(libros));
    mostrarLibros(buscar.value);
  }
}

// Evento buscar
buscar.addEventListener("input", (e) => {
  mostrarLibros(e.target.value);
});

// Mostrar al inicio
mostrarLibros();
