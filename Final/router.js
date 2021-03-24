 // Pagina Inicio //
const HomeComponent = {

	postRender: () => {

			// Declaracion de Variables //
		let carritoDeCompras = []

		const contenedorCarrito = document.getElementById('carrito-contenedor');

		const contadorCarrito = document.getElementById('contadorCarrito');
		const precioTotal = document.getElementById('precioTotal');


			// Agregar al Carrito //
		function agregarAlCarrito(id) {
		    let productoAgregar = variedadProductos.find((el) => el.id == id);

		    let productoEnCarrito = document.getElementById(id);

		    if (productoEnCarrito) {

		        let inputCantidad = document.getElementById(`input${id}`);
		        let otroValor  = new Event('change');
		        inputCantidad.value = `${Number.parseInt(inputCantidad.value) + 1}`
		        inputCantidad.dispatchEvent(otroValor);
		    }

		    else {

		        carritoDeCompras.push(productoAgregar);
		        localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));

		        actualizarCarrito()

		        let div = document.createElement('div')
		        div.id = id;
		        div.classList.add('productoEnCarrito')
		        div.innerHTML =`
		                <img class="imgCarrito img-thumbnail" src=${productoAgregar.img} alt=${productoAgregar.nombre}>
		                <p><strong>${productoAgregar.nombre}</strong></p>
		                <p>
		                    <label for="number"><strong>Cantidad:</strong></label>
		                    <input class="inputCard" type="number" id="input${id}" min="1" max="50" value="1">
		                </p>
		                <p>Precio: $${productoAgregar.precio}</p>
		                <button id="eliminar${productoAgregar.id}" type="button" class="btn-close" aria-label="Close"></button>
		        `
		        contenedorCarrito.appendChild(div)

		        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
		        let inputCantidad = document.getElementById(`input${id}`)


		        function eliminar() {

		            botonEliminar.parentElement.remove()
		            carritoDeCompras = carritoDeCompras.filter((el) => el.id != productoAgregar.id)
		            localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		            actualizarCarrito();
		        }

		        let cantidadAnterior = Number.parseInt(inputCantidad.value);
		        inputCantidad.addEventListener('change', (e) => {

		            let nuevoValor = Number.parseInt(e.target.value)
		            if (nuevoValor >= cantidadAnterior) {

		                carritoDeCompras.push(productoAgregar);
		                localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		                actualizarCarrito();
		            }

		            else {

		                let posicionProducto = carritoDeCompras.find(producto => producto.id === id)
		                carritoDeCompras.splice(carritoDeCompras.indexOf(posicionProducto), 1)
		                localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		                actualizarCarrito();
		            }

		            cantidadAnterior = nuevoValor;
		        })

		        botonEliminar.addEventListener('click', eliminar);
		    }
		}

		    // Funcion Actualizar Carrito //

		function actualizarCarrito() {
		    contadorCarrito.innerText = carritoDeCompras.length;
		    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0);
		}

		   	// Funcion para revisar el localstorage //
		function chequearLocal() {

		    let carroLocal = JSON.parse(localStorage.getItem('carritoDeCompras'));
		    if (carroLocal) {

		        carroLocal.forEach((el) => {

		            agregarAlCarrito(el.id)
		        })
		    }
		};

		chequearLocal();
	},

	render: () => {
		return `
     		<!------------------------------ Carrito --------------------------------------->
		    <div class="modal fade" id="exampleModal20" tabindex="-1" aria-labelledby="exampleModal02Label" aria-hidden="true">
		      <div class="modal-dialog">
		        <div class="modal-content modalBackgroung">
		          <div class="modal-header">
		            <h2 class="modal-title" id="exampleModal02Label">Carrito</h2>
		            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		          </div>

		          <div class="modal-body">
		            <div id="carrito-contenedor">

		              <div class="productoEnCarrito"></div>

		            </div>

		            <p class="precioProducto">Total a Pagar: $<span id="precioTotal"></span></p>
		     		 
		           	<!-------------- Integrando el boton para pagar por Paypal ---------------->
		     		<div id="smart-button-container">
				      <div style="text-align: center;">
				        <div id="paypal-button-container"></div>
				      </div>
				    </div>
				    
				  <script>
				    function initPayPalButton() {
				      paypal.Buttons({
				        style: {
				          shape: 'pill',
				          color: 'blue',
				          layout: 'vertical',
				          label: 'buynow',
				          
				        },

				        createOrder: function(data, actions) {
				          return actions.order.create({
				            purchase_units: [{"description":"Producto de Prueba","amount":{"currency_code":"USD","value":2,"breakdown":{"item_total":{"currency_code":"USD","value":1},"shipping":{"currency_code":"USD","value":1},"tax_total":{"currency_code":"USD","value":0}}}}]
				          });
				        },

				        onApprove: function(data, actions) {
				          return actions.order.capture().then(function(details) {
				            alert('Transaction completed by ' + details.payer.name.given_name + '!');
				          });
				        },

				        onError: function(err) {
				          console.log(err);
				        }
				      }).render('#paypal-button-container');
				    }
				    initPayPalButton();
				  </script>
		     		
		          </div>
		        </div>
		      </div>
		    </div>
		    <!----------------------------- Fin Carrito --------------------------------->

		    <!----------------------------- Carousel Fotos ---------------------------------->
		    <section>
		      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
		        <ol class="carousel-indicators">
		          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
		          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
		          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
		          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></li>
		          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></li>
		          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5"></li>
		          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6"></li>
		          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="7"></li>
		          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="8"></li>
		        </ol>
		        <div class="carousel-inner">
		          <div class="carousel-item active">
		            <img src="Imagenes/Panes/Pan1.jpg" class="d-block inicioImgPro" alt="Productos">
		          </div>
		          <div class="carousel-item">
		            <img src="Imagenes/Panes/Fondo4.jpg" class="d-block inicioImgPro" alt="Productos">
		          </div>
		          <div class="carousel-item">
		            <img src="Imagenes/Panes/Fondo8.jpg" class="d-block inicioImgPro" alt="Productos">
		          </div>
		          <div class="carousel-item">
		            <img src="Imagenes/Panes/Fondo7.jpg" class="d-block inicioImgPro" alt="Productos">
		          </div>
		          <div class="carousel-item">
		            <img src="Imagenes/Panes/Fondo6.jpg" class="d-block inicioImgPro" alt="Productos">
		          </div>
		          <div class="carousel-item">
		            <img src="Imagenes/Panes/Fondo9.jpg" class="d-block inicioImgPro" alt="Productos">
		          </div>
		          <div class="carousel-item">
		            <img src="Imagenes/Panes/Fondo1.jpg" class="d-block inicioImgPro" alt="Productos">
		          </div>
		          <div class="carousel-item">
		            <img src="Imagenes/Panes/Fondo10.jpg" class="d-block inicioImgPro" alt="Productos">
		          </div>
		          <div class="carousel-item">
		            <img src="Imagenes/Panes/Fondo11.jpg" class="d-block inicioImgPro" alt="Productos">
		          </div>
		        </div>
		        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
		          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		          <span class="visually-hidden">Previous</span>
		        </a>
		        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
		          <span class="carousel-control-next-icon" aria-hidden="true"></span>
		          <span class="visually-hidden">Next</span>
		        </a>
		      </div>

		      <form>
		        <div>
		          <a href="#/productos">
		            <input type="button" name="boton" value="Tienda On-Line" class="body__centrarBotones"/>
		          </a>
		        </div>
		      </form>
		    </section>
		    <!----------------------------- Fin Carousel Fotos ------------------------------>

		    <!----------------------------- Recomendaciones --------------------------------->
		    <h2>Recomendaciones <span class="animacionColor badge">New</span></h2>
		    <div class="container-fluid">
		      <div class="row">
		        <div class="col-md-3 ms-auto modalFlex">
		            <li id="Baguette"><img src="Imagenes/Panes/Baguette.jpg" class="inicioRecomendados img-thumbnail img__aniImag"/>
		            </li>

		            <div>
		              <h5 class="reco">Panes</h5>
		            </div>
		        </div>

		        <div class="col-md-3 ms-auto modalFlex">
		            <li id="Tortas"><img src="Imagenes/Tortas/rogel.jpg" class="inicioRecomendados img-thumbnail img__aniImag" alt="Tortas"/>
		            </li>

		            <div>
		              <h5 class="reco">Tortas</h5>
		            </div>
		        </div>

		        <div class="col-md-3 ms-auto modalFlex">
		            <li id="Dulces"><img src="Imagenes/Dulces/Pepas.jpg" class="inicioRecomendados img-thumbnail img__aniImag" alt="Dulces"/>
		            </li>

		            <div>
		              <h5 class="reco">Dulces</h5>
		            </div>
		        </div>

		        <div class="col-md-3 ms-auto modalFlex">
		            <li id="Salados"><img src="Imagenes/Salados/Pizzas.jpg" class="inicioRecomendados img-thumbnail img__aniImag" alt="Salados"/>
		            </li>

		            <div>
		              <h5 class="reco">Salados</h5>
		            </div>
		        </div>
		      </div>

		      <div>
		          <a href="#/productos">
		              <input type="button" name="boton" value="Ver todos los Productos" class="body__centrarBotones"/>
		            </a>
		      </div>
		    </div>
		    <!---------------------------- Fin Recomendaciones ------------------------------>

		    <!----------------------------- Redes Sociales ----------------------------------->
		    <section>
		        <h2>Redes Sociales</h2>
		        <div class="paddingRedes"> 
		          <a class="margenContacto" href="https://www.facebook.com/"/>
		            <img src="Logos/Logos redes sociales/Facebook.png" alt="facebook" class="redesInstagram"/></a>
		          <a class="margenContacto" href="https://instagram.com/estelacocina.ve?igshid=2zspqbnyfhmv"/>
		            <img src="Logos/Logos redes sociales/Instagram.png" alt="instagram" class="redesInstagram"/></a>
		        </div>
		    </section>
		    <!--------------------------------- Fin Redes Sociales --------------------------->
    	`;
  	}
};


	// Pagina Productos //
