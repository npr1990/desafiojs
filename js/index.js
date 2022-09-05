const IVA = 1.21;

const descuentoEfectivo = 0.8;

const descuentoDebito = 0.9;

let valorProducto = parseInt(prompt("ingrese valor de producto:"));

let modoDePago = prompt(
  "ingrese modo de pago: 1 - efectivo (20%), 2 - debito (10%), 3 - credito"
);

function valorFinal(modo) {
  switch (modo) {
  case "1": 
      return valorProducto * IVA * descuentoEfectivo

  case "2": 
      return valorProducto * IVA * descuentoDebito

  case "3": 
      return valorProducto * IVA

  default: 
      return valorProducto * IVA
}
}
alert("el precio final es: "+ valorFinal(modoDePago))  
