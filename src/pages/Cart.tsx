import { Link } from 'react-router-dom'
import { products } from '../data/products'

function Cart() {
  // Using first 2 products as demo cart items
  const cartItems = products.slice(0, 2)
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0)

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <h1 className="font-heading text-4xl text-espresso text-center mb-12">
        Your Cart
      </h1>

      <div className="max-w-3xl mx-auto">
        {/* Cart items */}
        <div className="flex flex-col gap-6 mb-10">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 border-b border-sage/30 pb-6"
            >
              <div className="w-24 h-32 bg-sage/20 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-heading text-lg text-espresso">{item.name}</h3>
                <p className="font-body text-sm text-espresso/60 mt-1">Qty: 1</p>
              </div>

              <p className="font-body text-terracotta">₹{item.price}</p>
            </div>
          ))}
        </div>

        {/* Order summary */}
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

        <button className="w-full bg-terracotta text-ivory font-body px-8 py-4 rounded-full hover:bg-espresso transition-colors">
          Proceed to Checkout
        </button>

        <Link
          to="/shop"
          className="block text-center mt-6 font-body text-sm text-espresso/60 hover:text-terracotta transition-colors"
        >
          ← Continue shopping
        </Link>
      </div>
    </div>
  )
}

export default Cart