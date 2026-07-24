# DH25CS03 - Phone Shop Website

**🔗 Demo:** https://astrocybervn.github.io/DH25CS03/

Trang web bán điện thoại và phụ kiện — dự án nhóm.

---

## 5W1H — Mô tả ứng dụng / giải pháp

| **What**  | Website thương mại điện tử bán điện thoại & phụ kiện gaming chính hãng                |
| **Why**   | Đáp ứng nhu cầu mua sắm trực tuyến, giải quyết bài toán đồ án môn học                 |
| **Who**   | Nhóm DH25CS03 — 7 thành viên                                                          |
| **When**  | Học kỳ 2025 - 2026                                                                    |
| **Where** | Trường Đại học Mở TP.HCM                                                              |
| **How**   | Xây dựng bằng HTML, CSS, JavaScript thuần + jQuery, lưu trữ dữ liệu bằng localStorage |

---

## Timeline — Checklist — Task

### Timeline

| Giai đoạn   | Thời gian              | Công việc                                           |
|-------------|------------------------|-----------------------------------------------------|
| Lên ý tưởng | Thứ 5 (18h30->19h)     | Phân tích yêu cầu, thiết kế giao diện (Figma)       |
| Phát triển  | Thứ 5, 6               | Xây dựng trang Home, Product, Detail, Cart, Contact |
| Hoàn thiện  | Thứ 6                  | Kết nối giỏ hàng, form liên hệ, kiểm tra tổng thể   |
| Báo cáo     | Thứ 7                  | Viết README                                         |

### Checklist

- [x] Trang chủ (Home)
- [x] Trang sản phẩm (Product) — danh sách điện thoại + phụ kiện
- [x] Trang chi tiết sản phẩm (Detail) — màu sắc, dung lượng, số lượng
- [x] Trang giỏ hàng (Cart) — thêm, xoá, sửa số lượng
- [x] Trang liên hệ (Contact) — form gửi yêu cầu hỗ trợ
- [x] Trang quản lý yêu cầu (Admin) — xem danh sách hỗ trợ
- [x] Trang thành viên (Member) — thông tin nhóm
- [x] Header / Footer dùng chung
- [x] Cấu hình tập trung qua `config.js`
- [x] Giỏ hàng dùng `localStorage`
- [x] Form liên hệ lưu `localStorage`

### Task — Phân công

| Thành viên          | Trang phụ trách               |
|---------------------|-------------------------------|
| Đoàn Lữ Kỳ Quang    | Trang chủ (Home)              |
| Huỳnh Duy Minh Đức  | Chi tiết sản phẩm (Detail)    |
| Nguyễn Nhất Duy     | Giỏ hàng (Cart)               |
| Trần Hoàng Anh Khoa | Liên hệ (Contact)             |
| Trần Thành Hiệp     | Sản phẩm (Product)            |
| Hồ Nhật Minh        | Danh sách thành viên (Member) |
| Đặng Minh Nhật      | Javascript + Tổng hợp         |

---

## Wireframe / UI
- **Giao diện:** Thiết kế theo phong cách tối giản, màu chủ đạo Đen + Trắng + Xám, button xanh dương

---

## Cấu trúc thư mục

```
DH25CS03/
├── index.html              # Trang chủ
├── config.js               # Cấu hình toàn bộ website + dữ liệu sản phẩm
├── main.js                 # JS chung (header, footer, config)
├── main.css                # CSS chung (theme, header, footer, buttons)
├── README.md
│
├── components/             # Components dùng chung
│   ├── header.html
│   └── footer.html
│
├── images/
│   ├── products/           # Ảnh sản phẩm
│   └── team/               # Ảnh thành viên
│
├── pages/
│   ├── product/            # Danh sách sản phẩm
│   ├── detail/             # Chi tiết sản phẩm
│   ├── cart/               # Giỏ hàng
│   ├── contact/            # Liên hệ
│   ├── admin/              # Quản lý yêu cầu hỗ trợ
│   └── member/             # Thành viên nhóm
│
└── videos/
```

---

## Công nghệ sử dụng

| Công nghệ    | Mục đích                         |
|--------------|----------------------------------|
| HTML5        | Cấu trúc trang web               |
| CSS          | Thiết kế giao diện               |
| JavaScript   | Xử lý logic, tương tác           |
| localStorage | Lưu giỏ hàng, lưu yêu cầu hỗ trợ |
| GitHub Pages | Hosting website                  |

---

## Ghi chú

- Cấu hình toàn bộ website nằm trong `config.js`
- Giỏ hàng dùng `localStorage`
- Form liên hệ lưu vào `localStorage`, quản lý tại trang admin
- Header + Footer load bằng jQuery `.load()`