const ProductosComponent = {

	postRender: () => {

		    // Declaracion de Variables //
		let carritoDeCompras = []

		const contenedorCarrito = document.getElementById('carrito-contenedor');

		const contadorCarrito = document.getElementById('contadorCarrito');
		const precioTotal = document.getElementById('precioTotal');
		const contenedorProductos = document.getElementById('contenedor-productos');

		    // Variables para el modal Registrarse o Login //

		const iniciar = document.getElementById('btn__iniciar-sesion');
		const registro = document.getElementById('btn__registrarse');

		const contenedor_login_register = document.querySelector('.contenedor__login-register');
		const formulario_login = document.querySelector('.formulario__login');
		const formulario_register = document.querySelector('.formulario__register');
		const caja_trasera_login = document.querySelector('.caja__trasera-login');
		const caja_trasera_register = document.querySelector('.caja__trasera-register');

		    // Eventos sobre el modal Registrarse o Loguearse //
		iniciar.addEventListener('click', ()=> {
		    contenedor_login_register.classList.remove('contenedor__login-register1');
		    contenedor_login_register.classList.add('contenedor__login-register');

		    caja_trasera_login.classList.remove('caja__trasera-login1');
		    caja_trasera_login.classList.add('caja__trasera-login');

		    caja_trasera_register.classList.remove('caja__trasera-register1');
		    caja_trasera_register.classList.add('caja__trasera-register');

		    formulario_register.classList.remove('formulario__register1');
		    formulario_register.classList.add('formulario__register');

		    formulario_login.classList.remove('formulario__login1');
		    formulario_login.classList.add('formulario__login');
		});

		registro.addEventListener('click', ()=> {
		    contenedor_login_register.classList.remove('contenedor__login-register');
		    contenedor_login_register.classList.add('contenedor__login-register1');

		    caja_trasera_login.classList.remove('caja__trasera-login');
		    caja_trasera_login.classList.add('caja__trasera-login1');

		    caja_trasera_register.classList.remove('caja__trasera-register');
		    caja_trasera_register.classList.add('caja__trasera-register1');

		    formulario_register.classList.remove('formulario__register');
		    formulario_register.classList.add('formulario__register1');

		    formulario_login.classList.remove('formulario__login');
		    formulario_login.classList.add('formulario__login1');
		});

			// Al seleccionar una opcion, muestra los productos de dicha opcion //
		const selecProducto = document.getElementById('selecProducto');

		selecProducto.addEventListener('change', ()=>{
		    console.log(selecProducto.value)
		    
		    if (selecProducto.value == "all") {
		        mostrarProductos(variedadProductos)
		    } else {
		        mostrarProductos(variedadProductos.filter((el)=> el.tipo == selecProducto.value))
		    }
		});

		mostrarProductos(variedadProductos);
		chequearLocal();

		    // Funcion Para Mostrar todos los productos del archivo producto.js //
		function mostrarProductos(array){
		    contenedorProductos.innerHTML = ''
		    array.forEach((productoNuevo)=>{
		        let div = document.createElement('div')
		        div.classList.add('muestra-tipo')
		        div.innerHTML += `
		                        <div class="decorationCard card">
		                            <img src=${productoNuevo.img} class="inicioRecomendados img-thumbnail img__aniImag card-img-top" alt=${productoNuevo.nombre}>
		                            <div class="card-body">
		                                <h5 class="card-title">${productoNuevo.nombre}</h5>
		                                <p class="card-text"><strong>${productoNuevo.unidad}: $${productoNuevo.precio}</strong></p>
		                                <input id="boton${productoNuevo.id}" data-id=${productoNuevo.id} type="button" name="boton" value="Agregar al Carrito" class="body__centrarBotones"/>
		                                <p id="texto${productoNuevo.id}"</p>
		                            </div>
		                        </div>
		        `
		        contenedorProductos.appendChild(div)

		        let boton = document.getElementById(`boton${productoNuevo.id}`)

		        boton.addEventListener('click', ()=>{
		            agregarAlCarrito(productoNuevo.id)
		        })
		    })
		}

			// Agregar al Carrito //
		function agregarAlCarrito(id) {
		    let productoAgregar = variedadProductos.find((el) => el.id == id);

		    let productoEnCarrito = document.getElementById(id);

		    if (productoEnCarrito) {

		        let inputCantidad = document.getElementById(`input${id}`);
		        let otroValor  = new Event('change');
		        inputCantidad.value = `${Number.parseInt(inputCantidad.value) + 1}`

		        inputCantidad.dispatchEvent(otroValor);
		    }

		    else {

		        carritoDeCompras.push(productoAgregar);
		        localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));

		        actualizarCarrito()

		        let div = document.createElement('div')
		        div.id = id;
		        div.classList.add('productoEnCarrito')
		        div.innerHTML =`
		        	<div>
		                <img class="imgCarrito img-thumbnail img__aniImag" src=${productoAgregar.img} alt=${productoAgregar.nombre}>
		                <p><strong>${productoAgregar.nombre}</strong></p>
		            </div>
		                <p>
		                    <label for="number"><strong>Cantidad:</strong></label>
		                    <input class="inputCard" type="number" id="input${id}" min="1" max="50" value="1">
		                </p>
		                <strong>Precio: $${productoAgregar.precio}</strong>
		                <button id="eliminar${productoAgregar.id}" type="button" class="btn-close" aria-label="Close"></button>
		        `
		        contenedorCarrito.appendChild(div)

		        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
		        let inputCantidad = document.getElementById(`input${id}`)


		        function eliminar() {

		            botonEliminar.parentElement.remove()
		            carritoDeCompras = carritoDeCompras.filter((el) => el.id != productoAgregar.id)
		            localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		            actualizarCarrito();
		        }

		        let cantidadAnterior = Number.parseInt(inputCantidad.value);
		        inputCantidad.addEventListener('change', (e) => {

		            let nuevoValor = Number.parseInt(e.target.value)
		            if (nuevoValor >= cantidadAnterior) {

		                carritoDeCompras.push(productoAgregar);
		                localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		                actualizarCarrito();
		            }

		            else {

		                let posicionProducto = carritoDeCompras.find(producto => producto.id === id)
		                carritoDeCompras.splice(carritoDeCompras.indexOf(posicionProducto), 1)
		                localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		                actualizarCarrito();
		            }

		            cantidadAnterior = nuevoValor;
		        })

		        botonEliminar.addEventListener('click', eliminar);
		    }
		}

		    // Funcion Actualizar Carrito //

		function actualizarCarrito() {
		    contadorCarrito.innerText = carritoDeCompras.length;
		    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0);

		}

			// Funcion para revisar el localstorage //
		function chequearLocal() {

		    let carroLocal = JSON.parse(localStorage.getItem('carritoDeCompras'));
		    if (carroLocal) {

		        carroLocal.forEach((el) => {

		            agregarAlCarrito(el.id)
		        })
		    }
		}

		    // Carga el modal de Login //
		$(document).ready(function() {
		    document.getElementById('login').click();
		});

		    // Guardo datos del cliente en el localstorage //
		$("#registrar").click(usuario);

		function usuario(){
		    
		    nombre = document.getElementById('nombreUsuarie').value;
		    email = document.getElementById('correo').value;
		    usuario = document.getElementById('usuario').value;
		    contrasena = document.getElementById('contrasena1').value;
		    
		    localStorage.setItem('nombre', nombre);
		    localStorage.setItem('email', email);
		    localStorage.setItem('usuario', usuario);
		    localStorage.setItem('contrasena', contrasena);

		    datosUsuario();
		};

		    // Obtengo los datos del cliente y muestro su nombre //

		function datosUsuario(){

		    usuario = localStorage.getItem('nombre');
		    
		    if(!usuario){

		        document.getElementById('nombre1').innerHTML = ''
		    }

		    else {

		        document.getElementById('nombre1').innerHTML = `
		        <li><strong class="botonSalir">${usuario}</strong> 
		            <button class="salir" onclick="checout();" id="salir">
		                <img class="botonSalir img__aniImag1" src="Logos/Logos redes sociales/salir.png" alt="Salir">
		            </button>
		        </li>`
		    };
		};

		    // Al comprar o salir del usuario se borrara todo el localstorage //
		$(".btn-cerrar-modal").click(checout);

		function checout(){
		    localStorage.clear();
		    document.location.reload(true);
		};

		datosUsuario();
	},

	render: () => {
		return `
      		<!------------------------------ Carrito --------------------------------------->
		    <div class="modal fade" id="exampleModal20" tabindex="-1" aria-labelledby="exampleModal02Label" aria-hidden="true">
		      <div class="modal-dialog">
		        <div class="modal-content modalBackgroung">
		          <div class="modal-header">
		            <h2 class="modal-title" id="exampleModal02Label">Carrito</h2>
		            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		          </div>

		          <div class="modal-body">
		            <div id="carrito-contenedor">

		              <div class="productoEnCarrito"></div>

		            </div>

		            <p class="precioProducto">Total a Pagar: $<span id="precioTotal"></span></p>
		     		 
		           	<!-------------- Integrando el boton para pagar por Paypal ---------------->
		     		<div id="smart-button-container">
				      <div style="text-align: center;">
				        <div id="paypal-button-container"></div>
				      </div>
				    </div>

				  <script>
				    function initPayPalButton() {
				      paypal.Buttons({
				        style: {
				          shape: 'pill',
				          color: 'blue',
				          layout: 'vertical',
				          label: 'buynow',
				          
				        },

				        createOrder: function(data, actions) {
				          return actions.order.create({
				            purchase_units: [{"description":"Producto de Prueba","amount":{"currency_code":"USD","value":2,"breakdown":{"item_total":{"currency_code":"USD","value":1},"shipping":{"currency_code":"USD","value":1},"tax_total":{"currency_code":"USD","value":0}}}}]
				          });
				        },

				        onApprove: function(data, actions) {
				          return actions.order.capture().then(function(details) {
				            alert('Transaction completed by ' + details.payer.name.given_name + '!');
				          });
				        },

				        onError: function(err) {
				          console.log(err);
				        }
				      }).render('#paypal-button-container');
				    }
				    initPayPalButton();
				  </script>
		     		
		          </div>
		        </div>
		      </div>
		    </div>
		    <!----------------------------- Fin Carrito --------------------------------->

    		<!----------------------------- Login/Registro ------------------------------>
		    <button id="login" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style="display: none;"> Datos para comprar
		    </button>

		    <section>
		      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		        <div class="modal-dialog modal-lg">
		          <div class="modal-content modalBackgroung">

		            <div class="modal-header">
		              <h2 class="modal-title" id="exampleModalLabel">Ingresar Usuario</h2>
		              <button id="loginCerrar" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		            </div>

		            <div id="carrito_div" class="modal-body">
		              <div class="contenedor__todo">

		                <div class="caja__trasera">
		                  <div class="caja__trasera-login">
		                    <h3>¿Ya estas registrado?</h3>
		                    <p>Inicia sesiòn para comprar</p>
		                    <button id="btn__iniciar-sesion" class="body__centrarBotones btn btn-light">Iniciar Sesiòn</button>
		                  </div>

		                  <div class="caja__trasera-register">
		                    <h3>¿Aùn no estas registrado?</h3>
		                    <p>Registrate para poder comprar</p>
		                    <button id="btn__registrarse" class="body__centrarBotones btn btn-light">Registrarse</button>
		                  </div>
		                </div>

		                <div class="contenedor__login-register">
		                  <form class="formulario__login">
		                    <h2>Iniciar Sesiòn</h2>
		                    <div class="form-group text-start">
		                      <label for="usuario1"><h5>Usuario:</h5></label>
		                      <input type="text" placeholder="Usuario" class="form-control" id="usuario1">

		                      <label for="contrasena"><h5>Contraseña:</h5></label>
		                      <input type="password" placeholder="Contraseña" class="form-control" id="contrasena">
		                    </div>

		                     <button type="submit" id="ingresar" class="body__centrarBotones btn btn-light" data-bs-dismiss="modal">Ingresar</button>
		                  </form>

		                  <form class="formulario__register">
		                    <h2>Registrarse</h2>
		                    <div class="form-group text-start">
		                      <label for="nombreUsuarie"><h5>Nombre:</h5></label>
		                      <input type="text" placeholder="Nombre" class="form-control" id="nombreUsuarie">

		                      <label for="correo"><h5>Correo Electronico:</h5></label>
		                      <input type="email" placeholder="nombre@ejemplo.com" class="form-control" id="correo">

		                      <label for="usuario"><h5>Usuario:</h5></label>
		                      <input type="text" placeholder="Usuario" class="form-control" id="usuario">

		                      <label for="contrasena1"><h5>Contraseña:</h5></label>
		                      <input type="password" placeholder="Contraseña" class="form-control" id="contrasena1">
		                    </div>

		                    <button type="submit" id="registrar" class="body__centrarBotones btn btn-light" data-bs-dismiss="modal">Registrarse</button>
		                  </form>
		                </div>
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>
		    </section>
		    <!----------------------------- Fin Login/Registro ------------------------------>

		    <!----------------------------- Seleccion tipo Productos ------------------------->
		    <h2 class="titulo">Productos</h2>
		    <select class="selector" id="selecProducto">
		        <option class="opciones" value="all">Todos</option>
		        <option class="opciones" value="Panes">Panes</option>
		        <option class="opciones" value="Dulces">Dulces</option>
		        <option class="opciones" value="Salados">Salados</option>
		        <option class="opciones" value="Tortas">Tortas</option>
		        <option class="opciones" value="Masas">Masas</option>
		        <option class="opciones" value="Bombones">Bombones</option>
		    </select>
		    <!----------------------------- Fin Seleccion tipo Productos --------------------->

		    <!----------------------------- Muestro los Productos ---------------------------->
		    <div class="container-fluid">
		      <div class="modalFlex">
		        <div class="muestra"></div>
		                
		        <div id="contenedor-productos">

		          <div class="muestra-tipo"></div>

		        </div>
		      </div>
		    </div>
		    <!----------------------------- Fin Muestro los Productos ------------------------>
    	`;
  	}
};


	// Pagina Recetas //
