/**
 * English/Arabic support. English lives at the root (/services/), Arabic under /ar/ with the same slugs
 * (/ar/services/), so every page maps one-to-one and hreflang is a prefix away.
 *
 * Page text lives with its data (lib/*.ts for English, lib/ar/*.ts for Arabic). This file holds the
 * shared interface strings: navigation, footer, forms and the labels the page templates repeat.
 */

export type Locale = "en" | "ar";

/** Localised internal link: "/work" → "/ar/work" in Arabic. External links, anchors and mail/tel links pass through. */
export function lp(locale: Locale, href: string): string {
  if (locale === "en" || !href.startsWith("/") || href.startsWith("/ar/") || href === "/ar") return href;
  return href === "/" ? "/ar/" : `/ar${href}`;
}

/** The same page in the other language: "/ar/work/" ⇄ "/work/". */
export function altPath(path: string): string {
  if (path === "/ar" || path === "/ar/") return "/";
  if (path.startsWith("/ar/")) return path.slice(3);
  return path === "/" ? "/ar/" : `/ar${path}`;
}

export const isArabicPath = (path: string) => path === "/ar" || path.startsWith("/ar/");

/** "9 October 2026" / "9 أكتوبر 2026" (Western digits, as used for prices across the site) */
export function fmtDateL(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-u-nu-latn" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const en = {
  dir: "ltr" as "ltr" | "rtl",
  arrow: "→",
  nav: {
    services: "Services",
    products: "Products",
    work: "Work",
    blog: "Blog",
    about: "About",
    company: "Company",
    cta: "Start a project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    gcc: "E-commerce across the GCC",
    switchLabel: "العربية",
    switchTitle: "اقرأ هذه الصفحة بالعربية",
    switchLang: "ar",
    waslFeature: "WASL",
    waslAccent: "— WhatsApp at scale.",
    waslSmall: "Official API, AI inbox, broadcasts & notifications",
    waslAlt: "WASL live on WhatsApp",
    ecomFeature: "E-commerce",
    ecomAccent: "— our specialty.",
    ecomSmall: "Stores that carry your brand's standard and convert",
    ecomAlt: "E-commerce by Odysense",
  },
  footer: {
    about: "Digital agency and software company — web design, e-commerce, apps and growth for brands in Qatar and the GCC.",
    whatsapp: "WhatsApp us",
    services: "Services",
    gcc: "GCC e-commerce",
    gccAria: "E-commerce across the GCC",
    products: "Products",
    company: "Company",
    allServices: "All services",
    contact: "Contact",
    made: "Odysense — Made in Qatar ❤︎",
    address: "Innovation Centre, Qatar Science & Technology Park, Doha",
  },
  cta: { kicker: "New business", button: "Start your project →" },
  byline: { by: "By", team: "the Odysense team", updated: "Last updated" },
  crumbs: { home: "Home", services: "Services", ecommerce: "E-commerce", work: "Work", blog: "Blog", products: "Products" },
  service: {
    quote: "Get a fixed quote →",
    work: "See our work",
    included: "What's included",
    everything: "Everything,",
    handled: "handled.",
    questions: "Questions",
    asked: "Asked",
    often: "often.",
  },
  guide: {
    consult: "Book a free consultation →",
    stores: "See our stores",
    shortAnswer: "The short answer",
    explore: "Explore",
    guidesTitle: "E-commerce guides",
    guidesAccent: "by market and platform.",
    payments: "Payments",
    gatewaysTitle: "Gateways we've integrated",
    gatewaysAccent: "on live stores.",
    gatewaysNote: "Need one that isn't listed? We can integrate it too.",
    proof: "Proof",
    proofTitle: "Stores we built,",
    proofAccent: "tools we run.",
    readCase: "Read the case study →",
    spKicker: "Included free for year one",
    spBody: "Run your WooCommerce store from your phone: products, orders, POS and analytics in one portal.",
    spLink: "See Store Portal →",
    waKicker: "WhatsApp commerce",
    waBody: "Order confirmations, delivery updates and support on WhatsApp through the official Business API.",
    waLink: "See WASL →",
    sources: "Sources",
    disclaimer:
      "Laws, tax rules and fees change. Treat this page as a guide, not legal or tax advice: Odysense builds the store, and we're not a law firm.",
    ctaKicker: "Free consultation",
  },
  related: { kicker: "Guides", title: "Related", accent: "reading.", read: (m: number) => `${m} min read →` },
  form: {
    name: "Your name *",
    email: "Email *",
    phone: "Mobile number",
    code: "Country code",
    company: "Company (optional)",
    need: "What do you need? *",
    message: "Tell us about the project *",
    send: "Send enquiry →",
    sending: "Sending…",
    note: "We reply within one business day. Your details stay with us — no spam, ever.",
    thanks: "Thank you.",
    thanksBody: "Your enquiry is with us — expect a reply within one business day.",
    error: "Something went wrong.",
    services: [
      "Website design & development",
      "E-commerce store",
      "Software or mobile app",
      "Branding",
      "SEO & digital marketing",
      "WhatsApp Business API (WASL)",
      "Other",
    ],
    countries: ["Qatar", "Saudi Arabia", "UAE", "Kuwait", "Bahrain", "Oman", "Other"],
  },
  popup: {
    aria: "Free technical consultation",
    close: "Close",
    kicker: "Before you go",
    title: "Get a free",
    accent: "technical consultation.",
    body: "15 minutes with our team — honest advice on your website, store or idea. No pitch, no obligation. Leave your number and we'll call you back.",
    submit: "Request my free callback →",
    done: "We'll call you.",
    doneBody: "Expect a call from our Doha team within one business day.",
  },
};

