// ================== USER LOGIN CHECK ==================
let user = JSON.parse(localStorage.getItem("user"));

if (user) {
    console.log("User logged in:", user.name);
}

// ================== SAVE PRODUCT (BUY CLICK) ==================
function saveProduct(name, price) {
    let product = {
        name: name,
        price: price
    };

    localStorage.setItem("selectedProduct", JSON.stringify(product));
}

// ================== PLACE ORDER ==================
function placeOrder(event) {
    event.preventDefault();

    let product = JSON.parse(localStorage.getItem("selectedProduct"));

    let order = {
        id: Date.now(),
        product: product,
        name: document.querySelector("input[type='text']").value,
        email: document.querySelector("input[type='email']").value,
        phone: document.querySelector("input[type='tel']").value,
        address: document.querySelector("textarea").value,
        payment: document.querySelector("select").value
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("✅ Order Placed Successfully!");

    window.location.href = "orders.html";
}

// ================== LOAD ORDERS ==================
function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let container = document.getElementById("ordersList");

    if (!container) return;

    let html = "profile";

    if (orders.length === 0) {
        container.innerHTML = "<p>No orders found.</p>";
        return;
    }

    orders.forEach(order => {
        html += `
        <div class="box mt-3">
            <h5>📦 ${order.product.name}</h5>
            <p>💰 Price: ₹${order.product.price}</p>
            <p>👤 Name: ${order.name}</p>
            <p>📞 Phone: ${order.phone}</p>
            <p>🏠 Address: ${order.address}</p>
            <p>💳 Payment: ${order.payment}</p>

            <button class="btn btn-danger btn-sm"
                onclick="deleteOrder(${order.id})">
                Remove
            </button>
        </div>
        `;
    });

    container.innerHTML = html;
}

// ================== CART REMOVE (OPTIONAL) ==================
function removeCartItem(button) {
    button.parentElement.remove();
}

// ================== LOGOUT ==================
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// ================== AUTO LOAD ==================
window.onload = function () {
    loadOrders();
};