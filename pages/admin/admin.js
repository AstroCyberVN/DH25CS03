const STORAGE_KEY = "supportRequests";

const table = document.getElementById("supportTable");
const clearBtn = document.getElementById("clearBtn");

function renderTable() {
    const requests = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    table.innerHTML = "";

    if (requests.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center">
                    Chưa có yêu cầu hỗ trợ nào.
                </td>
            </tr>
        `;
        return;
    }

    requests.forEach((item, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.createdAt}</td>
                <td>${item.fullName}</td>
                <td>${item.email}</td>
                <td>${item.phone || "-"}</td>
                <td>${item.supportType}</td>
                <td>${item.content}</td>
                <td>${item.status}</td>
            </tr>
        `;
    });
}

clearBtn.addEventListener("click", () => {
    if (!confirm("Bạn có chắc muốn xóa toàn bộ yêu cầu?")) return;
    localStorage.removeItem(STORAGE_KEY);
    renderTable();
});

document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "/pages/contact/contact.html";
});

renderTable();
