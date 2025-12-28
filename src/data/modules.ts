import type { Module, Badge } from '../types';

// Badge definitions (15 badges total)
export const badges: Badge[] = [
  // Module completion badges (6)
  {
    id: 'badge-gmail',
    nameEn: 'Email Expert',
    nameZh: '邮件专家',
    descriptionEn: 'Completed Gmail Basics module',
    descriptionZh: '完成 Gmail 基础模块',
    icon: '📧',
    moduleId: 'module-gmail',
    requirement: { type: 'complete-module' },
  },
  {
    id: 'badge-search',
    nameEn: 'Search Master',
    nameZh: '搜索大师',
    descriptionEn: 'Completed Google Search module',
    descriptionZh: '完成 Google 搜索模块',
    icon: '🔍',
    moduleId: 'module-search',
    requirement: { type: 'complete-module' },
  },
  {
    id: 'badge-maps',
    nameEn: 'Navigator',
    nameZh: '导航员',
    descriptionEn: 'Completed Google Maps module',
    descriptionZh: '完成 Google 地图模块',
    icon: '🗺️',
    moduleId: 'module-maps',
    requirement: { type: 'complete-module' },
  },
  {
    id: 'badge-safety',
    nameEn: 'Security Guardian',
    nameZh: '安全卫士',
    descriptionEn: 'Completed Online Safety module',
    descriptionZh: '完成网络安全模块',
    icon: '🛡️',
    moduleId: 'module-safety',
    requirement: { type: 'complete-module' },
  },
  {
    id: 'badge-smartphone',
    nameEn: 'Phone Pro',
    nameZh: '手机专家',
    descriptionEn: 'Completed Smartphone Basics module',
    descriptionZh: '完成智能手机基础模块',
    icon: '📱',
    moduleId: 'module-smartphone',
    requirement: { type: 'complete-module' },
  },
  {
    id: 'badge-tools',
    nameEn: 'Digital Tools Expert',
    nameZh: '数字工具专家',
    descriptionEn: 'Completed Everyday Tools module',
    descriptionZh: '完成日常工具模块',
    icon: '🛠️',
    moduleId: 'module-tools',
    requirement: { type: 'complete-module' },
  },
  // Achievement badges (9)
  {
    id: 'badge-first-lesson',
    nameEn: 'First Steps',
    nameZh: '第一步',
    descriptionEn: 'Completed your first lesson',
    descriptionZh: '完成第一课',
    icon: '🎯',
    requirement: { type: 'complete-module', value: 1 },
  },
  {
    id: 'badge-perfect-10',
    nameEn: 'Perfect 10',
    nameZh: '完美十分',
    descriptionEn: 'Achieved 10 perfect scores',
    descriptionZh: '获得10个满分',
    icon: '⭐',
    requirement: { type: 'perfect-score', value: 10 },
  },
  {
    id: 'badge-streak-7',
    nameEn: 'Week Warrior',
    nameZh: '一周勇士',
    descriptionEn: '7-day learning streak',
    descriptionZh: '连续学习7天',
    icon: '🔥',
    requirement: { type: 'streak', value: 7 },
  },
  {
    id: 'badge-streak-30',
    nameEn: 'Month Champion',
    nameZh: '月度冠军',
    descriptionEn: '30-day learning streak',
    descriptionZh: '连续学习30天',
    icon: '🏆',
    requirement: { type: 'streak', value: 30 },
  },
  {
    id: 'badge-half-way',
    nameEn: 'Half Way There',
    nameZh: '半程英雄',
    descriptionEn: 'Completed 12 lessons',
    descriptionZh: '完成12课',
    icon: '🎖️',
    requirement: { type: 'complete-module', value: 12 },
  },
  {
    id: 'badge-all-modules',
    nameEn: 'Master Graduate',
    nameZh: '毕业大师',
    descriptionEn: 'Completed all 6 modules',
    descriptionZh: '完成所有6个模块',
    icon: '🎓',
    requirement: { type: 'all-modules' },
  },
  {
    id: 'badge-quick-learner',
    nameEn: 'Quick Learner',
    nameZh: '快速学习者',
    descriptionEn: 'Completed 5 lessons in one day',
    descriptionZh: '一天内完成5课',
    icon: '⚡',
    requirement: { type: 'complete-module', value: 5 },
  },
  {
    id: 'badge-perfectionist',
    nameEn: 'Perfectionist',
    nameZh: '完美主义者',
    descriptionEn: 'Achieved perfect score on entire module',
    descriptionZh: '整个模块获得满分',
    icon: '💎',
    requirement: { type: 'perfect-score', value: 4 },
  },
  {
    id: 'badge-patient-learner',
    nameEn: 'Patient Learner',
    nameZh: '耐心学习者',
    descriptionEn: 'Completed all lessons at steady pace',
    descriptionZh: '稳定完成所有课程',
    icon: '🌱',
    requirement: { type: 'all-modules' },
  },
];

