document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form')
  const signupForm = document.getElementById('signup-form')
  const tabButtons = document.querySelectorAll('.tab-btn')

  // Sample user database (in a real app, this would be on a server)
  const users = [
    {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    },
  ]

  // Handle tab switching
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Update tab buttons
      tabButtons.forEach((btn) => btn.classList.remove('active'))
      button.classList.add('active')

      // Update form display
      const formType = button.getAttribute('data-form')
      if (formType === 'login') {
        loginForm.classList.add('active')
        signupForm.classList.remove('active')
        document.querySelector('h2').textContent = 'Login Form'
      } else {
        signupForm.classList.add('active')
        loginForm.classList.remove('active')
        document.querySelector('h2').textContent = 'Signup Form'
      }
    })
  })

  // Handle signup form submission
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const name = this.querySelector('input[type="text"]').value
    const email = this.querySelector('input[type="email"]').value
    const password = this.querySelectorAll('input[type="password"]')[0].value
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1]
      .value

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    // Add new user to users array
    users.push({
      email,
      password,
      name,
    })

    alert('Signup successful! Please login.')
    // Switch to login tab
    tabButtons[0].click()
  })

  // Handle login form submission
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const email = this.querySelector('input[type="email"]').value
    const password = this.querySelector('input[type="password"]').value

    // Check if user exists
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      // Store user info in localStorage (in a real app, use proper session management)
      localStorage.setItem('currentUser', JSON.stringify(user))
      window.location.href = 'recipes.html'
    } else {
      alert('Invalid email or password!')
    }
  })
})
