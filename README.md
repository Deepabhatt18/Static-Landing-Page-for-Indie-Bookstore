# 📚 Powell's Corner Bookstore — Author Reading Night
### A Static Landing Page | Pro-Bono Project

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Live Preview](#-live-preview)
- [Folder Structure](#-folder-structure)
- [Technologies Used](#-technologies-used)
- [Features](#-features)
- [Phase Breakdown](#-phase-breakdown)
- [Design Tokens](#-design-tokens)
- [JavaScript Functions](#-javascript-functions)
- [Responsive Breakpoints](#-responsive-breakpoints)
- [How to Run Locally](#-how-to-run-locally)
- [How to Test on Mobile](#-how-to-test-on-mobile)
- [Known Issues & Fixes Applied](#-known-issues--fixes-applied)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 📖 Project Overview

This is a **static, high-performance landing page** built for **Powell's Corner**, a small independent bookstore in Portland, Oregon. The page promotes their upcoming **Author Reading Night** event on July 19, 2025.

**Why static?**
- Client is on basic shared hosting — no server-side language needed
- Zero framework dependencies — faster load, easier maintenance
- Pure HTML + CSS + Vanilla JS only

**Project Type:** Pro-Bono  
**Client:** Powell's Corner Bookstore, Portland  
**Event:** Author Reading Night — July 19, 2025  
**Hosting:** Basic Shared Server  

---

## 🌐 Live Preview

To preview locally:
```
Open index.html with VS Code Live Server
→ http://127.0.0.1:5500/bookstore-landing-page/index.html
```

To preview on mobile (same WiFi):
```
1. Run: ipconfig (Windows) or ifconfig (Mac)
2. Find your IPv4 address e.g. 192.168.1.5
3. On phone browser open: http://192.168.1.5:5500/bookstore-landing-page/index.html
```

---

## 📁 Folder Structure

```
bookstore-landing-page/
│
├── index.html                  ← Main entry point
│
├── assets/
│   ├── css/
│   │   └── main.css            ← All styles + design tokens
│   │
│   ├── js/
│   │   └── app.js              ← Countdown, bio toggle, form validation
│   │
│   └── images/
│       ├── maya chen.jpg
│       ├── james okafor.jpg
│       ├── jane austen 1.jpg
│       └── pauko coelho.jpg
│
└── README.md                   ← This file
```

---

## 🛠 Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | Latest | Page structure + semantic tags |
| CSS3 | Latest | Styling, Flexbox, Grid, Animations |
| JavaScript (ES6) | Vanilla | Countdown, form validation, DOM manipulation |
| Google Fonts | CDN | Playfair Display + Lato typography |
| Unsplash | CDN | Hero background image placeholder |

**No frameworks. No libraries. No build tools required.**

---

## ✨ Features

| Feature | Technology |
|---|---|
| Live countdown timer (Days/Hours/Mins/Secs) | JavaScript `setInterval` |
| Smooth scroll on CTA button click | JS `scrollIntoView` |
| Author bio expand/collapse (Read More) | JS DOM toggle + ARIA |
| RSVP form with real-time validation | Vanilla JS validation |
| Success message on form submit | JS DOM manipulation |
| Author photo zoom on hover | CSS `transform: scale()` |
| Card lift effect on hover | CSS `transform: translateY()` |
| Fully responsive — mobile/tablet/desktop | CSS Media Queries |
| Sticky navigation bar | CSS `position: sticky` |
| Accessible keyboard navigation | ARIA attributes + focus styles |
| Lazy loading images | HTML `loading="lazy"` |

---

## 🏗 Phase Breakdown

### Phase 1 — Project Setup & Design Tokens
- Clean folder structure created
- CSS Custom Properties (variables) defined in `:root`
- Global reset applied (`box-sizing: border-box`)
- Google Fonts loaded with `preconnect` for performance

### Phase 2 — Hero Section
- Full-width hero with background image + dark overlay
- CSS **Flexbox** used for vertical + horizontal centering
- Live countdown timer powered by JavaScript
- CTA button with smooth scroll to RSVP section

### Phase 3 — Featured Authors Grid
- CSS **Grid** — 2 columns on desktop, 1 column on mobile
- Author photo scales on hover (`transform: scale(1.06)`)
- Card lifts on hover (`transform: translateY(-5px)`)
- Read More / Read Less bio toggle with animation

### Phase 4 — RSVP + Schedule
- Event schedule with styled time markers
- Semantic `<form>` with 3 input fields
- JavaScript form validation with inline error messages
- Venue details with Google Maps placeholder link
- Parking and accessibility information

### Phase 5 — Responsive + Performance
- 3 breakpoints: 1199px, 768px, 575px
- `loading="lazy"` on all below-fold images
- JS placed at end of `<body>` — no render blocking
- CSS placed in `<head>` — correct render order
- `min-height` used instead of `100vh` — fixes laptop display issue

---

## 🎨 Design Tokens

All design decisions are stored as CSS variables in `:root` inside `main.css`:

```css
:root {
  /* Colors */
  --brand-primary:    #8B1A1A;              /* Deep Red — headlines, buttons */
  --brand-secondary:  #F5F0E8;              /* Cream — backgrounds */
  --brand-accent:     #C9A84C;              /* Gold — highlights, borders */
  --text-dark:        #1C1C1C;              /* Primary body text */
  --text-muted:       #5A4A3A;              /* Secondary body text */
  --white:            #FFFFFF;

  /* Typography */
  --font-display:     'Playfair Display', Georgia, serif;
  --font-body:        'Lato', 'Helvetica Neue', sans-serif;

  /* Spacing */
  --spacing-sm:       1rem;
  --spacing-md:       2rem;
  --spacing-lg:       4rem;

  /* UI */
  --border-radius-sm: 4px;
  --border-radius-lg: 8px;
  --box-shadow-subtle: 0 2px 5px rgba(0,0,0,0.1);
  --transition-smooth: all 0.35s ease;
}
```

**Why design tokens?**
If the client wants to change the brand color tomorrow, you change it in **one place** — the entire site updates automatically.

---

## ⚙️ JavaScript Functions

### `updateCountdown()` — Countdown Timer
```
Location : app.js
Runs     : Every 1 second via setInterval
Logic    : EVENT_DATE - new Date() = remaining milliseconds
           → converted to Days / Hours / Mins / Secs
           → padded to 2 digits and injected into DOM
```

### CTA Button Smooth Scroll
```
Location : app.js
Trigger  : Click on "Reserve Your Seat" button
Logic    : scrollIntoView({ behavior: 'smooth' })
           → smoothly scrolls page to #rsvp-section
```

### Bio Toggle — Read More / Read Less
```
Location : app.js
Trigger  : Click on any "Read More" button
Logic    : Toggles hidden attribute on bio paragraph
           Updates aria-expanded for accessibility
           Changes button text ▾ / ▴
```

### RSVP Form Validation
```
Location : app.js
Trigger  : Form submit event
Validates:
  - Name  → must not be empty
  - Email → must match email regex pattern
  - Shows inline red error messages
  - On success → hides form, shows green confirmation box
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Screen | Changes |
|---|---|---|
| Default | ≥ 1200px | Authors grid: 2 columns |
| `max-width: 1199px` | Tablet landscape | Grid stays 2 columns, spacing adjusted |
| `max-width: 768px` | Tablet / Mobile | Grid collapses to 1 column, navbar stacks, hero details stack, RSVP grid stacks |
| `max-width: 575px` | Small mobile | Font sizes reduced, button padding reduced, min-height adjusted |

**No horizontal scrolling on any screen size.**

---

## 💻 How to Run Locally

### Option 1 — VS Code Live Server (Recommended)
```
1. Open project folder in VS Code
2. Install "Live Server" extension (by Ritwick Dey)
3. Right-click index.html → "Open with Live Server"
4. Browser opens at: http://127.0.0.1:5500
```

### Option 2 — Direct Browser
```
1. Open your file explorer
2. Navigate to bookstore-landing-page/
3. Double-click index.html
4. Opens in default browser
```

### Option 3 — Python Simple Server
```bash
# Navigate to project folder in terminal
cd bookstore-landing-page

# Python 3
python -m http.server 5500

# Open browser → http://localhost:5500
```

---

## 📱 How to Test on Mobile

### Method 1 — Same WiFi Network (Real Device)
```
1. Start Live Server in VS Code
2. Open CMD → type: ipconfig
3. Note your IPv4 Address e.g. 192.168.1.5
4. On phone browser type:
   http://192.168.1.5:5500/bookstore-landing-page/index.html
5. Auto-refreshes on every save ✅
```

### Method 2 — Chrome DevTools (Simulate)
```
1. Open site in Chrome
2. Press F12
3. Press Ctrl + Shift + M
4. Select device from dropdown (iPhone, Samsung etc.)
```

### Method 3 — ngrok (Any Network)
```bash
npm install -g ngrok
ngrok http 5500
# Gives public URL → share with anyone
```

---

## 🐛 Known Issues & Fixes Applied

| Issue | Root Cause | Fix Applied |
|---|---|---|
| Hero too tall on laptop | `height: 100vh` | Changed to `min-height: 600px` + `padding` |
| Hero subtitle had border box | `.hero p` applied to all paragraphs | Created separate `.hero-eyebrow` class |
| Double padding on hero | `padding` defined twice in CSS | Kept only one `padding: 5rem var(--spacing-md)` |
| Global `img` had wrong padding | `padding: 0 20px` on all images | Reset to `max-width: 100%; height: auto` |
| Author photos too tall (500px) | Fixed height too large | Reduced to `260px` for better card proportion |

---

## 🚀 Future Improvements

- [ ] Add a working backend for RSVP form (Node.js / Formspree)
- [ ] Fetch author data dynamically from a JSON API
- [ ] Add a photo gallery section from past events
- [ ] Implement dark mode toggle
- [ ] Add Google Analytics for event tracking
- [ ] Optimize images with WebP format + `srcset`
- [ ] Run Lighthouse audit and target 90+ score

---

## 👩‍💻 Author

**Project built by:** [Deepa Bhatt]  
**Role:** Frontend Developer (Pro-Bono)  
**Tools:** VS Code, Chrome DevTools, Live Server   

---

> *"A reader lives a thousand lives before he dies. The man who never reads lives only one."*  
> — George R.R. Martin