export type UI = typeof en;

const ar: UI = {
  dir: "rtl",
  arrow: "←",
  nav: {
    services: "الخدمات",
    products: "المنتجات",
    work: "أعمالنا",
    blog: "المدونة",
    about: "من نحن",
    company: "الشركة",
    cta: "ابدأ مشروعك",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    gcc: "التجارة الإلكترونية في الخليج",
    switchLabel: "English",
    switchTitle: "Read this page in English",
    switchLang: "en",
    waslFeature: "WASL",
    waslAccent: "— واتساب على نطاق واسع.",
    waslSmall: "الواجهة الرسمية، صندوق رسائل ذكي، رسائل جماعية وإشعارات",
    waslAlt: "منصة WASL تعمل على واتساب",
    ecomFeature: "التجارة الإلكترونية",
    ecomAccent: "— تخصصنا.",
    ecomSmall: "متاجر تليق بعلامتك التجارية وتحقق المبيعات",
    ecomAlt: "متاجر إلكترونية من Odysense",
  },
  footer: {
    about: "وكالة رقمية وشركة برمجيات: تصميم مواقع ومتاجر إلكترونية وتطبيقات ونمو رقمي للعلامات التجارية في قطر والخليج.",
    whatsapp: "راسلنا على واتساب",
    services: "الخدمات",
    gcc: "التجارة الإلكترونية في الخليج",
    gccAria: "التجارة الإلكترونية في دول الخليج",
    products: "المنتجات",
    company: "الشركة",
    allServices: "كل الخدمات",
    contact: "تواصل معنا",
    made: "Odysense — صُنع في قطر ❤︎",
    address: "مركز الابتكار، واحة قطر للعلوم والتكنولوجيا، الدوحة",
  },
  cta: { kicker: "مشروع جديد", button: "ابدأ مشروعك ←" },
  byline: { by: "بقلم", team: "فريق Odysense", updated: "آخر تحديث" },
  crumbs: { home: "الرئيسية", services: "الخدمات", ecommerce: "التجارة الإلكترونية", work: "أعمالنا", blog: "المدونة", products: "المنتجات" },
  service: {
    quote: "احصل على عرض سعر ثابت ←",
    work: "شاهد أعمالنا",
    included: "ما الذي يشمله",
    everything: "كل شيء،",
    handled: "نتولاه عنك.",
    questions: "أسئلة",
    asked: "أسئلة",
    often: "شائعة.",
  },
  guide: {
    consult: "احجز استشارة مجانية ←",
    stores: "شاهد متاجرنا",
    shortAnswer: "الإجابة المختصرة",
    explore: "استكشف",
    guidesTitle: "أدلة التجارة الإلكترونية",
    guidesAccent: "حسب السوق والمنصة.",
    payments: "الدفع",
    gatewaysTitle: "بوابات دفع ربطناها",
    gatewaysAccent: "في متاجر تعمل فعلاً.",
    gatewaysNote: "تحتاج بوابة غير موجودة في القائمة؟ يمكننا ربطها أيضاً.",
    proof: "الدليل",
    proofTitle: "متاجر بنيناها،",
    proofAccent: "وأدوات نشغّلها.",
    readCase: "اقرأ دراسة الحالة ←",
    spKicker: "مجاناً في السنة الأولى",
    spBody: "أدِر متجر WooCommerce من هاتفك: المنتجات والطلبات ونقطة البيع والتحليلات في بوابة واحدة.",
    spLink: "تعرّف على Store Portal ←",
    waKicker: "التجارة عبر واتساب",
    waBody: "تأكيد الطلبات وتحديثات التوصيل وخدمة العملاء على واتساب عبر واجهة الأعمال الرسمية.",
    waLink: "تعرّف على WASL ←",
    sources: "المصادر",
    disclaimer:
      "القوانين والأنظمة الضريبية والرسوم تتغير. هذه الصفحة دليل إرشادي وليست استشارة قانونية أو ضريبية: Odysense تبني المتجر، ولسنا مكتب محاماة.",
    ctaKicker: "استشارة مجانية",
  },
  related: { kicker: "أدلة", title: "مقالات", accent: "ذات صلة.", read: (m: number) => `قراءة في ${m} ${m > 10 ? "دقيقة" : "دقائق"} ←` },
  form: {
    name: "اسمك *",
    email: "البريد الإلكتروني *",
    phone: "رقم الجوال",
    code: "رمز الدولة",
    company: "الشركة (اختياري)",
    need: "ما الذي تحتاجه؟ *",
    message: "أخبرنا عن مشروعك *",
    send: "أرسل طلبك ←",
    sending: "جارٍ الإرسال…",
    note: "نرد خلال يوم عمل واحد. بياناتك تبقى لدينا ولن نرسل لك رسائل مزعجة.",
    thanks: "شكراً لك.",
    thanksBody: "وصلنا طلبك، وسنرد عليك خلال يوم عمل واحد.",
    error: "حدث خطأ ما.",
    services: [
      "تصميم وتطوير المواقع",
      "متجر إلكتروني",
      "برمجيات أو تطبيق جوال",
      "الهوية التجارية",
      "تحسين محركات البحث والتسويق الرقمي",
      "واجهة واتساب للأعمال (WASL)",
      "أخرى",
    ],
    countries: ["قطر", "السعودية", "الإمارات", "الكويت", "البحرين", "عُمان", "أخرى"],
  },
  popup: {
    aria: "استشارة تقنية مجانية",
    close: "إغلاق",
    kicker: "قبل أن تغادر",
    title: "احصل على",
    accent: "استشارة تقنية مجانية.",
    body: "15 دقيقة مع فريقنا: نصيحة صادقة حول موقعك أو متجرك أو فكرتك، بلا عروض بيع ولا التزام. اترك رقمك وسنتصل بك.",
    submit: "اطلب اتصالاً مجانياً ←",
    done: "سنتصل بك.",
    doneBody: "سيتصل بك فريقنا في الدوحة خلال يوم عمل واحد.",
  },
};

export const UI_TEXT: Record<Locale, UI> = { en, ar };
export const ui = (locale: Locale): UI => UI_TEXT[locale];
