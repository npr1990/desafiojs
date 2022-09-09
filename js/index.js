// Agregado de precios.
const IVA = 1.21; 

const descuentoEfectivo = 0.8;

const descuentoDebito = 0.9;

const productos = [];

let consultarSiguiente = true;

function pedirSiguiente() {
  const continuar = confirm("¿Agregar un producto?");
  if (!continuar) {
    consultarSiguiente = false;
    return;
  }
  const nombre = prompt("ingresa el ingrese el nombre del producto:");
  const precio = parseInt(prompt("ingresa el valor del producto, el valor '0' no se tendra en cuenta:"));
  const producto = {nombre: nombre, precio: precio}
  productos.push(producto);

} 
 
//se consulta al usuario multiples veces los valores de los productos. 
//Los valores ingresados se añaden a Array productos
while (consultarSiguiente) {
  pedirSiguiente()
}

//filtrado de productos con atributo precio mayor a 0
let productosValidos = productos.filter(a=>a.precio > 0) 

//funcion que suma (va dentro de reduce)
function sumar(a, b) {
  return a + b.precio;
}
//sumatoria de productos desde "0"
let sumatoriaProductos = productosValidos.reduce(sumar, 0);
//let valorProducto = productos.reduce((a,b)=>{a+b}, 0)

let modoDePago = prompt(
  "ingrese modo de pago: 1 - efectivo (20%), 2 - debito (10%), 3 - credito"
);

function valorFinal(modo) {
  switch (modo) {
    case "1":
      return sumatoriaProductos * IVA * descuentoEfectivo;

    case "2":
      return sumatoriaProductos * IVA * descuentoDebito;

    case "3":
      return sumatoriaProductos * IVA;

    default:
      return sumatoriaProductos * IVA;
  }
}
alert("el precio final de "+productosValidos.length+" productos es: $"+ valorFinal(modoDePago).toFixed(2));

console.table(productosValidos)

//el if con array.includes(nuevoitem) filtra que no sea repetido el elemento. 

