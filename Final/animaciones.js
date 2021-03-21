    // Funcion del Preloader //

window.addEventListener('load', () => {

    setTimeout(carga, 2000);

    function carga (){
        const contenedor = document.querySelector('#contenedor_carga');

        contenedor.style.visibility = 'hidden';
        contenedor.style.opacity = '0';
    }
});


    // Modo Nocturno //

const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', ()=> {

    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');

    // Guardo el modo en localstorage //

    if(document.body.classList.contains('dark')){
    	localStorage.setItem('dark-mode', 'true');
    }

    else {
    	localStorage.setItem('dark-mode', 'false');
    }
});


	// Obtenemos el modo actual //
if(localStorage.getItem('dark-mode') === 'true') {

	document.body.classList.add('dark');
	btnSwitch.classList.add('active');
}

else {

	document.body.classList.remove('dark');
	btnSwitch.classList.remove('active');
}