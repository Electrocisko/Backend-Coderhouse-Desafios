const socket = io();

const productForm = document.getElementById("productForm");

const handleSubmit = (evt, form, route) => {
  evt.preventDefault();
  let formData = new FormData(form);
  fetch(route, {
    method: "POST",
    body: formData,
  });
};

productForm.addEventListener("submit", (e) => {
  handleSubmit(e, e.target, "api/productos");
  alert("Agregado");
  //hago un emit de que se agrego un producto
 socket.emit('productoNuevo','Agregado  ')
  productForm.reset();
});

// Funcion que renderiza los productos
function  renderProducts (data) {
  const html = data.map( (elem,index) => {
      return (`<div>
      ${elem.title} :  ${elem.price} : <img src="http://localhost:8080/img/${elem.thumbnail}" width="35px"/>
      </div>`)}).join(" ");
      document.getElementById('mostarProductos').innerHTML = html;
}

// Socket que escucha la listaProduct
socket.on('listaProduct', (data) => {
  renderProducts(data);
})

// Funcion que renderiza los chats
function renderChat (data) {
  const html = data.map( (elem,index) => {
      return (`<div>
      ${elem.user} :  ${elem.mensaje}
      </div>`)}).join(" ");
      document.getElementById('mostrarChat').innerHTML = html;
}

let chat = document.getElementById('boton');
let mostrarTexto = document.getElementById('mostrarTexto');

chat.addEventListener('click', evt =>{
    let dato = document.getElementById('textChat');
    if (dato.value.trim().length > 0){
        socket.emit('mensaje', {
            user: "Toma color",
            mensaje: dato.value
        });
        dato.value = "";
    }
}); 




// socket que escucha los chats
socket.on('chat', (data) => {
  console.log('data',data)
  console.log(typeof data)
  renderChat(data);
})