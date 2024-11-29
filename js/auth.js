// Use production URL in production, localhost in development
const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://gammaws-recipe-cards-production.up.railway.app/api'

// Handle signup
export async function signup(fullName, email, password) {
  try {
    console.log('Attempting signup with:', { fullName, email })
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ fullName, email, password }),
    })

    console.log('Signup response status:', response.status)
    let data
    try {
      if (response.status === 0) {
        throw new Error('Network error - unable to reach the server')
      }
      data = await response.json()
      console.log('Signup response data:', data)
    } catch (e) {
      console.error('Error parsing response:', e)
      if (response.status === 0) {
        throw new Error(
          'Unable to connect to server. Please check your internet connection.'
        )
      } else if (response.status === 404) {
        throw new Error('Server endpoint not found. Please try again later.')
      } else if (response.status === 500) {
        throw new Error('Server error. Please try again later.')
      } else {
        throw new Error('Unable to connect to server. Please try again.')
      }
    }

    if (!response.ok) {
      throw new Error(data?.message || 'Signup failed')
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    console.log('Stored token:', data.token)
    console.log('Stored userId:', data.userId)
    window.location.href = 'recipes.html'
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
        Accept: 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ email, password }),
    })

    console.log('Login response status:', response.status)
    let data
    try {
      if (response.status === 0) {
        throw new Error('Network error - unable to reach the server')
      }
      data = await response.json()
      console.log('Login response data:', data)
    } catch (e) {
      console.error('Error parsing response:', e)
      if (response.status === 0) {
        throw new Error(
          'Unable to connect to server. Please check your internet connection.'
        )
      } else if (response.status === 404) {
        throw new Error('Server endpoint not found. Please try again later.')
      } else if (response.status === 500) {
        throw new Error('Server error. Please try again later.')
      } else {
        throw new Error('Unable to connect to server. Please try again.')
      }
    }

    if (!response.ok) {
      throw new Error(data?.message || 'Login failed')
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    console.log('Stored token:', data.token)
    console.log('Stored userId:', data.userId)
    window.location.href = 'recipes.html'
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
  window.location.href = 'index.html'
}
