import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="bg-blush/30 px-8 py-24 text-center">
      <p className="font-body text-sm uppercase tracking-widest text-terracotta mb-4">
        New arrivals
      </p>
      <h1 className="font-heading text-5xl md:text-6xl text-espresso mb-6 max-w-2xl mx-auto">
        Vintage-inspired pieces, curated with love
      </h1>
      <p className="font-body text-espresso/70 max-w-md mx-auto mb-8">
        Small batch, always intentional. Every piece tells a story worth keeping.
      </p>
      <Link
        to="/shop"
        className="inline-block bg-terracotta text-ivory font-body px-8 py-3 rounded-full hover:bg-espresso transition-colors"
      >
        Shop the collection
      </Link>
    </section>
  )
}

export default Hero