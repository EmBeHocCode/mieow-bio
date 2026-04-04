export type NavItem = {
  id: string;
  label: string;
};

export type SkillItem = {
  icon: 'code' | 'store' | 'video';
  title: string;
  description: string;
  chips: string[];
};

export type ProjectAction = {
  label: string;
  href: string;
};

export type ProjectItem = {
  icon: 'window' | 'bot' | 'book' | 'scan' | 'bag';
  title: string;
  description: string;
  status: string;
  tone: 'pink' | 'violet' | 'muted';
  stack: string[];
  actions: ProjectAction[];
};

export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  description: string;
  current?: boolean;
};

export type TimelineGroup = {
  year: string;
  items: TimelineItem[];
};

export type SocialItem = {
  icon:
    | 'github'
    | 'facebook'
    | 'messenger'
    | 'tiktok'
    | 'telegram'
    | 'mail'
    | 'discord'
    | 'zalo';
  label: string;
  description: string;
  href?: string;
  action?: 'zalo';
};

export const navItems: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'roadmap', label: 'AI Roadmap' },
  { id: 'connect', label: 'Connect' }
];

export const heroData = {
  title: 'Em Meow',
  subtitle: 'Code & Create',
  description:
    'Name: Meow-E.commerce , hiện là sinh viên IT đang học code, làm web, tools và thử nghiệm edit video TikTok với tinh thần làm thật, học thật.',
  chips: ['IT Student', 'E-commerce mindset', 'AI tools builder']
};

export const aboutData = {
  name: 'Meow',
  school:
    'Sinh viên IT năm 3 • Chuyên ngành Thương mại Điện tử - ĐHKT-KT Bình Dương (BETU) • K23',
  bullets: [
    'Mình là sinh viên IT, học và thực hành code mỗi ngày. Code, e-commerce hay edit video TikTok đều là cách để nâng kỹ năng thật.',
    'Ngoài kỹ thuật, mình cũng tìm hiểu thêm về kinh doanh để hiểu bài toán phía sau sản phẩm, không chỉ là code.',
    'Mình chưa phải expert, nhưng luôn làm việc nghiêm túc và tìm hiểu kỹ trước khi bắt đầu bất kỳ project nào.'
  ],
  meta: [
    { label: 'Track', value: 'IT + E-commerce' },
    { label: 'Focus', value: 'Web, AI tools, creator workflow' },
    { label: 'Tone', value: 'Nghiêm túc, rõ ràng, làm thật' }
  ]
};

export const skills: SkillItem[] = [
  {
    icon: 'code',
    title: 'Dev Code',
    description:
      'Có nền tảng C++, C#, HTML/CSS/JS, PHP, Kotlin, Java. Đang tập trung xây tools AI và áp dụng vào các project thực tế.',
    chips: ['C++', 'TypeScript', 'PHP', 'AI Tools']
  },
  {
    icon: 'store',
    title: 'E-commerce',
    description:
      'Đang tìm hiểu các nền tảng như Shopify và WooCommerce, từ setup cơ bản, theme customization tới tích hợp thanh toán.',
    chips: ['Shopify', 'WooCommerce', 'Payments']
  },
  {
    icon: 'video',
    title: 'TikTok Video Editing',
    description:
      'Mới bắt đầu với video editing, đã làm video âm nhạc cơ bản và đang học cách tạo hook, timing, subtitle và nhịp nội dung.',
    chips: ['Hook', 'Timing', 'Subtitle']
  }
];

