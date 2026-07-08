import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'

function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="font-body text-espresso">Product not found.</p>
      </div>
    )
  }

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Image */}
        <div className="aspect-[3/4] bg-sage/20 rounded-md overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="font-heading text-4xl text-espresso mb-3">
            {product.name}
          </h1>
          <p className="font-body text-xl text-terracotta mb-6">
            ₹{product.price}
          </p>
          <p className="font-body text-espresso/70 leading-relaxed mb-8">
            A carefully restored vintage piece, hand-selected for its character
            and craftsmanship. Each item is one-of-a-kind — once it's gone, it's gone.
          </p>

          <button className="bg-terracotta text-ivory font-body px-8 py-3 rounded-full hover:bg-espresso transition-colors">
            Add to Cart
          </button>

          <Link
            to="/shop"
            className="block mt-6 font-body text-sm text-espresso/60 hover:text-terracotta transition-colors"
          >
            ← Back to shop
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ProductDetail