// Module 1: Gmail Basics 

const gmailModule: Module = {
  id: 'module-gmail',
  titleEn: 'Gmail Basics',
  titleZh: 'Gmail 基础',
  descriptionEn: 'Learn how to send, receive, and manage emails',
  descriptionZh: '学习如何发送、接收和管理电子邮件',
  icon: '📧',
  order: 1,
  lessons: [
    {
      id: 'lesson-gmail-1',
      moduleId: 'module-gmail',
      order: 1,
      titleEn: 'Signing In and Navigation',
      titleZh: '登录和导航',
      descriptionEn: 'Learn how to sign in to Gmail and navigate the interface',
      descriptionZh: '学习如何登录 Gmail 并浏览界面',
      contentType: 'tutorial',
      estimatedMinutes: 10,
      requiredScore: 80,
      steps: [],
      quiz: {
        id: 'quiz-gmail-1',
        lessonId: 'lesson-gmail-1',
        passingScore: 80,
        questions: [
          {
            id: 'gmail-1-q1',
            type: 'multiple-choice',
            questionEn: 'What is Gmail mainly used for?',
            questionZh: 'Gmail主要用于什么？',
            options: [
              { id: 'gmail-1-q1-a', textEn: 'Sending and receiving emails', textZh: '发送和接收电子邮件' },
              { id: 'gmail-1-q1-b', textEn: 'Playing games', textZh: '玩游戏' },
              { id: 'gmail-1-q1-c', textEn: 'Editing photos', textZh: '编辑照片' },
              { id: 'gmail-1-q1-d', textEn: 'Watching movies', textZh: '看电影' }
            ],
            correctAnswer: 'gmail-1-q1-a',
            explanationEn: 'Gmail is an email service. Its main purpose is to send, receive, and manage emails.',
            explanationZh: 'Gmail是一个电子邮件服务。它的主要目的是发送、接收和管理电子邮件。',
            points: 10,
          },
          {
            id: 'gmail-1-q2',
            type: 'multiple-choice',
            questionEn: 'What does the "Inbox" folder show you?',
            questionZh: '"收件箱"文件夹显示什么？',
            options: [
              { id: 'gmail-1-q2-a', textEn: 'Emails you sent', textZh: '您发送的电子邮件' },
              { id: 'gmail-1-q2-b', textEn: 'Emails you received', textZh: '您收到的电子邮件' },
              { id: 'gmail-1-q2-c', textEn: 'Emails you deleted', textZh: '您删除的电子邮件' },
              { id: 'gmail-1-q2-d', textEn: 'Emails you drafted', textZh: '您草拟的电子邮件' }
            ],
            correctAnswer: 'gmail-1-q2-b',
            explanationEn: 'The Inbox is where new emails you receive are stored until you read or move them.',
            explanationZh: '收件箱是您收到的新电子邮件的存储位置，直到您阅读或移动它们。',
            points: 10,
          }
        ],
      },
    },
    {
      id: 'lesson-gmail-2',
      moduleId: 'module-gmail',
      order: 2,
      titleEn: 'Composing and Sending Emails',
      titleZh: '撰写和发送邮件',
      descriptionEn: 'Master the art of writing and sending emails',
      descriptionZh: '掌握写邮件和发送的技巧',
      contentType: 'simulation',
      estimatedMinutes: 15,
      requiredScore: 80,
      steps: [],
      quiz: {
        id: 'quiz-gmail-2',
        lessonId: 'lesson-gmail-2',
        passingScore: 80,
        questions: [
          {
            id: 'gmail-2-q1',
            type: 'multiple-choice',
            questionEn: 'Which button do you click to write a new email?',
            questionZh: '您点击哪个按钮来撰写新电子邮件？',
            options: [
              { id: 'gmail-2-q1-a', textEn: 'Inbox', textZh: '收件箱' },
              { id: 'gmail-2-q1-b', textEn: 'Delete', textZh: '删除' },
              { id: 'gmail-2-q1-c', textEn: 'Compose', textZh: '撰写' },
              { id: 'gmail-2-q1-d', textEn: 'Reply', textZh: '回复' }
            ],
            correctAnswer: 'gmail-2-q1-c',
            explanationEn: 'The Compose button is used to start writing a new email.',
            explanationZh: '撰写按钮用于开始写新的电子邮件。',
            points: 10,
          },
          {
            id: 'gmail-2-q2',
            type: 'multiple-choice',
            questionEn: 'What does the paperclip icon mean when writing an email?',
            questionZh: '撰写电子邮件时，回形针图标是什么意思？',
            options: [
              { id: 'gmail-2-q2-a', textEn: 'Mark as important', textZh: '标记为重要' },
              { id: 'gmail-2-q2-b', textEn: 'Delete the email', textZh: '删除电子邮件' },
              { id: 'gmail-2-q2-c', textEn: 'Send the email', textZh: '发送电子邮件' },
              { id: 'gmail-2-q2-d', textEn: 'Attach a file', textZh: '附加文件' }
            ],
            correctAnswer: 'gmail-2-q2-d',
            explanationEn: 'The paperclip icon lets you attach files such as photos or documents to your email.',
            explanationZh: '回形针图标允许您将文件（如照片或文档）附加到电子邮件中。',
            points: 10,
          },
          {
            id: 'gmail-2-q3',
            type: 'multiple-choice',
            questionEn: 'If you want to send the same email to a friend and your family, what should you do?',
            questionZh: '如果您想向朋友和家人发送同一封电子邮件，您应该做什么？',
            options: [
              { id: 'gmail-2-q4-a', textEn: 'Write two separate emails', textZh: '写两封单独的电子邮件' },
              { id: 'gmail-2-q4-b', textEn: 'Use "Forward"', textZh: '使用"转发"' },
              { id: 'gmail-2-q4-c', textEn: 'Add multiple recipients in the "To" field', textZh: '在"收件人"字段中添加多个收件人' },
              { id: 'gmail-2-q4-d', textEn: 'Delete the email', textZh: '删除电子邮件' }
            ],
            correctAnswer: 'gmail-2-q4-c',
            explanationEn: 'You can type more than one email address in the "To" field to send to multiple people at once.',
            explanationZh: '您可以在"收件人"字段中输入多个电子邮件地址，以便一次发送给多个人。',
            points: 10,
          }
        ],
      },
    },
    {
      id: 'lesson-gmail-3',
      moduleId: 'module-gmail',
      order: 3,
      titleEn: 'Reading and Replying',
      titleZh: '阅读和回复',
      descriptionEn: 'Learn how to read emails and respond appropriately',
      descriptionZh: '学习如何阅读邮件并适当回复',
      contentType: 'practice',
      estimatedMinutes: 12,
      requiredScore: 80,
      steps: [],
      quiz: {
        id: 'quiz-gmail-3',
        lessonId: 'lesson-gmail-3',
        passingScore: 80,
        questions: [
          {
            id: 'gmail-3-q1',
            type: 'multiple-choice',
            questionEn: 'You read your friend\'s email and want to respond. What is the fastest way?',
            questionZh: '您阅读了朋友的电子邮件并想回复。最快的方法是什么？',
            options: [
              { id: 'gmail-3-q1-a', textEn: 'Write a letter', textZh: '写一封信' },
              { id: 'gmail-3-q1-b', textEn: 'Call them instead', textZh: '打电话给他们' },
              { id: 'gmail-3-q1-c', textEn: 'Tap the Reply button', textZh: '点击回复按钮' },
              { id: 'gmail-3-q1-d', textEn: 'Create a new email from Compose', textZh: '从撰写创建新电子邮件' }
            ],
            correctAnswer: 'gmail-3-q1-c',
            explanationEn: 'The Reply button is the fastest way to respond. It automatically fills in the recipient\'s address and keeps the conversation together.',
            explanationZh: '回复按钮是回应的最快方式。它会自动填写收件人地址并将对话保持在一起。',
            points: 10,
          },
          {
            id: 'gmail-3-q2',
            type: 'multiple-choice',
            questionEn: 'What happens when you click "Reply" on an email?',
            questionZh: '当您点击电子邮件上的"回复"时会发生什么？',
            options: [
              { id: 'gmail-3-q2-a', textEn: 'You send the email to everyone', textZh: '您将电子邮件发送给所有人' },
              { id: 'gmail-3-q2-b', textEn: 'You write back to the sender', textZh: '您回复发件人' },
              { id: 'gmail-3-q2-c', textEn: 'You delete the email', textZh: '您删除电子邮件' },
              { id: 'gmail-3-q2-d', textEn: 'You mark the email as spam', textZh: '您将电子邮件标记为垃圾邮件' }
            ],
            correctAnswer: 'gmail-3-q2-b',
            explanationEn: 'Reply lets you send a message back to the person who emailed you.',
            explanationZh: '回复允许您向给您发送电子邮件的人发送消息。',
            points: 10,
          }
        ],
      },
    },
    {
      id: 'lesson-gmail-4',
      moduleId: 'module-gmail',
      order: 4,
      titleEn: 'Organizing Your Inbox',
      titleZh: '整理收件箱',
      descriptionEn: 'Keep your inbox tidy with labels and folders',
      descriptionZh: '使用标签和文件夹保持收件箱整洁',
      contentType: 'tutorial',
      estimatedMinutes: 10,
      requiredScore: 80,
      steps: [],
      quiz: {
        id: 'quiz-gmail-4',
        lessonId: 'lesson-gmail-4',
        passingScore: 80,
        questions: [
          {
            id: 'gmail-4-q1',
            type: 'multiple-choice',
            questionEn: 'If you receive an unwanted email, what can you do?',
            questionZh: '如果您收到不需要的电子邮件，您可以做什么？',
            options: [
              { id: 'gmail-4-q1-a', textEn: 'Reply to it', textZh: '回复它' },
              { id: 'gmail-4-q1-b', textEn: 'Forward it to everyone', textZh: '转发给所有人' },
              { id: 'gmail-4-q1-c', textEn: 'Ignore Gmail', textZh: '忽略Gmail' },
              { id: 'gmail-4-q1-d', textEn: 'Mark it as spam', textZh: '标记为垃圾邮件' }
            ],
            correctAnswer: 'gmail-4-q1-d',
            explanationEn: 'You can mark the email as spam so Gmail filters similar messages in the future.',
            explanationZh: '您可以将电子邮件标记为垃圾邮件，以便Gmail在将来过滤类似的消息。',
            points: 10,
          },
          {
            id: 'gmail-4-q2',
            type: 'multiple-choice',
            questionEn: 'Which button lets you remove an email from your Inbox?',
            questionZh: '哪个按钮可以让您从收件箱中删除电子邮件？',
            options: [
              { id: 'gmail-4-q2-a', textEn: 'Compose', textZh: '撰写' },
              { id: 'gmail-4-q2-b', textEn: 'Delete/Trash', textZh: '删除/垃圾箱' },
              { id: 'gmail-4-q2-c', textEn: 'Forward', textZh: '转发' },
              { id: 'gmail-4-q2-d', textEn: 'Attach', textZh: '附加' }
            ],
            correctAnswer: 'gmail-4-q2-b',
            explanationEn: 'The Trash/Delete button moves unwanted emails out of your Inbox.',
            explanationZh: '垃圾箱/删除按钮将不需要的电子邮件移出收件箱。',
            points: 10,
          }
        ],
      },
    },
  ],
  badge: badges.find((b) => b.id === 'badge-gmail'),
};

