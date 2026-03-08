import { useState, useEffect, useCallback, useRef } from 'react'
import MenuBoard from './MenuBoard'
import './App.css'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [cursorOn, setCursorOn] = useState(false)
  const cursorRef = useRef(null)

  const handleImageLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen, closeMenu])

  // Track mouse position for custom cursor
  const handleMouseMove = useCallback((e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX + 'px'
      cursorRef.current.style.top = e.clientY + 'px'
    }
  }, [])

  return (
    <div className="scene" onMouseMove={handleMouseMove}>
      <div className={`scene__frame ${loaded ? 'scene__frame--visible' : ''}`}
        onMouseEnter={() => setCursorOn(true)}
        onMouseLeave={() => setCursorOn(false)}
      >
        <img
          src="/policy-cafe.jpg"
          alt="Policy Cafe illustration — a penguin barista serves coffee at a cozy pastel counter"
          className="scene__img"
          draggable={false}
          onLoad={handleImageLoad}
        />

        {/* Hotspot over the "click me!" note */}
        <button
          className="hotspot"
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        />

        {/* Music notes floating from the radio */}
        <div className="music-notes" aria-hidden="true">
          <span className="note note--1">♪</span>
          <span className="note note--2">♫</span>
          <span className="note note--3">♪</span>
          <span className="note note--4">♫</span>
          <span className="note note--5">♪</span>
        </div>

        {/* Animated clouds drifting across the sky */}
        <div className="clouds" aria-hidden="true">
          <div className="cloud cloud--1" />
          <div className="cloud cloud--2" />
          <div className="cloud cloud--3" />
          <div className="cloud cloud--4" />
          <div className="cloud cloud--5" />
          <div className="cloud cloud--6" />
        </div>

        {/* Steam wisps rising from the coffee cup */}
        <div className="steam" aria-hidden="true">
          <div className="steam__wisp steam__wisp--1" />
          <div className="steam__wisp steam__wisp--2" />
          <div className="steam__wisp steam__wisp--3" />
        </div>
      </div>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${cursorOn && !menuOpen ? 'custom-cursor--visible' : ''}`}
      />

      <div
        className={`overlay ${menuOpen ? 'overlay--visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <MenuBoard isOpen={menuOpen} onClose={closeMenu} />
    </div>
  )
}
