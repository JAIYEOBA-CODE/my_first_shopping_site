let items = [
  { name: 'IPhone', details: 'White', cost: 500 },
  { name: 'IPad', details: 'orange', cost: 800 },
  { name: 'cable', details: '3 foot', cost: 10 },
  { name: 'Cammera', details: '25MP', cost: 300 },
  { name: 'Laptop', details: 'intel i7', cost: 1200 },
  { name: 'LED Monitor', details: '24 inch', cost: 300 },
  { name: 'TV', details: '50 inch', cost: 450 },
  { name: 'Boxer', details: 'red', cost: 700 },
  { name: 'TVS', details: 'Blue', cost: 750 },
  { name: 'Honder', details: 'Blue', cost: 850 },
  { name: 'Car', details: 'Toyotal ', cost: 8150 },
];

let row = document.querySelector('.ddaattaa');
let resultTable = document.querySelector('.resultTable');

// items.forEach(function(v) {
//     console.log(v)
// })

let shopCart = [];

window.onload = init;

function init() {
  buildItems();

  let q = document.querySelectorAll('.productItem');
  for (let i = 0; i < q.length; i++) {
    q[i].addEventListener('click', function (e) {
      e.preventDefault();
      addToCart();
    });
  }
  outputCart();
}

function addToCart() {
  let itemInfo = event.currentTarget.dataset;
  itemInfo.qty = 1;
  let isItemInCart = false;
  shopCart.forEach(function (j) {
    if (j.id == itemInfo.id) {
      j.qty = parseInt(j.qty) + parseInt(itemInfo.qty);
      isItemInCart = true;
    }
  });
  if (!isItemInCart) {
    shopCart.push(itemInfo);
  }

  localStorage.setItem('Scart', JSON.stringify(shopCart));
  outputCart();
}

function outputCart() {
  if (localStorage.getItem('Scart') != null) {
    shopCart = JSON.parse(localStorage.getItem('Scart'));
  }

  let html = `<table class="table-hover table"><tr><th>s/n</th><th>Name</th> <th>details</th><th>Price</th><th>QTY</th><th>Sub Total</th></tr>`;
  let i = 1;
  let totalCost = 0;
  shopCart.forEach(function (f) {
    let subTotal = f.price * f.qty;
    totalCost += subTotal;
    html += `<tr data-id="${f.id}">  <td>${i}</td> <td>${f.name}</td> <td>${
      f.details
    }</td>
        <td>${f.price}</td>  <td>${f.qty}</td> <td> ${fMoney(
      subTotal
    )}</td> <td> <button class="badge bg-danger" onclick="remove(${
      f.id
    })">delete</button></td>  </tr>`;
    i++;
  });
  html += `<tr> <th colspan="6">Total: ${fMoney(
    totalCost
  )}</th> </tr> </table>`;
  console.log(shopCart);
  resultTable.innerHTML = html;
}

function remove(id) {
  for (let i = 0; i < shopCart.length; i++) {
    if (id == shopCart[i].id) {
      shopCart.splice(i, 1);
    }
  }

  localStorage.setItem('Scart', JSON.stringify(shopCart));
  outputCart();
}

function fMoney(n) {
  return '$ ' + n.toFixed(2);
}
let html = '';

function buildItems() {
  let x = 1;
  items.forEach((v) => {
    html += `<div class="col-sm-6 col-lg-4  col-xl-3 my-2">
    <div class="card">
        <img class="card-img-top" src="files_png_488542.png" alt="Card image">
        <div class="card-body">
            <h4 class="card-title">${v.name}</h4>
            <p class="card-text">${v.details}</p>
            <p class="card-text">$${v.cost}</p>
            <a href="#" data-name="${v.name}" data-details="${v.details}" data-price="${v.cost}" data-id="${x}" class="btn btn-primary productItem">Add to Cart</a>
        </div>
    </div>
</div>`;
    x++;
  });
  row.innerHTML += html;
}
