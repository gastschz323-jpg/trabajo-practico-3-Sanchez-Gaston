const API_URL = 'https://thesimpsonsapi.com/api/characters';
const CDN_URL = 'https://cdn.thesimpsonsapi.com/500';

let listaPersonajes = [];
const contenedor = document.getElementById('contenedor-personajes');
const buscadorForm = document.getElementById('buscador-form');
const inputBusqueda = document.getElementById('input-busqueda');

async function obtenerPersonajes() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error('Error al conectar con la API');

        const datos = await respuesta.json();

        listaPersonajes = Array.isArray(datos) ? datos : (datos.results || []);

        console.log("¡Datos de la API cargados!", listaPersonajes);
        renderizarTarjetas(listaPersonajes);
    } catch (error) {
        console.error(error);
        contenedor.innerHTML = `<div class="alert alert-danger w-100 text-center">No se pudieron cargar los personajes de la API.</div>`;
    }
}

function renderizarTarjetas(personajes) {
    limpiarResultados();

    if (!personajes || !Array.isArray(personajes) || personajes.length === 0) {
        contenedor.innerHTML = `<div class="alert alert-warning w-100 text-center">No se encontraron personajes.</div>`;
        return;
    }
personajes.forEach(personaje => {
    const campoImagen = personaje.image || personaje.portrait_path;

    if (!personaje || !personaje.name) {
        return;
    }

    const ruta = campoImagen
        ? (campoImagen.startsWith('/') ? campoImagen : `/${campoImagen}`)
        : null;

    const imagenUrl = ruta
        ? `${CDN_URL}${ruta}`
        : 'https://via.placeholder.com/300x300?text=Sin+imagen';

    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${imagenUrl}" class="card-img-top p-2" alt="${personaje.name}" style="height: 250px; object-fit: contain;">
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 class="card-title fw-bold">${personaje.name}</h5>
                    <p class="card-text mb-1"><strong>Ocupación:</strong> ${personaje.occupation || 'No especificada'}</p>
                    <p class="card-text"><strong>Estado:</strong> 
                        <span class="badge ${personaje.status === 'Alive' ? 'bg-success' : 'bg-danger'}">${personaje.status || 'Unknown'}</span>
                    </p>
                </div>
                <button class="btn btn-primary btn-ver-detalle mt-3" data-id="${personaje.id}">Ver detalle</button>
            </div>
        </div>
    `;
    contenedor.appendChild(col);
});
}

function limpiarResultados() {
    contenedor.innerHTML = '';
}

function filtrarPersonajes(evento) {
    evento.preventDefault();
    const textoBusqueda = inputBusqueda.value.trim().toLowerCase();

    if (textoBusqueda === '') {
        alert('Por favor, ingresa un nombre para buscar.');
        return;
    }

    const filtrados = listaPersonajes.filter(personaje =>
        personaje.name && personaje.name.toLowerCase().includes(textoBusqueda)
    );

    renderizarTarjetas(filtrados);
}

buscadorForm.addEventListener('submit', filtrarPersonajes);
document.addEventListener('DOMContentLoaded', obtenerPersonajes);
