// Declaracion de Variables

let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');


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
   
    
})

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
})


// Al seleccionar una opcion, muestra los productos de dicha opcion //

const selecProducto = document.getElementById('selecProducto');


selecProducto.addEventListener('change', ()=>{
    console.log(selecProducto.value)
    
    if (selecProducto.value == "all") {
        mostrarProductos(variedadProductos)
    } else {
        mostrarProductos(variedadProductos.filter((el)=> el.tipo == selecProducto.value))
    }
})

mostrarProductos(variedadProductos)

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
                                <p>
                                    <label for="number"><strong>Cantidad:</strong></label>
                                    <input class="inputCard" type="number" id="input${productoNuevo.id}" max="9999" min="1" value="1">
                                </p>
                                <input id="boton${productoNuevo.id}" type="button" name="boton" value="Agregar al Carrito" class="body__centrarBotones"/>
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

 dataId = 1;
 precioTotalArray = [];

function agregarAlCarrito(id) {
    let productoAgregar = variedadProductos.filter((el) => el.id == id)[0]
    carritoDeCompras.push(productoAgregar);
    localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras))

     if(carritoDeCompras){
        for(i = 0; i< carritoDeCompras.length; i++){
            if(carritoDeCompras[i].id === id){
                console.log('ya esta el producto')

            }
        }
    }

    cantidad = document.getElementById(`input${id}`).value;

    precioProd = `${productoAgregar.precio}`

    prodTotal = precioProd * cantidad;
    precioTotalArray.push(prodTotal);
    //totalTotal = precioTotalArray.reduce((acc, el) => acc + el, 0);
    actualizarCarrito()

    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `

            <img class="imgCarrito img-thumbnail" src=${productoAgregar.img} alt=${productoAgregar.nombre}>
            <p>${productoAgregar.nombre}</p>
            <p>Precio: $${prodTotal}</p>
            <p>Cantidad:${cantidad}</p>
            <button id="eliminar${productoAgregar.id}" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        
    `
    contenedorCarrito.appendChild(div)


    let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    botonEliminar.addEventListener('click', ()=>{
        botonEliminar.parentElement.remove()
        carritoDeCompras = carritoDeCompras.filter((el) => el.id != productoAgregar.id)      
        
    })

    actualizarCarrito()
    

}


function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.length
    totalTotal = precioTotalArray.reduce((acc, el) => acc + el, 0);
    console.log(totalTotal)
    precioTotal.innerHTML = totalTotal;

}

$(document).ready(function() {
    document.getElementById('login').click();
});


botonUser = document.getElementById('ingresar');
botonUser.addEventListener('click', datoUser);

function datoUser() {
    
    datoModal = document.getElementById('nombreUsuarie').value;
    localStorage.setItem('nombre', datoModal);

}