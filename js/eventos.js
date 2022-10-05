
const tabla = document.querySelector("#tablaProductos");
const btnAgregar = document.querySelector("#btnAgregar");
const nombreProducto = document.querySelector("#inputNombre");
const importeProducto = document.querySelector("#inputImporte");
const btnPrecioFinal = document.querySelector("#sumaPrecioFinal");
const modoPagoSeleccionado = document.querySelector(
  'input[name="modoPago"]:checked'
).value;

// Agregado de precios.
const IVA = 1.21;

const descuentoEfectivo = 0.8;

const descuentoDebito = 0.9;

class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

btnPrecioFinal.addEventListener("click", () => {
  const productosGuardados = JSON.parse(localStorage.getItem("productos"));
  const productos = productosGuardados ? productosGuardados : [];

  //filtrado de productos con atributo precio mayor a 0
  let productosValidos = productos.filter((a) => a.precio > 0);
  //funcion que suma (va dentro de reduce)
  function sumar(a, b) {
    return a + b.precio;
  }
  //sumatoria de productos desde "0"
  let sumatoriaProductos = productosValidos.reduce(sumar, 0);
  //let valorProducto = productos.reduce((a,b)=>{a+b}, 0)
  let precioFinal;

  switch (modoPagoSeleccionado) {
    case "efectivo":
      precioFinal = sumatoriaProductos * IVA * descuentoEfectivo;

    case "debito":
      precioFinal = sumatoriaProductos * IVA * descuentoDebito;

    case "credito":
      precioFinal = sumatoriaProductos * IVA;

    default:
      precioFinal = sumatoriaProductos * IVA;
  }

 swal.fire(`el precio final de ${productosValidos.length} productos es: $ ${precioFinal.toFixed(2)}`) 
});

btnAgregar.addEventListener("click", () => {
  const nombre = nombreProducto.value;
  const precio = parseInt(importeProducto.value);
  const producto = new Producto(nombre, precio);
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const productosActualizados = [...productos, producto];
  localStorage.setItem("productos", JSON.stringify(productosActualizados));

  const fila = `<tr>
              <td>${producto.nombre}</td>
              <td>${producto.precio}</td>
          </tr>`;
  tabla.innerHTML += fila;
});

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  let { addEventListener, className } = input;
  addEventListener("focus", () => (className = "foco-en-input"));
  addEventListener("blur", () => (className = ""));
});
