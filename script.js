// Espera a que la página cargue
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("book-form");
    const library = document.getElementById("library");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Obtiene los valores del formulario
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const coverUrl = document.getElementById("cover").value;
        const status = document.getElementById("status").value;

        // Crea un contenedor para el libro
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        // Si hay portada, agrega la imagen
        if (coverUrl) {
            const img = document.createElement("img");
            img.src = coverUrl;
            img.alt = title;
            img.classList.add("cover");
            bookDiv.appendChild(img);
        }

        // Agrega el título y autor
        const info = document.createElement("p");
        info.textContent = ${title} - ${author} [${status}];
        bookDiv.appendChild(info);

        // Agrega el libro a la biblioteca
        library.appendChild(bookDiv);

        // Limpia el formulario
        form.reset();
    });
});
