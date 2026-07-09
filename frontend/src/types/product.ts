export type Product = {
  id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  subcategory: string | null
  stock: number
}