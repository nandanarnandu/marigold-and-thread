import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-ivory border-b border-sage/30 px-8 py-5 relative">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="font-heading text-2xl text-espresso">
          Marigold & Thread
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8 font-body text-sm text-espresso">
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-terracotta transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-terracotta transition-colors">About</Link>
          <Link to="/contact" className="hover:text-terracotta transition-colors">Contact</Link>
        </div>

        {/* Right side: cart + mobile menu button */}
        <div className="flex items-center gap-5">
          <Link to="/cart" className="font-body text-sm text-espresso hover:text-terracotta transition-colors">
            Cart (0)
          </Link>

          {/* Hamburger button - only visible on mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden font-body text-espresso text-2xl leading-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu - only renders when open */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-5 pb-2 font-body text-sm text-espresso">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-terracotta transition-colors">Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-terracotta transition-colors">Shop</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-terracotta transition-colors">About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-terracotta transition-colors">Contact</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar