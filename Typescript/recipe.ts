interface Recipe {
  id: number;
  name: string;
  category: string;
  designation: string;
}

let recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes") || "[]");
let editingIndex: number | null = null;
const form = document.getElementById("recipeForm") as HTMLFormElement;
const table = document.getElementById("recipeTable") as HTMLTableSectionElement;
const idInput = document.getElementById("id") as HTMLInputElement;
const exitBtn = document.getElementById("exitBtn") as HTMLButtonElement;

function getNextId(): number {
  if (recipes.length === 0) return 1;
  const maxId = Math.max(...recipes.map(r => Number(r.id)));
  return maxId + 1;
}

function prepareNewRecipe(): void {
  idInput.value = getNextId().toString();
}

function saveToStorage(): void {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function displayRecipes(): void {
  table.textContent = "";
  recipes.forEach((recipe, index) => {
    const row = table.insertRow();
    row.insertCell().textContent = recipe.id.toString();
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

form.addEventListener("submit", function (e: Event) {
  e.preventDefault();
  const id = Number(idInput.value);
  const name = (document.getElementById("name") as HTMLInputElement).value.trim();
  const category = (document.getElementById("category") as HTMLInputElement).value.trim();
  const designation = (document.getElementById("designation") as HTMLInputElement).value.trim();
  if (!name || !category || !designation) {
    alert("All fields are required!");
    return;
  }
  const recipe: Recipe = { id, name, category, designation };
  if (editingIndex !== null) {
    recipes[editingIndex] = recipe;
    editingIndex = null;
  } else {
    recipes.push(recipe);
  }
  form.reset();
  displayRecipes();
  prepareNewRecipe();
});

function deleteRecipe(index: number): void {
  if (confirm("Delete this recipe?")) {
    recipes.splice(index, 1);
    displayRecipes();
    prepareNewRecipe();
  }
}

function editRecipe(index: number): void {
  const recipe = recipes[index];
  idInput.value = recipe.id.toString();
  (document.getElementById("name") as HTMLInputElement).value = recipe.name;
  (document.getElementById("category") as HTMLInputElement).value = recipe.category;
  (document.getElementById("designation") as HTMLInputElement).value = recipe.designation;
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