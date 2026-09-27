# 🏋️ FitLog - Workout Planner & Fitness Tracker

FitLog is a modern, responsive web application designed to empower users to discover exercises, customize daily workout plans, track metrics like duration and calories burned, and bookmark routines for future training sessions.

---

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API (`usePlan` custom hook) & Local Storage
- **API**: REST API (Cloudflare Workers)

---

## ✨ Key Features

1. **Exercise Exploration & Detailed Metrics**: Browse workouts with comprehensive metrics including required equipment, difficulty level, sets, reps, estimated calories, duration, and step-by-step instructions.
2. **Dynamic Daily Plan Management**: Easily add workouts to "Today's Plan" and auto-calculate real-time totals for duration and calorie expenditure.
3. **Save for Later Routine Bookmark**: Save exercises to a personalized list for quick access and long-term routine planning.
4. **Interactive Plan Matrix Dashboard**: View structured summaries, exercise breakdowns, and calculated stats with type-safe state handling.
5. **Modern Dark UI & Responsive Design**: Clean, high-contrast dark interface crafted with Tailwind CSS for optimal readability on mobile, tablet, and desktop devices.

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx         # Root layout with global providers
│   ├── page.tsx           # Home page / Exercise listing
│   ├── workout/[id]/      # Dynamic workout detail pages
│   └── my-plan/           # My Plan page & PlanMatrix dashboard
├── components/            # Reusable UI components
└── type/                  # TypeScript interfaces (Workout.ts)