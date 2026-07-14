import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { apiFetch, ApiError, API_URL } from '../lib/api'
import { useAuth } from '../context/useAuth'
import type { Product } from '../types/product'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [message, setMessage] = useState('')
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    apiFetch(`/products/${id}`)
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  function decreaseQty() {
    setQuantity((q) => Math.max(1, q - 1))
  }

  function increaseQty() {
    setQuantity((q) => {
      if (product && q >= product.stock) return q
      return q + 1
    })
  }

  async function handleAddToCart() {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    setAdding(true)
    setMessage('')
    try {
      await apiFetch('/cart/items', {
        method: 'POST',
        body: JSON.stringify({ product_id: Number(id), quantity }),
      })
      setMessage(`Added ${quantity} to cart!`)
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        navigate('/login')
        return
      }
      setMessage(err instanceof Error ? err.message : 'Failed to add to cart')
    } finally {
      setAdding(false)
    }
  }

    async function handleAddToWishlist() {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    try {
      await apiFetch('/wishlist/items', {
        method: 'POST',
        body: JSON.stringify({ product_id: Number(id) }),
      })
      setMessage('Added to wishlist!')
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        navigate('/login')
        return
      }
      setMessage(err instanceof Error ? err.message : 'Failed to add to wishlist')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="font-body text-espresso">Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="font-body text-espresso">Product not found.</p>
      </div>
    )
  }

  const outOfStock = product.stock === 0

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="aspect-[3/4] bg-sage/20 rounded-md overflow-hidden">
          <img
            src={product.image_url ? `${API_URL}${product.image_url}` : ''}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          {/* Breadcrumb-style category tag */}
          {product.category && (
            <p className="font-body text-xs uppercase tracking-widest text-terracotta mb-3">
              {product.category}
              {product.subcategory && ` · ${product.subcategory}`}
            </p>
          )}

          <h1 className="font-heading text-4xl text-espresso mb-3">{product.name}</h1>
          <p className="font-body text-xl text-terracotta mb-2">₹{product.price}</p>

          {/* Colour and rating */}
          <div className="flex items-center gap-4 mb-4">
            {product.rating > 0 && (
              <p className="font-body text-sm text-espresso/70">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
                <span className="ml-1 text-espresso/50">({product.rating})</span>
              </p>
            )}
            {product.colour && (
              <p className="font-body text-sm text-espresso/70">
                Colour: <span className="text-espresso">{product.colour}</span>
              </p>
            )}
          </div>

          {/* Stock status */}
          <p className={`font-body text-sm mb-6 ${outOfStock ? 'text-red-600' : 'text-espresso/50'}`}>
            {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
          </p>

          <p className="font-body text-espresso/70 leading-relaxed mb-8">
            {product.description}
          </p>

          {!outOfStock && (
            <>
              {/* Quantity selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-body text-sm text-espresso/70">Quantity</span>
                <div className="flex items-center border border-sage/40 rounded-full overflow-hidden">
                  <button
                    onClick={decreaseQty}
                    disabled={quantity <= 1}
                    className="w-9 h-9 font-body text-espresso hover:bg-sage/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-body text-espresso">{quantity}</span>
                  <button
                    onClick={increaseQty}
                    disabled={quantity >= product.stock}
                    className="w-9 h-9 font-body text-espresso hover:bg-sage/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="bg-terracotta text-ivory font-body px-8 py-3 rounded-full hover:bg-espresso transition-colors disabled:opacity-50"
              >
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </>
          )}

          {outOfStock && (
            <button
              disabled
              className="bg-sage/30 text-espresso/50 font-body px-8 py-3 rounded-full cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}

          <button
            onClick={handleAddToWishlist}
            className="font-body text-sm text-espresso border border-sage/40 px-6 py-3 rounded-full hover:border-terracotta hover:text-terracotta transition-colors mt-4"
          >
            Wishlist
          </button>

          {message && <p className="font-body text-sm text-espresso/70 mt-4">{message}</p>}

          <Link to="/shop" className="block mt-6 font-body text-sm text-espresso/60 hover:text-terracotta transition-colors">
            ← Back to shop
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail