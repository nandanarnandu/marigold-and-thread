import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

function Shop() {
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

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  )
}

export default Shop