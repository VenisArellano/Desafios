let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')


// Al seleccionar una opcion, muestra los productos de dicha opcion //

const selecProducto = document.getElementById('selecProducto')

selecProducto.addEventListener('change', ()=>{
    console.log(selecProducto.value)
    
     if (selecProducto.value == "all") {
        mostrarProductos(variedadProductos)
    } else {
        mostrarProductos(variedadProductos.filter((el)=> el.tipo == selecProducto.value))
    }
})


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
                                    <input class="inputCard" type="number" id="number" max="9999" min="1" value="1">
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


function agregarAlCarrito(id) {
    let productoAgregar = variedadProductos.filter((el) => el.id == id)[0]
    carritoDeCompras.push(productoAgregar)
    actualizarCarrito()
    

    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
        
            <img class="imgCarrito img-thumbnail" src=${productoAgregar.img} alt=${productoAgregar.nombre}>
            <p>${productoAgregar.nombre}</p>
            <p>Precio: $${productoAgregar.precio}</p>
            <button id="eliminar${productoAgregar.id}" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        
    `
    contenedorCarrito.appendChild(div)


    let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    botonEliminar.addEventListener('click', ()=>{
        botonEliminar.parentElement.remove()
        carritoDeCompras = carritoDeCompras.filter((el) => el.id != productoAgregar.id)      
        actualizarCarrito()
    })
}

function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.length
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0)
}


$(document).ready(function() {
    document.getElementById('login').click();
});

