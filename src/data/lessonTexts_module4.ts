// File: src/data/lessonTexts_module4.ts

// File: src/data/lessonTexts_module4.ts

export const PASSWORD_STRENGTH_LESSON = {
  en: {
    // Step instructions
    step0: "Let's build a strong password! Start by typing any letter, avoid common words like \"password\".",
    step1: "Great! Now start adding more letters to make it at least 8 letters long.",
    step2: "Better! Now, add any special character (like @, #, $, % , *) to make it harder to guess.",
    step3: "Great! Finally, add a number at the end to make it super strong!",

    // UI Labels
    passwordLabel: "Your Password:",
    strengthLabel: "Strength:",
    inputPlaceholder: "Type here...",
    inputPlaceholder2: " example",
    inputPlaceholder3: " example@",
    inputPlaceholder4: " example@1",
    inputPlaceholder5: " example@8",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",

    // Feedback
    feedbackLength: "Make it longer!",
    feedbackSymbol: "Add a symbol!",
    feedbackNumber: "Add a number!",
    successMessage: "Perfect! You have created a very strong password.",

    // Buttons
    finishButton: "Complete Lesson",
  },
  zh: {
    // Step instructions
    step0: "让我们创建一个强密码！首先输入任意字母，避免使用“password”等常见词。",
    step1: "太好了！现在开始添加更多字母，使其至少有8个字母长。",
    step2: "更好了！现在，添加任何特殊字符（如 @、#、$、%、*）以使其更难猜测。",
    step3: "太棒了！最后，在末尾添加一个数字，使其超级强大！",

    // UI Labels
    passwordLabel: "您的密码：",
    strengthLabel: "强度：",
    inputPlaceholder: "在此输入...",
    weak: "弱",
    medium: "中",
    strong: "强",

    // Feedback
    feedbackLength: "让它变长！",
    feedbackSymbol: "添加符号！",
    feedbackNumber: "添加数字！",
    successMessage: "完美！您创建了一个非常强的密码。",

    // Buttons
    finishButton: "完成课程",
  }
};


export const RECOGNIZING_SCAMS_LESSON = {
  en: {
    // Instructions
    intro: "This email looks suspicious!\nTap on the 3 Red Flags to identify the scam.",
    guide: "Find 3 errors: The sender address, the urgent language, and the strange link.",

    // UI
    flagsFound: "Red Flags Found:",
    finishButton: "I Found Them All!",

    // The Fake Email Content
    emailSenderName: "Google Support Team",
    emailSenderAddr: "support@g00gle-security-update.xyz", // Intentional typo
    emailSubject: "URGENT: Your account will be deleted!!",
    emailBody1: "Dear User, We detected a virus on your phone.",
    emailBody2: "Click the link below immediately or your account will be closed forever.",
    emailLink: "http://bit.ly/secure-login-fake",

    // Feedback
    flag1Feedback: "Correct! 'g00gle' is spelled wrong.",
    flag2Feedback: "Correct! They are trying to scare you with urgency.",
    flag3Feedback: "Correct! That link does not look like a real Google link.",

    successMessage: "You successfully identified\nall the signs of a phishing scam!"
  },
  zh: {
    // Instructions
    intro: "这就邮件看起来很可疑！点击 3 个危险信号以识别诈骗。",
    guide: "找出3个错误：发件人地址、紧急语气和奇怪的链接。",

    // UI
    flagsFound: "已发现的危险信号：",
    finishButton: "我全部找到了！",

    // The Fake Email Content
    emailSenderName: "谷歌支持团队",
    emailSenderAddr: "support@g00gle-security-update.xyz", // Keep typo obvious
    emailSubject: "紧急：您的帐户将被删除！！",
    emailBody1: "亲爱的用户，我们在您的手机上检测到病毒。",
    emailBody2: "立即点击下面的链接，否则您的帐户将被永久关闭。",
    emailLink: "http://bit.ly/secure-login-fake",

    // Feedback
    flag1Feedback: "正确！'g00gle' 拼写错误。",
    flag2Feedback: "正确！他们试图用紧急情况吓唬你。",
    flag3Feedback: "正确！那个链接看起来不像真正的谷歌链接。",

    successMessage: "您成功识别出了网络钓鱼诈骗的所有迹象。"
  }
};

