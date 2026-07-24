# DH25CS03 - Phone Shop Website

Trang web bán điện thoại và phụ kiện - đồ án nhóm DH25CS03.

## Thành viên

| Thành viên | Trang phụ trách       |
|------------|-----------------------|
| Kỳ Quang   | Trang chủ             |
| Minh Đức   | Chi tiết sản phẩm     |
| Nhất Duy   | Giỏ hàng              |
| Anh Khoa   | Liên hệ               |
| Thành Hiệp | Sản phẩm              |
| Nhật Minh  | Danh sách thành viên  |
| Minh Nhật  | Javascript + Tổng hợp |

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
│   ├── products/           # Ảnh sản phẩm (kebab-case)
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

## Ghi chú

- Cấu hình toàn bộ website nằm trong `config.js`
- Giỏ hàng dùng `localStorage`
- Form liên hệ lưu vào `localStorage`, quản lý tại trang admin
