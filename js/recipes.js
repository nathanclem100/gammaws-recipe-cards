document.addEventListener('DOMContentLoaded', function () {
  // Sample recipe data - in a real application, this would come from a database
  const recipes = [
    {
      id: 1,
      title: 'Sausage Balls',
      description:
        'Classic Southern appetizer with sausage, cheese, and Bisquick',
      image: 'images/sausage-balls.jpg',
      ingredients: [
        '1 pound ground sausage',
        '2 cups Bisquick mix',
        '2 cups sharp cheddar cheese, shredded',
        '1/4 cup milk',
        '1/4 tsp garlic powder',
        '1/4 tsp black pepper',
      ],
      instructions: [
        'Preheat oven to 375°F',
        'Mix all ingredients until well combined',
        'Form into 1-inch balls',
        'Place on ungreased baking sheet',
        'Bake for 18-20 minutes until golden brown',
      ],
    },
    {
      id: 2,
      title: 'Sweet Potato Casserole',
      description: 'Creamy sweet potatoes topped with pecan streusel',
      image: 'images/sweet-potato-casserole.jpg',
      ingredients: [
        '4 large sweet potatoes, cooked and mashed',
        '1/2 cup butter, melted',
        '1/3 cup milk',
        '1 cup brown sugar',
        '2 eggs',
        'Topping: 1 cup pecans, 1/3 cup flour, 1/3 cup butter, 1/2 cup brown sugar',
      ],
      instructions: [
        'Mix sweet potatoes, butter, milk, sugar, and eggs',
        'Pour into greased baking dish',
        'Combine topping ingredients',
        'Sprinkle over potato mixture',
        'Bake at 375°F for 25-30 minutes',
      ],
    },
    {
      id: 3,
      title: 'Pecan Pie Cobbler',
      description: 'Gooey pecan pie filling with a golden cobbler crust',
      image: 'images/pecan-pie-cobbler.jpg',
      ingredients: [
        '2 1/2 cups pecans, chopped',
        '2 cups light corn syrup',
        '2 cups brown sugar',
        '1/2 cup butter, melted',
        '4 eggs, beaten',
        '2 pie crusts',
      ],
      instructions: [
        'Layer one pie crust in baking dish',
        'Mix filling ingredients together',
        'Pour over crust',
        'Top with second crust',
        'Bake at 350°F for 45-50 minutes',
      ],
    },
    {
      id: 4,
      title: 'Smothered Green Beans',
      description: 'Southern-style green beans with bacon and onions',
      image: 'images/smothered-green-beans.jpg',
      ingredients: [
        '2 lbs fresh green beans, trimmed',
        '6 slices bacon, chopped',
        '1 large onion, diced',
        '3 cloves garlic, minced',
        'Chicken broth',
        'Salt and pepper to taste',
      ],
      instructions: [
        'Cook bacon until crispy, remove from pan',
        'Sauté onions in bacon grease',
        'Add green beans and garlic',
        'Add broth and simmer until tender',
        'Top with crispy bacon before serving',
      ],
    },
    {
      id: 5,
      title: 'Layered Salad',
      description: 'Beautiful 7-layer salad with creamy dressing',
      image: 'images/layered-salad.jpg',
      ingredients: [
        'Lettuce, chopped',
        'Cherry tomatoes, halved',
        'Frozen peas, thawed',
        'Red onion, sliced',
        'Bacon, cooked and crumbled',
        'Mayonnaise-based dressing',
        'Cheddar cheese, shredded',
      ],
      instructions: [
        'Layer lettuce in bottom of clear bowl',
        'Add layers of vegetables',
        'Top with bacon and cheese',
        'Spread dressing over top',
        'Refrigerate for 4 hours before serving',
      ],
    },
    {
      id: 6,
      title: 'Broccoli Salad',
      description: 'Crunchy broccoli salad with bacon and sunflower seeds',
      image: 'images/broccoli-salad.jpg',
      ingredients: [
        '6 cups fresh broccoli florets',
        '1/2 cup red onion, diced',
        '1/2 cup sunflower seeds',
        '1/2 cup raisins',
        '8 slices bacon, cooked and crumbled',
        'Creamy dressing (mayo, vinegar, sugar)',
      ],
      instructions: [
        'Cut broccoli into small florets',
        'Mix with onion, seeds, and raisins',
        'Cook and crumble bacon',
        'Whisk dressing ingredients together',
        'Combine all and chill before serving',
      ],
    },
  ]

  const recipeGrid = document.querySelector('.recipe-grid')
  const modal = document.getElementById('recipeModal')
  const closeBtn = document.querySelector('.close-btn')
  const searchInput = document.getElementById('searchInput')

  // Display recipes
  function displayRecipes(recipesToShow = recipes) {
    recipeGrid.innerHTML = ''
    recipesToShow.forEach((recipe) => {
      const card = createRecipeCard(recipe)
      recipeGrid.appendChild(card)
    })
  }

  // Create recipe card
  function createRecipeCard(recipe) {
    const card = document.createElement('div')
    card.className = 'recipe-card'
    card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-info">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
            </div>
        `
    card.addEventListener('click', () => showRecipeDetails(recipe))
    return card
  }

  // Show recipe details in modal
  function showRecipeDetails(recipe) {
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = `
            <div class="recipe-details">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h2>${recipe.title}</h2>
                <p>${recipe.description}</p>
                
                <h3>Ingredients</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients
                      .map((ingredient) => `<li>${ingredient}</li>`)
                      .join('')}
                </ul>
                
                <h3>Instructions</h3>
                <ol class="instructions-list">
                    ${recipe.instructions
                      .map((instruction) => `<li>${instruction}</li>`)
                      .join('')}
                </ol>
            </div>
        `
    modal.style.display = 'block'
  }

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filteredRecipes = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm)
    )
    displayRecipes(filteredRecipes)
  })

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
  })

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none'
    }
  })

  // Initial display
  displayRecipes()

  // Handle logout
  document.querySelector('.logout-btn').addEventListener('click', () => {
    window.location.href = 'index.html'
  })
})
