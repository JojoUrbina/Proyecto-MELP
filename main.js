document.addEventListener("DOMContentLoaded", function () {
    let restaurantes = []; // Variable global para almacenar todos los restaurantes
    let paginaActual = 1;
    const restaurantesPorPagina = 13; // 13 restaurantes por página en pantallas grandes
  
    // Función asincrónica para cargar datos desde la API
    async function cargarRestaurantesDesdeAPI() {
      try {
        const response = await fetch("http://localhost:3000/api/data");
        if (!response.ok) {
          throw new Error("Error al cargar datos de la API");
        }
        const data = await response.json();
        restaurantes = data; // Almacena los datos de restaurantes en la variable global
        mostrarRestaurantesPagina(restaurantes, paginaActual);
        mostrarPaginacion(restaurantes);
      } catch (error) {
        console.error("Error al cargar datos de la API:", error);
      }
    }
    cargarRestaurantesDesdeAPI();
  
    const contenedorRestaurantes = document.getElementById(
      "containerRestaurantes"
    );
    const contenedorPaginacion = document.getElementById("paginacion");
    const botonOrdenarPorClasificacion = document.getElementById(
      "ordenarPorClasificacion"
    );
    const botonOrdenarAlfabeticamente = document.getElementById(
      "ordenarAlfabeticamente"
    );
  
    // Función para mostrar restaurantes en una página específica
    function mostrarRestaurantesPagina(restaurantes, pagina) {
      contenedorRestaurantes.innerHTML = "";
      const inicio = (pagina - 1) * restaurantesPorPagina;
      const fin = inicio + restaurantesPorPagina;
      const restaurantesPagina = restaurantes.slice(inicio, fin);
  
      restaurantesPagina.forEach((restaurante) => {
        const restauranteCard = `
          <!-- Tarjeta de restaurante -->
          <div class="bg-white flex flex-col sm:flex-row rounded-lg shadow-lg overflow-hidden mx-auto mb-4 max-w-4xl">
            <img src="https://www.eltiempo.com/files/image_640_428/uploads/2022/11/11/636ec9b036dfd.png" alt="${
              restaurante.name
            }" class="w-full sm:w-3/6 h-100 object-cover">
            <div class="p-4 w-full sm:w-3/6 ">
              <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-700">${
                restaurante.name
              }</h2>
              <p class="text-gray-600">ID: ${restaurante.id}</p> <!-- Mostrar el ID debajo del nombre -->
              <p class="text-gray-600">Rating: ${restaurante.rating}</p>
              <div class="mt-2 sm:mt-4">
                <p><a href="${restaurante.contact.site}" class="text-purple-700">Sitio web</a></p>
                <p><a href="mailto:${restaurante.contact.email}" class="text-purple-700">Correo electrónico</a></p>
                <p>Teléfono: ${restaurante.contact.phone}</p>
              </div>
              <div class="mt-2 sm:mt-4">
                <h3 class="text-lg font-semibold">Dirección:</h3>
                <p class="text-gray-600">Calle: ${restaurante.address.street}</p>
                <p class="text-gray-600">Ciudad: ${restaurante.address.city}</p>
                <p class="text-gray-600">Estado: ${restaurante.address.state}</p>
              </div>
              <!-- Botones de Compartir y Me gusta de Facebook -->
              <div id="fb-root"></div>
              <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v18.0&appId=1368712017404923" nonce="gn4NrH9E"></script>
              <div class="fb-like mt-2 sm:mt-4" data-href="${restaurante.contact.site}" data-width="400px" data-layout="button_count" data-action="like" data-size="" data-share="true"></div>
            </div>
          </div>
          <!-- Fin de la tarjeta de restaurante -->
        `;
  
        contenedorRestaurantes.innerHTML += restauranteCard;
      });
  
      // Llama a FB.XFBML.parse() para procesar los botones de Facebook después de insertarlos
      FB.XFBML.parse();
    }
  
    // Función para mostrar la paginación
    function mostrarPaginacion(restaurantes) {
      const totalPaginas = Math.ceil(restaurantes.length / restaurantesPorPagina);
  
      contenedorPaginacion.innerHTML = "";
  
      for (let i = 1; i <= totalPaginas; i++) {
        const pagina = document.createElement("a");
        pagina.href = "#";
        pagina.textContent = i;
        pagina.className = "border rounded-md px-3 py-2 text-gray-600 hover:bg-gray-200 ml-1";
        
        pagina.addEventListener("click", () => {
          paginaActual = i;
          mostrarRestaurantesPagina(restaurantes, paginaActual);
          actualizarEstadoPaginacion();
        });
  
        contenedorPaginacion.appendChild(pagina);
      }
  
      actualizarEstadoPaginacion();
    }
  
    // Función para actualizar el estado de la paginación
    function actualizarEstadoPaginacion() {
      const paginas = contenedorPaginacion.querySelectorAll("a");
      paginas.forEach((pagina, index) => {
        if (index + 1 === paginaActual) {
          pagina.classList.add("font-bold");
        } else {
          pagina.classList.remove("font-bold");
        }
      });
    }
  
    // Función para ordenar los restaurantes por clasificación (rating)
    botonOrdenarPorClasificacion.addEventListener("click", () => {
      restaurantes.sort((a, b) => b.rating - a.rating);
      mostrarRestaurantesPagina(restaurantes, paginaActual);
    });
  
    // Función para ordenar los restaurantes alfabéticamente por nombre
    botonOrdenarAlfabeticamente.addEventListener("click", () => {
      restaurantes.sort((a, b) => a.name.localeCompare(b.name));
      mostrarRestaurantesPagina(restaurantes, paginaActual);
    });
  
    // Menú desplegable responsive
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const navbarLinks = document.getElementById("navbarLinks");
  
    mobileMenuButton.addEventListener("click", () => {
      navbarLinks.classList.toggle("hidden");
    });
  });
  
  window.fbAsyncInit = function () {
    FB.init({
      appId: "1368712017404923", // Reemplaza con tu ID de aplicación de Facebook
      xfbml: true,
      version: "v18.0",
    });
  };