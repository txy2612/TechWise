// File: src/data/lessonTexts_module4.ts



// File: src/data/lessonTexts_module4.ts

export const PASSWORD_STRENGTH_LESSON = {
  en: {
    // Step instructions
    step0: "Let's build a strong password! Start by typing a simple word like 'apple'.",
    step1: "Too simple! Make it longer by adding another word, like 'pie'.",
    step2: "Better! Now, swap the letter 'a' with the '@' symbol to make it harder to guess.",
    step3: "Great! Finally, add a number at the end (e.g., '1') to make it super strong!",
    
    // UI Labels
    passwordLabel: "Your Password:",
    strengthLabel: "Strength:",
    inputPlaceholder: "Type here...",
    weak: "Weak 🔴",
    medium: "Medium 🟡",
    strong: "Strong 🟢",
    
    // Feedback
    feedbackLength: "Make it longer!",
    feedbackSymbol: "Add a symbol!",
    feedbackNumber: "Add a number!",
    successMessage: "Perfect! 'applepie@1' is a very strong password.",
    
    // Buttons
    finishButton: "Complete Lesson",
  },
  zh: {
    // Step instructions
    step0: "让我们创建一个强密码！首先输入一个简单的词，比如 'apple'。",
    step1: "太简单了！加另一个词让它变长，比如 'pie'。",
    step2: "好多了！现在，把字母 'a' 换成 '@' 符号，让人更难猜到。",
    step3: "太棒了！最后，在末尾加一个数字（例如 '1'）让它变得超级强！",
    
    // UI Labels
    passwordLabel: "您的密码：",
    strengthLabel: "强度：",
    inputPlaceholder: "在此输入...",
    weak: "弱 🔴",
    medium: "中 🟡",
    strong: "强 🟢",
    
    // Feedback
    feedbackLength: "让它变长！",
    feedbackSymbol: "添加符号！",
    feedbackNumber: "添加数字！",
    successMessage: "完美！'applepie@1' 是一个非常强的密码。",
    
    // Buttons
    finishButton: "完成课程",
  }
};


export const RECOGNIZING_SCAMS_LESSON = {
  en: {
    // Instructions
    intro: "This email looks suspicious! Tap on the 3 Red Flags to identify the scam.",
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
    
    successMessage: "You successfully identified all the signs of a phishing scam!"
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