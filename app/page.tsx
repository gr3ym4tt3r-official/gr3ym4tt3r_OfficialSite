export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div id="main-content" className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="font-display text-6xl font-bold text-grey-100 mb-6 tracking-tight">
            GR3YM4TT3R
          </h1>
          <p className="text-xl text-grey-300 max-w-2xl mx-auto leading-relaxed">
            Modern, masculine, stoic brand site with cinematic, aggressive-smooth motion. 
            Communicating <span className="text-signal-red-500 font-semibold">strength</span>, 
            <span className="text-signal-red-500 font-semibold"> courage</span>, and 
            <span className="text-signal-red-500 font-semibold"> discipline</span> through premium design.
          </p>
        </div>

        {/* Manifesto */}
        <div className="mb-12 p-8 bg-grey-900/50 rounded-lg border border-grey-800">
          <h2 className="font-display text-2xl font-semibold text-grey-100 mb-6">
            Core Values
          </h2>
          <div className="flex flex-wrap justify-center gap-8 text-grey-300">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-signal-red-500 rounded-full mr-3"></span>
              Duty
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-signal-red-500 rounded-full mr-3"></span>
              Courage
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-signal-red-500 rounded-full mr-3"></span>
              Precision
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-signal-red-500 rounded-full mr-3"></span>
              Accountability
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-signal-red-500 rounded-full mr-3"></span>
              Fortitude
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="text-grey-400 text-sm">
          <p>✅ Next.js 14 with App Router</p>
          <p>✅ TypeScript Configuration</p>
          <p>✅ TailwindCSS with Custom Theme</p>
          <p>✅ Google Fonts (Inter + Cinzel)</p>
          <p>✅ Accessibility Features</p>
          <p>✅ Performance Optimizations</p>
        </div>
      </div>
    </main>
  )
}