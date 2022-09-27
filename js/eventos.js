const tabla = document.querySelector("#tablaProductos");
const btnAgregar = document.querySelector("#btnAgregar");
const nombreProducto = document.querySelector("#inputNombre");
const importeProducto = document.querySelector("#inputImporte");
const btnPrecioFinal = document.querySelector("#sumaPrecioFinal");
const modoPagoSeleccionado = document.querySelector(
  'input[name="modoPago"]:checked'
  ).value;
const parrafoPrecioFinal = document.querySelector("#verPrecioFinal");

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
  const productos = JSON.parse(localStorage.getItem("productos"))||[]


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

  parrafoPrecioFinal.innerHTML = `el precio final de ${productosValidos.length} productos es: $ ${precioFinal.toFixed(2)}`
});

btnAgregar.addEventListener("click", () => {
  const nombre = nombreProducto.value;
  const precio = parseInt(importeProducto.value);
  const producto = new Producto(nombre, precio);
  const productos = JSON.parse(localStorage.getItem("productos"))||[];
  productos.push(producto)
  localStorage.setItem("productos", JSON.stringify(productos));

  const fila = `<tr>
              <td>${producto.nombre}</td>
              <td>${producto.precio}</td>
          </tr>`;
  tabla.innerHTML += fila;
});

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("focus", () => (input.className = "foco-en-input"));
  input.addEventListener("blur", () => (input.className = ""));
});
