const API_URL = 'https://thesimpsonsapi.com/api/characters';
const CDN_URL = 'https://cdn.thesimpsonsapi.com/500';

let listaPersonajes = []
const contenedor = document.getElementById('contenedor-personajes');
const buscadorForm = document.getElementById('buscador-form');
const inputBusqueda = document.getElementById('input-busqueda')

async function obtenerPersonajes() {
    try{
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error('Error al conectar con la API');
        listaPersonajes = await respuesta.json();
        renderizarTarjetas(listaPersonajes);
    } catch (error) {
        console.error(error);
        contenedor.innerHTML = `<div class "alert alert-danger w-100 text-center">No se pudieron cargar los personajes.</div>`;
        
    }
    }