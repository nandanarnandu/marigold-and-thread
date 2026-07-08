import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="w-full bg-espresso text-ivory px-8 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-heading text-lg">Marigold & Thread</p>

        <nav className="flex gap-6 font-body text-sm">
          <Link to="/shop" className="hover:text-terracotta transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-terracotta transition-colors">About</Link>
          <Link to="/contact" className="hover:text-terracotta transition-colors">Contact</Link>
        </nav>

        <p className="font-body text-xs text-ivory/60">
          &copy; {new Date().getFullYear()} Marigold & Thread. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
