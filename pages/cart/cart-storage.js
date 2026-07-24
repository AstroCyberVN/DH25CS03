const CART_KEY = "cart";

export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product, options = {}) {
    const cart = getCart();
    const color = options.color || "";
    const memory = options.memory || "";
    const qty = options.quantity || 1;
    const compositeId = `${product.id}_${color}_${memory}`;

    const existing = cart.find(item => item.compositeId === compositeId);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            compositeId,
            id: product.id,
            name: product.name,
            category: product.category,
            image: product.image,
            price: product.price,
            color,
            memory,
            quantity: qty,
        });
    }
    saveCart(cart);
}

export function removeFromCart(compositeId) {
    const cart = getCart().filter(item => item.compositeId !== compositeId);
    saveCart(cart);
}

export function updateQuantity(compositeId, quantity) {
    const cart = getCart();
    const item = cart.find(i => i.compositeId === compositeId);
    if (!item) return;
    item.quantity = quantity;
    if (item.quantity <= 0) {
        removeFromCart(compositeId);
        return;
    }
    saveCart(cart);
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
}

export function getTotalPrice() {
    return getCart().reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
}

export function getTotalQuantity() {
    return getCart().reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);
}
