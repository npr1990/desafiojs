const tabla = document.getElementById("tablaProductos");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => mostrarProductos(json));

function actualizarCarrito(carrito, id) {
  const cantidad = document.getElementById("cantidadCarrito");
  const precio = document.getElementById("precioCarrito");
  const total = Object.values(carrito).reduce(
    (suma, p) => suma + p.cantidad * p.producto.price,
    0
  );
  const totalProductos = Object.values(carrito).reduce(
    (suma, p) => suma + p.cantidad,
    0
  );
  cantidad.innerHTML = `${totalProductos} producto/s`;
  precio.innerHTML = `$${total.toFixed(2)}`;

  const cantidadParticular = document.getElementById(`${id}-ctd`);
  if (!carrito[id]) {
    cantidadParticular.innerHTML = "";
  } else {
    const cantProducto = carrito[id].cantidad;
    cantidadParticular.innerHTML = cantProducto;
  }
}

function mostrarProductos(listaProductos) {
  localStorage.removeItem("carrito");
  listaProductos.forEach((item) => {
    const fila = `<tr>
                  <td>${item.title}</td>
                  <td>${item.price}</td>
                  <td> <img class="imagen" src="${item.image}"/></td>
                  <td><button id="${item.id}-add" class="btnAdd" type="button">AGREGAR</button></td>
                  <td id="${item.id}-ctd"></td>
                  <td><button id="${item.id}-dlt" class="ocultar btnDlt" type="button">ELIMINAR</button></td>
                  </tr>`;
    tabla.innerHTML += fila;
  });
  const addButtons = document.querySelectorAll(".btnAdd");
  const dltButtons = document.querySelectorAll(".btnDlt");

  dltButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.id.split("-")[0];
      const cart = JSON.parse(localStorage.getItem("carrito")) || {};
      let producto = cart[id];
      if (producto.cantidad > 1) {
        producto.cantidad -= 1;
      } else {
        btn.classList.remove("mostrar");
        btn.classList.add("ocultar");
        delete cart[id];
      }

      localStorage.setItem("carrito", JSON.stringify(cart));

      actualizarCarrito(cart, id);
    });
  });

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.id.split("-")[0];
      const cart = JSON.parse(localStorage.getItem("carrito")) || {};
      let producto = cart[id];

      if (producto) {
        producto.cantidad += 1;
      } else {
        producto = {
          cantidad: 1,
          producto: listaProductos.find((p) => p.id == id),
        };
        cart[id] = producto;
      }
      const btnDlt = document.getElementById(`${id}-dlt`);
      btnDlt.classList.remove("ocultar");
      btnDlt.classList.add("mostrar");

      localStorage.setItem("carrito", JSON.stringify(cart));

      actualizarCarrito(cart, id);
    });
  });
}

const btnPagar = document.getElementById("btnPagar");

// Agregado de precios.
const IVA = 1.21;

const descuentoEfectivo = 0.8;

const descuentoDebito = 0.9;

btnPagar.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("carrito")) || {};
  const modoPagoSeleccionado = document.querySelector(
    'input[name="modoPago"]:checked'
  ).value;
  const total = Object.values(cart).reduce(
    (suma, p) => suma + p.cantidad * p.producto.price,
    0
  );

  let precioFinal;

  switch (modoPagoSeleccionado) {
    case "efectivo":
      precioFinal = total * IVA * descuentoEfectivo;
      break;

    case "debito":
      precioFinal = total * IVA * descuentoDebito;
      break;
    case "credito":
      precioFinal = total * IVA;
      break;
    default:
      precioFinal = total * IVA;
  }

  swal.fire(`el precio final es: $ ${precioFinal.toFixed(2)}`);
});
