const productos = [
  {
    id: 1,
    nombre: "Birkin Hermes",
    descripcion: "Es un estuche alargado de piel de becerro Swift de Hermès, diseñado con el estampado ecuestre LÉpopée dHermès para llevar teléfonos móviles y tarjetas de forma elegante.",
    precio: 150000000,
    imagen: "https://assets.hermes.com/is/image/hermesedito/087292CKAA_front_wm_1%20%281%29?fit=wrap%2C0&wid=768&resMode=sharp2&op_usm=1%2C1%2C6%2C0"
  },
  {
    id: 2,
    nombre: "Colgante Oro rosa",
    descripcion: "Es el colgante Clou d'H de Hermès, una elegante joya de oro con detalles en forma de tachuela inspirada en la tradición ecuestre de la marca.",
    precio: 95000000,
    imagen: "https://assets.hermes.com/is/image/hermesproduct/colgante-hermes-clou-d-h--223208B%2000-worn-1-0-0-800-800_g.jpg"
  },
  {
    id: 3,
    nombre: "Reloj Cape Code",
    descripcion: "Es un reloj Cape Cod Mini de Hermès, caracterizado por su emblemática caja en forma de ancla de barco y su correa de doble vuelta.",
    precio: 98000000,
    imagen: "https://assets.hermes.com/is/image/hermesproduct/reloj-cape-cod-tamano-mini-27mm--408369WW00-front-wm-1-0-0-800-800_g.jpg"
  },
  {
    id: 4,
    nombre: "Perfume Eau des Mervilles",
    descripcion: "Es una bruma perfumada para el cabello Eau des Merveilles de Hermès, diseñada para perfumar delicadamente el cabello con las notas amaderadas y ambarinas de la fragancia.",
    precio: 15000000,
    imagen: "https://assets.hermes.com/is/image/hermesproduct/eau-des-merveilles-bruma-perfumada-para-el-cabello--108145V0-worn-1-0-0-800-800_g.jpg"
  },
  {
    id: 5,
    nombre: "Abrigo Modulable",
    descripcion: "Es un abrigo modulable de inspiración gabardina de Hermès, una prenda versátil y sofisticada que combina las líneas clásicas de una gabardina tradicional con un diseño contemporáneo.",
    precio: 7500000,
    imagen: "https://assets.hermes.com/is/image/hermesproduct/abrigo-modulable-de-inspiracion-gabardina--6H0140DAA3-worn-2-0-0-800-800_g.jpg"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    li.textContent =
      `${item.nombre} x${item.cantidad} — ` +
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `🧾 Carrito de Compras (${cantidad})`;

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
