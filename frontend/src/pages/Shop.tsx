import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { apiFetch } from '../lib/api'
import type { Product } from '../types/product'

function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    apiFetch('/products/')
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <div className="text-center mb-12">
        <p className="font-body text-sm uppercase tracking-widest text-terracotta mb-3">
          Full collection
        </p>
        <h1 className="font-heading text-4xl text-espresso">
          Shop All Pieces
        </h1>
      </div>

      {loading && <p className="text-center font-body text-espresso/60">Loading products...</p>}
      {error && <p className="text-center font-body text-red-600">{error}</p>}

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={String(product.id)}
            name={product.name}
            price={product.price}
            image={product.image_url ?? ''}
          />
        ))}
      </div>
    </div>
  )
}

export default Shop