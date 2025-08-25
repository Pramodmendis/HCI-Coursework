# FurniFit — HCI Coursework (PUSL3122)

A React application to plan a room layout in **2D** with an instant **3D** preview.  
**Individual submission** by Mahamandige Mendis.

> Repository: https://github.com/Pramodmendis/HCI-Coursework.git  
> This README is written for the **module leader** to clone, install and run the project quickly.


## ⚙️ Prerequisites
- **Node.js 18+** (LTS recommended)
- **npm 9+**

> No backend, database or environment variables are required. This is a client‑side SPA.


## 📦 Installation

**1) Clone the repository**
```bash
git clone https://github.com/Pramodmendis/HCI-Coursework.git
cd Furnifit
```

**2) Install dependencies**
```bash
npm install
```

> If you downloaded the ZIP, extract it and run the same `npm install` inside the project folder.


## 🚀 Usage

**Run in development**
```bash
npm run dev
```
Open **http://localhost:8080** in your browser.

> If port **8080** is in use:
```bash
npm run dev -- --port 8081
```
Then open **http://localhost:8081**.

**Build for production (optional)**
```bash
npm run build     # outputs to /dist
```

**Serve the production build locally (optional)**
```bash
npx serve dist
```


## ✅ What the app demonstrates (marking checklist)
- Provide **room size/shape/colour** and **create** a new design
- Visualise in **2D** (drag, resize, **dimension badges**)
- Visualise in **3D** (lights, shadows, orbit)
- **Scale‑to‑Fit**
- **Shade/Colour** — both **global** and **per‑item**
- **Edit/Delete** (duplicate, layer order, clear all)
- **Save/Load** (JSON)


## 🧰 Tech Stack
- **React 18**, **Zustand** (state)
- **Three.js** via **@react-three/fiber** and **@react-three/drei**
- **Tailwind CSS** (via PostCSS)
- **Webpack 5 + Babel**


## 🗂 Project Structure (key files)
```
.
├─ public/
│  ├─ index.html
│  └─ furniture/      # image assets (sofa, chair, rug, etc.)
├─ src/
│  ├─ components/     # Editor2D, Viewer3D, CatalogModal, NewDesignModal, etc.
│  ├─ App.jsx
│  ├─ Sidebar.jsx
│  ├─ store.mjs
│  ├─ data/catalog.mjs
│  ├─ index.jsx
│  └─ styles.css
├─ package.json
├─ webpack.config.js
├─ postcss.config.js
├─ babel.config.json
└─ README.md
```

> Dependencies are declared in `package.json`. `node_modules/` is **not** committed.


## 🧯 Troubleshooting
- **JSX/Babel error** — ensure Node **18+** and re‑run `npm install`.
- **Port already in use** — run `npm run dev -- --port 8081`.
- **Black 3D canvas** — refresh or try another browser; the scene uses a light background and ambient light.


## 👤 Authorship
Designed, implemented and evaluated by **Mahamandige Mendis** (individual coursework).

