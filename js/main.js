/* ============================================
   MAIN.JS - JavaScript Functionality
   ============================================
   Features: Theme toggle, Language switcher, Smooth scroll, Animations
   ============================================ */

// ============================================
// Translations Data
// ============================================
const translations = {
  vi: {
    // Hero Section
    'hero.title': 'Code & Create',
    'hero.tagline': 'Sinh viên IT đang học code, làm web, tools, và thử nghiệm edit video TikTok.',
    'hero.cta1': 'Nhận dự án',
    'hero.cta2': 'Xem projects',
    
    // About Section
    'about.title': 'Về tôi',
    'about.name': 'Nguyễn Lâm Hùng',
    'about.school': 'Sinh viên IT năm 3 • Chuyên ngành Thương mại Điện tử - ĐHKT-KT Bình Dương (BETU) • K23',
    'about.text1': 'Mình là sinh viên IT, học và thực hành code mỗi ngày. Code, e-commerce hay edit video TikTok – mình đều làm để học thật và nâng kỹ năng thật.',
    'about.text2': 'Ngoài kỹ thuật, mình cũng tìm hiểu thêm về kinh doanh để hiểu bài toán phía sau một sản phẩm, không chỉ là code.',
    'about.text3': 'Mình chưa phải expert, nhưng luôn làm việc nghiêm túc và tìm hiểu kỹ trước khi bắt đầu bất kỳ project nào.',
    
    // Services Section
    'services.title': 'Kỹ năng',
    'services.subtitle': '3 mảng mình đang học',
    'services.dev.title': 'Dev Code',
    'services.dev.desc': 'Có nền tảng code C++, C#, HTML/CSS/JS, PHP, Kotlin, Java. Thành thạo tạo công cụ AI và đang áp dụng vào các project thực tế.',
    'services.ecom.title': 'E-commerce',
    'services.ecom.desc': 'Đang tìm hiểu về e-commerce platforms như Shopify và WooCommerce. Setup cơ bản, theme customization và tích hợp thanh toán.',
    'services.tiktok.title': 'TikTok Video Editing',
    'services.tiktok.desc': 'Mới bắt đầu với video editing, đã làm 3 video âm nhạc cơ bản trên TikTok. Đang học cách tạo hook, timing và subtitle.',
    
    // AI Roadmap Section
    'ai.roadmap.title': 'Lộ trình AI cho Thương mại điện tử',
    'ai.roadmap.subtitle': 'Chi tiết theo tháng · 2026–2027',
    'ai.roadmap.phase1.year': '2026 – Nền tảng',
    'ai.roadmap.phase1.desc': 'Xây tool phân tích lợi nhuận và dashboard cơ bản.',
    'ai.roadmap.phase2.year': '2027–2028 – Phát triển',
    'ai.roadmap.phase2.desc': 'Tích hợp dự đoán tồn kho và AI gợi ý nhập hàng.',
    'ai.roadmap.phase3.year': '2029+ – Mở rộng',
    'ai.roadmap.phase3.desc': 'Phát triển AI Business Advisor theo mô hình SaaS.',

    // Timeline accordion – 2026
    'ai.tl.26.t3.badge':  '● T3 · Hiện tại',
    'ai.tl.26.t3.title':  'Meow — Zalo AI Bot v1.2',
    'ai.tl.26.t3.desc':   'Gemini 2.5 Flash, streaming thời gian thực, 50+ tools, web dashboard quản lý, long-term memory và cloud backup tự động.',
    'ai.tl.26.t45.title': 'Hoàn thiện Bot Demo · Test & tài liệu',
    'ai.tl.26.t45.desc':  'Bổ sung test integration, chuẩn hóa codebase, tối ưu prompt persona, chuẩn bị cho user ngoài thử nghiệm.',
    'ai.tl.26.t6.title':  'Tool phân tích lợi nhuận (phase 1)',
    'ai.tl.26.t6.desc':   'Dashboard e-commerce cơ bản: nhập dữ liệu sản phẩm, tính lợi nhuận thực, visualize theo biểu đồ đơn giản.',
    'ai.tl.26.t78.title': 'Module tồn kho & cảnh báo nhập hàng',
    'ai.tl.26.t78.desc':  'AI dự báo ngưỡng tồn kho an toàn, tự động gợi ý số lượng và thời điểm nhập hàng phù hợp.',
    'ai.tl.26.t910.title':'Tốt nghiệp BETU · Deploy thực tế',
    'ai.tl.26.t910.desc': 'Hoàn thành chương trình học, thử nghiệm tool với vài cửa hàng nhỏ, thu thập feedback thực tế.',
    'ai.tl.26.t1112.title':'Refactor · Chuẩn bị scale',
    'ai.tl.26.t1112.desc': 'Tối ưu hiệu năng, tái cấu trúc monorepo, xây API layer cho tích hợp bên ngoài.',

    // Timeline accordion – 2027
    'ai.tl.27.t12.title': 'AI gợi ý nhập hàng từ lịch sử bán',
    'ai.tl.27.t12.desc':  'Dùng dữ liệu lịch sử để train model dự đoán xu hướng theo mùa vụ, sự kiện và hành vi người mua.',
    'ai.tl.27.t34.title': 'Tích hợp Shopify / WooCommerce API',
    'ai.tl.27.t34.desc':  'Kết nối với nền tảng e-commerce, đồng bộ tự động đơn hàng, tồn kho và sản phẩm theo thời gian thực.',
    'ai.tl.27.t56.title': 'Beta launch AI Business Advisor',
    'ai.tl.27.t56.desc':  'Mở beta cho doanh nghiệp nhỏ, thu thập feedback, đo ROI thực tế và cải thiện liên tục.',
    'ai.tl.27.t79.title': 'Mở rộng sang B2B nhỏ lẻ',
    'ai.tl.27.t79.desc':  'Gói subscription, onboarding tự động, hỗ trợ khách hàng theo từng ngành hàng.',
    'ai.tl.27.t1012.title':'V2.0 · AI Commerce Platform',
    'ai.tl.27.t1012.desc': 'Nền tảng tổng hợp: lợi nhuận, tồn kho, dự báo xu hướng và AI advisor trong một sản phẩm SaaS.',

    // AI Product Concept Section
    'ai.concept.title': 'AI Business Tools (Concept)',
    'ai.concept.subtitle': 'Ý tưởng công cụ AI cho doanh nghiệp',
    'ai.concept.desc': 'Công cụ AI hỗ trợ doanh nghiệp tối ưu tồn kho, phân tích lợi nhuận thực tế và dự báo xu hướng thị trường.',
    
    // Projects Section
    'projects.title': 'Dự án tiêu biểu',
    'projects.subtitle': 'Case samples thực tế',
    'projects.case1.title': 'SnapTrans',
    'projects.case1.desc': 'Ứng dụng Python dịch nhanh văn bản từ ảnh chụp màn hình. Sử dụng OCR và API dịch thuật để xử lý nhanh chóng.',
    'projects.case2.title': 'Mieow Paradise',
    'projects.case2.desc': 'Website đọc truyện online với giao diện thân thiện, tốc độ tải nhanh. Tích hợp quản lý nội dung và tìm kiếm thông minh.',
    'projects.empty.main': 'Chưa có dự án được thêm vào',
    'projects.empty.sub': 'Projects coming soon...',

    // Featured projects (3 cái mới)
    'projects.p1.desc': 'Trang bio/portfolio cá nhân dạng static website. Có sidebar điều hướng, hiệu ứng nền động, nhạc nền, custom cursor và hỗ trợ chuyển đổi ngôn ngữ VI/EN/ZH.',
    'projects.p1.btn': 'Xem repo',
    'projects.p2.desc': 'Chatbot AI đa năng cho Zalo. Gemini 2.5 Flash, streaming thời gian thực, 50+ tools qua 9 modules, long-term memory và web dashboard quản lý.',
    'projects.p3.desc': 'Ứng dụng web PHP thuần cho cửa hàng truyện tranh trực tuyến. Catalogue sản phẩm, giỏ hàng, đặt hàng, dashboard admin/staff và thanh toán VietQR + SePay.',
    'projects.p3.btn': 'Xem repo',
    'projects.p4.desc': 'Công cụ Python dịch nhanh văn bản trên Windows. Chụp màn hình để trích xuất và dịch trực tiếp. Hỗ trợ Offline OCR (Tesseract) và Cloud OCR (Google Vision) độ chính xác cao.',
    'projects.p4.btn': 'Xem repo',

    // GitHub Profile Section
    'github.title': '🐱 GitHub Profile',
    'github.subtitle': 'Hồ sơ lập trình của tôi',
    'github.nav': 'GitHub',
    'github.stats.label': 'Thống kê GitHub',
    'github.loading': 'Đang tải nội dung từ GitHub...',
    'github.error': 'Không tải được README.',
    'github.error.link': 'Xem trực tiếp trên GitHub →',
    
    // Links Section
    'links.title': 'Kết nối',
    'links.subtitle': 'Tìm mình trên các nền tảng sau',
    
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.about': 'Về tôi',
    'nav.projects': 'Dự án',
    'nav.ai': 'Tầm nhìn AI',
    'nav.links': 'Liên kết',
    'nav.contact': 'Liên hệ',
    'nav.settings': 'Cài đặt',
    
    // Settings
    'settings.title': 'Cài đặt',
    'settings.language': 'Ngôn ngữ',
    'settings.theme': 'Giao diện',
    'settings.darkMode': 'Chế độ tối',
    'settings.cursor': 'Con trỏ',
    'settings.enableCursor': 'Bật con trỏ tùy chỉnh',
    'settings.effects': 'Hiệu ứng',
    'settings.enableEffects': 'Bật hiệu ứng hạt',
    'settings.note': 'Cài đặt được lưu tự động',
    
    // About Page
    'about.bio.title': 'Giới thiệu',
    'about.bio.text': 'Xin chào! Mình là một developer đam mê học hỏi và tạo ra những sản phẩm có ý nghĩa. Từ code đến thiết kế, mình luôn cố gắng học thật kỹ và làm thật tốt.',
    'about.journey.title': 'Hành trình',
    'about.journey.2024': 'Bắt đầu tìm hiểu về web development và các công nghệ hiện đại',
    'about.journey.2025': 'Mở rộng sang e-commerce và tích hợp AI vào các dự án',
    'about.journey.2026': 'Tiếp tục học hỏi và phát triển các dự án mới',
    'about.interests.title': 'Sở thích',
    'about.interests.coding': 'Coding & Development',
    'about.interests.video': 'Video Editing',
    'about.interests.music': 'Music & Creative Arts',
    'about.interests.learning': 'Learning New Technologies',
    
    // Projects Page
    'projects.page.title': 'Dự án của tôi',
    'projects.page.subtitle': 'Khám phá những dự án tôi đã và đang thực hiện',
    
    // Contact Page
    'contact.title': 'Liên hệ',
    'contact.subtitle': 'Hãy kết nối với tôi qua các kênh sau',
    'contact.email.title': 'Email',
    'contact.email.desc': 'Gửi email cho tôi, tôi sẽ phản hồi sớm nhất',
    'contact.telegram.title': 'Telegram',
    'contact.telegram.desc': 'Chat trực tiếp với tôi trên Telegram',
    'contact.zalo.title': 'Zalo',
    'contact.zalo.desc': 'Kết nối qua Zalo để trao đổi nhanh hơn',
    'contact.github.title': 'GitHub',
    'contact.github.desc': 'Xem source code và dự án của tôi',
    'contact.social.title': 'Hoặc kết nối qua',
    
    // CTA Section
    'cta.title': 'Sẵn sàng bắt đầu dự án?',
    'cta.text': 'Liên hệ mình qua các phương thức – mình rep nhanh và làm việc rõ ràng.',
    'cta.email': 'Email',
    'cta.telegram': 'Telegram',
    'cta.facebook': 'Facebook',
    'cta.messenger': 'Messenger',
    'cta.zalo': 'Zalo',
    
    // Modal
    'modal.zalo.title': 'Quét mã Zalo để nhắn tin',
    'modal.zalo.text': 'Mở ứng dụng Zalo và quét mã QR để kết nối',
    
    // Footer
    'footer.made': 'Được tạo ra với đam mê và code',
    'footer.quote': '"Code là thơ, thiết kế là nghệ thuật, cùng nhau tạo nên điều kỳ diệu."'
  },
  en: {
    // Hero Section
    'hero.title': 'Developer & Creator',
    'hero.tagline': 'IT student learning to code, build websites, and experimenting with TikTok video editing.',
    'hero.cta1': 'Contact for Work',
    'hero.cta2': 'View Projects',
    
    // About Section
    'about.title': 'About Me',
    'about.name': 'Nguyen Lam Hung',
    'about.school': '3rd Year IT Student • E-commerce Major - Binh Duong Economics & Technology University (BETU) • Class of 2027',
    'about.text1': 'I\'m an IT student, learning and practicing code every day. Web development, e-commerce, or TikTok video editing – I do them all to genuinely learn and improve my skills.',
    'about.text2': 'Beyond technical skills, I also explore business concepts to understand the problems behind a product, not just the code.',
    'about.text3': 'I\'m not an expert yet, but I always work seriously and research thoroughly before starting any project.',
    
    // Services Section
    'services.title': 'Skills',
    'services.subtitle': '3 areas I\'m learning',
    'services.dev.title': 'Web Development',
    'services.dev.desc': 'Foundation in C++, C#, HTML/CSS/JS, PHP, Kotlin, Java. Skilled at building AI tools and applying them to real projects.',
    'services.ecom.title': 'E-commerce Solutions',
    'services.ecom.desc': 'Learning about e-commerce platforms like Shopify and WooCommerce. Basic setup, theme customization, and payment integration.',
    'services.tiktok.title': 'TikTok Video Editing',
    'services.tiktok.desc': 'Just started with video editing, made 3 basic music videos on TikTok. Learning how to create hooks, timing, and subtitles.',
    
    // AI Roadmap Section
    'ai.roadmap.title': 'AI Roadmap for E-commerce',
    'ai.roadmap.subtitle': 'Monthly milestones · 2026–2027',
    'ai.roadmap.phase1.year': '2026 – Foundation',
    'ai.roadmap.phase1.desc': 'Build profit analysis tools and basic dashboard.',
    'ai.roadmap.phase2.year': '2027–2028 – Growth',
    'ai.roadmap.phase2.desc': 'Integrate inventory prediction and AI restock suggestions.',
    'ai.roadmap.phase3.year': '2029+ – Scale',
    'ai.roadmap.phase3.desc': 'Develop AI Business Advisor as SaaS platform.',

    // Timeline accordion – 2026
    'ai.tl.26.t3.badge':  '● T3 · Current',
    'ai.tl.26.t3.title':  'Meow — Zalo AI Bot v1.2',
    'ai.tl.26.t3.desc':   'Gemini 2.5 Flash, real-time streaming, 50+ tools, management web dashboard, long-term memory and automatic cloud backup.',
    'ai.tl.26.t45.title': 'Finalize Bot Demo · Testing & Docs',
    'ai.tl.26.t45.desc':  'Add integration tests, standardize codebase, optimize prompt persona, prepare for external user trials.',
    'ai.tl.26.t6.title':  'Profit Analysis Tool (Phase 1)',
    'ai.tl.26.t6.desc':   'Basic e-commerce dashboard: input product data, calculate actual profit, visualize with simple charts.',
    'ai.tl.26.t78.title': 'Inventory Module & Restock Alerts',
    'ai.tl.26.t78.desc':  'AI predicts safe stock thresholds and automatically suggests restock quantities and optimal timing.',
    'ai.tl.26.t910.title':'BETU Graduation · Real-world Deploy',
    'ai.tl.26.t910.desc': 'Complete academic program, pilot the tool with small stores, collect real-world feedback.',
    'ai.tl.26.t1112.title':'Refactor · Prepare to Scale',
    'ai.tl.26.t1112.desc': 'Optimize performance, restructure as monorepo, build API layer for external integrations.',

    // Timeline accordion – 2027
    'ai.tl.27.t12.title': 'AI Restock Suggestions from Sales History',
    'ai.tl.27.t12.desc':  'Use historical data to train a model predicting trends based on seasons, events and buyer behavior.',
    'ai.tl.27.t34.title': 'Shopify / WooCommerce API Integration',
    'ai.tl.27.t34.desc':  'Connect with e-commerce platforms to automatically sync orders, inventory and products in real time.',
    'ai.tl.27.t56.title': 'Beta Launch: AI Business Advisor',
    'ai.tl.27.t56.desc':  'Open beta for small businesses, collect feedback, measure real ROI and improve continuously.',
    'ai.tl.27.t79.title': 'Expand to Small B2B',
    'ai.tl.27.t79.desc':  'Build subscription tiers, automated onboarding, customer support per industry segment.',
    'ai.tl.27.t1012.title':'V2.0 · Full AI Commerce Platform',
    'ai.tl.27.t1012.desc': 'Integrated platform: profit analysis, inventory management, trend forecasting and AI advisor in one SaaS product.',

    // AI Product Concept Section
    'ai.concept.title': 'AI Business Tools (Concept)',
    'ai.concept.subtitle': 'AI tool concept for businesses',
    'ai.concept.desc': 'AI tools to optimize inventory, analyze real profit and predict market trends.',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Real case samples',
    'projects.case1.title': 'SnapTrans',
    'projects.case1.desc': 'Python app for quick text translation from screenshots. Uses OCR and translation API for fast processing.',
    'projects.case2.title': 'Mieow Paradise',
    'projects.case2.desc': 'Online reading website with user-friendly interface and fast loading. Integrated content management and smart search.',
    'projects.empty.main': 'No projects added yet',
    'projects.empty.sub': 'Projects coming soon...',

    // Featured projects
    'projects.p1.desc': 'Personal bio/portfolio as a static website. Sidebar navigation, dynamic background effects, background music, custom cursor and multilingual support (VI/EN/ZH).',
    'projects.p1.btn': 'View repo',
    'projects.p2.desc': 'Versatile AI chatbot for Zalo. Gemini 2.5 Flash, real-time streaming, 50+ tools across 9 modules, long-term memory and management web dashboard.',
    'projects.p2.btn': 'README',
    'projects.p3.desc': 'Pure PHP web app for an online comic book store. Product catalogue, cart, ordering, admin/staff dashboard and VietQR + SePay payment.',
    'projects.p3.btn': 'View repo',
    'projects.p4.desc': 'Lightweight Python translation app for Windows. Capture screenshots to extract and translate text directly. Supports Offline OCR (Tesseract) and high-accuracy Cloud OCR (Google Vision).',
    'projects.p4.btn': 'View repo',


    // GitHub Profile Section
    'github.title': '🐱 GitHub Profile',
    'github.subtitle': 'My coding profile',
    'github.nav': 'GitHub',
    'github.stats.label': 'GitHub Stats',
    'github.loading': 'Loading content from GitHub...',
    'github.error': 'Could not load README.',
    'github.error.link': 'View directly on GitHub →',
    
    // Links Section
    'links.title': 'Connect',
    'links.subtitle': 'Find me on these platforms',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.ai': 'AI Vision',
    'nav.links': 'Links',
    'nav.contact': 'Contact',
    'nav.settings': 'Settings',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.darkMode': 'Dark Mode',
    'settings.cursor': 'Custom Cursor',
    'settings.enableCursor': 'Enable Custom Cursor',
    'settings.effects': 'Background Effects',
    'settings.enableEffects': 'Enable Particles',
    'settings.note': 'Settings are saved automatically',
    
    // About Page
    'about.bio.title': 'Introduction',
    'about.bio.text': 'Hello! I\'m a developer passionate about learning and creating meaningful products. From code to design, I always strive to learn thoroughly and do well.',
    'about.journey.title': 'Journey',
    'about.journey.2024': 'Started exploring web development and modern technologies',
    'about.journey.2025': 'Expanding to e-commerce and integrating AI into projects',
    'about.journey.2026': 'Continue learning and developing new projects',
    'about.interests.title': 'Interests',
    'about.interests.coding': 'Coding & Development',
    'about.interests.video': 'Video Editing',
    'about.interests.music': 'Music & Creative Arts',
    'about.interests.learning': 'Learning New Technologies',
    
    // Projects Page
    'projects.page.title': 'My Projects',
    'projects.page.subtitle': 'Explore the projects I have built and am working on',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Connect with me through these channels',
    'contact.email.title': 'Email',
    'contact.email.desc': 'Send me an email, I\'ll respond as soon as possible',
    'contact.telegram.title': 'Telegram',
    'contact.telegram.desc': 'Chat directly with me on Telegram',
    'contact.zalo.title': 'Zalo',
    'contact.zalo.desc': 'Connect via Zalo for faster communication',
    'contact.github.title': 'GitHub',
    'contact.github.desc': 'View my source code and projects',
    'contact.social.title': 'Or connect via',
    
    // CTA Section
    'cta.title': 'Ready to start your project?',
    'cta.text': 'Reach out via any method – I respond fast and work transparently.',
    'cta.email': 'Email',
    'cta.telegram': 'Telegram',
    'cta.facebook': 'Facebook',
    'cta.messenger': 'Messenger',
    'cta.zalo': 'Zalo',
    
    // Modal
    'modal.zalo.title': 'Scan Zalo QR to Chat',
    'modal.zalo.text': 'Open Zalo app and scan this QR code to connect',
    
    // Footer
    'footer.made': 'Made with passion and code',
    'footer.quote': '"Code is poetry, design is art, together they create magic."'
  },
  zh: {
    // Hero Section
    'hero.title': '开发者与创作者',
    'hero.tagline': 'IT学生，正在学习编程、制作网站和尝试TikTok视频剪辑。',
    'hero.cta1': '联系合作',
    'hero.cta2': '查看项目',
    
    // About Section
    'about.title': '关于我',
    'about.name': '阮林雄',
    'about.school': 'IT三年级学生 • 电子商务专业 - 平阳经济技术大学 (BETU) • 2023级',
    'about.text1': '我是IT学生，每天学习和实践编程。网站开发、电商，还是TikTok视频剪辑——做这些都是为了真正学习和提升技能。',
    'about.text2': '除了技术，我也研究商业知识，以理解产品背后的问题，不仅仅是代码。',
    'about.text3': '我还不是专家，但总是认真工作，在开始任何项目前都会充分研究。',
    
    // Services Section
    'services.title': '技能',
    'services.subtitle': '正在学习的3个领域',
    'services.dev.title': '网站开发',
    'services.dev.desc': '掌握C++、C#、HTML/CSS/JS、PHP、Kotlin、Java编程基础。擅长构建AI工具并应用于实际项目。',
    'services.ecom.title': '电商解决方案',
    'services.ecom.desc': '学习Shopify和WooCommerce等电商平台。基础设置、主题定制和支付集成。',
    'services.tiktok.title': 'TikTok视频剪辑',
    'services.tiktok.desc': '刚开始学习视频剪辑，已制作3个基础音乐视频。正在学习如何创建hook、时间掌揧和字幕。',
    
    // GitHub Profile Section
    'github.title': '🐱 GitHub 主页',
    'github.subtitle': '我的编程主页',
    'github.nav': 'GitHub',
    'github.stats.label': 'GitHub 统计',
    'github.loading': '正在从GitHub加载内容...',
    'github.error': '无法加载README。',
    'github.error.link': '直接在GitHub查看 →',
    
    // Navigation
    'nav.home': '主页',
    'nav.about': '关于',
    'nav.projects': '项目',
    'nav.ai': 'AI愿景',
    'nav.links': '链接',
    'nav.contact': '联系',
    'nav.settings': '设置',
    
    // Settings
    'settings.title': '设置',
    'settings.language': '语言',
    'settings.theme': '主题',
    'settings.darkMode': '深色模式',
    'settings.cursor': '自定义光标',
    'settings.enableCursor': '启用自定义光标',
    'settings.effects': '背景效果',
    'settings.enableEffects': '启用粒子效果',
    'settings.note': '设置会自动保存',
    
    // Services Section
    'services.title': '技能',
    'services.subtitle': '正在学习的3个领域',
    'services.dev.title': '网站开发',
    'services.dev.desc': '掌握C++、C#、HTML/CSS/JS、PHP、Kotlin、Java编程基础。擅长构建AI工具并应用于实际项目。',
    'services.ecom.title': '电商解决方案',
    'services.ecom.desc': '学习Shopify和WooCommerce等电商平台。基础设置、主题定制和支付集成。',
    'services.tiktok.title': 'TikTok视频剪辑',
    'services.tiktok.desc': '刚开始学习视频剪辑，已制作3个基础音乐视频。正在学习如何创建hook、时间掌揧和字幕。',
    
    // AI Roadmap Section
    'ai.roadmap.title': '电商AI发展路线',
    'ai.roadmap.subtitle': '按月详细计划 · 2026–2027',
    'ai.roadmap.phase1.year': '2026 – 基础阶段',
    'ai.roadmap.phase1.desc': '构建利润分析工具和基础仪表板。',
    'ai.roadmap.phase2.year': '2027–2028 – 成长阶段',
    'ai.roadmap.phase2.desc': '整合库存预测和AI补货建议。',
    'ai.roadmap.phase3.year': '2029+ – 扩展阶段',
    'ai.roadmap.phase3.desc': '开发AI商业顾问SaaS平台。',

    // Timeline accordion – 2026
    'ai.tl.26.t3.badge':  '● T3 · 当前',
    'ai.tl.26.t3.title':  'Meow — Zalo AI 机器人 v1.2',
    'ai.tl.26.t3.desc':   'Gemini 2.5 Flash，实时流式响应，50+工具，Web管理仪表板，长期记忆和自动云备份。',
    'ai.tl.26.t45.title': '完善Bot Demo · 测试与文档',
    'ai.tl.26.t45.desc':  '添加集成测试，规范代码库，优化提示词人设，为外部用户试用做准备。',
    'ai.tl.26.t6.title':  '利润分析工具（第一阶段）',
    'ai.tl.26.t6.desc':   '基础电商仪表板：录入商品数据，计算实际利润，通过简单图表可视化呈现。',
    'ai.tl.26.t78.title': '库存模块与补货提醒',
    'ai.tl.26.t78.desc':  'AI预测安全库存阈値，自动建议补货数量和最佳时机。',
    'ai.tl.26.t910.title':'BETU毕业（预计）· 实际部署',
    'ai.tl.26.t910.desc': '完成学业，开始与小型店铺试用工具，收集真实反馈。',
    'ai.tl.26.t1112.title':'重构 · 准备扩展',
    'ai.tl.26.t1112.desc': '优化性能，改造为单体仓库结构，构建对外集成API层。',

    // Timeline accordion – 2027
    'ai.tl.27.t12.title': 'AI根据销售历史推荐补货',
    'ai.tl.27.t12.desc':  '利用历史数据训练模型，预测基于季节、节日和买家行为的销售趋势。',
    'ai.tl.27.t34.title': '接入Shopify / WooCommerce API',
    'ai.tl.27.t34.desc':  '直连电商平台，自动同步订单、库存和商品数据。',
    'ai.tl.27.t56.title': 'AI商业顾问 Beta上线',
    'ai.tl.27.t56.desc':  '向小型企业开放测试，收集反馈，衡量实际ROI并持续迭代。',
    'ai.tl.27.t79.title': '拓展至小型B2B',
    'ai.tl.27.t79.desc':  '构建订阅套餐，自动化引导，按行业提供客户支持。',
    'ai.tl.27.t1012.title':'V2.0 · 全功能AI商业平台',
    'ai.tl.27.t1012.desc': '综合平台：利润分析、库存管理、趋势预测与AI顾问集成于一款SaaS产品。',

    // AI Product Concept Section
    'ai.concept.title': 'AI商业工具（概念）',
    'ai.concept.subtitle': '商业AI工具概念',
    'ai.concept.desc': '利用AI优化库存、分析真实利润并预测市场趋势。',
    
    // Projects Section
    'projects.title': '代表项目',
    'projects.subtitle': '真实案例',
    'projects.case1.title': 'SnapTrans',
    'projects.case1.desc': 'Python截图文本快速翻译应用。使用OCR和翻译API快速处理。',
    'projects.case2.title': 'Mieow Paradise',
    'projects.case2.desc': '在线阅读网站，界面友好，加载快速。集成内容管理和智能搜索。',
    'projects.empty.main': '暂无项目',
    'projects.empty.sub': '即将推出...',

    // Featured projects
    'projects.p1.desc': '个人简介/作品集静态网站。包括侧边栏导航、动态背景效果、背景音乐、自定义光标和多语言支持（VI/EN/ZH）。',
    'projects.p1.btn': '查看仓库',
    'projects.p2.desc': 'Zalo多功能AI聊天机器人。Gemini 2.5 Flash，实时流式响应，50+工具，9个模块，长期记忆和Web管理仪表板。',
    'projects.p2.btn': 'README',
    'projects.p3.desc': '纸本书店纯 PHP网页应用。商品目录、购物车、下单、管理员/员工仪表板及VietQR + SePay支付。',
    'projects.p3.btn': '查看仓库',
    'projects.p4.desc': 'Windows轻量级Python翻译工具。截图直接提取并翻译文本。支持离线OCR (Tesseract) 和高精度云端OCR (Google Vision)。',
    'projects.p4.btn': '查看仓库',

    // Links Section
    'links.title': '联系方式',
    'links.subtitle': '在这些平台找到我',
    
    // About Page
    'about.bio.title': '简介',
    'about.bio.text': '你好！我是一位热爱学习和创造有意义产品的开发者。从代码到设计，我总是努力学透学好。',
    'about.journey.title': '旅程',
    'about.journey.2024': '开始探索网站开发和现代技术',
    'about.journey.2025': '扩展到电商并将AI集成到项目中',
    'about.journey.2026': '继续学习和开发新项目',
    'about.interests.title': '兴趣爱好',
    'about.interests.coding': '编程与开发',
    'about.interests.video': '视频剪辑',
    'about.interests.music': '音乐与创意艺术',
    'about.interests.learning': '学习新技术',
    
    // Projects Page
    'projects.page.title': '我的项目',
    'projects.page.subtitle': '探索我已完成和正在进行的项目',
    
    // Contact Page
    'contact.title': '联系我',
    'contact.subtitle': '通过以下渠道与我联系',
    'contact.email.title': '电子邮件',
    'contact.email.desc': '给我发邮件，我会尽快回复',
    'contact.telegram.title': 'Telegram',
    'contact.telegram.desc': '在Telegram上直接与我聊天',
    'contact.zalo.title': 'Zalo',
    'contact.zalo.desc': '通过Zalo联系以获得更快的沟通',
    'contact.github.title': 'GitHub',
    'contact.github.desc': '查看我的源代码和项目',
    'contact.social.title': '或通过以下方式联系',
    
    // CTA Section
    'cta.title': '准备启动项目？',
    'cta.text': '通过任何方式联系我——响应迅速、合作透明。',
    'cta.email': '邮箱',
    'cta.telegram': 'Telegram',
    'cta.facebook': 'Facebook',
    'cta.messenger': 'Messenger',
    'cta.zalo': 'Zalo',
    
    // Modal
    'modal.zalo.title': '扫描Zalo二维码聊天',
    'modal.zalo.text': '打开Zalo应用扫描此二维码进行连接',
    
    // Footer
    'footer.made': '用热情和代码制作',
    'footer.quote': '"代码是诗歌，设计是艺术，它们共同创造魔法。"'
  }
};