// Module 2: Google Search

const searchModule: Module = {
  id: 'module-search',
  titleEn: 'Google Search',
  titleZh: 'Google 搜索',
  descriptionEn: 'Find anything online with effective search techniques',
  descriptionZh: '使用有效的搜索技巧在网上查找任何内容',
  icon: '🔍',
  order: 2,
  lessons: [
    {
      id: 'lesson-search-1',
      moduleId: 'module-search',
      order: 1,
      titleEn: 'Google Search Basics',
      titleZh: '谷歌搜索基础',
      descriptionEn: 'Learn to use autocomplete and search for weather, news, clinics, and recipes',
      descriptionZh: '学习使用自动完成并搜索天气、新闻、诊所和食谱',
      contentType: 'simulation',
      estimatedMinutes: 2,
      requiredScore: 80,
      steps: [],
      quiz: {
        id: 'quiz-search-1',
        lessonId: 'lesson-search-1',
        passingScore: 80,
        questions: [
          {
            id: 'search-1-q1',
            type: 'multiple-choice',
            questionEn: 'When you tap the search bar, what appears to help you?',
            questionZh: '当您点击搜索栏时，会出现什么来帮助您？',
            options: [
              { id: 'search-1-q1-a', textEn: 'Keyboard', textZh: '键盘' },
              { id: 'search-1-q1-b', textEn: 'Suggestions like Weather, News, Clinics, Recipes', textZh: '建议，如天气、新闻、诊所、食谱' },
              { id: 'search-1-q1-c', textEn: 'Results immediately', textZh: '立即显示结果' },
              { id: 'search-1-q1-d', textEn: 'Nothing', textZh: '什么都没有' }
            ],
            correctAnswer: 'search-1-q1-b',
            explanationEn: 'When you tap the search bar, Google shows helpful suggestions like Weather, News, Clinics, and Recipes to make searching faster and easier.',
            explanationZh: '当您点击搜索栏时，谷歌会显示有用的建议，如天气、新闻、诊所和食谱，使搜索更快更容易。',
            points: 10,
          },
          {
            id: 'search-1-q2',
            type: 'multiple-choice',
            questionEn: 'What does the magnifying glass button do?',
            questionZh: '放大镜按钮是做什么的？',
            options: [
              { id: 'search-1-q2-a', textEn: 'Opens camera', textZh: '打开相机' },
              { id: 'search-1-q2-b', textEn: 'Starts the search', textZh: '开始搜索' },
              { id: 'search-1-q2-c', textEn: 'Clears text', textZh: '清除文本' },
              { id: 'search-1-q2-d', textEn: 'Goes back', textZh: '返回' }
            ],
            correctAnswer: 'search-1-q2-b',
            explanationEn: 'The magnifying glass button starts your search and shows you the results for what you typed or selected.',
            explanationZh: '放大镜按钮开始您的搜索并显示您输入或选择的内容的结果。',
            points: 10,
          },
          {
            id: 'search-1-q3',
            type: 'multiple-choice',
            questionEn: 'Which of these can you search for using Google?',
            questionZh: '您可以使用谷歌搜索以下哪些内容？',
            options: [
              { id: 'search-1-q3-a', textEn: 'Only weather', textZh: '只有天气' },
              { id: 'search-1-q3-b', textEn: 'Only news', textZh: '只有新闻' },
              { id: 'search-1-q3-c', textEn: 'Weather, news, clinics, recipes', textZh: '天气、新闻、诊所、食谱' },
              { id: 'search-1-q3-d', textEn: 'Nothing', textZh: '什么都没有' }
            ],
            correctAnswer: 'search-1-q3-c',
            explanationEn: 'Google Search is very powerful! You can search for many things including weather, news, nearby clinics, cooking recipes, and much more.',
            explanationZh: '谷歌搜索非常强大！您可以搜索很多东西，包括天气、新闻、附近的诊所、烹饪食谱等等。',
            points: 10,
          }
        ],
      },
    },
    {
      id: 'lesson-search-2',
      moduleId: 'module-search',
      order: 2,
      titleEn: 'Voice Search',
      titleZh: '语音搜索',
      descriptionEn: 'Learn to search using your voice',
      descriptionZh: '学习使用语音搜索',
      contentType: 'simulation',
      estimatedMinutes: 2,
      requiredScore: 80,
      steps: [],
      quiz: {
        id: 'quiz-search-2',
        lessonId: 'lesson-search-2',
        passingScore: 80,
        questions: [
          {
            id: 'search-2-q1',
            type: 'multiple-choice',
            questionEn: 'Where is the microphone icon located?',
            questionZh: '麦克风图标在哪里？',
            options: [
              { id: 'search-2-q1-a', textEn: 'Left side of search bar', textZh: '搜索栏左侧' },
              { id: 'search-2-q1-b', textEn: 'Right side of search bar', textZh: '搜索栏右侧' },
              { id: 'search-2-q1-c', textEn: 'At the bottom', textZh: '在底部' },
              { id: 'search-2-q1-d', textEn: 'At the top', textZh: '在顶部' }
            ],
            correctAnswer: 'search-2-q1-b',
            explanationEn: 'The microphone icon is on the right side of the search bar. You can tap it to start voice search.',
            explanationZh: '麦克风图标在搜索栏的右侧。您可以点击它开始语音搜索。',
            points: 10,
          },
          {
            id: 'search-2-q2',
            type: 'multiple-choice',
            questionEn: 'After tapping the microphone, what should you do?',
            questionZh: '点击麦克风后，您应该做什么？',
            options: [
              { id: 'search-2-q2-a', textEn: 'Type your search', textZh: '输入您的搜索' },
              { id: 'search-2-q2-b', textEn: 'Wait silently', textZh: '静静地等待' },
              { id: 'search-2-q2-c', textEn: 'Speak your search', textZh: '说出您的搜索' },
              { id: 'search-2-q2-d', textEn: 'Tap search button', textZh: '点击搜索按钮' }
            ],
            correctAnswer: 'search-2-q2-c',
            explanationEn: 'After tapping the microphone, speak clearly what you want to search for. Google will listen and search for you.',
            explanationZh: '点击麦克风后，清楚地说出您想搜索的内容。谷歌会听到并为您搜索。',
            points: 10,
          },
          {
            id: 'search-2-q3',
            type: 'multiple-choice',
            questionEn: 'Voice search is most helpful for people who:',
            questionZh: '语音搜索对以下哪些人最有帮助：',
            options: [
              { id: 'search-2-q3-a', textEn: 'Type very fast', textZh: '打字非常快' },
              { id: 'search-2-q3-b', textEn: 'Have difficulty typing', textZh: '打字困难' },
              { id: 'search-2-q3-c', textEn: 'Do not have a phone', textZh: '没有手机' },
              { id: 'search-2-q3-d', textEn: 'Do not want results', textZh: '不想要结果' }
            ],
            correctAnswer: 'search-2-q3-b',
            explanationEn: 'Voice search is especially helpful for people who have difficulty typing or find typing slow. Speaking is often faster and easier!',
            explanationZh: '语音搜索对打字困难或觉得打字慢的人特别有帮助。说话通常更快更容易！',
            points: 10,
          }
        ],
      },
    },
    {
      id: 'lesson-search-3',
      moduleId: 'module-search',
      order: 3,
      titleEn: 'Filter & Refine Results',
      titleZh: '筛选和优化结果',
      descriptionEn: 'Learn to switch between different result types',
      descriptionZh: '学习在不同结果类型之间切换',
      contentType: 'simulation',
      estimatedMinutes: 2,
      requiredScore: 80,
      steps: [],
      quiz: {
        id: 'quiz-search-3',
        lessonId: 'lesson-search-3',
        passingScore: 80,
        questions: [
          {
            id: 'search-3-q1',
            type: 'multiple-choice',
            questionEn: 'What are the three result tabs you learned?',
            questionZh: '您学到的三个结果标签是什么？',
            options: [
              { id: 'search-3-q1-a', textEn: 'Home, Settings, Help', textZh: '主页、设置、帮助' },
              { id: 'search-3-q1-b', textEn: 'All, Images, News', textZh: '全部、图片、新闻' },
              { id: 'search-3-q1-c', textEn: 'Search, Voice, Filter', textZh: '搜索、语音、过滤' },
              { id: 'search-3-q1-d', textEn: 'Today, Tomorrow, Week', textZh: '今天、明天、周' }
            ],
            correctAnswer: 'search-3-q1-b',
            explanationEn: 'The three tabs are: All (shows all types of results), Images (shows only pictures), and News (shows news articles).',
            explanationZh: '三个标签是：全部（显示所有类型的结果）、图片（仅显示图片）和新闻（显示新闻文章）。',
            points: 10,
          },
          {
            id: 'search-3-q2',
            type: 'multiple-choice',
            questionEn: 'What does the Images tab show?',
            questionZh: '图片标签显示什么？',
            options: [
              { id: 'search-3-q2-a', textEn: 'Text results only', textZh: '只有文本结果' },
              { id: 'search-3-q2-b', textEn: 'Weather only', textZh: '只有天气' },
              { id: 'search-3-q2-c', textEn: 'Pictures related to your search', textZh: '与您搜索相关的图片' },
              { id: 'search-3-q2-d', textEn: 'News articles', textZh: '新闻文章' }
            ],
            correctAnswer: 'search-3-q2-c',
            explanationEn: 'The Images tab shows you pictures and photos related to what you searched for. This is useful when you want to see visual results.',
            explanationZh: '图片标签显示与您搜索内容相关的图片和照片。当您想看到视觉结果时，这很有用。',
            points: 10,
          },
          {
            id: 'search-3-q3',
            type: 'multiple-choice',
            questionEn: 'What does the refresh button do?',
            questionZh: '刷新按钮是做什么的？',
            options: [
              { id: 'search-3-q3-a', textEn: 'Deletes all results', textZh: '删除所有结果' },
              { id: 'search-3-q3-b', textEn: 'Updates the results', textZh: '更新结果' },
              { id: 'search-3-q3-c', textEn: 'Goes back to homepage', textZh: '返回主页' },
              { id: 'search-3-q3-d', textEn: 'Opens a new tab', textZh: '打开新标签' }
            ],
            correctAnswer: 'search-3-q3-b',
            explanationEn: 'The refresh button updates your search results to show the latest and most current information available.',
            explanationZh: '刷新按钮更新您的搜索结果以显示最新和最新的可用信息。',
            points: 10,
          },
          {
            id: 'search-3-q4',
            type: 'multiple-choice',
            questionEn: 'When should you use the News tab?',
            questionZh: '您应该何时使用新闻标签？',
            options: [
              { id: 'search-3-q4-a', textEn: 'When you want to see pictures', textZh: '当您想看图片时' },
              { id: 'search-3-q4-b', textEn: 'When you want to read news articles', textZh: '当您想阅读新闻文章时' },
              { id: 'search-3-q4-c', textEn: 'When you want to search for weather', textZh: '当您想搜索天气时' },
              { id: 'search-3-q4-d', textEn: 'When you want to delete results', textZh: '当您想删除结果时' }
            ],
            correctAnswer: 'search-3-q4-b',
            explanationEn: 'Use the News tab when you want to read news articles and current events related to your search topic.',
            explanationZh: '当您想阅读与您的搜索主题相关的新闻文章和时事时，请使用新闻标签。',
            points: 10,
          }
        ],
      },
    },
  ],
  badge: badges.find((b) => b.id === 'badge-search'),
};