const RecetasComponent = {

	postRender: () => {

			// Declaracion de Variables //
		let carritoDeCompras = []

		const contenedorCarrito = document.getElementById('carrito-contenedor');

		const contadorCarrito = document.getElementById('contadorCarrito');
		const precioTotal = document.getElementById('precioTotal');


			// Agregar al Carrito //
		function agregarAlCarrito(id) {
		    let productoAgregar = variedadProductos.find((el) => el.id == id);

		    let productoEnCarrito = document.getElementById(id);

		    if (productoEnCarrito) {

		        let inputCantidad = document.getElementById(`input${id}`);
		        let otroValor  = new Event('change');
		        inputCantidad.value = `${Number.parseInt(inputCantidad.value) + 1}`
		        inputCantidad.dispatchEvent(otroValor);
		    }

		    else {

		        carritoDeCompras.push(productoAgregar);
		        localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));

		        actualizarCarrito()

		        let div = document.createElement('div')
		        div.id = id;
		        div.classList.add('productoEnCarrito')
		        div.innerHTML =`
		                <img class="imgCarrito img-thumbnail" src=${productoAgregar.img} alt=${productoAgregar.nombre}>
		                <p><strong>${productoAgregar.nombre}</strong></p>
		                <p>
		                    <label for="number"><strong>Cantidad:</strong></label>
		                    <input class="inputCard" type="number" id="input${id}" min="1" max="50" value="1">
		                </p>
		                <p>Precio: $${productoAgregar.precio}</p>
		                <button id="eliminar${productoAgregar.id}" type="button" class="btn-close" aria-label="Close"></button>
		        `
		        contenedorCarrito.appendChild(div)

		        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
		        let inputCantidad = document.getElementById(`input${id}`)


		        function eliminar() {

		            botonEliminar.parentElement.remove()
		            carritoDeCompras = carritoDeCompras.filter((el) => el.id != productoAgregar.id)
		            localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		            actualizarCarrito();
		        }

		        let cantidadAnterior = Number.parseInt(inputCantidad.value);
		        inputCantidad.addEventListener('change', (e) => {

		            let nuevoValor = Number.parseInt(e.target.value)
		            if (nuevoValor >= cantidadAnterior) {

		                carritoDeCompras.push(productoAgregar);
		                localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		                actualizarCarrito();
		            }

		            else {

		                let posicionProducto = carritoDeCompras.find(producto => producto.id === id)
		                carritoDeCompras.splice(carritoDeCompras.indexOf(posicionProducto), 1)
		                localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		                actualizarCarrito();
		            }

		            cantidadAnterior = nuevoValor;
		        })

		        botonEliminar.addEventListener('click', eliminar);
		    }
		}

		    // Funcion Actualizar Carrito //

		function actualizarCarrito() {
		    contadorCarrito.innerText = carritoDeCompras.length;
		    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0);
		}

		   	// Funcion para revisar el localstorage //
		function chequearLocal() {

		    let carroLocal = JSON.parse(localStorage.getItem('carritoDeCompras'));
		    if (carroLocal) {

		        carroLocal.forEach((el) => {

		            agregarAlCarrito(el.id)
		        })
		    }
		};

		chequearLocal();
	},

	render: () => {
		return `
			<!------------------------------ Carrito --------------------------------------->
		    <div class="modal fade" id="exampleModal20" tabindex="-1" aria-labelledby="exampleModal02Label" aria-hidden="true">
		      <div class="modal-dialog">
		        <div class="modal-content modalBackgroung">
		          <div class="modal-header">
		            <h2 class="modal-title" id="exampleModal02Label">Carrito</h2>
		            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		          </div>

		          <div class="modal-body">
		            <div id="carrito-contenedor">

		              <div class="productoEnCarrito"></div>

		            </div>

		            <p class="precioProducto">Total a Pagar: $<span id="precioTotal"></span></p>
		     		 
		           	<!-------------- Integrando el boton para pagar por Paypal ---------------->
		     		<div id="smart-button-container">
				      <div style="text-align: center;">
				        <div id="paypal-button-container"></div>
				      </div>
				    </div>
				    
				  <script>
				    function initPayPalButton() {
				      paypal.Buttons({
				        style: {
				          shape: 'pill',
				          color: 'blue',
				          layout: 'vertical',
				          label: 'buynow',
				          
				        },

				        createOrder: function(data, actions) {
				          return actions.order.create({
				            purchase_units: [{"description":"Producto de Prueba","amount":{"currency_code":"USD","value":2,"breakdown":{"item_total":{"currency_code":"USD","value":1},"shipping":{"currency_code":"USD","value":1},"tax_total":{"currency_code":"USD","value":0}}}}]
				          });
				        },

				        onApprove: function(data, actions) {
				          return actions.order.capture().then(function(details) {
				            alert('Transaction completed by ' + details.payer.name.given_name + '!');
				          });
				        },

				        onError: function(err) {
				          console.log(err);
				        }
				      }).render('#paypal-button-container');
				    }
				    initPayPalButton();
				  </script>
		     		
		          </div>
		        </div>
		      </div>
		    </div>
		    <!----------------------------- Fin Carrito --------------------------------->


      		<!----------------------------- Seccion de Recetas ------------------------------>
		    <section>
		      <h2>Recetas</h2>
		      <div class="container-fluid">
		        <div class="row">

		          <div class="col-md-3 ms-auto modalFlex">
		            <li id="Rogel"><img src="Imagenes/Recetas/Rogel.jpg" class="inicioRecomendados img-thumbnail img__aniImag"/></li>
		                    
		            <div>
		              <!------------------- Boton Rogel modal ------------------->
		              <input type="button" name="boton" value="Rogel" class="body__centrarBotones" data-bs-toggle="modal" data-bs-target="#staticBackdrop10"/>
		                        
		              <!----------------------------- Modal ---------------------->
		              <div class="modal fade" id="staticBackdrop10" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel10" aria-hidden="true">
		                <div class="modal-dialog modal-xl">
		                  <div class="modal-content modalBackgroung">

		                    <!---------------------- RECETA ROGEL ------------------>
		                    <div class="modal-header">
		                      <h2 class="modal-title" id="staticBackdropLabel10">Rogel</h2>
		                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		                    </div>

		                    <img class="rogel img-thumbnail img__aniImag" src="Imagenes/Recetas/Rogel.jpg" alt="Rogel">

		                    <nav class="margenNav">
		                      <div class="nav nav-tabs" id="nav-tab" role="tablist">
		                        <a class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><h5>Ingredientes</h5></a>

		                        <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><h5>Preparación</h5></a>
		                      </div>
		                    </nav>

		                    <div class="margenNav tab-content" id="nav-tabContent">
		                      <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><h2>Ingredientes:</h2>

		                        <ul class="margenIngredientes list-group">
		                          <li class="margenIngredientes1 list-group-item text-start"><h5>Masa:</h5>
		                            <input class="form-check-input me-1" type="checkbox" value="1">500gr Harina 0000.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">500cc Crema 500.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start"><h5>Relleno:</h5>
		                            <input class="form-check-input me-1" type="checkbox" value="1">1kg Dulce de leche.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start"><h5>Cubierta:</h5>
		                            <input class="form-check-input me-1" type="checkbox" value="1">4u Claras.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">240gr Azucar.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">80cc Agua.
		                          </li>
		                        </ul>
		                      </div>

		                      <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><h2>Preparación:</h2>

		                        <div class="margenRogel shadow-lg p-3 mb-5 bg-white rounded overflow-auto">
		                          <p class="text-start font-monospace">1-. Para la masa, en un bol, mezclar los dos ingredientes y amasar. Hacer un cilindro y cortar en 10 partes iguales.</p>

		                          <p class="text-start font-monospace">2-. Estirar los discos del mismo diámetro y cocer al horno medio 10' en placa enmantecada, pinchar con tenedor. Cuidar que no se queme y dar vuelta si se quiere dorar de ambos lados.</p>

		                          <p class="text-start font-monospace">3-. Armar las capas rellenando con dulce de leche.</p>

		                          <p class="text-start font-monospace">4-. Merengue: Batir las claras, llevar a fuego el azúcar con el agua hasta punto bolita blanda, agregarlo en forma de hilo a las claras mientras sigue batiendo (bajar la velocidad de la batidora) luego seguir batiendo hasta que baje la temperatura del merengue una vez listo cubrir la torta.</p>
		                        </div>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>

		          <div class="col-md-3 ms-auto modalFlex">
		            <li id="Pepas"><img src="Imagenes/Recetas/Pepas1.jpg" class="inicioRecomendados img-thumbnail img__aniImag"/></li>

		            <div>
		              <!---------------------------- Boton Pepas modal ------------------>
		              <input type="button" name="boton" value="Pepas" class="body__centrarBotones" data-bs-toggle="modal" data-bs-target="#staticBackdrop11"/>
		                        
		              <!---------------------------------- Modal ------------------------>
		              <div class="modal fade" id="staticBackdrop11" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel11" aria-hidden="true">
		                <div class="modal-dialog modal-xl">
		                  <div class="modal-content modalBackgroung">

		                    <!--------------------------- RECETA PEPAS -------------->
		                    <div class="modal-header">
		                      <h2 class="modal-title" id="staticBackdropLabel11">Pepas</h2>
		                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		                    </div>

		                    <img class="rogel img-thumbnail img__aniImag" src="Imagenes/Recetas/Pepas1.jpg" alt="Pepas">

		                    <!----------------------- INGREDIENTES ----------------------------->

		                    <nav class="margenNav">
		                      <div class="nav nav-tabs" id="nav-tab1" role="tablist">
		                        <a class="nav-link active" id="nav-home1-tab" data-bs-toggle="tab" href="#nav-home1" role="tab" aria-controls="nav-home1" aria-selected="true"><h5>Ingredientes</h5></a>

		                        <a class="nav-link" id="nav-profile1-tab" data-bs-toggle="tab" href="#nav-profile1" role="tab" aria-controls="nav-profile1" aria-selected="false"><h5>Preparación</h5></a>
		                      </div>
		                    </nav>

		                    <div class="margenNav tab-content" id="nav-tabContent">
		                      <div class="tab-pane fade show active" id="nav-home1" role="tabpanel" aria-labelledby="nav-home1-tab"><h2>Ingredientes:</h2>

		                        <ul class="margenIngredientes list-group">
		                          <li class="margenIngredientes1 list-group-item text-start"><h5>Masa:</h5>
		                            <input class="form-check-input me-1 text-start" type="checkbox" value="1">150gr Manteca.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">70gr Azucar impalpable.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">2 Yemas de huevo.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">1cda Extracto de vainilla.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">Ralladura de un limón.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">280gr Harina leudante.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">1/2 cucharada polvo de hornear.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start"><h5>Relleno:</h5>
		                            <input class="form-check-input me-1" type="checkbox" value="1">500gr Dulce de membrillo
		                          </li>
		                        </ul>
		                      </div>

		                      <div class="tab-pane fade" id="nav-profile1" role="tabpanel" aria-labelledby="nav-profile1-tab"><h2>Preparación:</h2>

		                        <div class="margenPepa shadow-lg p-3 mb-5 bg-white rounded overflow-auto">
		                          <p class="text-start font-monospace">1-. En un bol combinar la manteca junto con el azúcar impalpable. Cremar.</p>

		                          <p class="text-start font-monospace">2-. Perfumar con extracto de vainilla y ralladura de limón.</p>

		                          <p class="text-start font-monospace">3-. Incorporar las yemas una a la vez.</p>

		                          <p class="text-start font-monospace">4-. Tamizar la harina con el polvo de hornear. Integrar en dos veces.</p>

		                          <p class="text-start font-monospace">5-. Volcar la masa en papel film. Envolver y enfriar 1 hora en heladera.</p>

		                          <p class="text-start font-monospace">6-. Formar esferas de 13 gr a 15 gr.</p>

		                          <p class="text-start font-monospace">7-. Colocar en una placa con papel manteca o lámina antiadherente. Hundir con el pulgar.</p>

		                          <h5>Preparacion del Relleno:</h5>
		                          <p class="text-start font-monospace">1-. Cortar en cubos el membrillo. Añadir un chorrito de agua y llevar 1' a microondas.</p>

		                          <p class="text-start font-monospace">2-. Pisar con tenedor. Hasta que se encuentra maleable.</p>

		                          <p class="text-start font-monospace">3-. Rellenar las pepas con cuchara o manga descartable. Llevar 10' a heladera.</p>

		                          <p class="text-start font-monospace">4-. Hornear 8' a 10' a 175°C o hasta que su base este levemente dorada. Retirar y enfriar.</p>
		                        </div>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		              </div>
		            </div> 
		          </div>

		          <div class="col-md-3 ms-auto modalFlex">
		            <li id="PastaFlora"><img src="Imagenes/Recetas/PastaFlora1.jpg" class="inicioRecomendados img-thumbnail img__aniImag"/></li>

		            <div>
		              <!--------------------- Boton Pasta Flora modal ------------>
		              <input type="button" name="boton" value="Pasta Flora" class="body__centrarBotones" data-bs-toggle="modal" data-bs-target="#staticBackdrop12"/>
		                        
		              <!-------------------------- Modal -------------------------->
		              <div class="modal fade" id="staticBackdrop12" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel12" aria-hidden="true">
		                <div class="modal-dialog modal-xl">
		                  <div class="modal-content modalBackgroung">

		                    <!-------------------- RECETA PASTA FLORA ------------->
		                    <div class="modal-header">
		                      <h2 class="modal-title" id="staticBackdropLabel12">Pasta Flora</h2>
		                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		                    </div>

		                    <img class="rogel img-thumbnail img__aniImag" src="Imagenes/Recetas/PastaFlora1.jpg" alt="Pasta_Flora">

		                    <!------------------------- INGREDIENTES --------------------------->

		                    <nav class="margenNav">
		                      <div class="nav nav-tabs" id="nav-tab2" role="tablist">
		                        <a class="nav-link active" id="nav-home2-tab" data-bs-toggle="tab" href="#nav-home2" role="tab" aria-controls="nav-home2" aria-selected="true"><h5>Ingredientes</h5></a>

		                        <a class="nav-link" id="nav-profile2-tab" data-bs-toggle="tab" href="#nav-profile2" role="tab" aria-controls="nav-profile2" aria-selected="false"><h5>Preparación</h5></a>
		                      </div>
		                    </nav>

		                    <div class="margenNav tab-content" id="nav-tabContent">
		                      <div class="tab-pane fade show active" id="nav-home2" role="tabpanel" aria-labelledby="nav-home2-tab"><h2>Ingredientes:</h2>

		                        <ul class="margenIngredientes list-group">
		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1 text-start" type="checkbox" value="1">100gr de manteca.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">150gr de azúcar.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">250gr de harina 0000.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">1 cucharada de polvo para hornear.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">1/2 cucharada de bicarbonato de sodio.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">1 Huevo.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">1 Yema.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">Esencia de vainilla.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">500gr de dulce de membrillo.
		                          </li>

		                          <li class="margenIngredientes1 list-group-item text-start">
		                            <input class="form-check-input me-1" type="checkbox" value="1">1/4 taza de agua.
		                          </li>
		                        </ul>
		                      </div>

		                      <div class="tab-pane fade" id="nav-profile2" role="tabpanel" aria-labelledby="nav-profile2-tab"><h2>Preparación:</h2>

		                        <div class="margenRogel shadow-lg p-3 mb-5 bg-white rounded overflow-auto">
		                          <p class="text-start font-monospace">1-. Precalentar el horno a moderado. Enmantecar y enharinar una tartera desmontable.</p>

		                          <p class="text-start font-monospace">2-. En la procesadora, poner el azúcar, la harina, el polvo para hornear, y el bicarbonato. Incorporar la manteca en cubos y pulsar nuevamente hasta formar un arenado.</p>

		                          <p class="text-start font-monospace">3-. Incorporar el huevo, la yema y la esencia de vainilla.</p>

		                          <p class="text-start font-monospace">4-. Tomar el bollo que se formó y envolverlo en un film. Llevar a la heladera 30 minutos.</p>

		                          <p class="text-start font-monospace">5-. En una cacerola al fuego, colocar el dulce de membrillo en cubitos y el agua. Revolver con un tenedor y pisar para formar un relleno cremoso.</p>

		                          <p class="text-start font-monospace">6-. Retirar la masa de la heladera y reservar 1/4 de la masa para las tiritas. Con el resto de masa forrar la base y lados de la tartera. Rellenar con el dulce de membrillo. Estirar el resto de masa sobre la mesada y cortar tiras.</p>

		                          <p class="text-start font-monospace">7-. Colocar sobre la pastaflora formando un enrejado.</p>

		                          <p class="text-start font-monospace">8-. Llevar al horno y cocinar 30 minutos. Dejar enfriar y desmoldar.</p>

		                        </div>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>
		    </section>
		    <!----------------------------- Fin Recetas ------------------------------------->
    	`;
  	}
};


	// Pagina Contacto //
