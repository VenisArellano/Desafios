let carritoCompras = []

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

const selecProducto = document.getElementById('tipo')


selecProducto.addEventListener('click', ()=>{
    console.log(selecProducto.value)
    switch(selecProducto.value) {
         case "Panes":
             mostrarProductos(variedadProductos.filter((el)=> el.tipo == "Panes"));
             break;
         case "Dulces":
             mostrarProductos(variedadProductos.filter((el)=> el.tipo == "Dulces"));
             break;
         case "Salados":
             mostrarProductos(variedadProductos.filter((el)=> el.tipo == "Salados"));
             break;
         case "Tortas":
             mostrarProductos(variedadProductos.filter((el)=> el.tipo == "Tortas"));
             break;
         case "Masas":
             mostrarProductos(variedadProductos.filter((el)=> el.tipo == "Masas"));
             break;
         case "Bombones":
             mostrarProductos(variedadProductos.filter((el)=> el.tipo == "Bombones"));
             break;
     }
})

mostrarProductos(variedadProductos);


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
    	<img src=${productoAgregar.img} alt="">
        <p>${productoAgregar.nombre}</p>
        <p>Precio: $${productoAgregar.precio}</p>
        <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
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


