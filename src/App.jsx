import { useState, useEffect, useCallback } from 'react'
import MenuBoard from './MenuBoard'
import './App.css'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Trigger entrance animation after image loads
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

  return (
    <div className="scene">
      <div className={`scene__frame ${loaded ? 'scene__frame--visible' : ''}`}>
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

        {/* Steam wisps rising from the coffee cup */}
        <div className="steam" aria-hidden="true">
          <div className="steam__wisp steam__wisp--1" />
          <div className="steam__wisp steam__wisp--2" />
          <div className="steam__wisp steam__wisp--3" />
        </div>
      </div>

      <div
        className={`overlay ${menuOpen ? 'overlay--visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <MenuBoard isOpen={menuOpen} onClose={closeMenu} />
    </div>
  )
}
