import { useEffect, useState } from 'react'
import './App.css'

const posts = [
  {
    id: '001',
    title: 'You want to talk about AI consciousness? Fine, define yours first!',
    category: 'Consciousness',
    minutes: '11 min',
  },
  {
    id: '002',
    title: 'You were already a data machine long before the internet existed.',
    category: 'Cognition Systems',
    minutes: '10 min',
  },
  {
    id: '003',
    title: 'The more you learn, the less you see. Why? Experience makes us smarter but less free.',
    category: 'Blind Spots',
    minutes: '14 min',
  },
  {
    id: '004',
    title: 'The cage you build from proof. Why science should be a starting line, not a finish line.',
    category: 'Epistemology',
    minutes: '13 min',
  },
  {
    id: '005',
    title: 'The language trap: You only think as far as your words allow.',
    category: 'Language',
    minutes: '9 min',
  },
  {
    id: '006',
    title: 'Your emotions are not yours. They were installed.',
    category: 'Behavior Architecture',
    minutes: '12 min',
  },
]

const manifesto = [
  'Consciousness',
  'Perception',
  'Language',
  'Bias',
  'Systems',
  'Agency',
  'Memory',
  'Meaning',
]

function App() {
  const [mouse, setMouse] = useState({ x: 50, y: 20 })

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="app">
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-radial" style={{ left: `${mouse.x}%`, top: `${mouse.y}%` }} aria-hidden="true" />

      <header className="hero">
        <p className="eyebrow">Extend Perception Essays</p>
        <h1>
          <span>Thinking</span>
          <span>Out Loud</span>
        </h1>
        <p className="hero-copy">
          Essays on the boundaries of human cognition, the nature of consciousness, and the
          systems we build to extend what we are.
        </p>

        <div className="hero-actions">
          <a href="#posts" className="btn btn-primary">Enter Library</a>
          <a href="#system" className="btn btn-ghost">See Publishing System</a>
        </div>

        <div className="manifesto-grid">
          {manifesto.map((term, index) => (
            <span key={term} style={{ animationDelay: `${index * 120}ms` }}>{term}</span>
          ))}
        </div>
      </header>

      <section className="ticker" aria-label="Signal strip">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, copyIndex) => (
            <div key={copyIndex} className="ticker-copy">
              <span>Long-form cognition essays</span>
              <span>•</span>
              <span>High-friction ideas</span>
              <span>•</span>
              <span>Signal over noise</span>
              <span>•</span>
              <span>One source, multi-channel publishing</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </section>

      <section id="posts" className="panel">
        <div className="panel-head">
          <h2>Current Titles</h2>
          <span>6 essays</span>
        </div>
        <div className="cards">
          {posts.map((post, index) => (
            <article key={post.id} className="card" style={{ animationDelay: `${index * 90}ms` }}>
              <div className="card-glow" aria-hidden="true" />
              <p className="meta">{post.id} · {post.category}</p>
              <h3>{post.title}</h3>
              <a href="#" className="card-link">Read essay ({post.minutes})</a>
            </article>
          ))}
        </div>
      </section>

      <section id="system" className="panel system">
        <div className="panel-head">
          <h2>Publishing System</h2>
          <span>visible pipeline</span>
        </div>
        <div className="system-grid">
          <div>
            <p className="step">1. Canonical</p>
            <h3>Write once in markdown</h3>
            <p>A single essay file becomes the canonical source for your entire distribution stack.</p>
          </div>
          <div>
            <p className="step">2. Transform</p>
            <h3>Auto-generate platform variants</h3>
            <p>Create X posts, thread variants, newsletter intros, and Medium-compatible drafts.</p>
          </div>
          <div>
            <p className="step">3. Ship</p>
            <h3>Publish with one workflow</h3>
            <p>n8n triggers website publication and channel delivery without manual copy/paste loops.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Separate v2 repository • cinematic concept pass</p>
      </footer>
    </div>
  )
}

export default App
