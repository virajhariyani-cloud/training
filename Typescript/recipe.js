var recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
var editingIndex = null;
var form = document.getElementById("recipeForm");
var table = document.getElementById("recipeTable");
var idInput = document.getElementById("id");
var exitBtn = document.getElementById("exitBtn");
function getNextId() {
    if (recipes.length === 0)
        return 1;
    var maxId = Math.max.apply(Math, recipes.map(function (r) { return Number(r.id); }));
    return maxId + 1;
}
function prepareNewRecipe() {
    idInput.value = getNextId().toString();
}
function saveToStorage() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}
function displayRecipes() {
    table.textContent = "";
    recipes.forEach(function (recipe, index) {
        var row = table.insertRow();
        row.insertCell().textContent = recipe.id.toString();
        row.insertCell().textContent = recipe.name;
        row.insertCell().textContent = recipe.category;
        row.insertCell().textContent = recipe.designation;
        var actionCell = row.insertCell();
        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className =
            "bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg transition";
        editBtn.addEventListener("click", function () { return editRecipe(index); });
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className =
            "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition";
        deleteBtn.addEventListener("click", function () { return deleteRecipe(index); });
        actionCell.append(editBtn, deleteBtn);
    });
    saveToStorage();
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var id = Number(idInput.value);
    var name = document.getElementById("name").value.trim();
    var category = document.getElementById("category").value.trim();
    var designation = document.getElementById("designation").value.trim();
    if (!name || !category || !designation) {
        alert("All fields are required!");
        return;
    }
    var recipe = { id: id, name: name, category: category, designation: designation };
    if (editingIndex !== null) {
        recipes[editingIndex] = recipe;
        editingIndex = null;
    }
    else {
        recipes.push(recipe);
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
    var recipe = recipes[index];
    idInput.value = recipe.id.toString();
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
