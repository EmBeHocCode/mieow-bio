# Mieow Bio

Portfolio cá nhân của **Meow Ngáo / EmBeHocCode**, sinh viên CNTT định hướng **E-Commerce**, xây theo phong cách **cyber pink/purple glassmorphism**. Website dùng để trình bày profile, kỹ năng, project đang làm, kênh liên hệ và một mô phỏng client-side về kiến trúc bảo vệ server.

Live site: [https://bio.mieowparadise.io.vn](https://bio.mieowparadise.io.vn)

## Điểm nổi bật

- One-page portfolio dạng static site, có sidebar profile cố định trên desktop.
- Responsive cho desktop, tablet và mobile.
- Theme cyber pink/purple glassmorphism, có dark/light toggle và accent theme manager.
- Nội dung song ngữ VI/EN qua `data-vi` và `data-en`.
- Skill section dùng level mô tả thay vì phần trăm tự chấm.
- Project cards có `Role`, `Stack`, `Status`, link GitHub/Demo rõ ràng.
- Security Lab iframe: mô phỏng kiến trúc bảo vệ server, traffic bất thường theo OSI, WAF/rate limiter/IDS/DDoS shield.
- WebGL/Three.js background tách riêng trong `assets/site3d-bg`.
- Music panel local playlist, cursor theme, back-to-top, loading intro ngắn.

## Dự án đang hiển thị

- `mieow-bio`: portfolio chính.
- `SnapTrans`: desktop OCR/translation tool.
- `ZenoDigital`: storefront/backoffice hướng commerce system.
- `Mona Idle Quest`: prototype game 2D pixel-art action RPG/idle RPG bằng Python/Pygame.
- `E-Commerce Workflow Notes`: ghi chú và flow phân tích yêu cầu E-Commerce.
- `Meow Astral Core`: WebGL/Three.js visual background.

## Security Lab

Phần **Mô Phỏng Kiến Trúc Bảo Vệ Server** nằm trong:

```text
assets/security-lab/
```

Mô phỏng được nhúng bằng iframe để tránh xung đột CSS/JS với portfolio chính.

Tối ưu hiệu năng đã áp dụng:

- Lazy load iframe.
- Pause canvas khi section bị collapse, tab bị ẩn hoặc iframe ra ngoài viewport.
- Giới hạn FPS: desktop khoảng 45 FPS, mobile/coarse/reduced motion khoảng 24 FPS.
- Giảm DPR canvas, particle, trail, packet spawn và số client trên thiết bị yếu.
- Giữ nền dark glass để không lệch màu với portfolio.

## Cấu trúc chính

```text
.
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  └─ script.js
├─ assets/
│  ├─ favicon.ico
│  ├─ avatar.gif
│  ├─ tichtuyetavt.png
│  ├─ tichtuyetavt.webp
│  ├─ mouse-cursor/
│  ├─ security-lab/
│  │  ├─ index.html
│  │  ├─ security-lab.css
│  │  └─ security-lab.js
│  └─ site3d-bg/
│     ├─ index.html
│     └─ assets/
└─ .htaccess
```

## Tech Stack

| Nhóm | Công nghệ |
|---|---|
| Core | HTML, CSS, JavaScript |
| UI | Glassmorphism, responsive CSS, CSS custom properties |
| Icons | Font Awesome CDN |
| Background | Three.js/WebGL bundle trong `assets/site3d-bg` |
| Simulation | Canvas 2D trong `assets/security-lab` |
| Hosting | Static hosting/shared hosting |

## Chạy local

Không cần build step cho portfolio chính.

```bash
python -m http.server 4181
```

Sau đó mở:

```text
http://127.0.0.1:4181
```

Test nhanh Security Lab:

```text
http://127.0.0.1:4181/#security-lab
```

## Deploy

Upload các file/folder sau lên host static:

```text
index.html
.htaccess
css/
js/
assets/
```

Nếu host/CDN cache mạnh, kiểm tra version query trong `index.html`, ví dụ:

```text
css/style.css?v=security-dark8
js/script.js?v=security-dark8
assets/security-lab/index.html?v=dark8
assets/security-lab/security-lab.js?v=perf1
```

## Ghi chú asset

Music panel đọc file từ:

```text
assets/music/
```

Playlist có thể bổ sung sau bằng các file `.mp3` đúng tên trong `js/script.js`. Repo hiện tập trung vào source portfolio và visual assets chính, không bắt buộc kèm toàn bộ nhạc.

## Tác giả

- GitHub: [EmBeHocCode](https://github.com/EmBeHocCode)
- Live bio: [bio.mieowparadise.io.vn](https://bio.mieowparadise.io.vn)
- Định hướng: IT student, E-Commerce, web product, AI-assisted building.