export const PRIVACY_SETTINGS_LESSON = {
  en: {
    // Instructions
    guide: "Your account is currently visible to everyone! Change these 3 settings to protect your privacy.",
    guideSuccess: "Great job! Your account is now private and secure.",

    // UI Settings Labels
    title: "Privacy Checkup",

    // Setting 1: Profile
    setting1Title: "Profile Visibility",
    setting1Desc: "Who can see your posts and photos?",
    optionPublic: "Everyone (Unsafe) 🌎",
    optionPrivate: "Friends Only (Safe) 🔒",

    // Setting 2: Location
    setting2Title: "Location Sharing",
    setting2Desc: "Track where you go every day.",
    optionOn: "On (Unsafe) 📍",
    optionOff: "Off (Safe) 🚫",

    // Setting 3: Data
    setting3Title: "Ad Tracking",
    setting3Desc: "Allow companies to track your data.",
    optionAllow: "Allowed (Unsafe) 📢",
    optionBlock: "Blocked (Safe) 🛡️",

    // Feedback
    safeLabel: "SECURED",
    unsafeLabel: "RISK",

    successMessage: "You successfully secured your privacy settings!",
    finishButton: "Complete Lesson"
  },
  zh: {
    // Instructions
    guide: "您的帐户目前对所有人可见！更改这 3 个设置以保护您的隐私。",
    guideSuccess: "干得好！您的帐户现在是私密且安全的。",

    // UI Settings Labels
    title: "隐私检查",

    // Setting 1: Profile
    setting1Title: "个人资料可见性",
    setting1Desc: "谁可以看到您的帖子和照片？",
    optionPublic: "所有人 (不安全) 🌎",
    optionPrivate: "仅限好友 (安全) 🔒",

    // Setting 2: Location
    setting2Title: "位置共享",
    setting2Desc: "追踪您每天的去向。",
    optionOn: "开启 (不安全) 📍",
    optionOff: "关闭 (安全) 🚫",

    // Setting 3: Data
    setting3Title: "广告追踪",
    setting3Desc: "允许公司追踪您的数据。",
    optionAllow: "允许 (不安全) 📢",
    optionBlock: "已阻止 (安全) 🛡️",

    // Feedback
    safeLabel: "已保护",
    unsafeLabel: "风险",

    successMessage: "您已成功确保护您的隐私设置！",
    finishButton: "完成课程"
  }
};

// ... existing exports ...

export const FAKE_WEBSITE_LESSON = {
  en: {
    guide: "This online store looks suspicious! Find 3 Red Flags to stay safe.",
    guideSuccess: "Excellent! You spotted all the signs of a fake website.",

    // Website Content
    browserTitle: "SuperMegaDeals - Best Tech",
    url: "http://apple-iphone-cheap-dealz.xyz/buy-now",
    navHome: "Home",
    navDeals: "Hot Deals 🔥",

    // Product
    productTitle: "iPhone 15 Pro Max - Brand New",
    productPrice: "$50.00",
    productOldPrice: "$1,199.00",
    productDesc: "We has the bestest price in the world! Buy fast or miss out!",
    buyButton: "Buy Now",

    // Feedback
    flag1Feedback: "Correct! The URL is not secure (http) and looks strange.",
    flag2Feedback: "Correct! $50 for a new iPhone is too good to be true.",
    flag3Feedback: "Correct! Clicking 'Buy Now' here would likely lead to a stolen credit card.",

    finishButton: "Complete Lesson",
    flagsFound: "Red Flags Found:"
  },
  zh: {
    guide: "这家网店看起来很可疑！找出 3 个危险信号以保持安全。",
    guideSuccess: "太棒了！你发现了假冒网站的所有迹象。",

    // Website Content
    browserTitle: "超级特卖 - 最佳科技",
    url: "http://apple-iphone-cheap-dealz.xyz/buy-now",
    navHome: "首页",
    navDeals: "热卖 🔥",

    // Product
    productTitle: "iPhone 15 Pro Max - 全新",
    productPrice: "¥300.00",
    productOldPrice: "¥8,999.00",
    productDesc: "我们有世界上最好的价格！快买否则错失良机！",
    buyButton: "立即购买",

    // Feedback
    flag1Feedback: "正确！网址不安全 (http) 且看起来很奇怪。",
    flag2Feedback: "正确！全新 iPhone 只要 300 元，这价格太假了。",
    flag3Feedback: "正确！点击“立即购买”可能会导致您的信用卡信息被盗。",

    finishButton: "完成课程",
    flagsFound: "已发现的危险信号："
  }
};