// ============================================
// DOM Content Loaded - Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Bio website loaded successfully!');
  
  // Initialize features when DOM is ready
  initThemeToggle();
  initLanguageSwitcher();
  initSmoothScroll();
  initAnimations();
  initMusicPlayer();
  initZaloModal();
  initCursor();
});


// ============================================
// Smooth Scroll for Navigation Links
// ============================================
function initSmoothScroll() {
  // Select all links with href starting with #
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Skip if it's just "#"
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset based on screen size
        const isMobile = window.innerWidth <= 480;
        const isTablet = window.innerWidth <= 768;
        const offset = isMobile ? 160 : (isTablet ? 140 : 120);
        
        // Get element position
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        // Scroll to position with offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Intersection Observer for Animations
// ============================================
function initAnimations() {
  // Check if browser supports IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver not supported');
    return;
  }
  
  // Observer options
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Callback when element comes into view
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // Unobserve after animation (optional)
        // observer.unobserve(entry.target);
      }
    });
  };
  
  // Create observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Observe sections (currently commented out to avoid auto-animation)
  // Uncomment to enable fade-in animations:
  /*
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    observer.observe(section);
  });
  */
}

// ============================================
// Theme Toggle (Dark/Light Mode)
// ============================================
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Get saved theme or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  if (themeToggle) {
    // Handle both checkbox (Settings) and button (legacy) types
    if (themeToggle.type === 'checkbox') {
      // Checkbox in Settings modal - handle 'change' event
      themeToggle.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    } else {
      // Legacy button with click event
      themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
      });
    }
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Update checkbox state if it's a checkbox (Settings modal)
    if (themeToggle.type === 'checkbox') {
      themeToggle.checked = theme === 'dark';
    } else {
      // Legacy button with icon (if exists)
      const icon = themeToggle.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fas fa-moon';
        } else {
          icon.className = 'fas fa-sun';
        }
      }
    }
  }
}