// Module 3: Google Maps
const mapsModule: Module = {
  id: 'module-maps',
  titleEn: 'Google Maps',
  titleZh: 'Google 地图',
  descriptionEn: 'Navigate anywhere with Google Maps',
  descriptionZh: '使用 Google 地图导航任何地方',
  icon: '🗺️',
  order: 3,
  lessons: [
    {
      id: 'lesson-maps-1',
      moduleId: 'module-maps',
      order: 1,
      titleEn: 'Finding Places',
      titleZh: '查找地点',
      descriptionEn: 'Search for locations and addresses',
      descriptionZh: '搜索位置和地址',
      contentType: 'tutorial',
      estimatedMinutes: 10,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-maps-1', lessonId: 'lesson-maps-1', passingScore: 80, questions: [] },
    },
    {
      id: 'lesson-maps-2',
      moduleId: 'module-maps',
      order: 2,
      titleEn: 'Getting Directions',
      titleZh: '获取路线',
      descriptionEn: 'Learn to navigate from A to B',
      descriptionZh: '学习从 A 到 B 导航',
      contentType: 'simulation',
      estimatedMinutes: 12,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-maps-2', lessonId: 'lesson-maps-2', passingScore: 80, questions: [] },
    },
    {
      id: 'lesson-maps-3',
      moduleId: 'module-maps',
      order: 3,
      titleEn: 'Using Street View',
      titleZh: '使用街景视图',
      descriptionEn: 'Explore places with Street View',
      descriptionZh: '使用街景视图探索地点',
      contentType: 'practice',
      estimatedMinutes: 10,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-maps-3', lessonId: 'lesson-maps-3', passingScore: 80, questions: [] },
    },
    {
      id: 'lesson-maps-4',
      moduleId: 'module-maps',
      order: 4,
      titleEn: 'Saving Favorite Places',
      titleZh: '保存喜爱的地点',
      descriptionEn: 'Create lists of your favorite locations',
      descriptionZh: '创建您喜爱的位置列表',
      contentType: 'tutorial',
      estimatedMinutes: 8,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-maps-4', lessonId: 'lesson-maps-4', passingScore: 80, questions: [] },
    },
  ],
  badge: badges.find((b) => b.id === 'badge-maps'),
};

