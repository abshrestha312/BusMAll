'use strict';

// constructor for products


// --------------------------- global variables -------------------------- //
// dom references
const leftImgElem = document.getElementById('left_product_img')
const leftH2Elem = document.getElementById('left_product_h2')
const centerImgElem = document.getElementById('center_product_img')
const centerH2Elem = document.getElementById('center_product_h2')
const rightImgElem = document.getElementById('right_product_img')
const rightH2Elem = document.getElementById('right_product_h2')
const voteContainerElem = document.getElementById('all-products');
const resultsUlElem = document.getElementById('product-clicks');

let currentLeft = null;
let currentRight = null;
let currentCenter = null;

let rounds = 20;


// --------------------------- constructor function -------------------------- //
function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.clicks = 0;
  this.views = 0;
  // technically this function should not do external processes it is made to define features of a 'product'
  Product.allProducts.push(this)
}

Product.allProducts = [];
// --------------------------- prototype methods ---------------------------//

// renders a single image/name
Product.prototype.renderProduct = function(img, h2) {
  img.src = this.imgPath;
  img.alt = this.name;
  h2.textContent = this.name;
  this.views++;
}


// ---------------------------- global functions -----------------------//

// picks three unique imgages no repeats
function picksThreeProducts() {
  const doNotUse = [currentRight, currentLeft, currentCenter];
  while (doNotUse.includes(currentLeft)) {
    let leftIndex = Math.floor(Math.random() * Product.allProducts.length);
    currentLeft = Product.allProducts[leftIndex];
  }
  doNotUse.push(currentLeft);
  
  while (doNotUse.includes(currentRight)) {
    let rightIndex = Math.floor(Math.random() * Product.allProducts.length);
    currentRight = Product.allProducts[rightIndex];
  }
  doNotUse.push(currentRight);
  
  while (doNotUse.includes(currentCenter)) {
    let centerIndex = Math.floor(Math.random() * Product.allProducts.length);
    currentCenter = Product.allProducts[centerIndex];
  }
  doNotUse.push(currentCenter);
  console.log(doNotUse);
  
}


// render three images
function renderThreeProducts() {
  currentCenter.renderProduct(centerImgElem, centerH2Elem);
  currentLeft.renderProduct(leftImgElem, leftH2Elem);
  currentRight.renderProduct(rightImgElem, rightH2Elem);
}

// renders results
function renderResults() {
  resultsElem.textContent = '';

  for (let item of Product.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${item.name}: ${item.clicks}`;
    resultsElem.appendChild(liElem);
  }
}

// click handler
function handleClick(e) {
  const target = e.target.id;
  if (target === 'left_product_img' || target === 'right_product_img' || target === 'center_product_img') {
    // update vote rounds
    rounds--;
    // determine their choice and update the votes on that object
    if (target === 'left_product_img') {
      currentLeft.clicks++;
    }
    if (target === 'right_product_img') {
      currentRight.clicks++;
    }
    if (target === 'center_product_img') {
      currentCenter.clicks++;
    }
    // choose three new images
    picksThreeProducts();
    // render three images
    renderThreeProducts();
  }
  if (rounds === 0) {
    voteContainerElem.removeEventListener('click', handleClick);
    alert(currentCenter.clicks);
  }
}


function handleButton(e){
  // alert(e.target.id);
  let buttonClicked = e.target.id;
  //if the user clicks the button this code block is run.
  if (buttonClicked === 'buttonSubmit') {
    voteContainerElem.textContent = '';
    let canvasElem =document.createElement('canvas');
    canvasElem.id ='myChart';
    canvasContainerElem.appendChild(canvasElem);

    renderResultsList();
    makeBarChart();
    putItemsInStorage();
    voteContainerElem.removeEventListener('click', handleButton);
  }
}

// function to put allItems array in storage in a stringified array.
function putItemsInStorage (){
  let stringifiedArray = JSON.stringify(Product.allProducts);
  localStorage.setItem('product', stringifiedArray);
}


// function to pull stringifiedArray from storage. This function parses the item and turns it back into an instance of constructor function Item, adjusting the views and votes to equal the new total.
function getItemsFromStorage(){
  let itemsInStorage = localStorage.getItem('product');
  if (itemsInStorage) {
    let parsedItems = JSON.parse(itemsInStorage);
    for (let i=0; i<parsedItems.length; i++) {
      let item = parsedItems[i];
      let newProduct = new Product(product.name, product.img);
      newProduct.clicks = product.clicks;
      newProduct.views = product.views;
      Product.allProducts.push(newProduct);
    }
  }
}
// --------------------------- Listener ------------------------//

// listener on the container for pictures
voteContainerElem.addEventListener('click', handleClick);

voteContainerElem.addEventListener('click', handleButton);

// --------------------------- call functions ---------------------//
getItemsFromStorage();
if (Product.allProducts.length ===0){
  Product.allProducts.push(new Product('Bag', 'img/bag.png'));
  Product.allProducts.push(new Product('Banana', 'img/banana.png'));
  Product.allProducts.push(new Product('Bathroom', 'img/bathroom.png'));
  Product.allProducts.push(new Product('Boots', 'img/boots.png'));
  Product.allProducts.push(new Product('Breakfast', 'img/breakfast.png'));
  Product.allProducts.push(new Product('Bubblegum', 'img/bubblegum.png'));
  Product.allProducts.push(new Product('Chair', 'img/chair.png'));
  Product.allProducts.push(new Product('Cthulhu', 'img/cthulhu.png'));
  Product.allProducts.push(new Product('Dog-Duck', 'img/dog-duck.png'));
  Product.allProducts.push(new Product('Dragon', 'img/dragon.png'));
  Product.allProducts.push(new Product('Pen', 'img/pen.png'));
  Product.allProducts.push(new Product('Pet-Sweep', 'img/pet-sweep.png'));
  Product.allProducts.push(new Product('Scissors', 'img/scissors.png'));
  Product.allProducts.push(new Product('Shark', 'img/shark.png'));
  Product.allProducts.push(new Product('Sweep', 'img/sweep.png'));
  Product.allProducts.push(new Product('Tauntaun', 'img/tauntaun.png'));
  Product.allProducts.push(new Product('Unicorn', 'img/unicorn.png'));
  Product.allProducts.push(new Product('Water Can', 'img/water-can.png'));
  Product.allProducts.push(new Product('Wine Glass', 'img/wine-glass.png'));
}

picksThreeProducts();
renderThreeProducts();

//-------Bar Chart ------------//


const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ 'Blue', 'Red', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [9, 10, 3, 2, 2, 4],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});