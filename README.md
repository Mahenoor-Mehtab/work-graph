# Work Graph

**Verified professional collaboration platform**
Proof of work > resumes.

---

## 🚀 Overview

Work Graph is a platform where professionals build **verified work history** instead of traditional resumes.

Each collaboration is:

* Confirmed by both parties
* Stored as a permanent record
* Used to generate a dynamic **trust score**

---

## ✨ Core Features

* 🔗 **Verified Collaborations**
  Mutual confirmation → permanent proof of work

* 🧠 **AI Trust Score**
  Graph-based scoring (0–100) based on real collaborations

* 📊 **Work Graph Visualization**
  Interactive graph of professional relationships

* 🏷 **Skill Proof System**
  Skills backed by actual project evidence

* 🤖 **AI Insights**

  * Skill gaps
  * Career patterns
  * Opportunity suggestions

---

## 🛠 Tech Stack

### Frontend

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion

### Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL (Neon)

### AI

* Gemini API 

### Infra

* Vercel (hosting)
* Cloudinary (storage)
* Resend (emails)

---

## 📁 Project Structure

```
work-graph/
├── app/
├── components/
├── lib/
├── prisma/
├── hooks/
├── types/
└── ...
```

---

## ⚙️ Setup

### 1. Clone repo

```bash
git clone https://github.com/your-username/work-graph.git
cd work-graph
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create `.env.local`:

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
ANTHROPIC_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 4. Setup database

```bash
npx prisma migrate dev
```

### 5. Run project

```bash
npm run dev
```

---

## 🧩 Database Models (Simplified)

* **User**
* **Collaboration**
* **UserSkill**
* **AIInsight**
* **Company**

---

## 🔐 Key Concepts

* **Verification-first system**
  No collaboration is valid unless both users confirm

* **Immutable work history**
  Verified records cannot be edited or deleted

* **Graph-based identity**
  Your network = your credibility

---


## 💡 Vision

Build a **trust layer for the professional world** where hiring is based on real work, not claims.
