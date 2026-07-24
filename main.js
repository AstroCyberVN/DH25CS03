import { CONFIG } from "./config.js";

function setTitleText() {
    document.querySelectorAll('[id="title"]').forEach(el => {
        el.textContent = CONFIG.title;
    });

    document.querySelectorAll('[id="address"]').forEach(el => {
        el.textContent = CONFIG.address;
    });

    document.querySelectorAll('[id="hotline"]').forEach(el => {
        el.textContent = CONFIG.hotline;
    });

    document.querySelectorAll('[id="email"]').forEach(el => {
        el.textContent = CONFIG.email;
    });
}

function setSalesOffText() {
    const salesElement = document.getElementById('salesOff');
    if (!salesElement) return;

    if (CONFIG.salesOff && CONFIG.salesOff > 0) {
        salesElement.textContent = `🔥 ${CONFIG.salesTitle} - Giảm đến ${CONFIG.salesOff}%`;
        salesElement.style.display = 'inline-block';
    } else {
        salesElement.style.display = 'none';
    }
}

function navBarAutoSelect() {
    const currentPath = window.location.pathname;

    document.querySelectorAll("nav a").forEach(link => {
        link.classList.toggle(
            "selected",
            link.pathname === currentPath
        );
    });
}

async function loadComponent(url, placeholderId) {
    const result = await fetch(url);
    const html = await result.text();
    document.getElementById(placeholderId).innerHTML = html;
}

async function start() {
    await loadComponent('components/header.html', 'header-placeholder');
    await loadComponent('components/footer.html', 'footer-placeholder');

    setTitleText();
    setSalesOffText();
    navBarAutoSelect();
}

start();
