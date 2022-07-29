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
  productForm.reset();
});


function  render (data) {
  console.log('render',typeof data);
  const html = data.map( (elem,index) => {
      return (`<div>
      ${elem.title} :  ${elem.price}
      </div>`)}).join(" ");
      document.getElementById('mostarProductos').innerHTML = html;
}

socket.on('listaProduct', (data) => {
  console.log(data);
  render(data);
})
