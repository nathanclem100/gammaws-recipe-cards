const API_URL = 'http://localhost:3000/api'

// Handle signup
export async function signup(fullName, email, password) {
  try {
    console.log('Attempting signup with:', { fullName, email })
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, password }),
    })

    console.log('Signup response status:', response.status)
    const data = await response.json()
    console.log('Signup response data:', data)

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed')
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    console.log('Stored token:', data.token)
    console.log('Stored userId:', data.userId)
    window.location.href = '/recipes.html'
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

// Handle login
export async function login(email, password) {
  try {
    console.log('Attempting login with email:', email)
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    console.log('Login response status:', response.status)
    const data = await response.json()
    console.log('Login response data:', data)

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    console.log('Stored token:', data.token)
    console.log('Stored userId:', data.userId)
    window.location.href = '/recipes.html'
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  const token = localStorage.getItem('token')
  console.log('Checking authentication, token:', token)
  return !!token
}

// Logout
export function logout() {
  console.log('Logging out...')
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  window.location.href = '/index.html'
}