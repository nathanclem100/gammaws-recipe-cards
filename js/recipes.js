const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://gammaws-recipe-cards-production.up.railway.app/api'

// Get auth token
function getToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No authentication token found')
  }
  return token
}

// Fetch all recipes
export async function getRecipes() {
  try {
    const token = getToken()
    const response = await fetch(`${API_URL}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch recipes')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw error
  }
}

// Get single recipe
export async function getRecipe(recipeId) {
  try {
    const token = getToken()
    const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch recipe')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching recipe:', error)
    throw error
  }
}

// Create new recipe
export async function createRecipe(formData) {
  try {
    const token = getToken()
    const response = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create recipe')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating recipe:', error)
    throw error
  }
}

// Update recipe
export async function updateRecipe(recipeId, formData) {
  try {
    const token = getToken()
    const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update recipe')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating recipe:', error)
    throw error
  }
}

// Delete recipe
export async function deleteRecipe(recipeId) {
  try {
    const token = getToken()
    const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete recipe')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting recipe:', error)
    throw error
  }
}

// View recipe details
export async function viewRecipe(recipeId) {
  try {
    const recipe = await getRecipe(recipeId)
    document.getElementById('recipeDetails').innerHTML = `
      <h2>${recipe.title}</h2>
      <div class="recipe-image">
        <img src="${recipe.image || 'images/default-recipe.jpg'}" alt="${
      recipe.title
    }">
      </div>
      <div class="recipe-meta">
        <p>Cooking Time: ${recipe.cookingTime} minutes</p>
        <p>Servings: ${recipe.servings}</p>
      </div>
      <div class="recipe-ingredients">
        <h3>Ingredients</h3>
        <ul>
          ${recipe.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join('')}
        </ul>
      </div>
      <div class="recipe-instructions">
        <h3>Instructions</h3>
        <p>${recipe.instructions}</p>
      </div>
    `
    document.getElementById('viewRecipeModal').style.display = 'block'
  } catch (error) {
    alert('Error loading recipe: ' + error.message)
  }
}

// Edit recipe
export async function editRecipe(recipeId) {
  try {
    const recipe = await getRecipe(recipeId)
    document.getElementById('modalTitle').textContent = 'Edit Recipe'
    document.getElementById('recipeId').value = recipe._id
    document.getElementById('title').value = recipe.title
    document.getElementById('ingredients').value = recipe.ingredients.join('\n')
    document.getElementById('instructions').value = recipe.instructions
    document.getElementById('cookingTime').value = recipe.cookingTime
    document.getElementById('servings').value = recipe.servings

    if (recipe.image) {
      document.getElementById(
        'imagePreview'
      ).innerHTML = `<img src="${recipe.image}" alt="Preview">`
    }

    document.getElementById('recipeModal').style.display = 'block'
  } catch (error) {
    alert('Error loading recipe: ' + error.message)
  }
}

// Delete recipe handler
export async function deleteRecipeHandler(recipeId) {
  if (confirm('Are you sure you want to delete this recipe?')) {
    try {
      await deleteRecipe(recipeId)
      window.loadRecipes()
    } catch (error) {
      alert('Error deleting recipe: ' + error.message)
    }
  }
}