// ============================================
// Language Switcher
// ============================================
function initLanguageSwitcher() {
  const langToggle = document.getElementById('lang-toggle');
  const langMenu = document.getElementById('lang-menu');
  const langOptions = document.querySelectorAll('.lang-option');
  const currentLangSpan = document.getElementById('current-lang');
  
  // Get saved language or default to Vietnamese
  const currentLang = localStorage.getItem('language') || 'vi';
  setLanguage(currentLang);
  
  // Toggle language menu
  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('active');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.remove('active');
    }
  });
  
  // Language option click
  langOptions.forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-lang');
      setLanguage(lang);
      langMenu.classList.remove('active');
    });
  });
}

function setLanguage(lang) {
  // Save to localStorage
  localStorage.setItem('language', lang);
  
  // Update current language display
  const currentLangSpan = document.getElementById('current-lang');
  if (currentLangSpan) {
    currentLangSpan.textContent = lang.toUpperCase();
  }
  
  // Update all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', lang);

  // Notify GitHub README fetcher to reload in new language
  document.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
}

// ============================================
// Analytics Tracking (Optional)
// ============================================
function initAnalytics() {
  // Example: Track link clicks
  const trackableLinks = document.querySelectorAll('.link-btn');
  
  trackableLinks.forEach(link => {
    link.addEventListener('click', () => {
      const linkName = link.querySelector('.link-btn__text')?.textContent;
      console.log(`Link clicked: ${linkName}`);
      
      // Uncomment to send to analytics service:
      // gtag('event', 'click', { event_category: 'social_link', event_label: linkName });
      // plausible('Link Click', { props: { link: linkName } });
    });
  });
}

