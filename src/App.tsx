import { useEffect, useRef, type JSX } from 'react'
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom'
import ExtendedHumansLibrary from './ExtendedHumansLibrary'
import ConsciousnessArticle from './articles/ConsciousnessArticle'
import DataMachineArticle from './articles/DataMachineArticle'
import LearningArticle from './articles/LearningArticle'
import CageOfProofArticle from './articles/CageOfProofArticle'
import LanguageTrapArticle from './articles/LanguageTrapArticle'
import EmotionsArticle from './articles/EmotionsArticle'

type RowTarget = {
  slug: string
}

const rowTargets: RowTarget[] = [
  { slug: '/ai-consciousness' },
  { slug: '/data-machine' },
  { slug: '/the-more-you-learn' },
  { slug: '/cage-of-proof' },
  { slug: '/language-trap' },
  { slug: '/emotions-installed' },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function ClickableLibrary(): JSX.Element {
  const navigate = useNavigate()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const rows = Array.from(wrapper.querySelectorAll<HTMLDivElement>('#stacks > div[style*="cursor: pointer"]'))

    const cleanups = rows.slice(0, rowTargets.length).map((row, index) => {
      row.setAttribute('role', 'button')
      row.setAttribute('tabindex', '0')
      row.setAttribute('aria-label', `Open article ${index + 1}`)

      const handleClick = () => navigate(rowTargets[index]!.slug)
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          navigate(rowTargets[index]!.slug)
        }
      }

      row.addEventListener('click', handleClick)
      row.addEventListener('keydown', handleKeyDown)

      return () => {
        row.removeEventListener('click', handleClick)
        row.removeEventListener('keydown', handleKeyDown)
      }
    })

    return () => {
      cleanups.forEach(cleanup => cleanup())
    }
  }, [navigate])

  return (
    <div ref={wrapperRef}>
      <ExtendedHumansLibrary />
    </div>
  )
}

function ArticleShell({ children }: { children: JSX.Element }): JSX.Element {
  useEffect(() => {
    const cardSelectors = [
      'article div[style*="linear-gradient(135deg"]',
      'article div[style*="border-left"]',
      'article div[style*="border: 1px solid rgba"]',
    ]

    const cards = Array.from(document.querySelectorAll<HTMLElement>(cardSelectors.join(',')))
    cards.forEach((card) => card.classList.add('eh-glow-card'))

    const quoteCandidates = cards.filter((card) => {
      const text = card.innerText?.trim() ?? ''
      return text.length > 80 && text.length < 800
    })

    quoteCandidates.forEach((card) => {
      if (card.dataset.quoteEnhanced === 'true') return
      card.dataset.quoteEnhanced = 'true'
      if (getComputedStyle(card).position === 'static') card.style.position = 'relative'

      const actions = document.createElement('div')
      actions.className = 'eh-quote-actions'

      const copyButton = document.createElement('button')
      copyButton.className = 'eh-quote-btn'
      copyButton.textContent = 'Copy'
      copyButton.onclick = async () => {
        const text = (card.innerText || '').trim()
        if (!text) return
        await navigator.clipboard.writeText(text)
        copyButton.textContent = 'Copied'
        window.setTimeout(() => { copyButton.textContent = 'Copy' }, 1300)
      }

      const downloadButton = document.createElement('button')
      downloadButton.className = 'eh-quote-btn'
      downloadButton.textContent = 'Download'
      downloadButton.onclick = () => {
        const text = (card.innerText || '').trim()
        if (!text) return
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'extended-humans-quote.txt'
        a.click()
        URL.revokeObjectURL(url)
      }

      actions.appendChild(copyButton)
      actions.appendChild(downloadButton)
      card.appendChild(actions)
    })

    return () => {
      cards.forEach((card) => {
        card.classList.remove('eh-glow-card')
      })
      document.querySelectorAll('.eh-quote-actions').forEach((node) => node.remove())
      quoteCandidates.forEach((card) => {
        card.dataset.quoteEnhanced = 'false'
      })
    }
  }, [])

  return (
    <div className="route-page">
      <Link to="/" className="back-link">Back to Library</Link>
      {children}
    </div>
  )
}

export default function App(): JSX.Element {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<div className="route-page"><ClickableLibrary /></div>} />
      <Route path="/ai-consciousness" element={<ArticleShell><ConsciousnessArticle /></ArticleShell>} />
      <Route path="/data-machine" element={<ArticleShell><DataMachineArticle /></ArticleShell>} />
      <Route path="/the-more-you-learn" element={<ArticleShell><LearningArticle /></ArticleShell>} />
      <Route path="/cage-of-proof" element={<ArticleShell><CageOfProofArticle /></ArticleShell>} />
      <Route path="/language-trap" element={<ArticleShell><LanguageTrapArticle /></ArticleShell>} />
      <Route path="/emotions-installed" element={<ArticleShell><EmotionsArticle /></ArticleShell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
