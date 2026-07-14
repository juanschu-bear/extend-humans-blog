import { useEffect, useRef, useState, type JSX } from 'react'

type Lang = 'en' | 'de' | 'es'

const ARTICLE_ASSET_PATH = '/your-avatar-remembers-trilingual.html'

const seriesCopy: Record<Lang, string> = {
  en: 'Memory Series · Part 2',
  de: 'Gedächtnis-Serie · Teil 2',
  es: 'Serie de Memoria · Parte 2',
}

const extraStyles = `
.hero-series{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#F6DDCC;margin-bottom:18px;padding:7px 16px;border-radius:999px;border:1px solid rgba(212,149,106,.3);background:rgba(212,149,106,.1);box-shadow:0 0 24px rgba(212,149,106,.08);opacity:0;animation:fadeInUp .8s ease .12s forwards}
`

export default function AvatarRemembersArticle(): JSX.Element {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('eh:lang') : null
    return saved === 'de' || saved === 'es' || saved === 'en' ? saved : 'en'
  })
  const [styleMarkup, setStyleMarkup] = useState('')
  const [bodyMarkup, setBodyMarkup] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.localStorage.setItem('eh:lang', lang)
    window.dispatchEvent(new Event('eh:lang-change'))
  }, [lang])

  useEffect(() => {
    let cancelled = false

    const loadArticle = async () => {
      const response = await fetch(ARTICLE_ASSET_PATH)
      if (!response.ok) throw new Error(`Failed to load article asset: ${response.status}`)

      const rawHtml = await response.text()
      if (cancelled) return

      const doc = new DOMParser().parseFromString(rawHtml, 'text/html')
      const styleBlocks = Array.from(doc.head.querySelectorAll('style'))
        .map((styleNode) => styleNode.innerHTML)
        .join('\n')

      doc.body.querySelector('.lang-switcher')?.remove()
      doc.body.querySelectorAll('script').forEach((node) => node.remove())

      doc.body.querySelectorAll<HTMLElement>('.hero[data-lang]').forEach((hero) => {
        const heroLang = hero.getAttribute('data-lang') as Lang | null
        if (!heroLang) return

        const seriesNode = doc.createElement('div')
        seriesNode.className = 'hero-series'
        seriesNode.textContent = seriesCopy[heroLang]
        hero.insertBefore(seriesNode, hero.firstChild)
      })

      const bodyNodes = Array.from(doc.body.children).map((node) => node.outerHTML).join('\n')
      if (cancelled) return

      setStyleMarkup(`${styleBlocks}\n${extraStyles}`)
      setBodyMarkup(bodyNodes)
    }

    loadArticle().catch((error) => {
      console.error(error)
      if (cancelled) return
      setBodyMarkup('<article class="article"><p>Unable to load article content.</p></article>')
      setStyleMarkup('')
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.querySelectorAll<HTMLElement>('[data-lang]').forEach((el) => {
      el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none'
    })
  }, [lang, bodyMarkup])

  return (
    <div style={{ minHeight: '100vh', background: '#0F0E17', fontFamily: "'Source Sans 3', sans-serif", fontSize: 19, lineHeight: 1.75, color: '#E0DFF0', overflowX: 'hidden' }}>
      {styleMarkup && <style dangerouslySetInnerHTML={{ __html: styleMarkup }} />}

      <div className="lang-switcher">
        {(['en', 'de', 'es'] as Lang[]).map((option) => (
          <button
            key={option}
            type="button"
            className={`lang-btn${lang === option ? ' active' : ''}`}
            onClick={() => setLang(option)}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>

      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
    </div>
  )
}
