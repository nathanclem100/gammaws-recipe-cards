document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn')
  const forms = document.querySelectorAll('.form')
  const signupForm = document.getElementById('signup-form')
  const loginForm = document.getElementById('login-form')

  // Handle tab switching
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((btn) => btn.classList.remove('active'))
      forms.forEach((form) => form.classList.remove('active'))

      button.classList.add('active')
      const formType = button.dataset.form
      document.getElementById(`${formType}-form`).classList.add('active')
    })
  })

  // Handle signup form submission
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(signupForm)

    try {
      await signup(
        formData.get('fullName'),
        formData.get('email'),
        formData.get('password')
      )
    } catch (error) {
      alert(error.message)
    }
  })

  // Handle login form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(loginForm)

    try {
      await login(formData.get('email'), formData.get('password'))
    } catch (error) {
      alert(error.message)
    }
  })

  // Redirect if already authenticated
  if (isAuthenticated() && window.location.pathname === '/index.html') {
    window.location.href = '/recipes.html'
  }
})
