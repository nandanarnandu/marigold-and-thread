import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch, ApiError, API_URL } from '../lib/api'
import { useAuth } from '../context/useAuth'

type WishlistItem = {
  id: number
  product_id: number
  product: {
    id: number
    name: string
    price: number
    image_url: string | null
  }
}

function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    apiFetch('/wishlist/')
      .then((data) => setItems(data))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) navigate('/login')
      })
      .finally(() => setLoading(false))
  }, [isLoggedIn, navigate])

  async function removeItem(itemId: number) {
    try {
      await apiFetch(`/wishlist/items/${itemId}`, { method: 'DELETE' })
      setItems((prev) => prev.filter((i) => i.id !== itemId))
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) navigate('/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="font-body text-espresso">Loading your wishlist...</p>
      </div>
    )
  }

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <h1 className="font-heading text-4xl text-espresso text-center mb-12">Your Wishlist</h1>

      <div className="max-w-3xl mx-auto">
        {items.length === 0 && (
          <p className="text-center font-body text-espresso/60 mb-10">Your wishlist is empty.</p>
        )}

        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-5 border-b border-sage/30 pb-6">
              <Link to={`/product/${item.product.id}`} className="w-24 h-32 bg-sage/20 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.product.image_url ? `${API_URL}${item.product.image_url}` : ''}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex-1">
                <Link to={`/product/${item.product.id}`} className="font-heading text-lg text-espresso hover:text-terracotta transition-colors">
                  {item.product.name}
                </Link>
                <p className="font-body text-sm text-terracotta mt-1">₹{item.product.price}</p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="font-body text-xs text-espresso/50 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <Link to="/shop" className="block text-center mt-10 font-body text-sm text-espresso/60 hover:text-terracotta transition-colors">
          ← Continue shopping
        </Link>
      </div>
    </div>
  )
}

export default Wishlist
