let sectionInput = document.getElementById('sectionInput');


const botonEnviar = $('section input');
const sectionGracias = $('.flexSeccion')

botonEnviar.click(function(event) {
	
	event.preventDefault()
	let inputNombre = $('#formGroupExampleInput').val()
	let inputEmail = $('#formGroupExampleInput2').val()
	let inputTelefono = $('#formGroupExampleInput3').val()
	let selectProvincia = $('#validationServer04').val()
	let textArea = $('#exampleFormControlTextarea1').val()

	if (inputNombre != '' && inputEmail != '' && inputTelefono != '' && selectProvincia != '' && textArea != ''){
		
		localStorage.setItem('Nombre', inputNombre);
		localStorage.setItem('Email', inputEmail);
		localStorage.setItem('Telefono', inputTelefono);
		localStorage.setItem('Provincia', selectProvincia);
		localStorage.setItem('Escrito', textArea);
	}
})



