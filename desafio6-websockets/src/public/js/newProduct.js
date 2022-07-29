
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
      ${elem.user} :  <strong>${elem.mensaje}</strong>
      </div>`)}).join(" ");
      document.getElementById('mostrarChat').innerHTML = html;
}

// Sweet alert para hacer capturar el nickname del usuario que va chatear
let userNick;

Swal.fire({
    title: "Logueate",
    input: "text",
    text: "Ingrese su nick",
    inputValidator: (value) => {
        return !value && "Necesito que se loguee para continuar"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then( (result) => {
    userNick = result.value;
    socket.connect();
}) 

let chat = document.getElementById('boton');
let mostrarTexto = document.getElementById('mostrarTexto');

chat.addEventListener('click', evt =>{
    let time = Date();
    let dato = document.getElementById('textChat');
    if (dato.value.trim().length > 0){
        socket.emit('mensaje', {
            user: userNick+' '+time,
            mensaje: dato.value
        });
        dato.value = "";
    }
}); 

// socket que escucha los chats
socket.on('chat', (data) => {
  renderChat(data);
})