function calcularStock(cantidadDisponible, cantidadVendida, cantidadConsumida) {
  let stock = cantidadDisponible - cantidadVendida - cantidadConsumida;

  if (stock >= 0) {
    return stock;
  } else {
    return "No hay suficiente stock";
  }
}

function obtenerNumeroIngresado(mensaje) {
  let numero = parseInt(prompt(mensaje));

  while (isNaN(numero) || numero <= 0) {
    numero = parseInt(prompt("Valor inválido. Por favor, ingrese un número válido y mayor a cero:"));
  }

  return numero;
}

let cervezas = [];

// Obtener las cervezas almacenadas en localStorage
let cervezasGuardadas = localStorage.getItem('cervezas');

// Si hay cervezas almacenadas, convertir el JSON a un array
if (cervezasGuardadas) {
  cervezas = JSON.parse(cervezasGuardadas);
}

let cantidadCervezasInput = document.getElementById("cantidadCervezas");
let agregarCervezaButton = document.getElementById("agregarCerveza");
let resultadoDiv = document.getElementById("resultado");

function agregarCerveza() {
  let nombreCervezaInput = prompt("Ingrese el nombre de la cerveza:");
  let cantidadDisponible = obtenerNumeroIngresado("Ingrese la cantidad disponible:");
  let cantidadVendida = obtenerNumeroIngresado("Ingrese la cantidad vendida:");
  let cantidadConsumida = obtenerNumeroIngresado("Ingrese la cantidad consumida:");

  let cerveza = {
    nombre: nombreCervezaInput,
    cantidadDisponible: cantidadDisponible,
    cantidadVendida: cantidadVendida,
    cantidadConsumida: cantidadConsumida
  };

  cervezas.push(cerveza);

  // Guardar las cervezas en localStorage como JSON
  localStorage.setItem('cervezas', JSON.stringify(cervezas));

  mostrarStockCervezas();

  cantidadCervezasInput.value = "";
  agregarCervezaButton.disabled = true;
}

function mostrarStockCervezas() {
  cervezas.forEach((cerveza, index) => {
    cerveza.stockCalculado = calcularStock(cerveza.cantidadDisponible, cerveza.cantidadVendida, cerveza.cantidadConsumida);

    Swal.fire({
      title: `Stock de la cerveza ${cerveza.nombre}`,
      text: `El stock es: ${cerveza.stockCalculado}`,
      icon: "info",
      confirmButtonText: "Aceptar"
    });
  });
}

cantidadCervezasInput.addEventListener("input", function() {
  let cantidadCervezas = parseInt(cantidadCervezasInput.value);

  if (isNaN(cantidadCervezas) || cantidadCervezas <= 0) {
    agregarCervezaButton.disabled = true;
  } else {
    agregarCervezaButton.disabled = false;
  }
});

agregarCervezaButton.addEventListener("click", agregarCerveza);

