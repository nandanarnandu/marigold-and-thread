import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { useAuth } from '../context/useAuth'

type CartItem = {
  id: number
  product_id: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    image_url: string | null
  }
}

type CartData = {
  id: number
  items: CartItem[]
}

function Cart() {
  const [cart, setCart] = useState<CartData | null>(null)
  const [loading, setLoading] = useState(true)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    apiFetch('/cart/')
      .then((data) => setCart(data))
      .finally(() => setLoading(false))
  }, [isLoggedIn, navigate])

  async function removeItem(itemId: number) {
    const updated = await apiFetch(`/cart/items/${itemId}`, { method: 'DELETE' })
    setCart(updated)
  }

  async function handleCheckout() {
    try {
      await apiFetch('/orders/', { method: 'POST' })
      navigate('/')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Checkout failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="font-body text-espresso">Loading your cart...</p>
      </div>
    )
  }

  const items = cart?.items ?? []
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <h1 className="font-heading text-4xl text-espresso text-center mb-12">Your Cart</h1>

      <div className="max-w-3xl mx-auto">
        {items.length === 0 && (
          <p className="text-center font-body text-espresso/60 mb-10">Your cart is empty.</p>
        )}

        <div className="flex flex-col gap-6 mb-10">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-5 border-b border-sage/30 pb-6">
              <div className="w-24 h-32 bg-sage/20 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.product.image_url ?? ''}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-heading text-lg text-espresso">{item.product.name}</h3>
                <p className="font-body text-sm text-espresso/60 mt-1">Qty: {item.quantity}</p>
              </div>

              <p className="font-body text-terracotta">₹{item.product.price * item.quantity}</p>

              <button
                onClick={() => removeItem(item.id)}
                className="font-body text-xs text-espresso/50 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <>
            <div className="bg-sage/10 rounded-md p-6 mb-8">
              <div className="flex justify-between font-body text-espresso mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between font-body text-espresso/60 text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-terracotta text-ivory font-body px-8 py-4 rounded-full hover:bg-espresso transition-colors"
            >
              Proceed to Checkout
            </button>
          </>
        )}

        <Link to="/shop" className="block text-center mt-6 font-body text-sm text-espresso/60 hover:text-terracotta transition-colors">
          ← Continue shopping
        </Link>
      </div>
    </div>
  )
}

export default Cart