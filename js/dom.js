const tabla = document.getElementById("tablaProductos")

function cargarProductos() {
productos.forEach(producto => {
  const fila = `<tr>
              <td>${producto.nombre}</td>
              <td>${producto.precio}</td>
          </tr>`
          tabla.innerHTML += fila
})
} 

cargarProductos()
