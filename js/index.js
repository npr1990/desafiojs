// Agregado de precios.

const listaValorItems = [];

let consultarSiguiente = true;
while (consultarSiguiente) {
  const resultado = prompt("ingresa el siguiente valor (o X para salir):");
  if (resultado == "x" || resultado == "X") {
    consultarSiguiente = false;
  } else listaValorItems.push(parseInt(resultado));
}

const IVA = 1.21;

const descuentoEfectivo = 0.8;

const descuentoDebito = 0.9;

function sumar(a, b) {
  return a + b;
}
let sumatoriaProductos = listaValorItems.reduce(sumar, 0);
//let valorProducto = listaValorItems.reduce((a,b)=>{a+b}, 0)

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
alert("el precio final es: " + valorFinal(modoDePago));

console.table(listaValorItems);
