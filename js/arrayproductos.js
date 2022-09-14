class Producto {
    constructor(nombre, precio){
      this.nombre = nombre;
      this.precio = precio;
    }
}

function generadorAutomatico() {
  productos.push(new Producto("NOTEBOOK EXO E17", 29950))
  productos.push(new Producto("MACBOOK AIR 13", 249900,))
  productos.push(new Producto("LENOVO IDEAPAD 13", 199949))
  productos.push(new Producto("IPAD PRO 12", 219890))
  productos.push(new Producto("LENOVO GAMER 15", 409090))
  productos.push(new Producto("MACBOOK PRO 15", 459000))
  productos.push(new Producto("ASUS GAMING PRO 17", 679800))
  productos.push(new Producto("IPAD MINI 7.9", 189900,))
}
generadorAutomatico()