<div align="center">
  <img width="1200" height="400" style="object-fit: cover; border-radius: 12px;" alt="See Morocco Travel Banner" src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=1200&h=400" />
  
  # 🇲🇦 See Morocco Travel
  ### *The Ultimate Luxury Travel Concierge & Executive Chauffeur Experience*
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.dotjs)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.dotjs)](https://threejs.org/)
  [![Gemini AI](https://img.shields.io/badge/Gemini_AI-3.6_Flash-orange?style=for-the-badge&logo=google-gemini)](https://ai.google.dev/)
</div>

---

## 🌟 Introduction

**See Morocco Travel** is an ultra-premium, interactive single-page web application designed for high-end travelers seeking a bespoke private tour and executive chauffeur service in Morocco. 

Combining **immersive WebGL 3D graphics**, **generative AI trip planning**, and **mood-matching audio soundscapes**, this platform transports visitors into a luxury Moroccan experience before they even step foot in the kingdom.

> [!NOTE]
> View your application live in AI Studio: [See Morocco Travel Dashboard](https://ai.studio/apps/87a367ab-47f4-49e6-abfb-c967476b84e8)

---

## ✨ Signature Premium Features

### 🤖 1. AI Travel Concierge (Gemini-Powered)
* Located in `components/AIConciergeModal.tsx` & `app/api/concierge/route.ts`
* Uses the new `@google/genai` SDK and the `gemini-3.6-flash` model.
* Generates bespoke day-by-day luxury itineraries, VIP transit advice, and custom restaurant/photo recommendations based on travel style, duration, guest count, and starting city.
* Integrates directly with **WhatsApp** to let clients immediately forward their AI-generated itineraries to the reservation desk.

### 🌐 2. WebGL 3D Interactive Map
* Located in `components/Canvas3DMap.tsx` & `components/Screen2ExploreMap.tsx`
* Utilizes **Three.js** to render a custom topographic, rotating 3D globe visualization representing luxury travel routes across Morocco.
* Users can hover over and click historical hubs (Marrakech, Agafay, Merzouga, Fes, Chefchaouen, etc.) to reveal details and pre-fill travel booking forms.

### 🎵 3. Mood-Adaptive Audio Soundscapes
* Located in `components/AudioSoundscape.tsx`
* Implements a custom **Web Audio API synthesizer** playing warm, low-frequency atmospheric pads.
* Features selectable acoustic moods to match the current visual theme:
  * **Desert Mode**: A low, warm desert wind drone (harmonic minor).
  * **Riad Mode**: A bright courtyard fountain harmonic scale.
  * **Atlas Mode**: A high mountain peak breeze chord progression.

### 🚗 4. Luxury Fleet Showroom
* Located in `components/Screen3Fleet.tsx`
* Displays a high-end carousel of luxury vehicles, including Range Rover Autobiographies, Mercedes Maybach V-Class vans, and VIP Sprinters.
* Allows users to select vehicles to auto-populate the reservation details page.

### 📅 5. Premium Unified Booking System
* Located in `components/Screen6Booking.tsx` & `components/LuxuryForm.tsx`
* An state-aware multi-step inquiry engine supporting:
  * **Bespoke Tours**: Automatically links preselected itineraries.
  * **Chauffeur Services**: Select vehicles and booking schedules.
  * **Airport Transfers**: Instant premium transfers between major airports.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Engine**: [React 19](https://react.dev/)
- **Styles**: [Tailwind CSS v4](https://tailwindcss.com/) & [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)
- **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion) for fluid scrolls, reveals, and custom UI transitions
- **3D Graphics**: [Three.js](https://threejs.org/) (WebGL)
- **AI Integration**: [@google/genai SDK](https://github.com/google/generative-ai-js)

### 📁 Project Structure

```bash
├── app/
│   ├── api/concierge/route.ts  # Gemini API serverless handler
│   ├── globals.css             # Tailwind v4 globals & custom cursor variables
│   ├── layout.tsx              # Main Next.js HTML structure
│   ├── page.tsx                # Land page mounting the 8 screens
│   └── template.tsx            # Page transition wrapping
├── components/
│   ├── AIConciergeModal.tsx     # The interactive AI trip designer popup
│   ├── AudioSoundscape.tsx      # Web Audio synthesizer controller
│   ├── Canvas3DMap.tsx          # Three.js WebGL globe map
│   ├── LuxuryForm.tsx           # State-controlled select menus & fields
│   ├── PremiumCursor.tsx        # High-performance custom fluid cursor
│   ├── Screen1Arrival.tsx       # Landing Hero section
│   ├── Screen2ExploreMap.tsx    # Interactive destination selector
│   ├── Screen3Fleet.tsx         # Fleet carousel showcase
│   ├── Screen4Signature.tsx     # Signature experiences selector
│   ├── Screen5Journey.tsx       # Narrative storytelling timeline
│   ├── Screen6Booking.tsx       # Booking & reservation hub
│   ├── Screen7Trust.tsx         # Testimonials & social verification
│   └── Screen8Contact.tsx       # Direct contact / footer details
├── lib/
│   └── data.ts                  # Central structured data (tours, vehicles, destinations)
```

---

## 🚀 Local Setup & Installation

Follow these steps to run the application locally on your computer.

### Prerequisites
Make sure you have **Node.js** (v18+) installed.

### 1. Install Dependencies
In the root directory of the project, run:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` (or create a `.env.local` file):
```bash
# In the terminal
copy .env.example .env.local
```

Open `.env.local` and add your **Gemini API Key**:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to experience the site.

---

## 🔒 Production Deployment

To build a production-optimized version:
```bash
npm run build
npm run start
```

This project can be deployed easily on platforms like **Vercel** or **Firebase Hosting**. Make sure to configure the `GEMINI_API_KEY` in the environment variables settings on your hosting provider.

---

<div align="center">
  <p>Crafted with premium styling, micro-animations, and AI-driven hospitality.</p>
  <strong>See Morocco Travel © 2026</strong>
</div>
