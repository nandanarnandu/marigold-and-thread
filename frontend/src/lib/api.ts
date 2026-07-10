export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token")

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Something went wrong" }))

    if (response.status === 401 && token) {
      localStorage.removeItem("token")
      window.dispatchEvent(new Event("auth:unauthorized"))
    }

    throw new ApiError(error.detail || "Request failed", response.status)
  }

  return response.json()
}