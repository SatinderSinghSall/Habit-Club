# 🌱 Habit Club

**Habit Club** is a modern, full-stack social habit tracking app built to help users stay consistent with their goals while building meaningful habits alongside friends. It combines personal habit management, smart progress analytics, and a social accountability layer to create a powerful growth experience.

---

## 🚀 Features

### 🧠 Core Habit Tracking
- Create, edit, and delete custom habits
- Daily check-ins with frequency options
- Habit goals and completion tracking

### 📈 Analytics & Progress
- Weekly, monthly, and all-time progress charts
- Streak tracking and completion rate
- Calendar view of past check-ins

### 🔔 Smart Reminders
- Daily email reminders for missed check-ins
- Weekly summary emails with progress stats

### 🧑‍🤝‍🧑 Social Features
- Add and manage friends
- Accept/reject friend requests
- (Planned) View and react to friends' habits

- ### 📱 PWA & Mobile
- Fully responsive layout
- Progressive Web App with offline support

### ⚙️ Settings *(Planned)*
- Customize notifications and theme
- Update user profile info

### 🛡️ Admin Dashboard *(Planned)*
- View and manage users and habits
- Handle reports or flagged content

---

## 🛠️ Tech Stack

| Layer        | Tech                             |
|--------------|----------------------------------|
| Frontend     | React + Vite + Tailwind CSS      |
| Backend      | Node.js + Express.js             |
| Database     | MongoDB                          |
| Auth         | JWT (JSON Web Tokens)            |
| Charts       | Recharts                         |
| Emails       | Nodemailer + Cron Jobs           |
| Deployment   | Vercel (Frontend), Render (Backend) |

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/SatinderSinghSall/Habit-Club.git
cd habit-club

# 2. Install dependencies
npm install
cd client && npm install

# 3. Set environment variables
cp .env.example .env
# fill in your DATABASE_URL, JWT_SECRET, SMTP credentials, etc.

# 4. Migrate database
npx prisma migrate dev

# 5. Start development servers
# In backend root
npm run dev

# In /client
npm run dev
