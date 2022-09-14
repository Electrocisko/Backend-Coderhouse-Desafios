const form = document.getElementById("loginForm");


 const succes = (data) => {
    if (data.status === 'error') {alert('Usuario no valido')}
    else alert(`Bienvenido ${data.payload.name}`);
 }

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let data = new FormData(form);
  let obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("api/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then(json => succes(json))
    .catch((error) => {
      console.log(`Error en peticion fetch: ${error}`);
    });
  form.reset();
});