// Module 4: Online Safety
const safetyModule: Module = {
  //The unique id for module 4.
  id: 'module-safety',
  titleEn: 'Online Safety',
  titleZh: '网络安全',
  descriptionEn: 'Stay safe and secure online',
  descriptionZh: '保持在线安全',
  icon: '🛡️',
  order: 4,
  lessons: [
    {
      id: 'lesson-safety-1',
      moduleId: 'module-safety',
      order: 1,
      titleEn: 'Creating Strong Passwords',
      titleZh: '创建强密码',
      descriptionEn: 'Learn to create and manage secure passwords',
      descriptionZh: '学习创建和管理安全密码',
      contentType: 'tutorial',
      estimatedMinutes: 12,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-safety-1', lessonId: 'lesson-safety-1', passingScore: 80, questions: [] },
    },
    {
      id: 'lesson-safety-2',
      moduleId: 'module-safety',
      order: 2,
      titleEn: 'Recognizing Scams',
      titleZh: '识别诈骗',
      descriptionEn: 'Identify and avoid online scams',
      descriptionZh: '识别和避免在线诈骗',
      contentType: 'tutorial',
      estimatedMinutes: 15,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-safety-2', lessonId: 'lesson-safety-2', passingScore: 80, questions: [] },
    },
    {
      id: 'lesson-safety-3',
      moduleId: 'module-safety',
      order: 3,
      titleEn: 'Spotting Fake Websites',
      titleZh: '识别虚假网站',
      descriptionEn: 'Learn to identify fake online stores and unsafe URLs',
      descriptionZh: '学习识别虚假网店和不安全的网址',
      contentType: 'simulation',
      estimatedMinutes: 5,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-safety-3', lessonId: 'lesson-safety-3', passingScore: 80, questions: [] },
    },
    {
      id: 'lesson-safety-4',
      moduleId: 'module-safety',
      order: 4,
      titleEn: 'Spotting Phishing Emails',
      titleZh: '识别网络钓鱼邮件',
      descriptionEn: 'Spot unusual emails',
      descriptionZh: '识别异常邮件',
      contentType: 'tutorial',
      estimatedMinutes: 12,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-safety-4', lessonId: 'lesson-safety-4', passingScore: 80, questions: [] },
    },
  ],
  badge: badges.find((b) => b.id === 'badge-safety'),
};

