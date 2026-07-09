import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="bg-ivory min-h-screen px-8 py-20">
      <div className="max-w-md mx-auto">
        <h1 className="font-heading text-4xl text-espresso text-center mb-10">Log In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso focus:outline-none focus:border-terracotta"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso focus:outline-none focus:border-terracotta"
          />

          {error && <p className="font-body text-sm text-red-600">{error}</p>}

          <button type="submit" className="bg-terracotta text-ivory font-body px-8 py-3 rounded-full hover:bg-espresso transition-colors">
            Log In
          </button>
        </form>

        <p className="font-body text-sm text-espresso/60 text-center mt-6">
          Don't have an account? <Link to="/signup" className="text-terracotta hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login