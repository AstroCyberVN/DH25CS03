import {
    getCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalQuantity,
} from "./cart-storage.js";

import { CONFIG } from "../../config.js";

function formatPrice(price) {
    const finalPrice =
        CONFIG.salesOff > 0
            ? price * (1 - CONFIG.salesOff / 100)
            : price;
    return finalPrice.toLocaleString("vi-VN") + "₫";
}

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const cartCount = document.getElementById("cartCount");
const cartContent = document.getElementById("cartContent");
const emptyCart = document.getElementById("emptyCart");

function renderCart() {
    const cart = getCart();

    cartItems.innerHTML = "";
    if (cart.length === 0) {
        cartContent.style.display = "none";
        emptyCart.style.display = "block";
        cartCount.textContent = "0 sản phẩm";
        return;
    }

    cartContent.style.display = "block";
    emptyCart.style.display = "none";
    cartCount.textContent = `${getTotalQuantity()} sản phẩm`;

    cart.forEach(product => {
        const div = document.createElement("div");
        div.className = "cart-item";

        const optionsText = [product.color, product.memory]
            .filter(Boolean)
            .join(" | ");

        div.innerHTML = `
        <div class="product-info">
            <img class="product-images" src="${product.image}">
            <div>
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                ${optionsText ? `<span class="cart-options">${optionsText}</span>` : ""}
            </div>
        </div>
        <div class="price">${formatPrice(product.price)}</div>
        <div class="quantity">
            <button class="minus">-</button>
            <span>${product.quantity}</span>
            <button class="plus">+</button>
        </div>
        <div class="subtotal">${formatPrice(product.price * product.quantity)}</div>
        <button class="delete-button">🗑</button>
        `;

        div.querySelector(".plus").onclick = () => {
            updateQuantity(product.compositeId, product.quantity + 1);
            renderCart();
        };

        div.querySelector(".minus").onclick = () => {
            updateQuantity(product.compositeId, product.quantity - 1);
            renderCart();
        };

        div.querySelector(".delete-button").onclick = () => {
            if (confirm("Xóa sản phẩm này?")) {
                removeFromCart(product.compositeId);
                renderCart();
            }
        };

        cartItems.appendChild(div);
    });

    totalPrice.textContent = formatPrice(getTotalPrice());
}

window.thanhtoan = function () {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống.");
        return;
    }

    if (!confirm("Xác nhận thanh toán?")) return;

    alert("Thanh toán thành công!\n\nTổng tiền: " + formatPrice(getTotalPrice()));
    clearCart();
    renderCart();
};

renderCart();
