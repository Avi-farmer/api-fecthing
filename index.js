
let calling = document.querySelector('.col1');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let getProducts = [];

async function fth() {
    const url = await fetch("https://dummyjson.com/products");
    const data = await url.json();
    getProducts = data.products;

    const sendhtml = getProducts.map((a, index) => {
        return (`
        <div class="send">
            <div class="image">
                <img src="${a.images[0]}" alt="${a.title}">
            </div>
            <div class="brand">
                <small>${a.brand}</small>
            </div>
            <div>
                <p>${a.title}</p>
            </div>
            <div class="description">
                <small>${a.description.slice(0, 40)}</small>
            </div>
            <div class="ratingstock">
                <div class="rating">
                    <small>${a.rating}<i class="fa-solid fa-star" style="color: #ffffff;"></i></small>
                </div>
                <div>
                    <p>(${a.stock})</p>
                </div>
            </div>
            <div class="pricediscountPercentage">
                <div>
                    <p>₹${a.price}</p>
                </div>
                <div>
                    <p>${a.discountPercentage}%</p>
                </div>
            </div>
            <div class="btn">
                <button class="button" onclick="addToCart(${index})">Add To Cart</button>
            </div>
        </div>
        `);
    }).join('');
    calling.innerHTML = sendhtml;
    updateCartDisplay();
}

fth();

document.getElementById("addtocart").addEventListener("click", function() {
    document.querySelector(".col2").style.display = "block";
    updateCartDisplay();
});

document.querySelector(".close").addEventListener("click", function() {
    document.querySelector(".col2").style.display = "none";
    
});
document.querySelector(".smallclose").addEventListener("click", function() {
    document.querySelector(".col2").style.display = "none";
    
});

function addToCart(index) {
    const product = getProducts[index];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cartItems");
    const totalCartItems = document.getElementById("totalcartitems");
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="image">
                <img src="${item.images[0]}" alt="${item.title}" style="width: 50px; height: 50px;">
            </div>
            <div>
                <p>${item.title} - ₹${item.price} (quantity${item.quantity})</p>
            </div>
            <div>
                <button class="remove-button" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalCartItems.textContent = `₹${totalAmount.toFixed(2)}`;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartBadge").textContent = totalItems;
}