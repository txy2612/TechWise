# 📚 Elderly Learning App - Digital Skills for Seniors

A **React PWA** designed to teach seniors essential digital skills through interactive lessons, simulations, and quizzes.

---

## 🎯 Features

✅ **6 Learning Modules** with 24 interactive lessons  
✅ **Google Sign-In Authentication**  
✅ **Interactive Simulations** (Gmail, Google Maps, Smartphone UI)  
✅ **Quiz System** with instant feedback  
✅ **Badge & Points System** with celebrations  
✅ **Bilingual Support** (English/Chinese)  
✅ **Progress Tracking** with Firebase  
✅ **Offline Support** via IndexedDB  
✅ **Senior-Friendly UI** (large fonts, high contrast, simple navigation)

---

## 📦 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (custom colors for seniors)
- **Routing**: React Router v6
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Google Sign-In)
- **Icons**: Lucide React
- **Animations**: canvas-confetti
- **i18n**: react-i18next
- **Offline**: IndexedDB (idb)

---

## 🚀 Quick Start

### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Set Up Firebase**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Google Sign-In** in Authentication
4. Create a **Firestore Database** (start in production mode)
5. Copy your Firebase config

### 3. **Configure Environment Variables**

```bash
cp .env.example .env
```

Then edit `.env` and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 5. **Build for Production**

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or your hosting provider.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── badges/          # Badge celebration modals
│   ├── quiz/            # Quiz component
│   └── simulations/     # Interactive lessons (Gmail, Maps, etc.)
├── config/
│   ├── firebase.ts      # Firebase configuration
│   └── i18n.ts          # Internationalization setup
├── contexts/
│   ├── AuthContext.tsx  # Google authentication
│   └── ProgressContext.tsx # User progress tracking
├── data/
│   └── modules.ts       # All 6 modules + 24 lessons
├── pages/
│   ├── Auth/            # Login page
│   ├── Dashboard/       # Main dashboard (module cards)
│   ├── Module/          # Module overview (lesson list)
│   ├── Lesson/          # Individual lesson pages
│   └── Settings/        # User settings
├── types/
│   └── index.ts         # TypeScript types
└── App.tsx              # Main app with routing
```

---

## 🎮 Implemented Features (Phase 1)

### ✅ Core Systems
- [x] Google Sign-In authentication
- [x] Firebase Firestore integration
- [x] Progress tracking (lessons, scores, badges)
- [x] Points system (30 base + 5 per correct + 20 perfect bonus)
- [x] Sequential lesson unlocking
- [x] Bilingual support (EN/CN)

### ✅ UI Components
- [x] Dashboard with colorful module cards (matches your design)
- [x] Module overview with lesson list
- [x] Quiz system with scoring (80% passing)
- [x] Badge modal with confetti animation
- [x] Progress bars (two-tone iOS style)

### ✅ Interactive Lessons
- [x] **Gmail Compose Simulation** (fully interactive)
  - Step-by-step guidance with arrows
  - Fake Gmail UI
  - Practice mode banner
- [x] Framework for other simulations (Google Maps, Smartphone, etc.)

---

## 📝 Remaining Work (Phase 2)

### 🔄 To Be Implemented

1. **Complete 22 Remaining Interactive Lessons**
   - Use `GmailCompose.tsx` as a template
   - Each lesson needs:
     - Fake UI matching the real app
     - Step-by-step interactive guidance
     - Arrow animations and hand icons
     - Success celebrations

2. **Add Quiz Questions**
   - Currently only 1 sample question per module
   - Need 4-6 questions per module quiz
   - See `modules.ts` for structure

3. **Implement Specific Simulations**
   - Google Search (interactive search bar)
   - Google Maps (navigation steps)
   - Phishing identification game
   - Smartphone Control Center
   - Voice Assistant tutorial

4. **Settings Page**
   - Language toggle (functional)
   - Font size adjustment
   - Theme switching
   - Sound effects toggle

5. **Badge System Enhancement**
   - Check for earned badges after each lesson
   - Display badge collection page
   - Show locked/unlocked badges

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#1976D2` | Buttons, active states |
| Success Green | `#4CAF50` | Passed quizzes, checkmarks |
| Gold | `#FFD700` | Badges, achievements |
| Module Colors | Various | Gmail: `#FF7043`, Maps: `#26A69A`, etc. |

### Typography
- **Font**: Roboto
- **Base Size**: 20px (seniors need larger text)
- **Sizes**: `senior-sm`, `senior-base`, `senior-lg`, `senior-xl`, `senior-2xl`

### Animations
- **Pulse Arrow**: Guides user attention
- **Float Up**: Badge reveal animation
- **Shake**: Module unlock effect
- **Confetti**: canvas-confetti library

---

## 🔧 How to Add a New Interactive Lesson

### Example: Adding "Google Search Simulation"

1. **Create simulation component**:

```tsx
// src/components/simulations/GoogleSearchSimulation.tsx
import { useState } from 'react';
import { Hand, ArrowDown } from 'lucide-react';

interface GoogleSearchProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

const GoogleSearchSimulation: React.FC<GoogleSearchProps> = ({ onComplete, language }) => {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Step 0: Show Google homepage with search bar
  // Step 1: User types in search bar
  // Step 2: User clicks "Search" button

  return (
    <div className="max-w-4xl mx-auto">
      {/* Practice banner */}
      <div className="practice-banner text-center mb-6">
        ⚡ Practice Mode
      </div>

      {/* Fake Google UI */}
      <div className="card bg-white">
        {/* Step-based content here */}
      </div>
    </div>
  );
};

export default GoogleSearchSimulation;
```

2. **Add to LessonPage**:

```tsx
// In src/pages/Lesson/LessonPageNew.tsx
import GoogleSearchSimulation from '../components/simulations/GoogleSearchSimulation';

// In renderLessonContent():
if (lesson.id === 'lesson-search-1') {
  return <GoogleSearchSimulation onComplete={handleStepComplete} language={currentLang} />;
}
```

3. **Add quiz questions** in `src/data/modules.ts`

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## 📊 Firebase Firestore Structure

```
users/{userId}
  - createdAt: Timestamp
  - lastActiveAt: Timestamp
  - totalPoints: number
  - completedModules: number
  - streakCount: number
  - completedLessons: string[]
  - unlockedLessons: string[]
  - scores: { [lessonId]: { score, points, attempts } }
  - earnedBadges: string[]
  - preferences: { language, fontSize, theme }
```

---

## 🤝 Contributing

Contributions welcome! To add more lessons:

1. Fork the repository
2. Create a new simulation component
3. Add quiz questions to `modules.ts`
4. Test with seniors for usability
5. Submit a pull request

---

## 📄 License

MIT License - Feel free to use for educational purposes

---

## 🙏 Credits

- **Icons**: Lucide React
- **Animations**: canvas-confetti
- **UI Inspiration**: Senior-friendly mobile game interfaces

---

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Email: support@example.com

---

**Happy Learning! 📚👨‍🎓👩‍🎓**
