function toggleCart() {
    let cart = document.getElementById("cart-sidebar");
    cart.classList.toggle("open");
    loadCart();
}

function loadCart() {
    let cartData = localStorage.getItem("cart") || "";
    let cartItems = document.getElementById("cart-items");
    let totalElement = document.getElementById("cart-total");
    let cartCountElement = document.getElementById("cart-count");
    let totalAmount = 0;

    cartItems.innerHTML = "";
    let items = cartData ? cartData.split(";") : [];

    if (items.length === 0) {
        cartItems.innerHTML = "<p>Cart is empty.</p>";
        totalElement.innerText = "Total: $0";
        cartCountElement.innerText = "(0)";
        return;
    }

    items.forEach((item, index) => {
        let [name, price] = item.split("|");
        price = parseFloat(price);
        totalAmount += price;

        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `<span>${name} - $${price}</span> <button onclick="removeItem(${index})">Remove</button>`;
        cartItems.appendChild(div);
    });

    totalElement.innerText =` Total: $${totalAmount}`;
    cartCountElement.innerText = `(${items.length})`;
}

function addtocart(name, price) {
    let cartData = localStorage.getItem("cart") || "";
    let newItem = `${name}|${price}`;
    cartData = cartData ? cartData + ";" + newItem : newItem;
    localStorage.setItem("cart", cartData);
    loadCart();
}

function removeItem(index) {
    let cartData = localStorage.getItem("cart") || "";
    let items = cartData.split(";");

    items.splice(index, 1);
    localStorage.setItem("cart", items.join(";"));
    loadCart();
}

window.onload = loadCart;
``