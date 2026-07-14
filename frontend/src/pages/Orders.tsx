import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch, ApiError, API_URL } from '../lib/api'
import { useAuth } from '../context/useAuth'

type OrderItem = {
  id: number
  quantity: number
  price_at_purchase: number
  product: {
    id: number
    name: string
    image_url: string | null
  }
}

type Order = {
  id: number
  total: number
  status: string
  created_at: string
  items: OrderItem[]
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    apiFetch('/orders/')
      .then((data) => setOrders(data))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) navigate('/login')
      })
      .finally(() => setLoading(false))
  }, [isLoggedIn, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="font-body text-espresso">Loading your orders...</p>
      </div>
    )
  }

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <h1 className="font-heading text-4xl text-espresso text-center mb-12">Your Orders</h1>

      <div className="max-w-3xl mx-auto">
        {orders.length === 0 && (
          <p className="text-center font-body text-espresso/60">You haven't placed any orders yet.</p>
        )}

        <div className="flex flex-col gap-8">
          {orders.map((order) => (
            <div key={order.id} className="border border-sage/30 rounded-md p-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-sage/20">
                <div>
                  <p className="font-body text-sm text-espresso/60">Order #{order.id}</p>
                  <p className="font-body text-xs text-espresso/40">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="font-body text-xs px-3 py-1 rounded-full bg-sage/20 text-espresso capitalize">
                  {order.status}
                </span>
              </div>

              <div className="flex flex-col gap-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-14 h-18 bg-sage/20 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image_url ? `${API_URL}${item.product.image_url}` : ''}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-sm text-espresso">{item.product.name}</p>
                      <p className="font-body text-xs text-espresso/60">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-body text-sm text-terracotta">₹{item.price_at_purchase * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-body text-espresso pt-3 border-t border-sage/20">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
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

export default Orders
