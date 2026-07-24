import { CONFIG, DETAIL } from "../../config.js";
import { PRODUCTS } from "../product/product-data.js";
import { PRODUCT_DETAIL_MAP } from "../product/product-detail-map.js";
import { addToCart } from "../cart/cart-storage.js";

const PHONE_SPEC_FIELDS = [
    ["Hệ điều hành", "OS"],
    ["Kích thước màn hình", "screenSize"],
    ["Tính năng màn hình", ["screenFeature", "screenDetail"]],
    ["Chip", "chip"],
    ["RAM", "ram"],
    ["Camera sau", "rearCamera"],
    ["Camera trước", "frontCamera"],
    ["Pin", "battery"],
];

const ACCESSORY_SPEC_MAP = {
    brand: "Hãng", model: "Model", light: "Đèn nền", keyswitch: "Switch",
    keyCount: "Số phím", pollingRate: "Tốc độ báo cáo", connect: "Kết nối",
    keyRollover: "Key Rollover", cable: "Dây cáp", switchDurability: "Độ bền switch",
    compatibility: "Tương thích", resolution: "Độ phân giải",
    distanceConnect: "Khoảng cách kết nối", battery: "Pin",
    audiotechnology: "Công nghệ âm thanh", feature: "Tính năng", weight: "Trọng lượng",
};

const PRODUCT_GALLERY = {
    "phone-01": [
        "images/products/iphone-15-pro-max-1.jpg",
        "images/products/iphone-15-pro-max-2.jpg",
        "images/products/iphone-15-pro-max-3.jpg",
        "images/products/iphone-15-pro-max-list.jpg",
    ],
    "phone-04": [
        "images/products/oppo-find-x7-ultra-1.jpg",
        "images/products/oppo-find-x7-ultra-2.jpg",
    ],
};

let currentProduct = null;
let currentDetail = null;

function formatPrice(amount) {
    return Number(amount).toLocaleString("vi-VN") + "₫";
}

function getCurrentPrice() {
    if (CONFIG.salesOff > 0)
        return currentProduct.price * (1 - CONFIG.salesOff / 100);
    return currentProduct.price;
}

function setError(msg) {
    document.querySelector(".detail-layout").innerHTML =
        `<p class="pcard-empty">${msg}</p>`;
    document.getElementById("specsSection").style.display = "none";
    document.getElementById("descSection").style.display = "none";
}

function renderGallery() {
    const mainImg = document.getElementById("productImage");
    const thumbContainer = document.getElementById("thumbnails");
    const images = PRODUCT_GALLERY[currentProduct.id] || [currentProduct.image];

    mainImg.src = images[0];
    mainImg.alt = currentProduct.name;

    if (images.length <= 1) {
        thumbContainer.style.display = "none";
        return;
    }

    thumbContainer.style.display = "flex";
    thumbContainer.innerHTML = images
        .map((src, i) =>
            `<img src="${src}" alt="${currentProduct.name}" class="${i === 0 ? "active" : ""}" data-src="${src}">`
        )
        .join("");

    thumbContainer.querySelectorAll("img").forEach((thumb) => {
        thumb.addEventListener("click", () => {
            mainImg.src = thumb.dataset.src;
            thumbContainer.querySelectorAll("img").forEach((t) => t.classList.remove("active"));
            thumb.classList.add("active");
        });
    });
}

function renderColors() {
    const section = document.getElementById("colorSection");
    const container = document.getElementById("colorOptions");
    const colors = currentDetail.color;

    if (!colors || Object.keys(colors).length === 0) {
        section.style.display = "none";
        return;
    }

    section.style.display = "block";
    container.innerHTML = Object.entries(colors)
        .map(
            ([key, label]) =>
                `<button class="detail-option${key === Object.keys(colors)[0] ? " active" : ""}" data-key="${key}">${label}</button>`
        )
        .join("");

    container.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
            container.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}

function renderMemory() {
    const section = document.getElementById("memorySection");
    const container = document.getElementById("memoryOptions");
    const memory = currentDetail.memory;

    if (!memory || Object.keys(memory).length === 0) {
        section.style.display = "none";
        return;
    }

    section.style.display = "block";
    container.innerHTML = Object.entries(memory)
        .map(
            ([key, label]) =>
                `<button class="detail-option${key === Object.keys(memory)[0] ? " active" : ""}" data-key="${key}">${label}</button>`
        )
        .join("");

    container.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
            container.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}

function renderSpecs() {
    const section = document.getElementById("specsSection");
    const table = document.getElementById("specsTable");

    if (currentDetail.details) {
        const specs = currentDetail.details;
        let html = "";
        for (const [label, keys] of PHONE_SPEC_FIELDS) {
            const key = Array.isArray(keys) ? keys.find((k) => specs[k]) : keys;
            if (specs[key]) {
                const val = specs[key].replace(/\|/g, "<br>");
                html += `<tr><th>${label}</th><td>${val}</td></tr>`;
            }
        }
        if (html) {
            section.style.display = "block";
            table.innerHTML = html;
        }
        return;
    }

    const EXCLUDE = new Set(["name", "cost", "color", "memory", "details"]);
    let html = "";
    for (const [key, label] of Object.entries(ACCESSORY_SPEC_MAP)) {
        if (currentDetail[key] && !EXCLUDE.has(key)) {
            html += `<tr><th>${label}</th><td>${currentDetail[key]}</td></tr>`;
        }
    }
    if (html) {
        section.style.display = "block";
        table.innerHTML = html;
    }
}