// ============================================
// FUTURE FEATURE: Dynamic Skills Loading
// ============================================
/*
function loadSkills() {
  const skillsData = [
    { name: 'HTML5', level: 'expert', category: 'frontend' },
    { name: 'CSS3', level: 'expert', category: 'frontend' },
    { name: 'JavaScript', level: 'advanced', category: 'frontend' },
    // ... more skills
  ];
  
  const skillsContainer = document.querySelector('.skills');
  
  skillsData.forEach(skill => {
    const badge = document.createElement('span');
    badge.className = `badge badge--${skill.category}`;
    badge.textContent = skill.name;
    badge.setAttribute('data-level', skill.level);
    skillsContainer.appendChild(badge);
  });
}
*/

// ============================================
// FUTURE FEATURE: Contact Form Handler
// ============================================
/*
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      try {
        // Send to backend or service (e.g., Formspree, Netlify Forms)
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          alert('Message sent successfully!');
          form.reset();
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
      }
    });
  }
}
*/

// ============================================
// FUTURE FEATURE: Lazy Load Images
// ============================================
/*
function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback to Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    const images = document.querySelectorAll('img.lazy');
    images.forEach(img => imageObserver.observe(img));
  }
}
*/

// ============================================
// Utility Functions
// ============================================

// Get viewport dimensions
function getViewport() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  };
}

