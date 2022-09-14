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

const logout = document.getElementById('logout');

logout.addEventListener('click',(evt) => {
  evt.preventDefault();
  console.log('logout')
})