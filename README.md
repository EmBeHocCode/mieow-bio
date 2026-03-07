# mieow-bio

Trang bio/portfolio cá nhân dạng static website cho `EmBeby`, tập trung vào hình ảnh cá nhân, kỹ năng, dự án tiêu biểu, tầm nhìn AI trong e-commerce và các kênh liên hệ.

## Tổng quan

Project được xây bằng HTML, CSS và JavaScript thuần, không phụ thuộc framework. Giao diện hướng tới phong cách hiện đại, có sidebar điều hướng, hiệu ứng nền động, nhạc nền, custom cursor và hỗ trợ chuyển đổi ngôn ngữ.

## Tính năng chính

- Landing page cá nhân với các section: Hero, About, Skills, Projects, AI Roadmap, Links, Contact
- **AI Roadmap**: Lộ trình phát triển AI (2026-2027) được thiết kế dạng tham số hóa sinh động với Accordion Timeline tương tác và tối ưu không gian.
- **Dự án nổi bật**: Trưng bày trực tiếp các dự án thực tế (MieowMarket, SnapTrans, Meow Zalo AI Bot, MieowTruyenTranh, mieow-bio) với tech stack chi tiết.
- Hỗ trợ đa ngôn ngữ: Tiếng Việt, English, 中文 (tự động cập nhật mượt mà không cần reload).
- Sidebar menu cho desktop và mobile.
- Hiệu ứng nền động, particle và scroll animation.
- Trình phát nhạc nền tích hợp sẵn.
- Khu vực settings để bật/tắt một số hiệu ứng.

## Cấu trúc thư mục

```text
public_html/
|-- assets/        # Hình ảnh, nhạc, ghi chú
|-- css/           # Các file CSS theo từng phần giao diện
|-- js/            # JavaScript chính
|-- projects/      # Các trang project riêng
|-- scripts/       # Module JS cho state và feature
`-- index.html     # Trang chính
```

## Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Font Awesome

## Chạy project

Vì đây là static site, có thể chạy theo 1 trong 2 cách:

1. Mở trực tiếp file `index.html` trong trình duyệt.
2. Dùng local server để test ổn định hơn, ví dụ với VS Code Live Server hoặc bất kỳ static server nào.

## Tùy chỉnh nhanh

- Nội dung chính: sửa trong `index.html`
- Bản dịch giao diện: sửa trong `js/main.js`
- Giao diện và hiệu ứng: sửa trong thư mục `css/`
- Hình ảnh và nhạc nền: thay file trong `assets/`

## Mục tiêu project

Repo này dùng để:

- giới thiệu bản thân trên GitHub/web
- làm portfolio cá nhân
- thử nghiệm giao diện bio page theo phong cách riêng
- tiếp tục mở rộng thành portfolio có nhiều project thực tế hơn

## Tác giả

Nguyễn Lâm Hùng  
GitHub: [EmBeHocCode](https://github.com/EmBeHocCode)
