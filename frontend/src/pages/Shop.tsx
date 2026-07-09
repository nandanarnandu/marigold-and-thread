import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { apiFetch, API_URL } from '../lib/api'
import { categories } from '../data/categories'
import type { Product } from '../types/product'

function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)

  useEffect(() => {
    apiFetch('/products/')
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function selectCategory(cat: string) {
    if (activeCategory === cat) {
      // clicking the same category again clears the filter
      setActiveCategory(null)
      setActiveSubcategory(null)
    } else {
      setActiveCategory(cat)
      setActiveSubcategory(null)
    }
  }

  const filteredProducts = products.filter((p) => {
    if (activeCategory && p.category !== activeCategory) return false
    if (activeSubcategory && p.subcategory !== activeSubcategory) return false
    return true
  })

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <div className="text-center mb-12">
        <p className="font-body text-sm uppercase tracking-widest text-terracotta mb-3">
          Full collection
        </p>
        <h1 className="font-heading text-4xl text-espresso">Shop All Pieces</h1>
      </div>

      {/* Category filter row */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => { setActiveCategory(null); setActiveSubcategory(null) }}
          className={`font-body text-sm px-5 py-2 rounded-full border transition-colors ${
            activeCategory === null
              ? 'bg-terracotta text-ivory border-terracotta'
              : 'bg-white text-espresso border-sage/40 hover:border-terracotta'
          }`}
        >
          All
        </button>
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`font-body text-sm px-5 py-2 rounded-full border transition-colors ${
              activeCategory === cat
                ? 'bg-terracotta text-ivory border-terracotta'
                : 'bg-white text-espresso border-sage/40 hover:border-terracotta'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subcategory row - only shows when a category is selected */}
      {activeCategory && (
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 mb-12">
          {categories[activeCategory as keyof typeof categories].map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubcategory(activeSubcategory === sub ? null : sub)}
              className={`font-body text-xs px-4 py-1.5 rounded-full border transition-colors ${
                activeSubcategory === sub
                  ? 'bg-sage/40 text-espresso border-sage'
                  : 'bg-transparent text-espresso/60 border-sage/30 hover:border-sage'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {loading && <p className="text-center font-body text-espresso/60">Loading products...</p>}
      {error && <p className="text-center font-body text-red-600">{error}</p>}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-center font-body text-espresso/60">No products match this filter.</p>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredProducts.map((product) => (
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
  )
}

export default Shop