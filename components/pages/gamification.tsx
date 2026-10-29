import Link from "next/link";
import { seoMeta } from "@/lib/seo";
import { Reveal, SectionHead, CtaBox, PageHero, Byline } from "@/components/ui";
import { webPageSchema } from "@/lib/schema";
import { Arcade } from "@/components/arcade/arcade";
import { site, pageUpdated } from "@/lib/site";
import { RelatedPosts } from "@/components/related-posts";
import { lp, ui, type Locale } from "@/lib/i18n";

/**
 * Gamification & brand activations. Rules (CLAUDE.md section 5): no prices, hedged timelines, web and
 * mobile capabilities only, no invented events or results. Keep both languages in step.
 */
const COPY = {
  en: {
    metaTitle: "Gamification & Brand Activation Agency in Qatar",
    metaDescription:
      "Event games, live quizzes, polls and interactive booth activations for exhibitions, launches and malls in Qatar & the GCC — branded, bilingual and built to capture consented leads.",
    serviceName: "Gamification & Brand Activations",
    serviceType: "Event gamification and brand activation",
    serviceDescription:
      "Interactive games, live quizzes, polls, Q&A and digital brand activations for events, exhibitions, product launches, malls and corporate gatherings, with consented lead capture and post-event reporting.",
    builds: [
      { h: "QR-launched mobile games", p: "Guests scan a code and play in their phone browser — no app download, no friction at the booth." },
      { h: "Touchscreen & kiosk games", p: "Branded games for booth screens and tablets that pull people in and keep the queue moving." },
      { h: "Big-screen leaderboards", p: "Live rankings on the venue screen that update as people play, so the whole room watches the race." },
      { h: "Spin-the-wheel & instant win", p: "Prize wheels and instant-win games with prizes and odds you control for each campaign." },
      { h: "Live quizzes & trivia", p: "Timed quiz rounds played on phones at the same moment, scored for speed and accuracy." },
      { h: "Live polls, surveys & forms", p: "Ask the room and show results as they arrive — or collect structured feedback in a few taps." },
      { h: "Audience Q&A & presentations", p: "Questions from the floor, upvoted and moderated, plus interactive slides that let people respond." },
      { h: "Registration & lead capture", p: "Branded sign-up flows with clear consent, so every player becomes a contact you can follow up." },
    ],
    useCases: [
      { h: "Exhibitions & booths", p: "Give people a reason to stop at your stand. A short game earns attention, and the sign-up before it captures who they are." },
      { h: "Product launches", p: "Turn a launch into something guests take part in — a quiz about the product or a challenge built around its features." },
      { h: "Conferences & corporate events", p: "Live polls, Q&A and quiz breaks keep a long agenda lively and give speakers real-time input from the room." },
      { h: "Mall & retail activations", p: "Spin-to-win and instant-win games drive footfall to a pop-up or store, with prizes redeemed on the spot." },
      { h: "Sports events & fan zones", p: "Prediction games, trivia and big-screen leaderboards that keep fans engaged between the moments that matter." },
      { h: "Seasonal campaigns", p: "Ramadan, Qatar National Day and Eid campaigns with games themed for the occasion, in Arabic and English." },
      { h: "Internal team events", p: "Team quizzes, polls and friendly competitions for town halls, offsites and staff celebrations." },
    ],
    liveOps: [
      { h: "On-site or remote operators", p: "Our team runs the experience on the day — at the venue, or remotely from Doha, depending on what the event needs." },
      { h: "Moderation", p: "Questions, names and submissions are moderated before they reach a public screen." },
      { h: "Real-time screens", p: "Leaderboards, poll results and Q&A walls on your venue displays, updating as people play." },
      { h: "Event-day support", p: "Technical support on standby throughout the event, so a hiccup never becomes the story." },
    ],
    dataPoints: [
      { h: "Consented lead capture", p: "Only the fields you choose, with clear opt-in wording at the point of entry." },
      { h: "CSV & CRM export", p: "Leads delivered as a clean export, ready for your CRM or sales team after the event." },
      { h: "WhatsApp follow-ups", p: "Send prize notifications and thank-you messages on WhatsApp through WASL, to people who opted in." },
      { h: "Engagement report", p: "A post-event report covering participation, completion, poll results and leads captured." },
    ],
    steps: [
      { h: "Brief", p: "Your event, audience, goals and the data you want to leave with." },
      { h: "Concept & game design", p: "Game mechanics, flow, prizes and the lead-capture step, agreed before anything is built." },
      { h: "Branded build", p: "Designed in your identity and built mobile-first, in Arabic and English." },
      { h: "Testing", p: "Tested on real phones, venue screens and the network conditions you'll actually have." },
      { h: "Event-day live ops", p: "Operators, moderation and support while the activation is running." },
      { h: "Leads & insights report", p: "Your consented leads and an engagement report, delivered after the event." },
    ],
    why: [
      { h: "In-house design & development", p: "The people who design your game are the people who build it — no outsourcing, no handoffs." },
      { h: "Branded to your identity", p: "Every game uses your colours, typography, products and tone. Nothing looks like a template." },
      { h: "Bilingual Arabic/English", p: "Proper right-to-left layouts and Arabic typography, not a translated afterthought." },
      { h: "Mobile-first, no app", p: "Built for the phones your guests already carry, opened from a QR code in seconds." },
      { h: "The team behind WASL & QFlow", p: "We build and run our own products, so we design activations to be reliable under real-world load." },
      { h: "Leads, not just fun", p: "Every activation is planned around what you keep afterwards: consented contacts and clear insight." },
    ],
    faqs: [
      {
        q: "How much does a gamified activation cost?",
        a: "It depends on scope: the number of games, how much custom design is involved, the screens and devices at the venue, and whether you need our team on site. After a free consultation we give you a fixed quote — request a callback and we'll walk you through the options.",
      },
      {
        q: "How long does it take to build?",
        a: "It depends on scope. We confirm the timeline in your proposal, so you know exactly when you'll see the first version and when testing happens before the event.",
      },
      {
        q: "Do guests need to download an app?",
        a: "No. Our mobile games run in the phone's browser and open from a QR code, so guests can start playing in seconds without installing anything.",
      },
      {
        q: "Can the games be fully branded and in Arabic?",
        a: "Yes. Every game is designed in your brand identity, and we build in Arabic and English with proper right-to-left layouts.",
      },
      {
        q: "What player data can we collect?",
        a: "Only the fields you choose — typically name, mobile number or email — captured with clear opt-in consent before anyone plays. You receive the leads as an export after the event, and we can send WhatsApp follow-ups through WASL to people who opted in. We recommend your legal or compliance team signs off the consent wording.",
      },
      {
        q: "Can you run the activation on the day?",
        a: "Yes. We provide operators on site or remotely, moderate anything shown on public screens, and keep technical support on standby throughout the event.",
      },
      {
        q: "Can we show the leaderboard or poll results on a big screen?",
        a: "Yes. Leaderboards, live poll results and Q&A walls can run on your venue screens and update in real time as people play and vote.",
      },
      {
        q: "Can we reuse the game for future events?",
        a: "Usually, yes. We can build games so that questions, prizes and branding can be updated for your next campaign — tell us in the brief and we'll plan for it.",
      },
    ],
    crumb: "Gamification",
    h1: "Gamification & brand activations",
    h1Accent: "in Qatar.",
    lede: "Interactive games, live quizzes, polls and Q&A for events, exhibitions, launches and malls across Qatar and the GCC. We design, build and run them in your brand — and every activation leaves you with consented leads and a report on how people engaged.",
    consult: "Get a free consultation →",
    playDemo: "Play a demo",
    buildKicker: "What we build",
    buildTitle: "Games and live engagement,",
    buildAccent: "built for the room.",
    buildBody: "From a single spin-to-win at a booth to a full conference engagement layer — designed, built and run by one team.",
    whereKicker: "Where it works",
    whereTitle: "Made for every kind",
    whereAccent: "of gathering.",
    elseTitle: "Something else in mind?",
    elseBody: "Tell us about your event and audience — we'll suggest the format that fits.",
    demoKicker: "Play a demo",
    demoTitle: "Try it yourself,",
    demoAccent: "right here.",
    demoBody: "Five small demos of formats we build. At your event they'd carry your brand, your prizes and your questions — and run across phones and screens at once.",
    imagine: "Imagine this in your brand colours at your next event —",
    imagineLink: "book a free consultation",
    opsKicker: "Live event management",
    opsTitle: "We don't just hand it over.",
    opsAccent: "We run it.",
    opsBody: "On event day, our team keeps the experience running so yours can focus on the guests.",
    dataKicker: "The data you keep",
    dataTitle: "Every player,",
    dataAccent: "a lead you can follow up.",
    dataBodyA: "Activations are planned around what you leave with — and follow-up runs on WhatsApp through",
    dataBodyB: ", our official WhatsApp Business platform.",
    consentB: "On consent and privacy:",
    consent: "we only collect what you ask for, players opt in before they play, and the data is used for the follow-up they agreed to. Demo games on this page collect nothing.",
    processKicker: "Process",
    processTitle: "From brief",
    processAccent: "to leads report.",
    whyKicker: "Why Odysense",
    whyTitle: "A software company",
    whyAccent: "behind every game.",
    faqKicker: "Questions",
    faqTitle: "Before you plan",
    faqAccent: "your activation.",
    links: ["WASL — WhatsApp platform →", "Digital marketing →", "Event gamification ideas →"],
    ctaTitle: "Make your next event",
    ctaAccent: "the one they play.",
    ctaBody: "Tell us about the event, the audience and what you want to leave with. We'll come back with a concept and a fixed quote after a free consultation.",
  },
  ar: {
    metaTitle: "وكالة ألعاب تفاعلية وتفعيل علامات تجارية في قطر",
    metaDescription:
      "ألعاب ومسابقات واستطلاعات مباشرة وتجارب تفاعلية للمعارض والإطلاقات والمراكز التجارية في قطر والخليج، بهوية علامتك وباللغتين، لجمع بيانات العملاء بموافقتهم.",
    serviceName: "الألعاب التفاعلية وتفعيل العلامات التجارية",
    serviceType: "ألعاب الفعاليات وتفعيل العلامات التجارية",
    serviceDescription:
      "ألعاب تفاعلية ومسابقات واستطلاعات وجلسات أسئلة مباشرة وتجارب رقمية لتفعيل العلامات التجارية في الفعاليات والمعارض وإطلاق المنتجات والمراكز التجارية والتجمعات المؤسسية، مع جمع بيانات العملاء المحتملين بموافقتهم وتقرير بعد الفعالية.",
    builds: [
      { h: "ألعاب جوال تُفتح برمز QR", p: "يمسح الضيوف الرمز ويلعبون في متصفح الهاتف، بلا تحميل تطبيق ولا انتظار عند الجناح." },
      { h: "ألعاب الشاشات اللمسية والأكشاك", p: "ألعاب بهوية علامتك لشاشات الأجنحة والأجهزة اللوحية تجذب الناس وتُبقي الطابور يتحرك." },
      { h: "لوحات متصدرين على الشاشة الكبيرة", p: "ترتيب مباشر على شاشة القاعة يتحدّث مع كل لعبة، فتتابع القاعة كلها السباق." },
      { h: "عجلة الحظ والفوز الفوري", p: "عجلات جوائز وألعاب فوز فوري بجوائز واحتمالات تتحكم بها في كل حملة." },
      { h: "مسابقات ومعلومات عامة مباشرة", p: "جولات مسابقات بوقت محدد يلعبها الجميع على هواتفهم في اللحظة نفسها، وتُحسب النقاط بالسرعة والدقة." },
      { h: "استطلاعات واستبيانات ونماذج مباشرة", p: "اسأل الحضور واعرض النتائج فور وصولها، أو اجمع آراء منظمة ببضع نقرات." },
      { h: "أسئلة الجمهور والعروض التفاعلية", p: "أسئلة من الحضور مع التصويت عليها والإشراف، وشرائح تفاعلية تتيح للناس المشاركة." },
      { h: "التسجيل وجمع بيانات العملاء", p: "نماذج تسجيل بهوية علامتك مع موافقة واضحة، فيصبح كل لاعب جهة اتصال يمكنك متابعتها." },
    ],
    useCases: [
      { h: "المعارض والأجنحة", p: "امنح الناس سبباً للتوقف عند جناحك. لعبة قصيرة تجذب الانتباه، والتسجيل قبلها يعرّفك بهم." },
      { h: "إطلاق المنتجات", p: "حوّل الإطلاق إلى تجربة يشارك فيها الضيوف: مسابقة عن المنتج أو تحدٍّ مبني على مزاياه." },
      { h: "المؤتمرات والفعاليات المؤسسية", p: "الاستطلاعات والأسئلة المباشرة وفواصل المسابقات تُبقي البرنامج الطويل حيوياً، وتمنح المتحدثين آراء الحضور لحظة بلحظة." },
      { h: "تفعيلات المراكز التجارية ومتاجر التجزئة", p: "ألعاب أدِر واربح والفوز الفوري تجذب الزوار إلى المتجر أو الجناح المؤقت، مع استلام الجوائز في المكان." },
      { h: "الفعاليات الرياضية ومناطق المشجعين", p: "ألعاب التوقعات والمعلومات العامة ولوحات المتصدرين الكبيرة تُبقي المشجعين متفاعلين بين اللحظات الحاسمة." },
      { h: "الحملات الموسمية", p: "حملات رمضان واليوم الوطني لدولة قطر والأعياد بألعاب مصممة للمناسبة، بالعربية والإنجليزية." },
      { h: "فعاليات الفرق الداخلية", p: "مسابقات واستطلاعات ومنافسات ودية للاجتماعات العامة ورحلات العمل واحتفالات الموظفين." },
    ],
    liveOps: [
      { h: "مشغّلون في الموقع أو عن بُعد", p: "يدير فريقنا التجربة يوم الفعالية، في المكان أو عن بُعد من الدوحة، حسب ما تحتاجه الفعالية." },
      { h: "الإشراف على المحتوى", p: "نراجع الأسئلة والأسماء والمشاركات قبل ظهورها على أي شاشة عامة." },
      { h: "شاشات لحظية", p: "لوحات المتصدرين ونتائج الاستطلاعات وجدران الأسئلة على شاشات المكان، تتحدّث مع اللعب." },
      { h: "دعم يوم الفعالية", p: "دعم تقني جاهز طوال الفعالية، حتى لا يصبح أي خلل بسيط حديث الحضور." },
    ],
    dataPoints: [
      { h: "جمع البيانات بالموافقة", p: "الحقول التي تختارها فقط، مع صياغة واضحة للموافقة عند التسجيل." },
      { h: "تصدير CSV وإلى نظام CRM", p: "تصلك البيانات بملف مرتب، جاهزة لنظام إدارة العملاء أو فريق المبيعات بعد الفعالية." },
      { h: "متابعة عبر واتساب", p: "أرسل إشعارات الجوائز ورسائل الشكر على واتساب عبر WASL لمن وافق على ذلك." },
      { h: "تقرير التفاعل", p: "تقرير بعد الفعالية يغطي المشاركة ونسب الإكمال ونتائج الاستطلاعات والبيانات التي جُمعت." },
    ],
    steps: [
      { h: "الملخص", p: "فعاليتك وجمهورك وأهدافك والبيانات التي تريد الخروج بها." },
      { h: "الفكرة وتصميم اللعبة", p: "آليات اللعب والتسلسل والجوائز وخطوة جمع البيانات، نتفق عليها قبل بناء أي شيء." },
      { h: "بناء بهوية علامتك", p: "تصميم بهويتك وبناء يبدأ بالجوال، بالعربية والإنجليزية." },
      { h: "الاختبار", p: "نختبر على هواتف حقيقية وشاشات المكان وظروف الشبكة التي ستكون لديك فعلاً." },
      { h: "التشغيل يوم الفعالية", p: "مشغّلون وإشراف ودعم طوال فترة التفعيل." },
      { h: "تقرير البيانات والنتائج", p: "بيانات العملاء المحتملين الذين وافقوا وتقرير التفاعل، يصلانك بعد الفعالية." },
    ],
    why: [
      { h: "تصميم وتطوير داخلي", p: "من يصمم لعبتك هو من يبنيها، بلا إسناد خارجي ولا تنقّل بين جهات." },
      { h: "بهوية علامتك", p: "كل لعبة تستخدم ألوانك وخطوطك ومنتجاتك وأسلوبك. لا شيء يبدو كقالب جاهز." },
      { h: "عربي وإنجليزي", p: "تخطيط صحيح من اليمين إلى اليسار وخطوط عربية مناسبة، لا ترجمة لاحقة على عجل." },
      { h: "للجوال أولاً وبلا تطبيق", p: "مصممة للهواتف التي يحملها ضيوفك، وتُفتح من رمز QR في ثوانٍ." },
      { h: "الفريق الذي بنى WASL وQFlow", p: "نبني منتجاتنا ونشغّلها، لذلك نصمم التفعيلات لتعمل بثبات تحت الضغط الحقيقي." },
      { h: "عملاء محتملون لا مجرد متعة", p: "نخطط كل تفعيل حول ما يبقى لك بعده: جهات اتصال وافقت ورؤى واضحة." },
    ],
    faqs: [
      {
        q: "كم تكلفة التفعيل بالألعاب التفاعلية؟",
        a: "يعتمد ذلك على النطاق: عدد الألعاب، وحجم التصميم المخصص، والشاشات والأجهزة في المكان، وما إذا كنت تحتاج فريقنا في الموقع. بعد استشارة مجانية نقدم لك عرض سعر ثابتاً. اطلب اتصالاً وسنشرح لك الخيارات.",
      },
      {
        q: "كم يستغرق البناء؟",
        a: "يعتمد على النطاق. نؤكد الجدول الزمني في عرضنا، فتعرف بالضبط متى ترى النسخة الأولى ومتى يتم الاختبار قبل الفعالية.",
      },
      {
        q: "هل يحتاج الضيوف إلى تحميل تطبيق؟",
        a: "لا. ألعاب الجوال تعمل في متصفح الهاتف وتُفتح من رمز QR، فيبدأ الضيوف اللعب في ثوانٍ دون تثبيت أي شيء.",
      },
      {
        q: "هل يمكن أن تكون الألعاب بهوية علامتنا وبالعربية؟",
        a: "نعم. نصمم كل لعبة بهوية علامتك التجارية، ونبنيها بالعربية والإنجليزية بتخطيط صحيح من اليمين إلى اليسار.",
      },
      {
        q: "ما بيانات اللاعبين التي يمكننا جمعها؟",
        a: "الحقول التي تختارها فقط، عادةً الاسم ورقم الجوال أو البريد الإلكتروني، مع موافقة واضحة قبل اللعب. تصلك البيانات بملف بعد الفعالية، ويمكننا إرسال رسائل متابعة على واتساب عبر WASL لمن وافق. ننصح بأن يعتمد فريقك القانوني أو فريق الامتثال صياغة الموافقة.",
      },
      {
        q: "هل يمكنكم تشغيل التفعيل يوم الفعالية؟",
        a: "نعم. نوفر مشغّلين في الموقع أو عن بُعد، ونراجع كل ما يُعرض على الشاشات العامة، ونُبقي دعماً تقنياً جاهزاً طوال الفعالية.",
      },
      {
        q: "هل يمكن عرض لوحة المتصدرين أو نتائج الاستطلاع على شاشة كبيرة؟",
        a: "نعم. يمكن عرض لوحات المتصدرين ونتائج الاستطلاعات المباشرة وجدران الأسئلة على شاشات المكان، وتتحدث لحظياً مع اللعب والتصويت.",
      },
      {
        q: "هل يمكننا إعادة استخدام اللعبة في فعاليات قادمة؟",
        a: "غالباً نعم. يمكننا بناء الألعاب بحيث تُحدَّث الأسئلة والجوائز والهوية لحملتك التالية. أخبرنا بذلك في الملخص وسنخطط له.",
      },
    ],
    crumb: "الألعاب التفاعلية",
    h1: "الألعاب التفاعلية وتفعيل العلامات التجارية",
    h1Accent: "في قطر.",
    lede: "ألعاب تفاعلية ومسابقات واستطلاعات وجلسات أسئلة مباشرة للفعاليات والمعارض والإطلاقات والمراكز التجارية في قطر والخليج. نصممها ونبنيها ونشغّلها بهوية علامتك، وكل تفعيل يترك لك بيانات عملاء محتملين وافقوا على التواصل وتقريراً عن تفاعل الحضور.",
    consult: "احصل على استشارة مجانية ←",
    playDemo: "جرّب لعبة",
    buildKicker: "ما نبنيه",
    buildTitle: "ألعاب وتفاعل مباشر،",
    buildAccent: "مصمم للقاعة.",
    buildBody: "من عجلة حظ واحدة في جناح إلى منظومة تفاعل كاملة لمؤتمر: يصممها ويبنيها ويشغّلها فريق واحد.",
    whereKicker: "أين تنجح",
    whereTitle: "مصممة لكل أنواع",
    whereAccent: "التجمعات.",
    elseTitle: "لديك فكرة أخرى؟",
    elseBody: "أخبرنا عن فعاليتك وجمهورك، وسنقترح الصيغة المناسبة.",
    demoKicker: "جرّب لعبة",
    demoTitle: "جرّبها بنفسك،",
    demoAccent: "هنا.",
    demoBody: "خمس تجارب صغيرة لصيغ نبنيها. في فعاليتك ستحمل هويتك وجوائزك وأسئلتك، وتعمل على الهواتف والشاشات في الوقت نفسه.",
    imagine: "تخيّل هذا بألوان علامتك في فعاليتك القادمة —",
    imagineLink: "احجز استشارة مجانية",
    opsKicker: "إدارة الفعالية مباشرة",
    opsTitle: "لا نسلّمك المشروع ونمضي.",
    opsAccent: "نحن نشغّله.",
    opsBody: "يوم الفعالية، يُبقي فريقنا التجربة تعمل ليتفرغ فريقك للضيوف.",
    dataKicker: "البيانات التي تبقى لك",
    dataTitle: "كل لاعب،",
    dataAccent: "عميل محتمل يمكنك متابعته.",
    dataBodyA: "نخطط التفعيلات حول ما تخرج به، والمتابعة تجري على واتساب عبر",
    dataBodyB: "، منصتنا الرسمية لواتساب للأعمال.",
    consentB: "عن الموافقة والخصوصية:",
    consent: "نجمع ما تطلبه فقط، ويوافق اللاعبون قبل اللعب، وتُستخدم البيانات للمتابعة التي وافقوا عليها. الألعاب التجريبية في هذه الصفحة لا تجمع أي شيء.",
    processKicker: "المراحل",
    processTitle: "من الملخص",
    processAccent: "إلى تقرير البيانات.",
    whyKicker: "لماذا Odysense",
    whyTitle: "شركة برمجيات",
    whyAccent: "وراء كل لعبة.",
    faqKicker: "أسئلة",
    faqTitle: "قبل أن تخطط",
    faqAccent: "لتفعيلك.",
    links: ["WASL: منصة واتساب ←", "التسويق الرقمي ←", "أفكار لألعاب الفعاليات ←"],
    ctaTitle: "اجعل فعاليتك القادمة",
    ctaAccent: "التي يلعبها الجميع.",
    ctaBody: "أخبرنا عن الفعالية والجمهور وما تريد الخروج به. سنعود إليك بفكرة وعرض سعر ثابت بعد استشارة مجانية.",
  },
};

const PATH = "/gamification-brand-activation-qatar";
const NUMERALS = ["i.", "ii.", "iii.", "iv.", "v.", "vi.", "vii.", "viii."];
const LINK_HREFS = ["/products/wasl", "/digital-marketing-agency-qatar", "/blog/event-gamification-ideas-qatar"];

export const gamificationMeta = (locale: Locale) =>
  seoMeta({ title: COPY[locale].metaTitle, description: COPY[locale].metaDescription, path: lp(locale, `${PATH}/`) });

function Cards({ items, cols = "grid-3" }: { items: { h: string; p: string }[]; cols?: string }) {
  return (
    <Reveal className={cols}>
      {items.map((it, i) => (
        <div className="card" key={it.h}>
          <span className="num">{NUMERALS[i]}</span>
          <h3>{it.h}</h3>
          <p>{it.p}</p>
        </div>
      ))}
    </Reveal>
  );
}

export function GamificationPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  const L = (href: string) => lp(locale, href);
  const updated = pageUpdated[PATH];
  const pageSchema = webPageSchema({ path: L(PATH), name: c.metaTitle, description: c.metaDescription, modified: updated });
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.serviceName,
    serviceType: c.serviceType,
    url: `${site.url}${L(`${PATH}/`)}`,
    description: c.serviceDescription,
    provider: { "@type": "ProfessionalService", "@id": `${site.url}/#organization`, name: site.name },
    areaServed: ["Qatar", "Saudi Arabia", "United Arab Emirates", "Kuwait", "Bahrain", "Oman"].map((name) => ({
      "@type": "Country",
      name,
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <PageHero
        crumbs={[{ label: t.crumbs.home, href: L("/") }, { label: t.crumbs.services, href: L("/services") }, { label: c.crumb }]}
        title={
          <>
            {c.h1} <span className="serif">{c.h1Accent}</span>
          </>
        }
        lede={c.lede}
        meta={<Byline updated={updated} locale={locale} />}
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href={L("/contact")}>
            {c.consult}
          </Link>
          <a className="btn btn-secondary" href="#demos">
            {c.playDemo}
          </a>
        </div>
      </PageHero>

      {/* What we build */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker={c.buildKicker}
            title={
              <>
                {c.buildTitle} <span className="serif">{c.buildAccent}</span>
              </>
            }
          >
            {c.buildBody}
          </SectionHead>
          <Cards items={c.builds} cols="grid-4" />
        </div>
      </section>

      {/* Use cases */}
      <section className="section section--flush-top">
        <div className="wrap">
          <SectionHead
            kicker={c.whereKicker}
            title={
              <>
                {c.whereTitle} <span className="serif">{c.whereAccent}</span>
              </>
            }
          />
          <Reveal className="grid-4">
            {c.useCases.map((u, i) => (
              <div className="card" key={u.h}>
                <span className="num">{NUMERALS[i]}</span>
                <h3>{u.h}</h3>
                <p>{u.p}</p>
              </div>
            ))}
            <Link className="card card--cta" href={L("/contact")}>
              <span className="num serif">{t.arrow}</span>
              <h3>{c.elseTitle}</h3>
              <p>{c.elseBody}</p>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Demos */}
      <section className="section quote-sec" id="demos">
        <div className="wrap">
          <SectionHead
            kicker={c.demoKicker}
            title={
              <>
                {c.demoTitle} <span className="serif">{c.demoAccent}</span>
              </>
            }
          >
            {c.demoBody}
          </SectionHead>
          <Reveal>
            <Arcade locale={locale} />
          </Reveal>
          <Reveal>
            <p className="arc-after">
              {c.imagine} <Link href={L("/contact")}>{c.imagineLink}</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Live ops */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker={c.opsKicker}
            title={
              <>
                {c.opsTitle} <span className="serif">{c.opsAccent}</span>
              </>
            }
          >
            {c.opsBody}
          </SectionHead>
          <Cards items={c.liveOps} cols="grid-4" />
        </div>
      </section>

      {/* Data */}
      <section className="section section--flush-top">
        <div className="wrap">
          <SectionHead
            kicker={c.dataKicker}
            title={
              <>
                {c.dataTitle} <span className="serif">{c.dataAccent}</span>
              </>
            }
          >
            {c.dataBodyA}{" "}
            <Link href={L("/products/wasl")} style={{ textDecoration: "underline" }}>
              WASL
            </Link>
            {c.dataBodyB}
          </SectionHead>
          <Cards items={c.dataPoints} cols="grid-4" />
          <Reveal>
            <p className="gam-note">
              <b>{c.consentB}</b> {c.consent}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section quote-sec">
        <div className="wrap">
          <SectionHead
            kicker={c.processKicker}
            title={
              <>
                {c.processTitle} <span className="serif">{c.processAccent}</span>
              </>
            }
          />
          <Cards items={c.steps} />
        </div>
      </section>

      {/* Why */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker={c.whyKicker}
            title={
              <>
                {c.whyTitle} <span className="serif">{c.whyAccent}</span>
              </>
            }
          />
          <Cards items={c.why} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--flush-top">
        <div className="wrap">
          <SectionHead
            kicker={c.faqKicker}
            title={
              <>
                {c.faqTitle} <span className="serif">{c.faqAccent}</span>
              </>
            }
          />
          <Reveal>
            <div className="faq">
              {c.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 48 }}>
              {c.links.map((label, i) => (
                <Link className="btn btn-secondary" href={L(LINK_HREFS[i])} key={LINK_HREFS[i]}>
                  {label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <RelatedPosts href={PATH} locale={locale} />

      {/* CTA */}
      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              title={
                <>
                  {c.ctaTitle} <span className="serif">{c.ctaAccent}</span>
                </>
              }
              body={c.ctaBody}
              locale={locale}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