const ContactoComponent = {

	postRender: () => {

			// Declaracion de Variables //
		let carritoDeCompras = []

		const contenedorCarrito = document.getElementById('carrito-contenedor');

		const contadorCarrito = document.getElementById('contadorCarrito');
		const precioTotal = document.getElementById('precioTotal');


			// Agregar al Carrito //
		function agregarAlCarrito(id) {
		    let productoAgregar = variedadProductos.find((el) => el.id == id);

		    let productoEnCarrito = document.getElementById(id);

		    if (productoEnCarrito) {

		        let inputCantidad = document.getElementById(`input${id}`);
		        let otroValor  = new Event('change');
		        inputCantidad.value = `${Number.parseInt(inputCantidad.value) + 1}`
		        inputCantidad.dispatchEvent(otroValor);
		    }

		    else {

		        carritoDeCompras.push(productoAgregar);
		        localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));

		        actualizarCarrito()

		        let div = document.createElement('div')
		        div.id = id;
		        div.classList.add('productoEnCarrito')
		        div.innerHTML =`
		                <img class="imgCarrito img-thumbnail" src=${productoAgregar.img} alt=${productoAgregar.nombre}>
		                <p><strong>${productoAgregar.nombre}</strong></p>
		                <p>
		                    <label for="number"><strong>Cantidad:</strong></label>
		                    <input class="inputCard" type="number" id="input${id}" min="1" max="50" value="1">
		                </p>
		                <p>Precio: $${productoAgregar.precio}</p>
		                <button id="eliminar${productoAgregar.id}" type="button" class="btn-close" aria-label="Close"></button>
		        `
		        contenedorCarrito.appendChild(div)

		        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
		        let inputCantidad = document.getElementById(`input${id}`)


		        function eliminar() {

		            botonEliminar.parentElement.remove()
		            carritoDeCompras = carritoDeCompras.filter((el) => el.id != productoAgregar.id)
		            localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		            actualizarCarrito();
		        }

		        let cantidadAnterior = Number.parseInt(inputCantidad.value);
		        inputCantidad.addEventListener('change', (e) => {

		            let nuevoValor = Number.parseInt(e.target.value)
		            if (nuevoValor >= cantidadAnterior) {

		                carritoDeCompras.push(productoAgregar);
		                localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		                actualizarCarrito();
		            }

		            else {

		                let posicionProducto = carritoDeCompras.find(producto => producto.id === id)
		                carritoDeCompras.splice(carritoDeCompras.indexOf(posicionProducto), 1)
		                localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
		                actualizarCarrito();
		            }

		            cantidadAnterior = nuevoValor;
		        })

		        botonEliminar.addEventListener('click', eliminar);
		    }
		}

		    // Funcion Actualizar Carrito //

		function actualizarCarrito() {
		    contadorCarrito.innerText = carritoDeCompras.length;
		    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0);
		}

		   	// Funcion para revisar el localstorage //
		function chequearLocal() {

		    let carroLocal = JSON.parse(localStorage.getItem('carritoDeCompras'));
		    if (carroLocal) {

		        carroLocal.forEach((el) => {

		            agregarAlCarrito(el.id)
		        })
		    }
		};

		chequearLocal();

			// Funcion para enviar correo despues de la suscripcion en la pagina //
		(function(){
                emailjs.init("user_FQAoVkaFsKlCeoSDZzuuo");
             })();
            const vue = new Vue({
                el: '#form',
                data(){
                    return {
                        from_name: '',
                        from_email: '',
                        from_telefono: '',
                        message: '',
                    }
                },
                methods: {
                    enviar(){
                        let data = {
                            from_name: this.from_name,
                            from_email: this.from_email,
                            from_telefono: this.from_telefono,
                            message: this.message,
                        };
                        
                        emailjs.send("service_apo9o5l","template_5re3kqs", data)
                        .then(function(response) {
                            if(response.text === 'OK'){
                                alert('El correo se ha enviado de forma exitosa');
                            }
                           console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
                        }, function(err) {
                            alert('Ocurrió un problema al enviar el correo');
                           console.log("FAILED. error=", err);
                        });
                    }
                }
            });
	},

	render: () => {
    	return `
    		<!------------------------------ Carrito --------------------------------------->
		    <div class="modal fade" id="exampleModal20" tabindex="-1" aria-labelledby="exampleModal02Label" aria-hidden="true">
		      <div class="modal-dialog">
		        <div class="modal-content modalBackgroung">
		          <div class="modal-header">
		            <h2 class="modal-title" id="exampleModal02Label">Carrito</h2>
		            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		          </div>

		          <div class="modal-body">
		            <div id="carrito-contenedor">

		              <div class="productoEnCarrito"></div>

		            </div>

		            <p class="precioProducto">Total a Pagar: $<span id="precioTotal"></span></p>
		     		 
		           	<!-------------- Integrando el boton para pagar por Paypal ---------------->
		     		<div id="smart-button-container">
				      <div style="text-align: center;">
				        <div id="paypal-button-container"></div>
				      </div>
				    </div>
				    
				  <script>
				    function initPayPalButton() {
				      paypal.Buttons({
				        style: {
				          shape: 'pill',
				          color: 'blue',
				          layout: 'vertical',
				          label: 'buynow',
				          
				        },

				        createOrder: function(data, actions) {
				          return actions.order.create({
				            purchase_units: [{"description":"Producto de Prueba","amount":{"currency_code":"USD","value":2,"breakdown":{"item_total":{"currency_code":"USD","value":1},"shipping":{"currency_code":"USD","value":1},"tax_total":{"currency_code":"USD","value":0}}}}]
				          });
				        },

				        onApprove: function(data, actions) {
				          return actions.order.capture().then(function(details) {
				            alert('Transaction completed by ' + details.payer.name.given_name + '!');
				          });
				        },

				        onError: function(err) {
				          console.log(err);
				        }
				      }).render('#paypal-button-container');
				    }
				    initPayPalButton();
				  </script>
		     		
		          </div>
		        </div>
		      </div>
		    </div>
		    <!----------------------------- Fin Carrito --------------------------------->


    		<!---------------------------- Newsletter --------------------------------------->
		    <aside>
		      <h2>Nuestro Newsletter</h2>

		      <div class="container-fluid">
		        <div class="row">

		          <div class="col-md-3 ms-auto modalFlex margenContacto">
		            <li>
		              <a class="iconosContacto" href="Envios.html">
		              <img src="Logos/Logos redes sociales/ubicacion.png" alt="ubicacion" class="redesInstagram"/>  Lorenzo Lopez 950, Pilar, Buenos Aires</a>
		            </li>
		          </div>

		          <div class="col-md-3 ms-auto modalFlex margenContacto">
		            <li>
		              <a class="iconosContacto" href="https://instagram.com/estelacocina.ve?igshid=2zspqbnyfhmv">
		              <img src="Logos/Logos redes sociales/Instagram.png" alt="instagram" class="redesInstagram"/>  @estelacocina.ve</a>
		            </li>
		          </div>
		            
		          <div class="col-md-3 ms-auto modalFlex margenContacto">
		            <li>
		              <a class="iconosContacto" href="https://api.whatsapp.com/send?phone=+5491141681891">
		              <img src="Logos/Logos redes sociales/Whatsapp.png" alt="whatsapp" class="redesInstagram"/>  +5491141681891</a>
		            </li>
		          </div>
		        </div>
		      </div>

		      <!--------------------------------- FORMULARIO -------------------------------->

		      <section id="form" class="flexSeccion shadow p-3 mb-5 bg-white rounded">
		        <div class="mb-3 text-start">
		          <label for="from_name" class="form-label"><h5>Nombre y Apellido:</h5></label>
		            <input type="text" class="form-control" v-model="from_name" placeholder="Nombre y Apellido">
		        </div>

		        <div class="mb-3 text-start">
		          <label for="from_email" class="form-label"><h5>Email:</h5></label>
		              <input type="text" class="form-control" v-model="from_email" placeholder="nombre@ejemplo.com">
		        </div>

		        <div class="mb-3 text-start">
		          <label for="from_telefono" class="form-label"><h5>Telefono:</h5></label>
		              <input type="text" class="form-control" v-model="from_telefono" placeholder="Telefono">
		        </div>

		        <div class="mb-3 text-start">

		          <label for="formGroupExampleInput4" class="form-label"><h5>Provincia:</h5></label>

		          <select class="form-select" id="validationServer04" aria-describedby="validationServer04Feedback" required>
		            <option selected disabled value="">Provincia</option>
		            <option value="Buenos Aires">Buenos Aires</option>
		            <option value="Catamarca">Catamarca</option>
		            <option value="Chaco">Chaco</option>
		            <option value="Chubut">Chubut</option>
		            <option value="CABA">Ciudad Autònoma de Buenos Aires</option>
		            <option value="Cordoba">Cordoba</option>
		            <option value="Corrientes">Corrientes</option>
		            <option value="Entre Rios">Entre Rios</option>
		            <option value="Formosa">Formosa</option>
		            <option value="Jujuy">Jujuy</option>
		            <option value="La Pampa">La Pampa</option>
		            <option value="La Rioja">La Rioja</option>
		            <option value="Mendoza">Mendoza</option>
		            <option value="Misiones">Misiones</option>
		            <option value="Neuquèn">Neuquèn</option>
		            <option value="Rio Negro">Rio Negro</option>
		            <option value="Salta">Salta</option>
		            <option value="San Juan">San Juan</option>
		            <option value="San Luis">San Luis</option>
		            <option value="Santa Cruz">Santa Cruz</option>
		            <option value="Santa Fe">Santa Fe</option>
		            <option value="Santiago del Estero">Santiago del Estero</option>
		            <option value="Tierra del Fuego">Tierra del Fuego</option>
		            <option value="Tucumàn">Tucumàn</option>
		          </select>
		        </div>

		        <div class="mb-3">
		          <span class="input-group-text" id="inputGroup-sizing-default">

		            <label for="message" class="form-label"></label>

		            <textarea class="form-control" v-model="message" rows="3" placeholder="Ingrese su comentario"></textarea>
		            
		          </span>
		        </div>

		        <div>
		          <input type="submit" @click="enviar" value="Enviar" class="body__centrarBotones" />
		        </div>
		      </section>

		      <!------------------------------ UBICACION -------------------------------------->

		      <div>
		        <iframe class="map img-thumbnail" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.712082604037!2d-58.919722633573386!3d-34.459455862637334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI3JzM0LjEiUyA1OMKwNTUnMDUuNCJX!5e0!3m2!1ses-419!2sar!4v1606737508044!5m2!1ses-419!2sar"></iframe>
		      </div>

		      <div id="mapContainer"</div>
		    </aside>
		    <!---------------------------- Fin Newsletter ------------------------------------>
    	`;
  	}
};


	// Pagina Error //
const ErrorComponent = {
	render: () => {
    	return `
      		<p>Error</p>
    	`;
  	}
};


	// Rutas de la Pagina //
const routes = [
  { path: '/', component: HomeComponent, },
  { path: '/productos', component: ProductosComponent, },
  { path: '/recetas', component: RecetasComponent, },
  { path: '/contacto', component: ContactoComponent, },
];


const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const findComponentByPath = (path, routes) => 
routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;


const router = () => {

	const path = parseLocation();

	const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

	$('#app').html(component.render());
	if (component.postRender) component.postRender();
};


$(window).on('load', function(e) {
	router();
});

$(window).on('hashchange', function(e) {
    router();
});









