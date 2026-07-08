import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="w-full bg-ivory border-b border-sage/30 px-8 py-5 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="font-heading text-2xl text-espresso">
        Marigold & Thread
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex gap-8 font-body text-sm text-espresso">
        <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
        <Link to="/shop" className="hover:text-terracotta transition-colors">Shop</Link>
        <Link to="/about" className="hover:text-terracotta transition-colors">About</Link>
        <Link to="/contact" className="hover:text-terracotta transition-colors">Contact</Link>
      </div>

      {/* Cart icon (placeholder for now) */}
      <div className="font-body text-sm text-espresso cursor-pointer">
        Cart (0)
      </div>

    </nav>
  )
}

export default Navbar