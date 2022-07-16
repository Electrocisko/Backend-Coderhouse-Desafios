
let productForm = document.getElementById('productForm');

const handleSubmit = (evt,form,route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    //ESTE SERIA SI LO QUE ENVIO ES UN JSON

    let obj = {};
    formData.forEach((value,key) => obj[key] = value);
    fetch(route, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
    }).then( res => res.json()).then((json) => console.log(json));
};

productForm.addEventListener('submit', (e) => handleSubmit(e, e.target,'api/productos'))