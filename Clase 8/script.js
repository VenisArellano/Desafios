// Desafio clase 8:

window.onload = function (){

// Nombre
var nombre = document.getElementById("nombre").value;

console.log(nombre);


// Email
var email = document.getElementById("email").value;

console.log(email);


// Telefono
var telefono = document.getElementById("telefono").value;

console.log(telefono);


// Provincia
var provincia = document.getElementById("validationServer04").value;

console.log(provincia);


}


// Mostrar en consola todos los label

var labels = document.getElementsByClassName("form-label");

console.log(labels);


// Mostrar Mensaje en la pagina
var parrafo = document.createElement("h1");

parrafo.innerHTML = "Ingrese todos los datos por favor!";

document.body.appendChild(parrafo);








