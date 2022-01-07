let input = document.querySelector(".inputNumber"),
  button = document.querySelector(".btn"),
  selectSort = document.querySelector(".selecter");
button.addEventListener("click", buttonClick);

function buttonClick() {
  input.value === ""
    ? alert("Введите число!")
    : input.value === "0"
    ? alert("Так не пойдет!")
    : getList();
  input.value = "";
}
async function getList() {
  let res = await fetch(`https://fakestoreapi.com/products` + `?limit=` + `${input.value}`);
  let data = await res.json();
  let selector =
    selectSort.value === "less"
      ? data.sort(function (a, b) {
          if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          return 0;
        })
      : selectSort.value === "more"
      ? data.sort(function (a, b) {
          if (a.price < b.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          return 0;
        })
      : data;
  button.removeEventListener("click", buttonClick);
  let list = document.querySelector(".posts");
  for (key in selector) {
    list.innerHTML += `
      <div class="post">
        <h3 class="post_header">${data[key].title}</h3>
        <p class="price">Price: $ ${data[key].price}</p>
        <p class="description">Description: ${data[key].description}</p>
        <img class="image" src="${data[key].image}" width="200">
      </div>`;
  }
}
