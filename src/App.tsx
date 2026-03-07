import './App.css'

const posts = [
  {
    id: '001',
    title: 'The Decision Was Made Before You Entered the Room',
    hook: 'High-stakes decisions are often pre-shaped before discussion starts.',
    category: 'Power & Systems',
    minutes: '12 min',
  },
  {
    id: '002',
    title: 'Why You Cannot See What You Cannot See',
    hook: 'Blind spots are not missing facts. They are structural filters.',
    category: 'Blind Spots',
    minutes: '14 min',
  },
  {
    id: '007',
    title: 'System First Publishing',
    hook: 'One core article, multiple channel outputs without manual repetition.',
    category: 'AI as Perception Layer',
    minutes: '9 min',
  },
]

function App() {
  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">Extend Perception</p>
        <h1>Editorial Engine Preview</h1>
        <p className="hero-copy">
          Separate v2 concept: built for premium long-form and automatic cross-channel publishing.
        </p>
        <div className="hero-actions">
          <a href="#posts" className="btn btn-primary">Read Concepts</a>
          <a href="#system" className="btn btn-ghost">Publishing System</a>
        </div>
      </header>

      <section id="posts" className="panel">
        <div className="panel-head">
          <h2>Featured Articles</h2>
          <span>System-ready format</span>
        </div>
        <div className="cards">
          {posts.map((post) => (
            <article key={post.id} className="card">
              <p className="meta">{post.id} · {post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.hook}</p>
              <a href="#" className="card-link">Open draft ({post.minutes})</a>
            </article>
          ))}
        </div>
      </section>

      <section id="system" className="panel system">
        <div className="panel-head">
          <h2>Multi-Channel Publishing</h2>
          <span>One input, many outputs</span>
        </div>
        <div className="system-grid">
          <div>
            <p className="step">1. Canonical</p>
            <h3>Markdown as source</h3>
            <p>Each article starts as one file with metadata and long-form content.</p>
          </div>
          <div>
            <p className="step">2. Transform</p>
            <h3>Channel variants</h3>
            <p>Auto-generate X post, X thread, newsletter intro, and Medium-ready text.</p>
          </div>
          <div>
            <p className="step">3. Publish</p>
            <h3>Automation workflow</h3>
            <p>n8n pushes to website + X + newsletter, with Medium as draft/assisted step.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>V2 Preview Repo • Separate from your current production repo</p>
      </footer>
    </div>
  )
}

export default App
