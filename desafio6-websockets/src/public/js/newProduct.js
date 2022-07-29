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


function  render (data) {
  const html = data.map( (elem,index) => {
      return (`<div>
      ${elem.title} :  ${elem.price} : <img src="http://localhost:8080/img/${elem.thumbnail}" width="35px"/>
      </div>`)}).join(" ");
      document.getElementById('mostarProductos').innerHTML = html;
}


socket.on('listaProduct', (data) => {
  render(data);
})