export const projects: ProjectItem[] = [
  {
    icon: 'window',
    title: 'mieow-bio',
    description:
      'Trang bio/portfolio cá nhân dạng static website. Có sidebar điều hướng, hiệu ứng nền động, nhạc nền, custom cursor và hỗ trợ VI/EN/ZH.',
    status: 'Active',
    tone: 'pink',
    stack: ['HTML5', 'CSS3', 'Vanilla JS', 'Font Awesome'],
    actions: [{ label: 'Repo', href: 'https://github.com/EmBeHocCode/mieow-bio' }]
  },
  {
    icon: 'bot',
    title: 'Meow — Zalo AI Bot',
    description:
      'Chatbot AI đa năng cho Zalo với Gemini 2.5 Flash, 50+ tools qua 9 modules, streaming thời gian thực, long-term memory và dashboard quản lý.',
    status: 'Closed Source',
    tone: 'violet',
    stack: ['TypeScript', 'Bun', 'React 19', 'Next.js 16', 'Gemini AI', 'SQLite'],
    actions: [
      { label: 'README', href: 'https://github.com/EmBeHocCode/The-Bot-Demo/blob/main/README.md' },
      { label: 'License', href: 'https://github.com/EmBeHocCode/The-Bot-Demo/blob/main/LICENSE' }
    ]
  },
  {
    icon: 'book',
    title: 'MieowTruyenTranh',
    description:
      'Ứng dụng web PHP thuần cho cửa hàng truyện tranh trực tuyến với catalogue, giỏ hàng, đặt hàng, dashboard admin/staff và thanh toán VietQR + SePay.',
    status: 'Commerce',
    tone: 'muted',
    stack: ['PHP 7.4+', 'MySQL', 'Bootstrap 5', 'Docker', 'VietQR'],
    actions: [{ label: 'Repo', href: 'https://github.com/EmBeHocCode/MieowTruyenTranh' }]
  },
  {
    icon: 'scan',
    title: 'SnapTrans',
    description:
      'Công cụ Python dịch nhanh văn bản trên Windows. Chụp màn hình để trích xuất và dịch trực tiếp, hỗ trợ cả Offline OCR và Cloud OCR.',
    status: 'Utility',
    tone: 'muted',
    stack: ['Python', 'Tkinter', 'Google Vision', 'Tesseract OCR'],
    actions: [{ label: 'Repo', href: 'https://github.com/EmBeHocCode/SnapTrans' }]
  },
  {
    icon: 'bag',
    title: 'MieowMarket',
    description:
      'Nền tảng e-commerce với Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma và PostgreSQL. Bao gồm user/admin dashboard và luồng mua hàng.',
    status: 'Concept',
    tone: 'pink',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'Prisma', 'PostgreSQL'],
    actions: [{ label: 'Repo', href: 'https://github.com/EmBeHocCode/MieowMarket' }]
  },
  {
    icon: 'bag',
    title: 'Digital-Shop',
    description:
      'Marketplace dịch vụ số xây bằng Next.js App Router, kết hợp storefront public, product configuration flow, customer account tools, admin operations và nền Prisma/PostgreSQL sẵn cho payment, fulfillment, analytics và AI integration.',
    status: 'Active',
    tone: 'violet',
    stack: ['Next.js App Router', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Stripe'],
    actions: [
      { label: 'Repo', href: 'https://github.com/EmBeHocCode/Digital-Shop' },
      { label: 'README', href: 'https://github.com/EmBeHocCode/Digital-Shop#readme' }
    ]
  }
];

export const roadmap: TimelineGroup[] = [
  {
    year: '2026',
    items: [
      {
        id: '2026-t3',
        period: 'T3 · Hiện tại',
        title: 'Meow — Zalo AI Bot v1.2',
        description:
          'Gemini 2.5 Flash, streaming thời gian thực, 50+ tools, web dashboard quản lý, long-term memory và cloud backup tự động.',
        current: true
      },
      {
        id: '2026-t45',
        period: 'T4-T5',
        title: 'Hoàn thiện Bot Demo · Test & tài liệu',
        description:
          'Bổ sung test integration, chuẩn hóa codebase, tối ưu prompt persona và chuẩn bị cho user ngoài thử nghiệm.'
      },
      {
        id: '2026-t6',
        period: 'T6',
        title: 'Tool phân tích lợi nhuận (phase 1)',
        description:
          'Dashboard e-commerce cơ bản: nhập dữ liệu sản phẩm, tính lợi nhuận thực và visualize bằng biểu đồ đơn giản.'
      },
      {
        id: '2026-t78',
        period: 'T7-T8',
        title: 'Module tồn kho & cảnh báo nhập hàng',
        description:
          'AI dự báo ngưỡng tồn kho an toàn, gợi ý số lượng và thời điểm nhập hàng phù hợp.'
      },
      {
        id: '2026-t910',
        period: 'T9-T10',
        title: 'Tốt nghiệp BETU · Deploy thực tế',
        description:
          'Hoàn thành chương trình học, thử nghiệm tool với vài cửa hàng nhỏ và thu thập feedback thực tế.'
      },
      {
        id: '2026-t1112',
        period: 'T11-T12',
        title: 'Refactor · Chuẩn bị scale',
        description:
          'Tối ưu hiệu năng, tái cấu trúc monorepo và xây API layer cho tích hợp bên ngoài.'
      }
    ]
  },
  {
    year: '2027',
    items: [
      {
        id: '2027-t12',
        period: 'T1-T2',
        title: 'AI gợi ý nhập hàng từ lịch sử bán',
        description:
          'Dùng dữ liệu lịch sử để train model dự đoán xu hướng theo mùa vụ, sự kiện và hành vi người mua.'
      },
      {
        id: '2027-t34',
        period: 'T3-T4',
        title: 'Tích hợp Shopify / WooCommerce API',
        description:
          'Kết nối với nền tảng e-commerce, đồng bộ đơn hàng, tồn kho và sản phẩm theo thời gian thực.'
      },
      {
        id: '2027-t56',
        period: 'T5-T6',
        title: 'Beta launch AI Business Advisor',
        description:
          'Mở beta cho doanh nghiệp nhỏ, thu thập feedback, đo ROI thực tế và cải thiện liên tục.'
      },
      {
        id: '2027-t79',
        period: 'T7-T9',
        title: 'Mở rộng sang B2B nhỏ lẻ',
        description:
          'Gói subscription, onboarding tự động và hỗ trợ khách hàng theo từng ngành hàng.'
      },
      {
        id: '2027-t1012',
        period: 'T10-T12',
        title: 'V2.0 · AI Commerce Platform',
        description:
          'Nền tảng tổng hợp: lợi nhuận, tồn kho, dự báo xu hướng và AI advisor trong một sản phẩm SaaS.'
      }
    ]
  }
];

