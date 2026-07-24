import { PRODUCTS } from "./product-data.js";
import { CONFIG } from "../../config.js";
import { addToCart } from "../cart/cart-storage.js";
import { PRODUCT_DETAIL_MAP } from "./product-detail-map.js";

function formatPrice(amount) {
    return amount.toLocaleString("vi-VN") + "₫";
}

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "pcard";

    const badgeHtml = product.badge
        ? `<div class="pcard-badge ${product.hot ? "hot" : ""}">${product.badge}</div>`
        : "";

    const currentPrice = CONFIG.salesOff > 0
        ? product.price * (1 - CONFIG.salesOff / 100)
        : product.price;

    const oldPriceHtml = CONFIG.salesOff > 0
        ? `<span class="pcard-price-old">${formatPrice(product.price)}</span>`
        : "";

    const hasDetail = PRODUCT_DETAIL_MAP[product.id];

    card.innerHTML = `
        ${badgeHtml}
        <div class="pcard-img">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="pcard-info">
            <span class="pcard-category">${product.category}</span>
            <h3 class="pcard-title">${product.name}</h3>
            <div class="pcard-price">
                <span class="pcard-price-current">${formatPrice(currentPrice)}</span>
                ${oldPriceHtml}
            </div>
            <div class="pcard-actions">
                ${hasDetail ? `<a href="pages/detail/detail.html?id=${product.id}" class="pcard-btn-detail">Xem chi tiết</a>` : ""}
                <button class="pcard-btn-cart" data-product-id="${product.id}">
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    `;

    card.querySelector(".pcard-btn-cart").addEventListener("click", () => {
        addToCart(product);
        alert("Đã thêm vào giỏ hàng!");
    });

    return card;
}

export function renderProductGroup(groupKey, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = PRODUCTS.filter(p => p.group === groupKey);

    if (items.length === 0) {
        container.innerHTML = `<p class="pcard-empty">Chưa có sản phẩm trong danh mục này.</p>`;
        return;
    }

    items.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}
