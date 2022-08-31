const IVA = 1.21;

const descuentoEfectivo = 0.8;

const descuentoDebito = 0.9;

let valorProducto = parseInt(prompt("ingrese valor de producto:"));

let modoDePago = prompt(
  "ingrese modo de pago: 1 - efectivo (20%), 2 - debito (10%), 3 - credito"
);
let precioFinal;

switch (modoDePago) {
  case "1": precioFinal = valorProducto * IVA * descuentoEfectivo

    break;

  case "2": precioFinal = valorProducto * IVA * descuentoDebito
    break;

  case "3": precioFinal = valorProducto * IVA
    break;

  default: precioFinal = valorProducto * IVA
    break;
}

alert("el precio final es: "+ precioFinal)
