'use client';

import { ThemeToggle } from '../../src/design-system/utilities/ThemeProvider';

export default function ThemeDemo() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Theme Toggle */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-display font-bold text-primary">
          Theme System Demo
        </h1>
        <ThemeToggle showLabel />
      </div>

      {/* Typography Scale */}
      <section className="space-y-4">
        <h2 className="text-2xl font-sans font-semibold text-primary border-b border-primary pb-2">
          Typography Scale
        </h2>
        <div className="space-y-2">
          <h1 className="text-6xl font-display font-bold text-primary">Display 2XL</h1>
          <h2 className="text-4xl font-display font-semibold text-primary">Display XL</h2>
          <h3 className="text-3xl font-sans font-bold text-primary">Heading XL</h3>
          <h4 className="text-2xl font-sans font-semibold text-primary">Heading L</h4>
          <h5 className="text-xl font-sans font-medium text-primary">Heading Base</h5>
          <p className="text-lg text-primary">Body Large</p>
          <p className="text-base text-secondary">Body Base (Secondary)</p>
          <p className="text-sm text-tertiary">Body Small (Tertiary)</p>
          <code className="text-sm font-mono bg-tertiary px-2 py-1 rounded text-accent">
            Code Sample
          </code>
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-sans font-semibold text-primary border-b border-primary pb-2">
          Color System
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Backgrounds */}
          <div className="bg-primary p-4 rounded border border-primary">
            <h3 className="text-sm font-mono text-secondary">bg-primary</h3>
          </div>
          <div className="bg-secondary p-4 rounded border border-primary">
            <h3 className="text-sm font-mono text-primary">bg-secondary</h3>
          </div>
          <div className="bg-tertiary p-4 rounded border border-primary">
            <h3 className="text-sm font-mono text-primary">bg-tertiary</h3>
          </div>
          <div className="bg-inverse p-4 rounded border border-accent">
            <h3 className="text-sm font-mono text-inverse">bg-inverse</h3>
          </div>
        </div>
      </section>

      {/* Interactive Elements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-sans font-semibold text-primary border-b border-primary pb-2">
          Interactive Elements
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-2 bg-accent text-white rounded hover:bg-signal-red-600 transition-colors">
            Primary Button
          </button>
          <button className="px-6 py-2 border border-primary text-primary rounded hover:bg-secondary transition-colors">
            Secondary Button
          </button>
          <button className="px-6 py-2 bg-tertiary text-primary rounded hover:bg-secondary transition-colors">
            Tertiary Button
          </button>
        </div>
      </section>

      {/* Spacing Scale */}
      <section className="space-y-4">
        <h2 className="text-2xl font-sans font-semibold text-primary border-b border-primary pb-2">
          Spacing Scale
        </h2>
        <div className="space-y-2">
          <div className="bg-secondary h-4 rounded" style={{width: '1rem'}}><span className="text-xs text-tertiary ml-2">4px</span></div>
          <div className="bg-secondary h-4 rounded" style={{width: '2rem'}}><span className="text-xs text-tertiary ml-2">8px</span></div>
          <div className="bg-secondary h-4 rounded" style={{width: '4rem'}}><span className="text-xs text-tertiary ml-2">16px</span></div>
          <div className="bg-secondary h-4 rounded" style={{width: '6rem'}}><span className="text-xs text-tertiary ml-2">24px</span></div>
          <div className="bg-secondary h-4 rounded" style={{width: '8rem'}}><span className="text-xs text-tertiary ml-2">32px</span></div>
          <div className="bg-accent h-4 rounded" style={{width: '12rem'}}><span className="text-xs text-white ml-2">48px (accent)</span></div>
        </div>
      </section>

      {/* Focus States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-sans font-semibold text-primary border-b border-primary pb-2">
          Focus States (Tab to test)
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-secondary text-primary rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Focusable Button
          </button>
          <input 
            type="text" 
            placeholder="Focusable input"
            className="px-4 py-2 bg-secondary text-primary border border-primary rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
          <a 
            href="#"
            className="px-4 py-2 text-accent underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            Focusable Link
          </a>
        </div>
      </section>
    </div>
  );
}