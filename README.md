# Mieow Bio

Portfolio website cá nhân được xây dựng bằng `React + Vite + TypeScript`, tập trung thể hiện năng lực triển khai frontend, tổ chức nội dung portfolio, và tư duy thiết kế giao diện có bản sắc riêng. Dự án được định hướng như một sản phẩm trình bày hồ sơ chuyên nghiệp dành cho **nhà tuyển dụng**, **giảng viên**, và **người xem GitHub** muốn đánh giá cả chất lượng giao diện lẫn cấu trúc kỹ thuật phía sau.

## Demo

- Live site: [https://bio.mieowparadise.io.vn](https://bio.mieowparadise.io.vn)
- Repository: [https://github.com/EmBeHocCode/mieow-bio](https://github.com/EmBeHocCode/mieow-bio)

## Mục tiêu dự án

Mục tiêu của dự án không chỉ là tạo một trang bio đơn giản, mà là xây dựng một **portfolio có giá trị trình bày học thuật và tuyển dụng**, trong đó:

- thông tin cá nhân, kỹ năng, dự án, roadmap và kênh liên hệ được gom về một điểm truy cập duy nhất
- giao diện có phong cách riêng, dễ nhận diện, thay vì dùng template phổ thông
- mã nguồn được tổ chức theo hướng component-based, đủ rõ để người đọc repo có thể đánh giá khả năng triển khai thực tế
- website có thể build thành static site và triển khai trên shared hosting, phù hợp với điều kiện vận hành thực tế

## Giá trị trình bày

Website này được thiết kế để trả lời nhanh 4 câu hỏi mà nhà tuyển dụng hoặc giảng viên thường quan tâm:

1. Tác giả đang theo đuổi định hướng kỹ thuật nào?
2. Khả năng tổ chức giao diện và trải nghiệm người dùng ra sao?
3. Mức độ làm thật của sản phẩm tới đâu?
4. Codebase có được tổ chức đủ rõ ràng để phát triển tiếp hay không?

## Điểm nổi bật kỹ thuật

- Kiến trúc frontend hiện đại với `React 19`, `Vite`, `TypeScript`
- Giao diện theo phong cách `pixel / neon / cyber hybrid`, có định danh hình ảnh rõ
- Dữ liệu hiển thị được tách khỏi phần render qua các file `src/data/*`
- Hệ section được chia rõ theo vai trò: hero, about, skills, projects, roadmap, connect
- Tích hợp `music player` với `Web Audio API`, `AnalyserNode` và `canvas visualizer` tùy biến
- Visualizer được xây theo hướng giống Avee/YouTube spectrum: có baseline cong, peak accent, bass emphasis, record center
- Có tối ưu cho static hosting: build ra `dist/`, dùng base path tương thích, không phụ thuộc backend
- Có tinh chỉnh hiệu năng cho hero section, background effect và audio panel để hạn chế lag trên thiết bị yếu

## Chức năng chính

- Portfolio landing page dạng one-page
- Hiển thị hồ sơ cá nhân, kỹ năng và định hướng phát triển
- Danh sách dự án tiêu biểu với stack và liên kết tham khảo
- Roadmap học tập / phát triển nghề nghiệp theo từng giai đoạn
- Hệ social/contact tập trung
- Music control panel với:
  - local playlist
  - play / pause / next / previous
  - shuffle / repeat
  - volume control
  - audio visualizer phong cách spectrum cong hai bên
- Hiệu ứng nền gồm grid, particle, glow và cursor tùy biến

## Kiến trúc triển khai

Codebase hiện tại đi theo hướng **component-driven UI** kết hợp với **data-driven content rendering**.

### 1. Tầng nội dung

- `src/data/site.ts`
- `src/data/music.ts`

Các file này chịu trách nhiệm quản lý dữ liệu hiển thị như hero content, skills, projects, roadmap, social links và metadata playlist. Cách tách này giúp phần giao diện có thể tái sử dụng và dễ cập nhật hơn.

### 2. Tầng giao diện

- `src/components/sections`: các section nội dung chính
- `src/components/layout`: music player, visualizer, navbar, custom cursor, icon system
- `src/components/background`: grid, particle và ambient effects
- `src/components/pixel`: các UI primitives theo phong cách thiết kế pixel-hybrid

### 3. Tầng render và hiệu ứng

- `Framer Motion` cho các transition UI
- `Canvas 2D + Web Audio API` cho audio spectrum
- CSS custom properties và Tailwind utility cho theme/panel/layout system

## Tech Stack

| Nhóm | Công nghệ |
|---|---|
| Frontend | React 19, TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS, CSS custom properties |
| Motion | Framer Motion |
| Icons | Lucide React, React Icons |
| Audio visualization | Web Audio API, Canvas 2D |
| Deployment target | Static hosting / shared hosting |

## Cấu trúc thư mục

```text
public_html/
├─ assets/                      # Ảnh, icon, audio asset
├─ src/
│  ├─ components/
│  │  ├─ background/            # Hiệu ứng nền
│  │  ├─ layout/                # Navbar, player, visualizer, cursor
│  │  ├─ pixel/                 # Reusable UI components
│  │  └─ sections/              # Nội dung từng section
│  ├─ data/                     # Nội dung hiển thị và playlist
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ index.html
├─ package.json
├─ vite.config.ts
└─ README.md
```

## Năng lực thể hiện qua dự án

Đây là phần có giá trị nhất nếu repo được xem bởi nhà tuyển dụng hoặc giảng viên:

- Khả năng chuyển một ý tưởng giao diện có cá tính thành sản phẩm chạy được
- Khả năng tổ chức source code rõ vai trò thay vì dồn logic vào một file lớn
- Khả năng làm việc với `animation`, `responsive layout`, `canvas rendering`, `audio-reactive UI`
- Khả năng cân bằng giữa thẩm mỹ giao diện và giới hạn hiệu năng khi deploy thật
- Khả năng thiết kế một portfolio có định hướng nghề nghiệp rõ ràng, không chỉ là landing page trang trí

## Hướng dẫn chạy local

### Yêu cầu

- Node.js
- npm

### Cài dependency

```bash
npm install
```

### Chạy môi trường phát triển

```bash
npm run dev
```

### Build production

```bash
npm run build
```

### Preview bản build

```bash
npm run preview
```

## Hướng dẫn deploy

Dự án build ra static site, vì vậy quy trình deploy khá gọn:

1. Chạy `npm run build`
2. Mở thư mục `dist/`
3. Upload toàn bộ nội dung trong `dist/` lên thư mục host, ví dụ `public_html/`

Lưu ý: không upload nguyên `src/` nếu host chỉ là static hosting.

## Ghi chú về hiệu năng

Trong phiên bản hiện tại, dự án đã có một số tinh chỉnh để phù hợp với việc chạy trên hosting phổ thông:

- trì hoãn tải audio cho tới khi người dùng thực sự bật nhạc
- giảm chi phí render của visualizer ở trạng thái idle / paused / transition
- tối ưu bớt background effect cho màn nhỏ hoặc môi trường hạn chế hiệu năng
- giữ mô hình static build để giảm phụ thuộc hạ tầng

## Hướng phát triển tiếp theo

- bổ sung screenshot chính thức trong README
- chuẩn hóa thêm metadata SEO / Open Graph
- tách rõ hơn phần legacy static cũ nếu tiếp tục duy trì repo lâu dài
- hoàn thiện thêm testing và quality checks cho frontend
- tiếp tục tối ưu visualizer và trải nghiệm player theo hướng production-ready

## Tác giả

- Họ tên: **Nguyễn Lâm Hùng**
- Vai trò: **Tác giả dự án / người phát triển chính**
- GitHub: [EmBeHocCode](https://github.com/EmBeHocCode)
- Email: [mieowshopsite@gmail.com](mailto:mieowshopsite@gmail.com)

## Ghi chú sử dụng

Repository này được công khai chủ yếu nhằm mục đích:

- trình bày năng lực cá nhân
- lưu trữ mã nguồn portfolio
- phục vụ tham khảo học thuật và đánh giá kỹ thuật

Nếu cần tái sử dụng source cho mục đích khác, nên trao đổi rõ với tác giả hoặc bổ sung license phù hợp cho repo.
