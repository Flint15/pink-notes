# Pink Notes >⩊<

A simple and sweet note-taking application built with React and TypeScript (,,>﹏<,,)👉👈

## 🌐 Live App

**Try it now: [https://pinknotes.xyz/](https://pinknotes.xyz/)**

No installation needed - sign up and start taking notes immediately in your browser!

## ✨ Features

### 🔐 Authentication

- **Sign Up / Sign In** - Secure email and password authentication via Supabase
- **Sign Out** - Available from the info menu at the bottom of the sidebar
- **Cloud Sync** - Notes are tied to your account and accessible from any device

### 📌 Note Management

- **Create Notes** - Quickly add new notes with a single click
- **Upload Notes** - Import `.txt` files directly into your notes collection
- **Upload Zip** - Import multiple `.txt` files at once from a `.zip` archive
- **Rename Notes** - Change the name of your notes
- **Delete Notes** - Remove notes that you don't need anymore (can't delete your last note!)
- **Pin Notes** - Keep important notes at the top
- **Download Notes** - Export individual notes as `.txt` files via the dropdown menu
- **Export All Notes** - Download all notes at once as a `.zip` archive containing individual `.txt` files

### ✍️ Note Editing

- **Clean Text Editor** - Distraction-free writing experience
- **Markdown Support** - Write in Markdown and preview formatted content with the preview button
- **Auto-Save** - Your notes are automatically saved to cloud with debounced syncing
- **Easy Navigation** - Switch between notes with a single click

### 🎨 User Interface

- **Collapse Sidebar** - Toggle the sidebar to maximize your writing space
- **Visual Selection** - Selected notes are highlighted with a pink accent
- **Preview Mode** - Toggle between edit and preview modes to see your Markdown rendered
- **Smooth Animations** - (i hope so :) )

### ☁️ Cloud Storage

Notes are stored in Supabase and tied to your user account:

- ✅ Syncs across devices
- ✅ Secured by authentication
- ✅ No data loss if you clear your browser

You can still export individual notes or all notes as a `.zip` for local backups.

## Getting started

### Prerequisites

- **Node.js** (install from [https://nodejs.org/](https://nodejs.org/))

```bash
node --version #Should be v18+
```

- **npm** (installed with node)

```bash
npm --version #Should be v9+
```

### Supabase Setup

1. Create a new project at [https://supabase.com/](https://supabase.com/)
2. In your project's SQL editor, create the `notes` table:

```sql
create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  content text not null default '',
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

alter table notes enable row level security;

create policy "Users can manage their own notes"
  on notes for all
  using (auth.uid() = user_id);
```

3. Copy your project URL and anon key from **Project Settings -> API**

### Installation

1. Clone or download the repo:

```bash
git clone https://github.com/Flint15/pink-notes.git
cd pink-notes
```

2. Install dependecies

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the project

```bash
npm run dev
```

5. Open your browser

Navigate to the URL shown in your terminal (usually `http://localhost:5173`)

### 🛠️ Built With

- React
- TypeScript
- Vite
- CSS
- Supabase (auth + database)
- JSZip
- react-markdown

### 📄 License

This project is open source and available for personal use.

## 🐱‍💻 About

Created with 愛 by Vladimir Chertkov [https://github.com/Flint15](https://github.com/Flint15)

---

Made with a lot of 抹茶🍵

≽^•⩊•^≼