// Debounce function (useful for scroll/resize events)
function debounce(func, wait = 250) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Example: Debounced window resize handler
/*
const handleResize = debounce(() => {
  const viewport = getViewport();
  console.log('Window resized:', viewport);
}, 250);

window.addEventListener('resize', handleResize);
*/

// ============================================
// Zalo QR Modal Control
// ============================================
function initZaloModal() {
  const zaloBtn = document.getElementById('zalo-btn');
  const modal = document.getElementById('zalo-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  
  if (!zaloBtn || !modal) return;
  
  // Open modal
  zaloBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  });
  
  // Close modal on overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
      closeModal();
    });
  }
  
  // Close modal on close button click
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      closeModal();
    });
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  }
}

// ============================================
// Background Music Control (Simple)
// ============================================
function initMusicPlayer() {
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  
  if (!bgMusic || !musicToggle) return;
  
  // Check if music was playing in previous session
  const musicPlaying = localStorage.getItem('musicPlaying') !== 'false';
  
  // Try to autoplay (will be blocked by most browsers without user interaction)
  if (musicPlaying) {
    bgMusic.play().catch(() => {
      console.log('Autoplay blocked. Waiting for user interaction.');
    });
  }
  
  // Update button icon based on playing state
  function updateMusicIcon() {
    const icon = musicToggle.querySelector('i');
    if (bgMusic.paused) {
      icon.className = 'fas fa-music';
      musicToggle.style.opacity = '0.6';
    } else {
      icon.className = 'fas fa-volume-up';
      musicToggle.style.opacity = '1';
    }
  }
  
  // Toggle music on button click
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      localStorage.setItem('musicPlaying', 'true');
    } else {
      bgMusic.pause();
      localStorage.setItem('musicPlaying', 'false');
    }
    updateMusicIcon();
  });
  
  // Update icon on play/pause events
  bgMusic.addEventListener('play', updateMusicIcon);
  bgMusic.addEventListener('pause', updateMusicIcon);
  
  // Try to play on first user interaction
  const playOnInteraction = () => {
    if (bgMusic.paused && localStorage.getItem('musicPlaying') !== 'false') {
      bgMusic.play().catch(() => {});
    }
    // Remove listeners after first interaction
    document.removeEventListener('click', playOnInteraction);
    document.removeEventListener('keydown', playOnInteraction);
    document.removeEventListener('touchstart', playOnInteraction);
  };
  
  document.addEventListener('click', playOnInteraction);
  document.addEventListener('keydown', playOnInteraction);
  document.addEventListener('touchstart', playOnInteraction);
  
  // Initial icon update
  updateMusicIcon();
}

