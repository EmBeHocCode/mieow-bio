# mieow-bio

Landing page portfolio cá nhân theo phong cách pixel-hybrid, dùng để giới thiệu hồ sơ cá nhân, kỹ năng, dự án tiêu biểu, định hướng AI trong thương mại điện tử và các kênh liên hệ trên một giao diện tập trung. Dự án phù hợp để trình bày với nhà tuyển dụng, giảng viên hoặc người xem GitHub muốn hiểu nhanh về định hướng kỹ thuật và cách triển khai giao diện. Phiên bản hiện tại được triển khai bằng React + Vite + TypeScript và build ra static site để dễ chạy local cũng như dễ deploy lên shared hosting.

> Thời gian cập nhật/push gần nhất trong README này: **2026-03-25 18:19:08 +07:00**

## Mục lục

- [Tổng quan](#tổng-quan)
- [Mục tiêu dự án](#mục-tiêu-dự-án)
- [Vấn đề dự án muốn giải quyết](#vấn-đề-dự-án-muốn-giải-quyết)
- [Đối tượng sử dụng](#đối-tượng-sử-dụng)
- [Tính năng chính](#tính-năng-chính)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Kiến trúc hệ thống / hướng triển khai](#kiến-trúc-hệ-thống--hướng-triển-khai)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Giao diện / hình ảnh minh họa](#giao-diện--hình-ảnh-minh-họa)
- [Hướng dẫn cài đặt và chạy local](#hướng-dẫn-cài-đặt-và-chạy-local)
- [Cấu hình môi trường / biến môi trường](#cấu-hình-môi-trường--biến-môi-trường)
- [Quy trình sử dụng ngắn gọn](#quy-trình-sử-dụng-ngắn-gọn)
- [Điểm nổi bật kỹ thuật](#điểm-nổi-bật-kỹ-thuật)
- [Những phần tác giả trực tiếp triển khai](#những-phần-tác-giả-trực-tiếp-triển-khai)
- [Hướng phát triển trong tương lai](#hướng-phát-triển-trong-tương-lai)
- [Trạng thái dự án](#trạng-thái-dự-án)
- [Thông tin tác giả](#thông-tin-tác-giả)
- [License / ghi chú sử dụng source](#license--ghi-chú-sử-dụng-source)

## Tổng quan

`mieow-bio` là project cá nhân theo hướng portfolio landing page. Mục tiêu của dự án là xây dựng một trang giới thiệu bản thân có định hướng rõ ràng về kỹ năng, dự án và tầm nhìn phát triển, thay vì chỉ liệt kê thông tin rời rạc trên nhiều nền tảng khác nhau.

Ở phiên bản hiện tại, dự án tập trung vào:

- trình bày hồ sơ cá nhân theo cấu trúc rõ ràng
- thể hiện năng lực frontend thông qua hệ UI component và hiệu ứng giao diện
- gom thông tin về project, định hướng AI và kênh liên hệ vào một điểm truy cập duy nhất
- xuất bản dưới dạng static site để dễ chạy local và dễ deploy lên hosting phổ thông

## Mục tiêu dự án

- Xây dựng một website portfolio cá nhân có thể dùng thật, không chỉ là mockup giao diện.
- Thể hiện khả năng tổ chức nội dung, thiết kế UI và triển khai frontend theo hướng có cấu trúc.
- Tạo một nơi tổng hợp để nhà tuyển dụng, giảng viên hoặc cộng tác viên xem nhanh thông tin quan trọng.
- Thử nghiệm và hoàn thiện phong cách giao diện riêng theo hướng dark futuristic, pixel-hybrid, neon cyber.

## Vấn đề dự án muốn giải quyết

Trong thực tế, thông tin cá nhân, dự án, định hướng học tập và kênh liên hệ thường bị phân tán giữa GitHub, mạng xã hội, file mô tả hoặc nhiều đường link khác nhau. Điều này làm người xem khó nắm được:

- tác giả đang theo đuổi hướng nào
- đã làm được những gì
- mức độ nghiêm túc của dự án cá nhân
- cách liên hệ hoặc xem thêm project liên quan

`mieow-bio` giải quyết vấn đề đó bằng một landing page có cấu trúc rõ, giúp người đọc hiểu nhanh cả phần trình bày nội dung lẫn tư duy triển khai kỹ thuật.

## Đối tượng sử dụng

- **Nhà tuyển dụng**: cần xem nhanh hồ sơ, kỹ năng, project tiêu biểu và mức độ hoàn thiện của một portfolio source code.
- **Giảng viên**: cần đánh giá mục tiêu, nội dung chức năng, công nghệ, kiến trúc và mức độ thực hành của project.
- **Developer khác / người xem GitHub**: cần biết cách clone, chạy local, hiểu stack và cách tổ chức source code.

## Tính năng chính

- Landing page portfolio một trang với các section: Hero, About, Skills, Projects, AI Roadmap, Business Concept, Connect và Final CTA.
- Giao diện dark neon theo phong cách pixel-hybrid: pixel frame, badge, button, panel và timeline nhưng vẫn giữ khả năng đọc tốt cho nội dung dài.
- Hiệu ứng nền gồm grid background, particle, glow orb, custom cursor và music toggle.
- Danh sách dự án tiêu biểu được quản lý theo data source riêng.
- AI roadmap hiển thị theo timeline/accordion để trình bày kế hoạch phát triển theo giai đoạn.
- Khu vực liên hệ tập trung với social links, CTA rõ ràng và modal QR cho Zalo.
- Build ra static site để có thể deploy trực tiếp lên shared hosting.

## Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Frontend | React 19, Vite, TypeScript |
| Styling | Tailwind CSS, CSS custom properties |
| Animation / Motion | Framer Motion |
| UI / Icon | Lucide React, React Icons |
| Build tool | Vite, PostCSS, Autoprefixer |
| Backend | Không có backend riêng trong phiên bản hiện tại |
| Database | Không sử dụng |
| AI / ML / Service khác | Không tích hợp AI runtime trong ứng dụng; nội dung AI xuất hiện ở phần roadmap / project showcase |
| Triển khai | Static build (`dist/`) phù hợp cho shared hosting |

## Kiến trúc hệ thống / hướng triển khai

Dự án được tổ chức theo hướng **component-based frontend** và **data-driven rendering**.

### 1. Tầng giao diện

- `src/components/background`: các thành phần nền như grid, glow orb, particle
- `src/components/layout`: top nav, music toggle, custom cursor, modal
- `src/components/pixel`: các reusable component theo ngôn ngữ thiết kế pixel-hybrid
- `src/components/sections`: từng section của landing page

### 2. Tầng dữ liệu hiển thị

- `src/data/site.ts` chứa dữ liệu cho hero, about, skills, projects, roadmap, socials và CTA
- Cách tổ chức này giúp tách nội dung ra khỏi phần render, dễ bảo trì và dễ cập nhật về sau

### 3. Hướng build và deploy

- Vite dùng để build source frontend thành static assets
- cấu hình `base: './'` giúp phù hợp với môi trường shared hosting
- khi deploy chỉ cần upload nội dung trong thư mục `dist/`

### 4. Lưu ý về lịch sử source

Repo hiện vẫn còn một số thư mục của phiên bản static trước đó như `css/`, `js/`, `scripts/`, `projects/`. Trong phiên bản hiện tại, phần source đang dùng để chạy chính nằm trong `src/` và được build bởi Vite.

## Cấu trúc thư mục

```text
public_html/
├─ assets/                      # Ảnh, nhạc, file media dùng trong giao diện
├─ src/
│  ├─ components/
│  │  ├─ background/            # Grid background, particle, glow orb
│  │  ├─ layout/                # Navbar, cursor, modal, music toggle
│  │  ├─ pixel/                 # Reusable pixel-hybrid UI components
│  │  └─ sections/              # Các section của landing page
│  ├─ data/
│  │  └─ site.ts                # Nội dung và dữ liệu hiển thị
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ css/                         # Nguồn của phiên bản static cũ
├─ js/                          # Nguồn của phiên bản static cũ
├─ scripts/                     # Module JS cũ
├─ projects/                    # Một số trang project cũ
├─ index.html
├─ package.json
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

## Giao diện / hình ảnh minh họa

Hiện tại README chưa đính kèm screenshot chính thức. Nếu muốn README hiển thị tốt hơn trên GitHub, nên bổ sung:

- ảnh chụp tổng quan trang chủ
- ảnh section Projects
- ảnh section AI Roadmap
- ảnh responsive trên mobile

Gợi ý vị trí lưu ảnh:

```text
assets/screenshots/
├─ hero-home.png
├─ projects-section.png
├─ roadmap-section.png
└─ mobile-view.png
```

Sau đó có thể chèn vào README như:

```md
![Hero](assets/screenshots/hero-home.png)
```

## Hướng dẫn cài đặt và chạy local

### Yêu cầu

- Node.js
- npm

### Cài đặt

```bash
npm install
```

### Chạy môi trường phát triển

```bash
npm run dev
```

Sau khi chạy, mở URL do Vite trả về, thường là:

```text
http://127.0.0.1:5173
```

### Build production

```bash
npm run build
```

### Preview bản production local

```bash
npm run preview
```

### Deploy lên shared hosting

1. Chạy `npm run build`
2. Mở thư mục `dist/`
3. Upload toàn bộ file bên trong `dist/` lên thư mục hosting tương ứng, ví dụ `public_html/`

## Cấu hình môi trường / biến môi trường

Phiên bản hiện tại **không yêu cầu biến môi trường** để chạy giao diện chính.

- Không có `.env` bắt buộc
- Không có backend API cần cấu hình ở local
- Không có database connection string ở phiên bản hiện tại

Nếu về sau dự án tích hợp thêm API, analytics, CMS hoặc dịch vụ AI runtime thì nên bổ sung `.env.example`.

## Quy trình sử dụng ngắn gọn

1. Mở trang chủ để xem tổng quan hồ sơ và định hướng cá nhân.
2. Xem section About và Skills để nắm phần nền tảng kỹ thuật.
3. Xem section Projects để duyệt các project tiêu biểu.
4. Xem AI Roadmap để hiểu hướng phát triển trong mảng AI cho thương mại điện tử.
5. Sử dụng khu vực Connect / CTA để mở GitHub, social link hoặc liên hệ trực tiếp.
6. Có thể bật hoặc tắt nhạc nền bằng music toggle.

## Điểm nổi bật kỹ thuật

- Chuyển một portfolio landing page sang kiến trúc frontend hiện đại với React + Vite + TypeScript.
- Tách component theo vai trò rõ ràng: background, layout, pixel UI, section.
- Tách dữ liệu nội dung ra khỏi phần render bằng `src/data/site.ts`.
- Kết hợp UI pixel-hybrid với motion hiện đại để giữ cá tính nhưng vẫn dễ đọc.
- Sử dụng static build để tối ưu khả năng triển khai trên môi trường hosting phổ thông.

## Những phần tác giả trực tiếp triển khai

Dựa trên cấu trúc source code hiện tại, tác giả trực tiếp triển khai các phần sau:

- tổ chức cấu trúc source frontend theo component
- xây dựng landing page và các section nội dung chính
- xây dựng hệ UI pixel-hybrid reusable
- triển khai particle background, glow orb, custom cursor, music toggle và modal QR
- cấu hình build frontend với Vite, Tailwind CSS và TypeScript
- quản lý nội dung project, skill, roadmap và social links qua data file riêng

## Hướng phát triển trong tương lai

- Bổ sung screenshot/demo chính thức trong README
- Chuẩn hóa lại nội dung portfolio để đồng nhất tên hiển thị, mô tả và branding cá nhân
- Tối ưu thêm cho SEO, Open Graph và metadata chia sẻ
- Bổ sung test hoặc kiểm tra chất lượng cơ bản cho frontend build
- Tách rõ phần source hiện tại và phần legacy static nếu tiếp tục duy trì repo lâu dài
- Mở rộng landing page thành portfolio nhiều trang hoặc có khu vực project detail riêng

## Trạng thái dự án

**Trạng thái hiện tại:** đang phát triển và tiếp tục hoàn thiện

### Đã có

- source code chạy được với `npm run dev`
- build production thành công với `npm run build`
- hệ giao diện có cấu trúc tương đối rõ ràng
- có thể deploy dưới dạng static site

### Chưa thể hiện hoặc chưa hoàn thiện rõ trong repo hiện tại

- chưa có demo public được ghi rõ trong README
- chưa có screenshot chính thức trong README
- chưa thấy cấu hình test tự động hoặc CI/CD trong repo hiện tại
- một số nội dung cá nhân/project vẫn cần cập nhật thủ công để đồng nhất hoàn toàn

## Thông tin tác giả

- **Tên:** Nguyễn Lâm Hùng
- **Vai trò:** Chủ dự án / người phát triển chính
- **Email:** mieowshopsite@gmail.com
- **GitHub:** [EmBeHocCode](https://github.com/EmBeHocCode)
- **Repository:** [https://github.com/EmBeHocCode/mieow-bio](https://github.com/EmBeHocCode/mieow-bio)

## License / ghi chú sử dụng source

Hiện tại repo chưa thể hiện file `LICENSE` riêng.

Nếu dự án được public để tham khảo source:

- nên bổ sung license rõ ràng trước khi cho phép tái sử dụng
- nếu chưa có license, người xem nên hiểu rằng source được công khai để tham khảo, không mặc định đồng nghĩa với quyền sử dụng lại cho mục đích thương mại