function renderDescription() {
    const section = document.getElementById("descSection");
    const descEl = document.getElementById("productDescription");

    const descs = {
        "phone-01": "iPhone 15 Pro Max sở hữu chip Apple A17 Pro, màn hình OLED sắc nét, camera chất lượng cao, hiệu năng mạnh mẽ và pin sử dụng lâu dài.",
        "phone-02": "Samsung Galaxy S24 Ultra với camera 200MP, bút S Pen tích hợp, chip Snapdragon 8 Gen 3 mạnh mẽ, pin 5.500mAh trâu bền.",
        "phone-03": "Xiaomi 14 Pro với màn hình LTPO AMOLED 120Hz, chip Snapdragon 8 Gen 3, camera Leica chuyên nghiệp, sạc nhanh 120W.",
        "phone-04": "OPPO Find X7 Ultra sở hữu camera tiềm vọng zoom quang 6x, màn hình LTPO AMOLED 4500 nits, chip Snapdragon 8 Gen 3 hàng đầu.",
        "acc-01": "Tai nghe HyperX Cloud Stinger II Core với âm thanh 3D sống động, micro tích hợp, đệm tai êm ái, phù hợp gaming và giải trí.",
        "acc-02": "Bàn phím cơ HyperX Alloy FPS với switch Kailh Silver Speed, đèn RGB, khung thép chắc chắn, độ bền 70 triệu lượt nhấn.",
        "acc-03": "Chuột Logitech G304 Lightspeed không dây với cảm biến HERO 26.000 DPI, thời lượng pin 100 giờ, kết nối 2.4GHz siêu nhanh.",
        "acc-04": "Chuột Logitech G102 Lightsync có cảm biến quang 8000 DPI, đèn RGB, 6 nút lập trình, dây cáp 2.1m, phù hợp gaming cơ bản.",
    };

    const text = descs[currentProduct.id];
    if (text) {
        section.style.display = "block";
        descEl.textContent = text;
    }
}

function updatePriceDisplay() {
    const el = document.getElementById("productPrice");
    const currentPrice = getCurrentPrice();
    if (CONFIG.salesOff > 0) {
        el.innerHTML =
            `${formatPrice(currentPrice)} <span class="detail-price-old">${formatPrice(currentProduct.price)}</span>`;
    } else {
        el.textContent = formatPrice(currentProduct.price);
    }
}

function setupQuantity() {
    const input = document.getElementById("qtyInput");
    document.getElementById("qtyMinus").addEventListener("click", () => {
        const val = parseInt(input.value) || 1;
        if (val > 1) { input.value = val - 1; }
    });
    document.getElementById("qtyPlus").addEventListener("click", () => {
        const val = parseInt(input.value) || 1;
        input.value = val + 1;
    });
}

function getSelectedLabel(containerId) {
    const active = document.querySelector(`#${containerId} .detail-option.active`);
    return active ? active.textContent.trim() : "";
}

function getCartOptions() {
    return {
        color: getSelectedLabel("colorOptions"),
        memory: getSelectedLabel("memoryOptions"),
        quantity: parseInt(document.getElementById("qtyInput").value) || 1,
    };
}

function addToCartHandler() {
    addToCart(currentProduct, getCartOptions());
    alert("Đã thêm vào giỏ hàng!");
}

function buyNowHandler() {
    addToCart(currentProduct, getCartOptions());
    window.location.href = "../cart/cart.html";
}

function start() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) { setError("Không tìm thấy mã sản phẩm."); return; }

    currentProduct = PRODUCTS.find((p) => p.id === productId);
    if (!currentProduct) { setError("Sản phẩm không tồn tại."); return; }

    const detailKey = PRODUCT_DETAIL_MAP[productId];
    if (!detailKey) { setError("Không có thông tin chi tiết cho sản phẩm này."); return; }

    currentDetail = DETAIL[detailKey];
    if (!currentDetail) { setError("Dữ liệu sản phẩm chưa được cập nhật."); return; }

    document.getElementById("breadcrumbCategory").textContent = currentProduct.category;
    document.getElementById("breadcrumbName").textContent = currentProduct.name;
    document.getElementById("detailCategory").textContent = currentProduct.category;
    document.getElementById("productName").textContent = currentProduct.name;
    document.title = `${currentProduct.name} - TechNo Store`;

    renderGallery();
    updatePriceDisplay();

    if (currentDetail.color) renderColors();
    else document.getElementById("colorSection").style.display = "none";

    if (currentDetail.memory) renderMemory();
    else document.getElementById("memorySection").style.display = "none";

    renderSpecs();
    renderDescription();
    setupQuantity();

    document.getElementById("addToCartBtn").addEventListener("click", addToCartHandler);
    document.getElementById("buyNowBtn").addEventListener("click", buyNowHandler);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else { start(); }