// ============================================
// Custom Cursor with Trail Effect
// ============================================
function initCursor() {
  // Check if device supports hover (desktop)
  if (window.matchMedia('(hover: none)').matches || window.innerWidth <= 768) {
    console.log('Cursor disabled: mobile or small screen detected');
    return; // Skip on mobile/touch devices
  }
  
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  
  if (!cursorDot || !cursorRing) {
    console.error('Cursor elements not found!');
    return;
  }
  
  console.log('✨ Custom cursor initialized');
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  
  // Set initial position
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update dot position immediately
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    
    // Create trail effect
    createTrail(mouseX, mouseY);
  });
  
  // Smooth ring animation
  function animateRing() {
    // Smooth follow effect (easing)
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    requestAnimationFrame(animateRing);
  }
  animateRing();
  
  // Trail creation
  let lastTrailTime = 0;
  function createTrail(x, y) {
    const now = Date.now();
    // Limit trail frequency to avoid performance issues
    if (now - lastTrailTime < 30) return;
    lastTrailTime = now;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    // Remove after animation
    setTimeout(() => trail.remove(), 600);
  }
  
  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .link-btn, .control-btn, input, textarea, .service-card, .project-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
  
  // Click effect
  document.addEventListener('mousedown', (e) => {
    // Add scale animation to cursor dot
    cursorDot.classList.add('clicking');
    setTimeout(() => cursorDot.classList.remove('clicking'), 300);
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'cursor-click-effect';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
  });
}

// ============================================
// Export functions for potential module use
// ============================================
// Uncomment if using ES6 modules
/*
export {
  initThemeToggle,
  initLanguageSwitcher,
  initSmoothScroll,
  initAnimations,
  initMusicPlayer,
  initCursor,
  getViewport,
  debounce
};
*/

console.log('✅ main.js loaded - Theme toggle & Language switcher active!');

// Auto-initialize cursor on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎯 DOM loaded, initializing cursor...');
  // Small delay to ensure cursor elements exist
  setTimeout(() => {
    if (typeof initCursor === 'function') {
      initCursor();
    }
  }, 100);
});
