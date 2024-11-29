const API_URL = 'http://localhost:3000/api'

// Handle signup
async function signup(fullName, email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, password }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Signup failed')
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    window.location.href = '/recipes.html'
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

// Handle login
async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    window.location.href = '/recipes.html'
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Check if user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem('token')
}

// Logout
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  window.location.href = '/index.html'
}
