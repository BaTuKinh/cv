# CV trực tuyến – Nguyễn Thị Tường Vi

Trang CV tĩnh, chạy trực tiếp trên GitHub Pages (không cần cài đặt gì thêm).

## Cấu trúc

| File | Công dụng |
|---|---|
| `data.js` | **Toàn bộ nội dung CV** – chỉ cần sửa file này để cập nhật |
| `index.html`, `style.css`, `app.js` | Giao diện (thường không cần sửa) |
| `docs/` | Nơi bỏ PDF báo cáo, poster, chứng chỉ, ảnh chân dung |

## Đăng lên GitHub Pages

1. Đăng nhập GitHub → **New repository** → đặt tên, ví dụ `cv` (chọn Public) → Create.
2. Bấm **uploading an existing file**, kéo thả **toàn bộ nội dung thư mục này** (kể cả thư mục `docs`) → Commit changes.
3. Vào **Settings → Pages** → mục *Build and deployment*: Source = **Deploy from a branch**, Branch = **main** / **(root)** → Save.
4. Chờ 1–2 phút, trang sẽ có địa chỉ dạng `https://<tên-tài-khoản>.github.io/cv/`.

> Muốn địa chỉ gọn `https://<tên-tài-khoản>.github.io/` thì đặt tên repository đúng là `<tên-tài-khoản>.github.io`.

## Cập nhật thường xuyên

1. Bỏ file PDF/poster mới vào thư mục `docs/` (đặt tên không dấu, không khoảng trắng, ví dụ `poster-hoi-nghi-2026.pdf`).
2. Mở `data.js` trên GitHub (biểu tượng bút chì ✏️), thêm một khối vào mục `research`:

```js
{
  type: "poster",                 // paper | poster | report
  title: "Tên poster",
  authors: "Nguyễn Thị Tường Vi, cộng sự",
  venue: "Tên hội nghị",
  year: 2026,
  role: "Phân tích số liệu thống kê",
  file: "docs/poster-hoi-nghi-2026.pdf",
  link: "",
},
```

3. Bấm **Commit changes** – trang tự cập nhật sau ~1 phút.

## Việc cần làm ngay

- Thay các dòng có `[CẬP NHẬT]` trong `data.js` bằng thông tin thật (email, số điện thoại, năm làm việc, học vấn, nghiên cứu…).
- Thêm ảnh chân dung vào `docs/` và điền `photo: "docs/ten-anh.jpg"`.
- Nút **In / Lưu PDF** trên trang cho phép xuất CV thành file PDF để gửi nhà tuyển dụng.

## Lưu ý riêng tư

Repository Public nên mọi nội dung và file trong `docs/` ai cũng xem được. Chỉ đăng tài liệu bạn được phép công bố; không đưa dữ liệu bệnh nhân hay thông tin nội bộ chưa được duyệt.
