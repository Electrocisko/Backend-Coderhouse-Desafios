let eventList = document.querySelectorAll(".addCart");
let cartId = document.getElementById("cartId").textContent;
let eventDetail = document.querySelectorAll(".seeDetail");

let url = `/api/carts/${cartId}/products`;

eventList.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    let prodID = element.value;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        product: prodID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Agregado al carrito",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  });
});

eventDetail.forEach( (product) => {
  product.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.assign(`/productdetail?productId=${product.value}`)
  })
})
