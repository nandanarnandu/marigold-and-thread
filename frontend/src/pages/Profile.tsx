import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch, ApiError } from '../lib/api'
import { useAuth } from '../context/useAuth'

type Me = {
  id: number
  email: string
  name: string
}

function Profile() {
  const [me, setMe] = useState<Me | null>(null)
  const [loading, setLoading] = useState(true)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profileMessage, setProfileMessage] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    apiFetch('/me')
      .then((data) => {
        setMe(data)
        setName(data.name)
        setEmail(data.email)
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) navigate('/login')
      })
      .finally(() => setLoading(false))
  }, [isLoggedIn, navigate])

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSavingProfile(true)
    setProfileMessage('')
    try {
      const updated = await apiFetch('/me', {
        method: 'PUT',
        body: JSON.stringify({ name, email }),
      })
      setMe(updated)
      setProfileMessage('Profile updated!')
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        navigate('/login')
        return
      }
      setProfileMessage(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setSavingProfile(false)
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSavingPassword(true)
    setPasswordMessage('')
    try {
      await apiFetch('/me/password', {
        method: 'PUT',
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
      })
      setPasswordMessage('Password changed!')
      setCurrentPassword('')
      setNewPassword('')
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        navigate('/login')
        return
      }
      setPasswordMessage(err instanceof Error ? err.message : 'Failed to change password')
    } finally {
      setSavingPassword(false)
    }
  }

  if (loading || !me) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="font-body text-espresso">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="bg-ivory min-h-screen px-8 py-16">
      <h1 className="font-heading text-4xl text-espresso text-center mb-12">Your Profile</h1>

      <div className="max-w-md mx-auto flex flex-col gap-12">
        <form onSubmit={handleProfileSubmit} className="flex flex-col gap-5">
          <h2 className="font-heading text-xl text-espresso">Account Details</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso focus:outline-none focus:border-terracotta"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso focus:outline-none focus:border-terracotta"
          />

          {profileMessage && <p className="font-body text-sm text-espresso/70">{profileMessage}</p>}

          <button
            type="submit"
            disabled={savingProfile}
            className="bg-terracotta text-ivory font-body px-8 py-3 rounded-full hover:bg-espresso transition-colors disabled:opacity-50"
          >
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5">
          <h2 className="font-heading text-xl text-espresso">Change Password</h2>

          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso focus:outline-none focus:border-terracotta"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso focus:outline-none focus:border-terracotta"
          />

          {passwordMessage && <p className="font-body text-sm text-espresso/70">{passwordMessage}</p>}

          <button
            type="submit"
            disabled={savingPassword}
            className="bg-terracotta text-ivory font-body px-8 py-3 rounded-full hover:bg-espresso transition-colors disabled:opacity-50"
          >
            {savingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
