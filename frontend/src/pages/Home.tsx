import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import OurStory from '../components/OurStory'
import WhyChooseUs from '../components/WhyChooseUs'
import ProductCard from '../components/ProductCard'
import { apiFetch, API_URL } from '../lib/api'
import type { Product } from '../types/product'

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    apiFetch('/products/')
      .then((data) => setProducts(data.slice(0, 3))) // just first 3 as "featured"
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-ivory min-h-screen">
      <Hero />

      <div className="px-8 py-16">
        <h2 className="font-heading text-4xl text-espresso text-center mb-12">
          Featured Pieces
        </h2>

        {loading && <p className="text-center font-body text-espresso/60">Loading products...</p>}
        {error && <p className="text-center font-body text-red-600">{error}</p>}

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={String(product.id)}
              name={product.name}
              price={product.price}
              image={product.image_url ? `${API_URL}${product.image_url}` : ''}
            />
          ))}
        </div>
      </div>

      <OurStory />
      <WhyChooseUs />
    </div>
  )
}

export default Home