// Module 5: Smartphone Basics
const smartphoneModule: Module = {
  id: 'module-smartphone',
  titleEn: 'Smartphone Basics',
  titleZh: '智能手机基础',
  descriptionEn: 'Master your smartphone essentials',
  descriptionZh: '掌握智能手机基础知识',
  icon: '📱',
  order: 5,
  lessons: [
  {
    id: 'lesson-smartphone-1',
    moduleId: 'module-smartphone',
    order: 1,
    titleEn: 'Control Center Basics',
    titleZh: '控制中心基础',
    descriptionEn: 'Learn how to use Control Center tools like Wi-Fi, flashlight, and brightness',
    descriptionZh: '学习使用控制中心中的 Wi-Fi、手电筒和亮度',
    contentType: 'simulation',
    estimatedMinutes: 12,
    requiredScore: 80,
    steps: [],
    quiz: {
      id: 'quiz-smartphone-1',
      lessonId: 'lesson-smartphone-1',
      passingScore: 80,
      questions: [],
    },
  },
  {
    id: 'lesson-smartphone-2',
    moduleId: 'module-smartphone',
    order: 2,
    titleEn: 'Connecting to Wi-Fi',
    titleZh: '连接 Wi-Fi',
    descriptionEn: 'Practice selecting a network and connecting to Wi-Fi',
    descriptionZh: '练习选择网络并连接 Wi-Fi',
    contentType: 'simulation',
    estimatedMinutes: 10,
    requiredScore: 80,
    steps: [],
    quiz: {
      id: 'quiz-smartphone-2',
      lessonId: 'lesson-smartphone-2',
      passingScore: 80,
      questions: [],
    },
  },
  {
    id: 'lesson-smartphone-3',
    moduleId: 'module-smartphone',
    order: 3,
    titleEn: 'Settings – Text Size',
    titleZh: '设置 – 文字大小',
    descriptionEn: 'Change text size using Settings personalization',
    descriptionZh: '通过设置个性化调整文字大小',
    contentType: 'simulation',
    estimatedMinutes: 10,
    requiredScore: 80,
    steps: [],
    quiz: {
      id: 'quiz-smartphone-3',
      lessonId: 'lesson-smartphone-3',
      passingScore: 80,
      questions: [],
    },
  },
  {
    id: 'lesson-smartphone-4',
    moduleId: 'module-smartphone',
    order: 4,
    titleEn: 'Managing Apps & Storage',
    titleZh: '管理应用与储存空间',
    descriptionEn: 'Learn how to uninstall apps and free storage space',
    descriptionZh: '学习卸载应用并释放储存空间',
    contentType: 'simulation',
    estimatedMinutes: 12,
    requiredScore: 80,
    steps: [],
    quiz: {
      id: 'quiz-smartphone-4',
      lessonId: 'lesson-smartphone-4',
      passingScore: 80,
      questions: [],
    },
  },
],
  badge: badges.find((b) => b.id === 'badge-smartphone'),
};