export const businessConcept = {
  title: 'AI Business Tools (Concept)',
  subtitle: 'Ý tưởng công cụ AI cho doanh nghiệp',
  description:
    'Công cụ AI hỗ trợ doanh nghiệp tối ưu tồn kho, phân tích lợi nhuận thực tế và dự báo xu hướng thị trường.',
  chips: ['Inventory signal', 'Profit analytics', 'Trend forecast']
};

export const socials: SocialItem[] = [
  {
    icon: 'github',
    label: 'GitHub',
    description: 'Xem source code và các project đang làm.',
    href: 'https://github.com/EmBeHocCode'
  },
  {
    icon: 'facebook',
    label: 'Facebook',
    description: 'Kết nối cá nhân và cập nhật hoạt động.',
    href: 'https://www.facebook.com/hungng.0505/'
  },
  {
    icon: 'messenger',
    label: 'Messenger',
    description: 'Nhắn nhanh để trao đổi công việc.',
    href: 'https://www.messenger.com/t/100056897048422/'
  },
  {
    icon: 'telegram',
    label: 'Telegram',
    description: 'Trao đổi trực tiếp, gọn và nhanh.',
    href: 'https://t.me/embidev005'
  },
  {
    icon: 'mail',
    label: 'Email',
    description: 'Kênh phù hợp cho brief và trao đổi rõ ràng.',
    href: 'mailto:mieowshopsite@gmail.com'
  },
  {
    icon: 'tiktok',
    label: 'TikTok',
    description: 'Nơi mình thử nghiệm video và nhịp nội dung.',
    href: 'https://tiktok.com/@00bidev00'
  },
  {
    icon: 'discord',
    label: 'Discord',
    description: 'Trao đổi nhanh trên Discord. Username: embi_dev.',
    href: 'https://discord.com/app'
  },
  {
    icon: 'zalo',
    label: 'Zalo',
    description: 'Quét QR để nhắn tin trực tiếp trên Zalo.',
    action: 'zalo'
  }
];

export const ctaActions = [
  { label: 'Email', href: 'mailto:mieowshopsite@gmail.com', icon: 'mail' as const },
  { label: 'Telegram', href: 'https://t.me/embidev005', icon: 'telegram' as const },
  { label: 'Facebook', href: 'https://www.facebook.com/hungng.0505/', icon: 'facebook' as const },
  { label: 'Messenger', href: 'https://m.me/hungng.0505', icon: 'messenger' as const },
  { label: 'Zalo', action: 'zalo' as const, icon: 'zalo' as const }
];

export const footerData = {
  made: 'Được tạo ra với đam mê và code',
  quote: '"Code là thơ, thiết kế là nghệ thuật, cùng nhau tạo nên điều kỳ diệu."'
};
