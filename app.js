"use strict"
console.log("Odd Duck Times");

const productContainer = document.querySelector("section");
const resultsButton = document.querySelector("section+div");
const image1 = document.querySelector("section img:first-child");
const image2 = document.querySelector("section img:nth-child(2)");
const image3 = document.querySelector("section img:nth-child(3)");

let clicks = 0;
const maxClicksAllowed = 5;

let allProducts = [];

function getRandomNumber() {
    return Math.floor(Math.random() * allProducts.length);
}

function Product(name, src) {
    this.name = name;
    this.src = src;
    this.click = 0;
    this.views = 0;
    allProducts.push(this);
}

function renderProducts() {
    let product1 = getRandomNumber();
    let product2 = getRandomNumber();
    let product3 = getRandomNumber();

    while (product2 === product1 || product2 === product3) {
        product2 = getRandomNumber();
        console.log("hello");
    }

    while (product3 === product2 || product3 === product1) {
        product3 = getRandomNumber();
        console.log("hello2");
    }



    image1.src = allProducts[product1].src;
    image2.src = allProducts[product2].src;
    image3.src = allProducts[product3].src;
    image1.alt = allProducts[product1].name;
    image2.alt = allProducts[product2].name;
    image3.alt = allProducts[product3].name;
    allProducts[product1].views++;
    allProducts[product2].views++;
    allProducts[product3].views++;
}

function handleProductClick(event) {
    if (event.target === productContainer) {
        alert("Please click on an image.")
    } else {
        clicks++;
        let clickedProduct = event.target.alt;
        for (let i = 0; i < allProducts.length; i++) {
            if (clickedProduct === allProducts[i].name) {
                allProducts[i].click++;
                break;
            }
        }
        if (clicks === maxClicksAllowed) {
            productContainer.removeEventListener("click", handleProductClick);
            productContainer.className = "no-voting";
            resultsButton.addEventListener("click", renderResults);
            resultsButton.className = "clicks allowed";

        } else {
            renderProducts();
        }

    }
}

function renderResults() {
    let ul = document.querySelector("ul");
    for (let i = 0; i < allProducts.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].click} times.`;
        ul.appendChild(li);
    }
}

const bag = new Product("bag", "image/bag.jpg");
const banana = new Product("banana", "image/banana.jpg");
const bathroom = new Product("bathroom", "image/bathroom.jpg");
const boots = new Product("boots", "image/boots.jpg");
const breakfast = new Product("breakfast", "image/breakfast.jpg");
const bubblegum = new Product("bubblegum", "image/bubblegum.jpg");
const chair = new Product("chair", "image/chair.jpg");
const cthulhu = new Product("cthulhu", "image/cthulhu.jpg");
const dog = new Product("dog duck", "image/dog-duck.jpg");
const dragon = new Product("dragon", "image/dragon.jpg");
const pen = new Product("pen", "image/pen.jpg");
const pet = new Product("pet Sweep", "image/pet-sweep.jpg");
const scissors = new Product("scissors", "image/scissors.jpg");
const shark = new Product("shark", "image/shark.jpg");
const sweep = new Product("Sweep", "image/sweep.png");
const tauntaun = new Product("tauntaun", "image/tauntaun.jpg");
const unicorn = new Product("unicorn", "image/unicorn.jpg");
const water = new Product("water can", "image/water-can.jpg");
const wine = new Product("wine glass", "image/wine-glass.jpg");

renderProducts();

productContainer.addEventListener("click", handleProductClick);

function renderChart() {
    const productNames = [];
    const productViews = [];
    const productClicks = [];

    for (let i = 0; i < allProducts[i].length; i++) {
        productNames.push(allProducts[i].name);
        productViews.push(allProducts[i].views);
        productClicks.push(allProducts[i].clicks);

    }

    const data = {
        labels: productNames,
        datasets: [
            {
                label: "clicks",
                data: productClicks,
                backgroundColor: ["#42032C"],
                borderColor: ["#D36B00"],
                borderWidth: 1,
            },
            {
                label: "views",
                data: productViews,
                backgroundColor: ["#D36B00"],
                borderColor: ["#42032C"],
                borderWidth: 1,
            },
        ]
    };

    const config = {
        type: "bar",
        data: data,
    };

    const productChart = document.getElementById("chart");
    const myChart = new Chart(productChart, config);
}