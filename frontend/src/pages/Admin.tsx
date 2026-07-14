import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch, ApiError, API_URL } from '../lib/api'
import { useAuth } from '../context/useAuth'
import type { Product } from '../types/product'

const emptyForm = {
  name: '',
  description: '',
  price: '',
  image_url: '',
  category: '',
  subcategory: '',
  stock: '',
  colour: '',
  rating: '',
}

function Admin() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [checkingAdmin, setCheckingAdmin] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    apiFetch('/me')
      .then((me) => {
        if (!me.is_admin) {
          navigate('/')
          return
        }
        setIsAdmin(true)
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) navigate('/login')
      })
      .finally(() => setCheckingAdmin(false))
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (!isAdmin) return
    loadProducts()
  }, [isAdmin])

  function loadProducts() {
    setLoadingProducts(true)
    apiFetch('/products/?limit=100')
      .then((data) => setProducts(data))
      .finally(() => setLoadingProducts(false))
  }

  function startEdit(product: Product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      description: product.description ?? '',
      price: String(product.price),
      image_url: product.image_url ?? '',
      category: product.category ?? '',
      subcategory: product.subcategory ?? '',
      stock: String(product.stock),
      colour: product.colour ?? '',
      rating: String(product.rating ?? ''),
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const payload = {
      name: form.name,
      description: form.description || null,
      price: Number(form.price),
      image_url: form.image_url || null,
      category: form.category || null,
      subcategory: form.subcategory || null,
      stock: Number(form.stock),
      colour: form.colour || null,
      rating: form.rating ? Number(form.rating) : 0,
    }

    try {
      if (editingId) {
        await apiFetch(`/products/${editingId}`, { method: 'PUT', body: JSON.stringify(payload) })
        setMessage('Product updated!')
      } else {
        await apiFetch('/products/', { method: 'POST', body: JSON.stringify(payload) })
        setMessage('Product created!')
      }
      cancelEdit()
      loadProducts()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this product?')) return
    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' })
      loadProducts()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to delete product')
    }
  }

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="font-body text-espresso">Checking access...</p>
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <h1 className="font-heading text-4xl text-espresso text-center mb-12">Manage Products</h1>

      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="font-heading text-xl text-espresso mb-5">
          {editingId ? `Edit Product #${editingId}` : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso sm:col-span-2"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso sm:col-span-2"
          />
          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso"
          />
          <input
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso"
          />
          <input
            placeholder="Image URL (e.g. /static/products/x.jpg)"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso sm:col-span-2"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso"
          />
          <input
            placeholder="Subcategory"
            value={form.subcategory}
            onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso"
          />
          <input
            placeholder="Colour"
            value={form.colour}
            onChange={(e) => setForm({ ...form, colour: e.target.value })}
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso"
          />
          <input
            placeholder="Rating"
            type="number"
            step="0.1"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso"
          />

          {message && <p className="font-body text-sm text-espresso/70 sm:col-span-2">{message}</p>}

          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-terracotta text-ivory font-body px-8 py-3 rounded-full hover:bg-espresso transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="font-body text-sm text-espresso/60 hover:text-terracotta transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-xl text-espresso mb-5">All Products</h2>

        {loadingProducts ? (
          <p className="font-body text-espresso/60">Loading...</p>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 border-b border-sage/30 pb-3">
                <div className="w-12 h-16 bg-sage/20 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={product.image_url ? `${API_URL}${product.image_url}` : ''}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm text-espresso">{product.name}</p>
                  <p className="font-body text-xs text-espresso/60">₹{product.price} · Stock: {product.stock}</p>
                </div>
                <button
                  onClick={() => startEdit(product)}
                  className="font-body text-xs text-espresso/70 hover:text-terracotta transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="font-body text-xs text-espresso/50 hover:text-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
