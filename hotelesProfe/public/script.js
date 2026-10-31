// Endpoint principal para consultar todos los hoteles
const urlApi = 'https://paginas-web-cr.com/Api/hotelApi/hotel/hotel.php';

// Referencias a elementos del DOM
const btnCargar = document.getElementById('btnCargar');
const contenidoTabla = document.getElementById('contenidoTabla');

// Evento para activar la carga si el botón existe
if (btnCargar) {
  btnCargar.addEventListener('click', consultarHoteles);
}

function consultarHoteles() {
  fetch(urlApi)
    .then(response => response.json())
    .then(respuesta => {
      // Limpiamos la tabla antes de cargar los datos
      if (contenidoTabla) {
        contenidoTabla.innerHTML = '';
      }

      // La API devuelve los arreglos dentro de respuesta.data
      const listaHoteles = respuesta.data || respuesta;

      // Recorremos los datos devueltos por la API
      listaHoteles.forEach(hotel => {
        if (contenidoTabla) {
          contenidoTabla.innerHTML += `
            <tr>
              <td>${hotel.id}</td>
              <td>${hotel.nombre}</td>
              <td>${hotel.descripcion || '-'}</td>
              <td>${hotel.estado}</td>
              <td>
                <button onclick="editarHotel('${hotel.id}', '${hotel.nombre}', '${hotel.descripcion || ''}', '${hotel.estado}')">Editar</button>
                <button onclick="eliminarHotel(${hotel.id})">Desactivar</button>
              </td>
            </tr>
          `;
        }
      });
    })
    .catch(error => {
      console.error('Error al consultar la API:', error);
    });
}

// Función auxiliar para cargar los datos en el formulario de actualización
function editarHotel(id, nombre, descripcion, estado) {
  if (document.getElementById('actId')) document.getElementById('actId').value = id;
  if (document.getElementById('actNombre')) document.getElementById('actNombre').value = nombre;
  if (document.getElementById('actDescripcion')) document.getElementById('actDescripcion').value = descripcion;
  if (document.getElementById('actEstado')) document.getElementById('actEstado').value = estado;
}

// 1. Crear Hotel (POST)
const formCrear = document.getElementById('formCrear');
if (formCrear) {
  formCrear.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const datos = {
      nombre: document.getElementById('crearNombre').value,
      descripcion: document.getElementById('crearDescripcion').value,
      estado: 'Activo'
    };

    fetch(urlApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(() => {
      alert('Hotel creado exitosamente');
      formCrear.reset();
      consultarHoteles();
    })
    .catch(err => console.error('Error al crear:', err));
  });
}

// 2. Actualizar Hotel (PUT)
const formActualizar = document.getElementById('formActualizar');
if (formActualizar) {
  formActualizar.addEventListener('submit', function (e) {
    e.preventDefault();

    const datos = {
      id: document.getElementById('actId').value,
      nombre: document.getElementById('actNombre').value,
      descripcion: document.getElementById('actDescripcion').value,
      estado: document.getElementById('actEstado').value
    };

    fetch(urlApi, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(() => {
      alert('Hotel actualizado exitosamente');
      formActualizar.reset();
      consultarHoteles();
    })
    .catch(err => console.error('Error al actualizar:', err));
  });
}

// 3. Desactivar Hotel (DELETE / Borrado lógico)
function eliminarHotel(id) {
  if (confirm(`¿Seguro que deseas desactivar el hotel con ID: ${id}?`)) {
    const datos = { id: id };

    fetch(urlApi, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(() => {
      alert('Hotel desactivado');
      consultarHoteles();
    })
    .catch(err => console.error('Error al desactivar:', err));
  }
}