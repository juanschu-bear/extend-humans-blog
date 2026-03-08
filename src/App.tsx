import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import './App.css'

type Post = {
  id: string
  title: string
  category: string
  minutes: string
}

type TrailPoint = {
  id: number
  x: number
  y: number
}

type WorldTheme = {
  base: string
  accent: string
  glow: string
  mood: string
}

const posts: Post[] = [
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

const worlds: WorldTheme[] = [
  { base: '#08131f', accent: '#7ee9ff', glow: '#4ed8ff', mood: 'Arrival' },
  { base: '#0b1a27', accent: '#89f6ff', glow: '#73e7ff', mood: 'Orientation' },
  { base: '#17152b', accent: '#9fa8ff', glow: '#7f93ff', mood: 'Depth' },
  { base: '#142718', accent: '#97ffba', glow: '#74f5a3', mood: 'Play' },
  { base: '#2a1d13', accent: '#ffcc88', glow: '#ffb35d', mood: 'Warmth' },
  { base: '#1a2230', accent: '#9fd2ff', glow: '#8eb6ff', mood: 'Expansion' },
]

const manifesto = ['Consciousness', 'Perception', 'Language', 'Bias', 'Systems', 'Agency', 'Memory', 'Meaning']

const chapterCards = [
  {
    title: 'Perception Is Not Neutral',
    text: 'The world you experience is already interpreted before you call it truth.',
    image: 'https://cdn.marblism.com/KOWuYLfc7dh.webp',
  },
  {
    title: 'Language Builds Invisible Walls',
    text: 'Words are not labels only. They define which futures can be imagined.',
    image: 'https://cdn.marblism.com/JYv-IGlvyyt.webp',
  },
  {
    title: 'Systems Install Emotion',
    text: 'Many feelings are induced by architecture, incentives, and repeated narratives.',
    image: 'https://cdn.marblism.com/uxgaBEC1eqy.webp',
  },
]

const visualCards = [
  {
    title: 'Signal Layer',
    copy: 'Perception is an active filter architecture, not a passive camera.',
    image: 'https://cdn.marblism.com/dAwJFAO6Mjc.webp',
  },
  {
    title: 'Memory Distortion',
    copy: 'You do not retrieve memories unchanged. You regenerate them each time.',
    image: 'https://cdn.marblism.com/QFIm0dP7nCN.webp',
  },
  {
    title: 'Power Geometry',
    copy: 'Rooms, seating, and sequencing pre-shape decisions before words begin.',
    image: 'https://cdn.marblism.com/5y6cPsg2e5m.webp',
  },
]

const archivePreview = Array.from({ length: 24 }).map((_, index) => ({
  id: String(index + 1).padStart(3, '0'),
  title: `Upcoming Transmission ${String(index + 1).padStart(3, '0')}`,
}))

const spotifyEmbedUrl =
  import.meta.env.VITE_SPOTIFY_EMBED_URL ||
  'https://open.spotify.com/embed/show/5CfCWKI5pZ28U0uOzXkDHe?utm_source=generator'

function App() {
  const [mouse, setMouse] = useState({ x: 50, y: 20 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])
  const [activeWorld, setActiveWorld] = useState(0)
  const [corridorIndex, setCorridorIndex] = useState(0)
  const [clarity, setClarity] = useState(35)
  const [quizChoice, setQuizChoice] = useState<string | null>(null)

  const magneticRef = useRef<HTMLElement | null>(null)
  const corridorRef = useRef<HTMLElement | null>(null)
  const worldRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    let pointId = 0

    const handleMove = (event: MouseEvent) => {
      const x = event.clientX
      const y = event.clientY

      setMouse({
        x: (x / window.innerWidth) * 100,
        y: (y / window.innerHeight) * 100,
      })

      setTrailPoints(prev => [{ id: pointId++, x, y }, ...prev].slice(0, 16))

      const target = (event.target as HTMLElement | null)?.closest('[data-magnetic]') as HTMLElement | null

      if (magneticRef.current && magneticRef.current !== target) {
        magneticRef.current.style.transform = ''
      }

      if (target) {
        magneticRef.current = target
        const rect = target.getBoundingClientRect()
        const offsetX = (x - (rect.left + rect.width / 2)) * 0.1
        const offsetY = (y - (rect.top + rect.height / 2)) * 0.1
        target.style.transform = `translate(${offsetX}px, ${offsetY}px)`
      } else {
        magneticRef.current = null
      }
    }

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      const progress = total <= 0 ? 0 : Math.min(100, Math.max(0, (current / total) * 100))
      setScrollProgress(progress)

      if (corridorRef.current) {
        const rect = corridorRef.current.getBoundingClientRect()
        const raw = (window.innerHeight * 0.55 - rect.top) / (rect.height - window.innerHeight * 0.5)
        const normalized = Math.min(1, Math.max(0, raw))
        const mapped = Math.round(normalized * (posts.length - 1))
        setCorridorIndex(mapped)
      }
    }

    const handleLeave = () => {
      if (magneticRef.current) {
        magneticRef.current.style.transform = ''
        magneticRef.current = null
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mouseleave', handleLeave)
    handleScroll()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return
        const index = Number((visible.target as HTMLElement).dataset.worldIndex || 0)
        setActiveWorld(index)
      },
      {
        threshold: [0.3, 0.45, 0.6],
        rootMargin: '-10% 0px -10% 0px',
      },
    )

    worldRefs.current.forEach(node => {
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const activeTheme = worlds[activeWorld] ?? worlds[0]

  const quizFeedback = useMemo(() => {
    if (!quizChoice) return null
    if (quizChoice === 'A') return 'Ja. Meist entscheidet das Framing vor der reinen Argumentation.'
    if (quizChoice === 'B') return 'Teilweise. Daten helfen, aber oft erst nach der Vorentscheidung.'
    return 'Wichtiger Faktor, aber meistens downstream statt upstream.'
  }, [quizChoice])

  const corridorPost = posts[corridorIndex] ?? posts[0]

  const stepCorridor = (direction: 1 | -1) => {
    setCorridorIndex(prev => Math.min(posts.length - 1, Math.max(0, prev + direction)))
  }

  return (
    <div
      className="app"
      style={
        {
          '--world-base': activeTheme.base,
          '--world-accent': activeTheme.accent,
          '--world-glow': activeTheme.glow,
        } as CSSProperties
      }
    >
      <div className="progress" style={{ width: `${scrollProgress}%` }} />
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-radial" style={{ left: `${mouse.x}%`, top: `${mouse.y}%` }} aria-hidden="true" />

      <div className="cursor-layer" aria-hidden="true">
        <div className="cursor-core" style={{ left: `${mouse.x}%`, top: `${mouse.y}%` }} />
        {trailPoints.map((point, index) => (
          <span
            key={point.id}
            className="trail-dot"
            style={{
              left: point.x,
              top: point.y,
              opacity: Math.max(0, 0.8 - index * 0.06),
              transform: `translate(-50%, -50%) scale(${Math.max(0.22, 1 - index * 0.06)})`,
              background: `hsl(${188 + index * 7}, 100%, ${74 - index * 1.5}%)`,
            }}
          />
        ))}
      </div>

      <header className="hero" ref={el => { worldRefs.current[0] = el }} data-world-index="0">
        <div className="mood-badge">World: {activeTheme.mood}</div>
        <p className="eyebrow">Extend Perception Essays</p>
        <h1>
          <span>Thinking</span>
          <span>Out Loud</span>
        </h1>
        <p className="hero-copy">
          Essays über Bewusstsein, Wahrnehmung, Emotionen, Sprache und die Systeme, die unser Denken erweitern oder einschränken.
        </p>

        <div className="hero-actions">
          <a href="#corridor" className="btn btn-primary" data-magnetic>Start Journey</a>
          <a href="#podcast" className="btn btn-ghost" data-magnetic>Podcast hören</a>
        </div>

        <div className="manifesto-grid">
          {manifesto.map((term, index) => (
            <span key={term} style={{ animationDelay: `${index * 110}ms` }}>{term}</span>
          ))}
        </div>
      </header>

      <section className="ticker" aria-label="Signal strip">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, copyIndex) => (
            <div key={copyIndex} className="ticker-copy">
              <span>Mind-expanding essays</span>
              <span>•</span>
              <span>Emotional depth</span>
              <span>•</span>
              <span>System intelligence</span>
              <span>•</span>
              <span>New episodes + new articles weekly</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </section>

      <section id="corridor" className="panel corridor-panel" ref={el => {
        corridorRef.current = el
        worldRefs.current[1] = el
      }} data-world-index="1">
        <div className="panel-head corridor-head">
          <h2>Essay Corridor</h2>
          <span>klarer Fokus statt creepy Tunnel</span>
        </div>

        <div className="corridor-ui">
          <button onClick={() => stepCorridor(-1)} data-magnetic aria-label="Vorheriger Essay">←</button>
          <div className="corridor-status">
            <strong>Now Entering {corridorPost.id}</strong>
            <p>{corridorPost.title}</p>
          </div>
          <button onClick={() => stepCorridor(1)} data-magnetic aria-label="Nächster Essay">→</button>
        </div>

        <div className="corridor-stage">
          {posts.map((post, index) => {
            const delta = index - corridorIndex
            const x = delta * 130
            const scale = Math.max(0.82, 1 - Math.abs(delta) * 0.08)
            const opacity = Math.max(0.28, 1 - Math.abs(delta) * 0.2)
            const z = 60 - Math.abs(delta) * 40
            const active = index === corridorIndex

            return (
              <article
                key={post.id}
                className={`corridor-card${active ? ' active' : ''}`}
                style={{
                  transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
                  opacity,
                }}
                data-magnetic
              >
                <p className="meta">{post.id} · {post.category}</p>
                <h3>{post.title}</h3>
                <p className="corridor-min">Read essay ({post.minutes})</p>
              </article>
            )
          })}
        </div>

        <div className="corridor-dots">
          {posts.map((post, index) => (
            <button
              key={`dot-${post.id}`}
              className={index === corridorIndex ? 'active' : ''}
              onClick={() => setCorridorIndex(index)}
              data-magnetic
              aria-label={`Gehe zu Essay ${post.id}`}
            />
          ))}
        </div>
      </section>

      <section className="panel chapter-panel" ref={el => { worldRefs.current[2] = el }} data-world-index="2">
        <div className="panel-head">
          <h2>Chapter Worlds</h2>
          <span>jeder Abschnitt mit eigener Stimmung</span>
        </div>
        <div className="chapter-grid">
          {chapterCards.map(card => (
            <article key={card.title} className="chapter-card" data-magnetic>
              <img src={card.image} alt={card.title} />
              <div className="chapter-overlay" />
              <div className="chapter-copy">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel lab-panel" ref={el => { worldRefs.current[3] = el }} data-world-index="3">
        <div className="panel-head">
          <h2>Perception Lab</h2>
          <span>spielerisch + interaktiv</span>
        </div>

        <div className="lab-grid">
          <div className="lab-canvas-wrap">
            <div className="lab-canvas">
              <div className="noise-cloud" style={{ filter: `blur(${Math.max(0, 12 - clarity / 10)}px)` }}>
                {Array.from({ length: 28 }).map((_, index) => (
                  <span
                    key={index}
                    style={{
                      left: `${(index * 13) % 92}%`,
                      top: `${(index * 21) % 86}%`,
                      opacity: 0.2 + (index % 6) * 0.1,
                    }}
                  >
                    {['signal', 'noise', 'bias', 'truth', 'language', 'emotion'][index % 6]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="lab-controls">
            <p className="step">Clarity Console</p>
            <h3>Shift your lens</h3>
            <p>Mehr Clarity = weniger Rauschen. Kleine Interaktion, große Wirkung.</p>

            <label htmlFor="clarity">Clarity: {clarity}%</label>
            <input
              id="clarity"
              type="range"
              min={0}
              max={100}
              value={clarity}
              onChange={event => setClarity(Number(event.target.value))}
            />
            <p className="reveal" style={{ opacity: Math.max(0.2, clarity / 100) }}>
              "Frames entscheiden früher als Argumente."
            </p>
          </aside>
        </div>
      </section>

      <section className="panel visual-panel" ref={el => { worldRefs.current[4] = el }} data-world-index="4">
        <div className="panel-head">
          <h2>Visual Essay Atlas</h2>
          <span>mehr Bilder, mehr Atmosphäre</span>
        </div>
        <div className="visual-grid">
          {visualCards.map((card, index) => (
            <article key={card.title} className="visual-card" style={{ animationDelay: `${index * 120}ms` }} data-magnetic>
              <img src={card.image} alt={card.title} />
              <div className="visual-overlay" />
              <div className="visual-copy">
                <p className="step">Visual Prompt</p>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="podcast" className="panel podcast-panel" ref={el => { worldRefs.current[5] = el }} data-world-index="5">
        <div className="panel-head">
          <h2>Spotify Podcast</h2>
          <span>deine Stimme direkt auf der Seite</span>
        </div>
        <p className="podcast-copy">
          Podcast-Einbindung ist aktiv. Wenn du deinen eigenen Show-Link willst, setzen wir nur `VITE_SPOTIFY_EMBED_URL` auf deine Show.
        </p>
        <div className="podcast-embed" data-magnetic>
          <iframe
            src={spotifyEmbedUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Podcast"
          />
        </div>
      </section>

      <section className="panel archive-panel" ref={el => { worldRefs.current[5] = el }} data-world-index="5">
        <div className="panel-head">
          <h2>Living Archive</h2>
          <span>von 6 auf 70 Essays skalierbar</span>
        </div>
        <p className="archive-copy">
          Diese Struktur ist auf regelmäßige Veröffentlichungen ausgelegt. Neue Texte docken direkt an die Journey an.
        </p>
        <div className="archive-grid">
          {archivePreview.map(item => (
            <article key={item.id} className="archive-card" data-magnetic>
              <p>{item.id}</p>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="panel quiz-panel" ref={el => { worldRefs.current[5] = el }} data-world-index="5">
        <div className="panel-head">
          <h2>Cognition Checkpoint</h2>
          <span>mini decision game</span>
        </div>
        <p className="quiz-question">Was entscheidet in High-Stakes-Kommunikation meistens zuerst?</p>
        <div className="quiz-options">
          <button onClick={() => setQuizChoice('A')} className={quizChoice === 'A' ? 'active' : ''} data-magnetic>A. Framing und Sprachgrenzen</button>
          <button onClick={() => setQuizChoice('B')} className={quizChoice === 'B' ? 'active' : ''} data-magnetic>B. Mehr Daten und mehr Fakten</button>
          <button onClick={() => setQuizChoice('C')} className={quizChoice === 'C' ? 'active' : ''} data-magnetic>C. Nur bessere Rhetorik</button>
        </div>
        {quizFeedback && <p className="quiz-feedback">{quizFeedback}</p>}
      </section>

      <footer className="footer">
        <p>Extended interactive journey • world transitions • podcast ready</p>
      </footer>
    </div>
  )
}

export default App
