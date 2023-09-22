const productList = document.getElementById('productList');
const form = document.getElementById('searchForm');
const searchInput = document.getElementsByName("searchText")[0];
const sortCriteriaSelect = document.getElementById("sortCriteria");
const alertMessage = document.getElementById('alertMessage');

let products = [];

async function makeRequest() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  console.log(data);

  products = data.products;

  renderProducts(products);
}

    function renderProducts(productsToRender) {
        const sortBy = sortCriteriaSelect.value;
        productsToRender.sort((a, b) => {
            if (sortBy === "name") {
                return a.title.localeCompare(b.title);
            } else if (sortBy === "price") {
                return a.price - b.price;
            }
        });
    
        productList.innerHTML = '';
    
        productsToRender.forEach((product) => {
            productList.innerHTML += `
                <div class="card mt-2" style="width: 18rem;">
                    <img class="card-img-top" src=${product.thumbnail} alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Price: $${product.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
        });
    }

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchContent.innerHTML = '';
  alertMessage.setAttribute('hidden', true);
  const searchText = e.target.searchText.value;
  console.log(searchText);

  if (searchText) {
    console.log('hello');
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchText}`
    );
    const data = await res.json();
    if (data.products.length === 0) {
      alertMessage.removeAttribute('hidden');
      alertMessage.innerHTML = 'no matching results';
    } else {
      // Update the products variable with the searched and filtered products
      products = data.products;
      // Render the sorted and filtered products
      renderProducts(products);
    }
  } else {
    alertMessage.removeAttribute('hidden');
    alertMessage.innerHTML = 'Please enter a search field';
  }
});


sortCriteriaSelect.addEventListener('change', () => {

  renderProducts(products);
});

window.onload = (event) => {
  makeRequest();
};
