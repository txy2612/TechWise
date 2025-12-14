# 📖 Developer Guide - Elderly Learning App

This guide will help you complete Phase 2 of the app by adding the remaining 22 interactive lessons.

---

## 🎯 What's Already Built (Phase 1)

### ✅ Complete Systems
- **Authentication**: Google Sign-In fully working
- **Progress Tracking**: Firebase + IndexedDB for offline
- **Quiz System**: Scoring, feedback, retries
- **Badge System**: Modal with confetti animations
- **Dashboard**: Colorful module cards with progress bars
- **Module Overview**: Lesson list with checkmarks/locks
- **Bilingual**: English/Chinese support via react-i18next

### ✅ Example Interactive Lesson
- **Gmail Compose** (`src/components/simulations/GmailCompose.tsx`)
  - 6 steps with guided interactions
  - Fake Gmail UI
  - Arrow + hand icon animations
  - Practice mode banner
  - Success celebration

---

## 🔧 How to Add a New Interactive Lesson

### Step 1: Create the Simulation Component

Create a new file in `src/components/simulations/`:

```tsx
// src/components/simulations/YourSimulation.tsx
import { useState } from 'react';
import { ArrowDown, Hand, CheckCircle } from 'lucide-react';

interface YourSimulationProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

const YourSimulation: React.FC<YourSimulationProps> = ({ onComplete, language }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const texts = {
    en: {
      step0: "Instruction for step 0...",
      step1: "Instruction for step 1...",
      // ... more steps
    },
    zh: {
      step0: "第0步的说明...",
      step1: "第1步的说明...",
      // ... more steps
    },
  };
  
  const t = texts[language];
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Practice Mode Banner */}
      <div className="practice-banner text-center mb-6">
        ⚡ Practice Mode - This is a safe simulation
      </div>
      
      {/* Instruction Card */}
      <div className="card mb-6 bg-primary-50 border-2 border-primary">
        <p className="text-senior-base font-semibold text-gray-900 text-center">
          {currentStep === 0 && t.step0}
          {currentStep === 1 && t.step1}
        </p>
      </div>
      
      {/* Your fake UI here */}
      <div className="card bg-white">
        {/* Build your simulation UI */}
        {/* Add arrows, hand icons, interactive elements */}
      </div>
    </div>
  );
};

export default YourSimulation;
```

### Step 2: Add Guided Arrows and Hand Icons

Use these classes for animations:

```tsx
{/* Pulsing arrow pointing down */}
<div className="absolute -bottom-16 left-20 pulse-arrow">
  <ArrowDown className="w-10 h-10 text-primary" />
</div>

{/* Hand icon for clickable elements */}
<div className="absolute -bottom-16 left-20 pulse-arrow">
  <Hand className="w-12 h-12 text-primary" />
</div>
```

### Step 3: Register in LessonPageNew.tsx

Add your simulation to the lesson renderer:

```tsx
// src/pages/Lesson/LessonPageNew.tsx

// Import your simulation
import YourSimulation from '../components/simulations/YourSimulation';

// In renderLessonContent():
const renderLessonContent = () => {
  // Gmail Compose
  if (lesson.id === 'lesson-gmail-2') {
    return <GmailCompose onComplete={handleStepComplete} language={currentLang} />;
  }
  
  // Your new simulation
  if (lesson.id === 'lesson-search-1') {
    return <YourSimulation onComplete={handleStepComplete} language={currentLang} />;
  }
  
  // ... more simulations
};
```

### Step 4: Add Quiz Questions

Edit `src/data/modules.ts` and add questions:

```typescript
{
  id: 'lesson-search-1',
  // ... other lesson properties
  quiz: {
    id: 'quiz-search-1',
    lessonId: 'lesson-search-1',
    passingScore: 80,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        questionEn: 'What is the first step in using Google Search?',
        questionZh: '使用 Google 搜索的第一步是什么？',
        options: [
          { id: 'a', textEn: 'Type in the search bar', textZh: '在搜索栏中输入' },
          { id: 'b', textEn: 'Click images', textZh: '点击图片' },
          { id: 'c', textEn: 'Open settings', textZh: '打开设置' },
        ],
        correctAnswer: 'a',
        explanationEn: 'The search bar is where you type your query.',
        explanationZh: '搜索栏是您输入查询的地方。',
        points: 5,
      },
      // Add 3-5 more questions...
    ],
  },
}
```

---

## 📚 Lessons to Implement

### Module 1: Gmail Basics
- ✅ Lesson 2: Sending Your First Email (DONE)
- ⏳ Lesson 3: Reading & Managing Emails
  - Show fake inbox with 3 emails
  - Guide user to: open email → reply → archive → search
- ⏳ Lesson 4: Staying Safe from Spam
  - Show 3 emails (mix of real and phishing)
  - User identifies which are suspicious
  - Show red flags checklist

### Module 2: Google Search
- ⏳ Lesson 1: Search Basics
  - Fake Google homepage
  - Guide user to type query → click search
  - Show results page
- ⏳ Lesson 3: Voice Search
  - Show microphone icon
  - Simulate voice input
- ⏳ Lesson 4: Practical Searches
  - Practice searching for weather, news, recipes

### Module 3: Google Maps
- ⏳ Lesson 2: Finding Places
  - Search bar → enter location → map zooms
- ⏳ Lesson 3: Getting Directions
  - Set start/end points → choose transport → start navigation
- ⏳ Lesson 4: Practical Navigation
  - Combined practice with real-world scenarios

