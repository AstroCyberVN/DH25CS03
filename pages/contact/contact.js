const STORAGE_KEY = "supportRequests";

const form = document.getElementById("supportForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const request = {
        id: Date.now(),
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        supportType: document.getElementById("supportType").value,
        content: document.getElementById("content").value.trim(),
        createdAt: new Date().toLocaleString("vi-VN"),
        status: "Chưa xử lý",
    };

    let requests = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    requests.push(request);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));

    alert("Đã gửi yêu cầu hỗ trợ thành công!");
    form.reset();
});
