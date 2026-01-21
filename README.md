# TechWise# 🎓 Elderly Learning App

A Progressive Web App (PWA) designed to teach digital skills to seniors through interactive lessons and gamification.

## 📋 Project Overview

**Platform**: React Web (PWA)  
**Tech Stack**: Vite + React + TypeScript + Tailwind CSS + Firebase  
**Modules**: 6 learning modules  
**Lessons**: 24 interactive lessons (4 per module)  
**Badges**: 15 achievement badges  
**Languages**: English & Chinese (Bilingual)

## 🚀 Features

### Learning System
- ✅ **6 Comprehensive Modules**:
  1. Gmail Basics (4 lessons)
  2. Google Search (4 lessons)
  3. Google Maps (4 lessons)
  4. Online Safety (4 lessons)
  5. Smartphone Basics (4 lessons)
  6. Everyday Tools (4 lessons)

### Gamification
- 🎯 **Points System**:
  - Base: 30 points per lesson completion
  - Per correct answer: +5 points
  - Perfect score bonus: +20 points
- 🏆 **15 Badges** for various achievements
- 🔓 **Sequential Unlocking** (one lesson at a time)
- 📊 **Progress Tracking** with visual indicators

### User Experience
- 🌐 **Bilingual** - English/Chinese support
- ♿ **Senior-Friendly Design**:
  - Large text (18px base)
  - High contrast
  - 44px minimum touch targets
  - Simple navigation
- 💾 **Offline Support** with IndexedDB

### Technical Features
- 🔥 Firebase Authentication & Firestore
- 📦 Offline-first with localforage
- 🌍 i18next for internationalization
- 🚀 Fast development with Vite

## 📁 Project Structure

```
elderly-learning-app/
├── src/
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── lesson/          # Lesson-specific components
│   │   ├── module/          # Module-specific components
│   │   ├── quiz/            # Quiz components
│   │   └── badge/           # Badge components
│   ├── contexts/            # React contexts (ProgressContext)
│   ├── hooks/               # Custom React hooks
│   ├── config/              # Configuration files
│   │   ├── firebase.ts      # Firebase setup
│   │   └── i18n.ts          # i18n configuration
│   ├── data/                # Static data
│   │   └── modules.ts       # Modules & lessons data
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   ├── Module/
│   │   ├── Lesson/
│   │   ├── Progress/
│   │   └── Settings/
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles (Tailwind)
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
cd elderly-learning-app
npm install
```

### 2. Configure Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Get your Firebase configuration
5. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

6. Fill in your Firebase credentials in `.env`

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#0ea5e9) - For CTAs and highlights
- **Success**: Green (#22c55e) - For completion states
- **Gray Scale**: For text and backgrounds

### Typography (Senior-Friendly)
- `senior-xs`: 16px (1rem)
- `senior-sm`: 18px (1.125rem)
- `senior-base`: 20px (1.25rem) - Default
- `senior-lg`: 24px (1.5rem)
- `senior-xl`: 30px (1.875rem)
- `senior-2xl`: 36px (2.25rem)

### Components
- **Buttons**: Minimum 44px height/width
- **Cards**: Rounded corners, shadow, hover effects
- **Progress Bars**: Two-tone gradient (iOS style)

## 📊 Data Structure

### Modules
Each module contains:
- ID, title (EN/ZH), description (EN/ZH)
- Icon emoji
- 4 lessons
- Associated badge

### Lessons
Each lesson contains:
- ID, title (EN/ZH), description (EN/ZH)
- Content type (simulation/tutorial/practice)
- Estimated minutes
- Steps (content)
- Quiz (questions)
- Required passing score (80%)

### Progress Tracking
- Completed lessons
- Unlocked lessons (sequential)
- Scores per lesson
- Total points
- Earned badges
- Learning streak
- User preferences

## 🎮 Points System

| Action | Points |
|--------|--------|
| Complete lesson | 30 (base) |
| Correct answer | +5 each |
| Perfect score (100%) | +20 bonus |
| **Example**: 5/5 correct | 30 + (5×5) + 20 = **75 points** |

## 🏆 Badge System

**15 Total Badges**:
- 6 Module completion badges
- 9 Achievement badges:
  - First Steps (first lesson)
  - Perfect 10 (10 perfect scores)
  - Week Warrior (7-day streak)
  - Month Champion (30-day streak)
  - Half Way There (12 lessons)
  - Master Graduate (all modules)
  - Quick Learner (5 lessons/day)
  - Perfectionist (perfect module)
  - Patient Learner (steady progress)

## 🔐 Quiz System

- **Passing Score**: 80%
- **Question Types**: Multiple choice, true/false, interactive
- **Points**: 5 per correct answer
- **Retakes**: Unlimited
- **Unlock**: Must pass to unlock next lesson

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard

### Deploy to Other Platforms
- **Netlify**: Connect GitHub repo
- **Firebase Hosting**: `firebase deploy`
- **GitHub Pages**: Build and deploy `/dist` folder

## 📱 PWA Features

- **Installable**: Add to home screen
- **Offline Support**: Cache assets with service worker
- **Background Sync**: Sync progress when online
- **Push Notifications**: (Future feature)

## 🔄 Next Steps

### Phase 1: Core Content (Current)
- ✅ Project setup
- ✅ Basic routing
- ✅ Progress tracking
- ✅ Module/lesson structure
- 🔄 Implement lesson content
- 🔄 Build quiz components

### Phase 2: Interactive Features
- [ ] Hybrid simulation overlays
- [ ] Interactive tutorials
- [ ] Real screenshot integration
- [ ] Video support

### Phase 3: Advanced Features
- [ ] Firebase authentication
- [ ] Cloud sync
- [ ] Social features (leaderboards)
- [ ] Analytics dashboard
- [ ] Content management system

### Phase 4: Polish
- [ ] Animations
- [ ] Sound effects
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] User testing with seniors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (especially with seniors!)
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For questions or issues:
- Create an issue on GitHub
- Email: support@elderlylearning.app (replace with actual)

## 🙏 Acknowledgments

Built with ❤️ for seniors learning digital skills.

---

**Version**: 1.0.0  
**Last Updated**: November 2025