### Module 4: Online Safety
- ⏳ Lesson 1: Spotting Phishing Emails
  - Interactive game: identify 5 fake emails
- ⏳ Lesson 2: Fake Websites
  - Show real vs fake website URLs
  - User clicks on the safe one
- ⏳ Lesson 3: Fake News & Scams
  - Identify false claims
- ⏳ Lesson 4: Safety Tools
  - Practice using link checker

### Module 5: Smartphone Basics
- ⏳ Lesson 1: Control Center Basics
  - Fake phone screen
  - Guide: swipe down → toggle Wi-Fi → adjust brightness
- ⏳ Lesson 2: Connecting to Wi-Fi
  - Open settings → choose network → enter password
- ⏳ Lesson 3: Settings & Personalization
  - Navigate settings app
  - Change wallpaper, adjust volume
- ⏳ Lesson 4: Managing Apps
  - Open Play Store → search app → install → uninstall

### Module 6: Everyday Tools
- ⏳ Lesson 1: Calendar & Alarms
  - Create calendar event
  - Set alarm
- ⏳ Lesson 2: Google Translate
  - Type text → select languages → translate
  - Camera translation demo
- ⏳ Lesson 3: Voice Assistant
  - "Hey Google" commands
  - Practice: weather, timer, calls
- ⏳ Lesson 4: Screenshots & Copy-Paste
  - Take screenshot
  - Copy and paste text

---

## 🎨 UI Building Tips

### 1. Fake UI Structure

```tsx
{/* Fake App Header */}
<div className="flex items-center justify-between mb-6 pb-4 border-b">
  <div className="text-2xl font-bold text-primary">App Name</div>
  <div className="flex gap-4">
    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
  </div>
</div>

{/* Fake Content Area */}
<div className="space-y-4">
  {/* Your interactive elements */}
</div>
```

### 2. Interactive Buttons

```tsx
<button
  onClick={handleClick}
  disabled={currentStep !== targetStep}
  className={`relative p-4 rounded-lg ${
    currentStep === targetStep
      ? 'border-2 border-primary bg-primary-50'
      : 'border border-gray-300 bg-gray-50 opacity-50'
  }`}
>
  Button Text
  
  {/* Arrow indicator */}
  {currentStep === targetStep && (
    <div className="absolute -right-16 top-4 pulse-arrow">
      <Hand className="w-12 h-12 text-primary" />
    </div>
  )}
</button>
```

### 3. Step Progression

```tsx
const handleStepComplete = () => {
  if (currentStep < totalSteps - 1) {
    setCurrentStep(currentStep + 1);
  } else {
    // Show success animation
    setShowSuccess(true);
    setTimeout(() => onComplete(), 2000);
  }
};
```

### 4. Success Animation

```tsx
{showSuccess && (
  <div className="celebration-overlay">
    <div className="card max-w-md mx-4 text-center">
      <div className="text-7xl mb-4 float-up">🎉</div>
      <h2 className="text-senior-xl font-bold text-success mb-4">
        Great job!
      </h2>
      <p className="text-senior-base text-gray-600">
        You've completed this lesson!
      </p>
    </div>
  </div>
)}
```

---

## 🧪 Testing Checklist

For each new lesson:
- [ ] All steps work in sequence
- [ ] Arrows point to correct elements
- [ ] Hand icons appear for clickable items
- [ ] Practice banner is visible
- [ ] Success animation plays
- [ ] Quiz questions work
- [ ] Translations (EN/CN) are correct
- [ ] Progress saves to Firebase
- [ ] Works on mobile screen sizes

---

## 🐛 Common Issues & Solutions

### Issue: Arrow not showing
**Solution**: Make sure parent element has `position: relative`:
```tsx
<div className="relative">
  <button>...</button>
  <div className="absolute -right-16 top-4 pulse-arrow">
    <Hand className="w-12 h-12 text-primary" />
  </div>
</div>
```

### Issue: Step not progressing
**Solution**: Check that `setCurrentStep` is called correctly:
```tsx
const handleClick = () => {
  if (currentStep === 2) {
    setTimeout(() => setCurrentStep(3), 500);
  }
};
```

### Issue: Confetti not working
**Solution**: Import canvas-confetti:
```tsx
import confetti from 'canvas-confetti';

// Fire confetti
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
});
```

---

## 📝 Quick Reference

### Available Icons (Lucide React)
```tsx
import {
  Mail, Search, Map, Shield, Smartphone, Wrench,
  ArrowDown, ArrowRight, ArrowLeft, Hand,
  CheckCircle, XCircle, Lock, Trophy, Settings
} from 'lucide-react';
```

### Tailwind Classes for Seniors
- `text-senior-sm`: 18px (1.125rem)
- `text-senior-base`: 20px (1.25rem) ← Default
- `text-senior-lg`: 24px (1.5rem)
- `text-senior-xl`: 30px (1.875rem)
- `text-senior-2xl`: 36px (2.25rem)

### CSS Animations
- `.pulse-arrow`: Pulsing animation
- `.shake-animation`: Shake effect
- `.blink-animation`: Blink 2 times
- `.float-up`: Float up on appear

---

## 🚀 Next Steps

1. **Pick a lesson** from the list above
2. **Study GmailCompose.tsx** to understand the pattern
3. **Create your simulation component**
4. **Add quiz questions** in modules.ts
5. **Test thoroughly** on desktop and mobile
6. **Repeat** for remaining lessons!

---

**You've got this! 💪**

Each lesson should take 1-2 hours to build. With 22 lessons remaining, you're looking at ~30-40 hours of work to complete the full app.

Good luck! 🎉
