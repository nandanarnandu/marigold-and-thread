import { Link } from 'react-router-dom'

type ProductCardProps = {
  id: string
  name: string
  price: number
  image: string
}

function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="w-full aspect-[3/4] bg-sage/20 overflow-hidden rounded-md">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-heading text-lg text-espresso mt-3">{name}</h3>
      <p className="font-body text-sm text-terracotta mt-1">₹{price}</p>
    </Link>
  )
}

export default ProductCard