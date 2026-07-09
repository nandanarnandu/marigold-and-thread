import { useEffect, useState, useCallback } from 'react'
import ProductCard from '../components/ProductCard'
import { apiFetch, API_URL } from '../lib/api'
import { categories } from '../data/categories'
import type { Product } from '../types/product'

const PAGE_SIZE = 50

function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  // Debounce search input - waits 400ms after typing stops before searching
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const fetchProducts = useCallback(
    async (pageToFetch: number, append: boolean) => {
      const params = new URLSearchParams()
      if (debouncedSearch) params.set('search', debouncedSearch)
      if (activeCategory) params.set('category', activeCategory)
      if (activeSubcategory) params.set('subcategory', activeSubcategory)
      params.set('skip', String(pageToFetch * PAGE_SIZE))
      params.set('limit', String(PAGE_SIZE))

      if (append) setLoadingMore(true)
      else setLoading(true)

      try {
        const data: Product[] = await apiFetch(`/products/?${params.toString()}`)
        setProducts((prev) => (append ? [...prev, ...data] : data))
        setHasMore(data.length === PAGE_SIZE)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products')
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [debouncedSearch, activeCategory, activeSubcategory]
  )

  // Reset to page 0 and refetch whenever search/filters change
  useEffect(() => {
    setPage(0)
    fetchProducts(0, false)
  }, [debouncedSearch, activeCategory, activeSubcategory, fetchProducts])

  function loadMore() {
    const nextPage = page + 1
    setPage(nextPage)
    fetchProducts(nextPage, true)
  }

  function selectCategory(cat: string) {
    if (activeCategory === cat) {
      setActiveCategory(null)
      setActiveSubcategory(null)
    } else {
      setActiveCategory(cat)
      setActiveSubcategory(null)
    }
  }

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <div className="text-center mb-10">
        <p className="font-body text-sm uppercase tracking-widest text-terracotta mb-3">
          Full collection
        </p>
        <h1 className="font-heading text-4xl text-espresso">Shop All Pieces</h1>
      </div>

      {/* Search box */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full font-body px-4 py-3 rounded-full border border-sage/40 bg-white text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta"
        />
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
      {!loading && products.length === 0 && (
        <p className="text-center font-body text-espresso/60">No products match your search.</p>
      )}

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

      {hasMore && !loading && products.length > 0 && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="font-body text-sm px-8 py-3 rounded-full border border-terracotta text-terracotta hover:bg-terracotta hover:text-ivory transition-colors disabled:opacity-50"
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Shop