// Module 6: Everyday Tools
const toolsModule: Module = {
  id: 'module-tools',
  titleEn: 'Everyday Tools',
  titleZh: '日常工具',
  descriptionEn: 'Use digital tools for daily tasks',
  descriptionZh: '使用数字工具完成日常任务',
  icon: '🛠️',
  order: 6,
  lessons: [
    {
      id: 'lesson-tools-1',
      moduleId: 'module-tools',
      order: 1,
      titleEn: 'Calendar and Events',
      titleZh: '日历和事件',
      descriptionEn: 'Manage your schedule',
      descriptionZh: '管理您的日程',
      contentType: 'tutorial',
      estimatedMinutes: 10,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-tools-1', lessonId: 'lesson-tools-1', passingScore: 80, questions: [] },
    },
    {
      id: 'lesson-tools-2',
      moduleId: 'module-tools',
      order: 2,
      titleEn: 'Video Calls',
      titleZh: '视频通话',
      descriptionEn: 'Connect with family via video',
      descriptionZh: '通过视频与家人联系',
      contentType: 'simulation',
      estimatedMinutes: 15,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-tools-2', lessonId: 'lesson-tools-2', passingScore: 80, questions: [] },
    },
    {
      id: 'lesson-tools-3',
      moduleId: 'module-tools',
      order: 3,
      titleEn: 'Weather and News',
      titleZh: '天气和新闻',
      descriptionEn: 'Stay informed about weather and news',
      descriptionZh: '了解天气和新闻',
      contentType: 'practice',
      estimatedMinutes: 8,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-tools-3', lessonId: 'lesson-tools-3', passingScore: 80, questions: [] },
    },
    {
      id: 'lesson-tools-4',
      moduleId: 'module-tools',
      order: 4,
      titleEn: 'Banking Apps',
      titleZh: '银行应用',
      descriptionEn: 'Manage finances safely online',
      descriptionZh: '在线安全管理财务',
      contentType: 'tutorial',
      estimatedMinutes: 15,
      requiredScore: 80,
      steps: [],
      quiz: { id: 'quiz-tools-4', lessonId: 'lesson-tools-4', passingScore: 80, questions: [] },
    },
  ],
  badge: badges.find((b) => b.id === 'badge-tools'),
};

// Export all modules
export const modules: Module[] = [
  gmailModule,
  searchModule,
  mapsModule,
  safetyModule,
  smartphoneModule,
  toolsModule,
];

// Helper functions
export const getModuleById = (id: string): Module | undefined => {
  return modules.find((m) => m.id === id);
};

export const getLessonById = (lessonId: string): { module: Module; lesson: any } | undefined => {
  for (const module of modules) {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return { module, lesson };
    }
  }
  return undefined;
};

export const getNextLesson = (currentLessonId: string): any | undefined => {
  const current = getLessonById(currentLessonId);
  if (!current) return undefined;

  const { module, lesson } = current;
  const nextInModule = module.lessons.find((l) => l.order === lesson.order + 1);

  if (nextInModule) return nextInModule;

  // Find next module's first lesson
  const nextModule = modules.find((m) => m.order === module.order + 1);
  return nextModule?.lessons[0];
};
