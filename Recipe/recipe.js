let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
const form = document.getElementById("recipeForm");
const table = document.getElementById("recipeTable");
function displayRecipes() {
  if (!table) return;
  table.innerHTML = "";
  recipes.forEach((recipe, index) => {
    table.innerHTML += `
      <tr class="border-b hover:bg-gray-50 transition">
        <td class="p-4">${recipe.id}</td>
        <td class="p-4">${recipe.name}</td>
        <td class="p-4">${recipe.category}</td>
        <td class="p-4">${recipe.designation}</td>
        <td class="p-4 space-x-2">
          <button onclick="editRecipe(${index})"
            class="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg transition">
            Edit
          </button>
          <button onclick="deleteRecipe(${index})"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const designation = document.getElementById("designation").value.trim();
    if (!id || !name || !category || !designation) {
      alert("All fields are required! Please fill in every field.");
      return;
    }
    const idExists = recipes.some(recipe => recipe.id === id);
    if (idExists) {
      alert("This ID already exists! Please use a unique ID.");
      return;
    }
    const recipe = { id, name, category, designation };
    recipes.push(recipe);
    form.reset();
    displayRecipes();
    alert("Recipe saved successfully!");
  });
}

function deleteRecipe(index) {
  const confirmDelete = confirm("Are you sure you want to delete this recipe?");
  if (confirmDelete) {
    recipes.splice(index, 1);
    displayRecipes();
  }
}

function editRecipe(index) {
  const recipe = recipes[index];
  document.getElementById("id").value = recipe.id;
  document.getElementById("name").value = recipe.name;
  document.getElementById("category").value = recipe.category;
  document.getElementById("designation").value = recipe.designation;
  recipes.splice(index, 1);
}
displayRecipes();