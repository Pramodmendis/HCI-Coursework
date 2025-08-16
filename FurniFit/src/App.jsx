import { useState } from "react";
import CatalogModal from "./components/CatalogModal";
import Editor2D from "./components/Editor2D";
import Sidebar from "./components/Sidebar";
import Toaster from "./components/Toaster";
import Viewer3D from "./components/Viewer3D";
import { useDesign } from "./store";

export default function App() {
  const { loggedIn, setLoggedIn, addFromCatalog } = useDesign();
  const [mode, setMode] = useState("2D");
  const [catalogOpen, setCatalogOpen] = useState(false);

  if (!loggedIn) {
    return (
      <div className="grid h-screen place-items-center bg-gradient-to-br from-[#f8f5f0] to-[#f3efe8]">
        <div className="w-80 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl" style={{fontFamily:'"Playfair Display",serif'}}>FurniFit</h2>
          <p className="mt-1 text-sm text-stone-600">Designer login (demo)</p>
          <button
            onClick={() => setLoggedIn(true)}
            className="mt-4 w-full rounded-xl px-3 py-2 text-sm font-medium text-white shadow
                       bg-gradient-to-r from-[#5d7349] to-[#4b5f3a] hover:from-[#6c8455] hover:to-[#576d44]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >Enter</button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-gradient-to-br from-[#f8f5f0] to-[#f3efe8]">
      <header className="sticky top-0 z-10 text-white shadow bg-gradient-to-r from-[#2f3e2c] to-[#485f3b]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {/* your logo + title */}
            <img src="/logo.png" alt="FurniFit" className="h-8 w-8 rounded-lg object-contain" />
            <span className="text-lg" style={{ fontFamily: '"Playfair Display",serif' }}>FurniFit</span>
          </div>

          <div className="flex items-center gap-2">
            {/* open catalog button */}
            <button
              onClick={() => setCatalogOpen(true)}
              className="rounded-xl bg-white/15 px-3 py-1 text-sm ring-1 ring-white/25 backdrop-blur hover:bg-white/20"
            >
              Browse Catalog
            </button>

            <div className="inline-flex rounded-xl bg-white/10 p-1 ring-1 ring-white/20">
              <button onClick={() => setMode("2D")} className={`rounded-lg px-3 py-1 text-sm transition ${mode === "2D" ? "bg-white text-stone-900 shadow" : "text-white/90 hover:bg-white/10"}`}>2D</button>
              <button onClick={() => setMode("3D")} className={`rounded-lg px-3 py-1 text-sm transition ${mode === "3D" ? "bg-white text-stone-900 shadow" : "text-white/90 hover:bg-white/10"}`}>3D</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-[320px_1fr]">
        <aside className="sticky top-24 h-fit rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <Sidebar />
        </aside>
        <section className="min-h-0 rounded-2xl border border-stone-200 bg-white p-2 shadow-sm">
          {mode === "2D" ? <Editor2D /> : <Viewer3D />}
        </section>
      </main>

      <Toaster />
      <CatalogModal
        open={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        onAdd={(sku) => { addFromCatalog(sku); setCatalogOpen(false); }}
      />
      
    </div>
  );
}
