import { useRef, useEffect } from 'react'

/*
  TWEAK: edit the menu items here.
  Each section has a title and array of items with label + desc.
*/
const MENU_SECTIONS = [
  {
    title: 'About',
    items: [
      { label: 'Welcome', desc: "isa's corner for policy & tech", href: '#about' },
      { label: 'Background', desc: 'public policy meets engineering', href: '#background' },
    ],
  },
  {
    title: 'Projects',
    items: [
      { label: 'Civic Tech Tools', desc: 'participatory budgeting prototypes', href: '#civic-tech' },
      { label: 'Policy Dashboard', desc: 'data viz for local impact', href: '#dashboard' },
      { label: 'Algorithmic Fairness', desc: 'equity in public-sector AI', href: '#fairness' },
    ],
  },
  {
    title: 'Connect',
    items: [
      { label: 'GitHub', desc: '@isabellereks', href: 'https://github.com/isabellereks' },
      { label: 'LinkedIn', desc: "let's connect", href: 'https://linkedin.com' },
      { label: 'Email', desc: 'say hello', href: 'mailto:hello@example.com' },
    ],
  },
]

export default function MenuBoard({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  // Focus close button when opening
  useEffect(() => {
    if (isOpen && closeRef.current) {
      closeRef.current.focus()
    }
  }, [isOpen])

  // Trap focus inside panel
  useEffect(() => {
    if (!isOpen) return

    const panel = panelRef.current
    if (!panel) return

    const handleTab = (e) => {
      if (e.key !== 'Tab') return
      const focusable = panel.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    panel.addEventListener('keydown', handleTab)
    return () => panel.removeEventListener('keydown', handleTab)
  }, [isOpen])

  return (
    <nav
      ref={panelRef}
      className={`menu-board ${isOpen ? 'menu-board--open' : ''}`}
      role="navigation"
      aria-label="Site navigation"
      aria-hidden={!isOpen}
    >
      <button
        ref={closeRef}
        className="menu-board__close"
        onClick={onClose}
        aria-label="Close menu"
      >
        &times;
      </button>

      <h2 className="menu-board__heading">Policy Cafe</h2>
      <div className="menu-board__divider" />

      {MENU_SECTIONS.map((section) => (
        <div key={section.title} className="menu-board__section">
          <h3 className="menu-board__section-title">{section.title}</h3>
          {section.items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="menu-board__item"
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="menu-board__item-label">{item.label}</span>
              <span className="menu-board__item-desc">{item.desc}</span>
            </a>
          ))}
        </div>
      ))}

      <div className="menu-board__footer">
        policy + tech, one cup at a time ☕
      </div>
    </nav>
  )
}
