const API_URL = "http://localhost:8000"

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
    throw new Error(error.detail || "Request failed")
  }

  return response.json()
}