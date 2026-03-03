let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let editingIndex = null;
const form = document.getElementById("recipeForm");
const table = document.getElementById("recipeTable");
const idInput = document.getElementById("id");
const exitBtn = document.getElementById("exitBtn");

function getNextId() {
  if (recipes.length === 0) return 1;
  const maxId = Math.max(...recipes.map(r => Number(r.id)));
  return maxId + 1;
}

function prepareNewRecipe() {
  idInput.value = getNextId();
}

function saveToStorage() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function displayRecipes() {
  table.textContent = "";
  recipes.forEach((recipe, index) => {
    const row = table.insertRow();
    row.insertCell().textContent = recipe.id;
    row.insertCell().textContent = recipe.name;
    row.insertCell().textContent = recipe.category;
    row.insertCell().textContent = recipe.designation;
    const actionCell = row.insertCell();
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className =
      "bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg transition";
    editBtn.addEventListener("click", () => editRecipe(index));
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className =
      "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition";
    deleteBtn.addEventListener("click", () => deleteRecipe(index));
    actionCell.append(editBtn, deleteBtn);
  });
  saveToStorage();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = idInput.value;
  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value.trim();
  const designation = document.getElementById("designation").value.trim();
  if (!name || !category || !designation) {
    alert("All fields are required!");
    return;
  }
  if (editingIndex !== null) {
    recipes[editingIndex] = { id, name, category, designation };
    editingIndex = null;
  } else {
    recipes.push({ id, name, category, designation });
  }
  form.reset();
  displayRecipes();
  prepareNewRecipe();
});

function deleteRecipe(index) {
  if (confirm("Delete this recipe?")) {
    recipes.splice(index, 1);
    displayRecipes();
    prepareNewRecipe();
  }
}

function editRecipe(index) {
  const recipe = recipes[index];
  idInput.value = recipe.id;
  document.getElementById("name").value = recipe.name;
  document.getElementById("category").value = recipe.category;
  document.getElementById("designation").value = recipe.designation;
  editingIndex = index;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

exitBtn.addEventListener("click", function () {
  if (confirm("Are you sure you want to exit?")) {
    form.reset();
    editingIndex = null;
    prepareNewRecipe();
    window.location.href = "index.html";
  }
});
displayRecipes();
prepareNewRecipe();