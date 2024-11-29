const API_URL = 'http://localhost:3000/api'

// Get auth token
function getToken() {
  return localStorage.getItem('token')
}

// Fetch all recipes
async function getRecipes() {
  try {
    const response = await fetch(`${API_URL}/recipes`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch recipes')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw error
  }
}

// Create new recipe with image
async function createRecipe(formData) {
  try {
    const response = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData, // FormData will set the correct Content-Type
    })

    if (!response.ok) {
      throw new Error('Failed to create recipe')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating recipe:', error)
    throw error
  }
}

// Update recipe with image
async function updateRecipe(recipeId, formData) {
  try {
    const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData, // FormData will set the correct Content-Type
    })

    if (!response.ok) {
      throw new Error('Failed to update recipe')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating recipe:', error)
    throw error
  }
}

// Delete recipe
async function deleteRecipe(recipeId) {
  try {
    const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete recipe')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting recipe:', error)
    throw error
  }
}

// Get single recipe
async function getRecipe(recipeId) {
  try {
    const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch recipe')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching recipe:', error)
    throw error
  }
}

// Helper function to create FormData from recipe data
function createRecipeFormData(recipeData) {
  const formData = new FormData()

  // Add all recipe data to FormData
  Object.keys(recipeData).forEach((key) => {
    if (key === 'ingredients' && Array.isArray(recipeData[key])) {
      // Handle ingredients array
      recipeData[key].forEach((ingredient, index) => {
        formData.append(`ingredients[${index}]`, ingredient)
      })
    } else if (key === 'image' && recipeData[key] instanceof File) {
      // Handle image file
      formData.append('image', recipeData[key])
    } else {
      formData.append(key, recipeData[key])
    }
  })

  return formData
}
