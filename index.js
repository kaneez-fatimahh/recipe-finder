let container = document.getElementById("container");
let input = document.getElementById("input");
let searchBtn = document.getElementById("button-addon2");
let spinner = document.getElementById("spinner");

let func = async () => {
  try {
    let url =
      "https://api.edamam.com/search?q=meat&app_id=eaa27b60&app_key=f02d46b15e42e56c3137f24194783f50&from=0&to=100";
    let response = await fetch(url);
    let data = await response.json();
    let recipe = data.hits;
    console.log(data);
    hidespinner();
    display(recipe);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

func();

let fetchSearch = async () => {
  try {
    let url = `https://api.edamam.com/search?q=${input.value}&app_id=eaa27b60&app_key=f02d46b15e42e56c3137f24194783f50&from=0&to=100`;
    let response = await fetch(url);
    let data = await response.json();
    let recipe = data.hits;
    console.log(data);
    hidespinner();
    container.innerHTML = "";
    display(recipe);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  input.value = "";
};

let display = (recipe) => {
  if (recipe.length === 0) {
    let msg = document.createElement("h5");
    msg.innerText = "No Recipes Found";
    container.appendChild(msg);
  }

  recipe.forEach((recipeItem, i) => {
    let output = document.createElement("div");
    output.setAttribute(
      "class",
      "d-inline-flex col-lg-4 col-md-6 col-12 my-4 justify-content-center "
    );
    output.innerHTML += `
      <div class="card" style="width: 16rem;">
      <img src="${recipeItem.recipe.image}" class="card-img-top" alt="... ">
        <div class="card-body">
       <h5 class="card-text">${recipeItem.recipe.label}</small></h6>       
       ${recipeItem.recipe.cuisineType
         .map(
           (cuisine) =>
             `<p>Dish Type :<strong> ${
               cuisine.charAt(0).toUpperCase() + cuisine.slice(1)
             }</strong></p>`
         )
         .join("")}
            <p class="ingd d-none" id="ingd${i}">
            ${recipeItem.recipe.ingredientLines
              .map(
                (x, index, array) =>
                  `${x}${index !== array.length - 1 ? "," : ""}`
              )
              .join(" ")}
          </p>
          <div class="btn btn-primary my-2" onclick="show(${i})">Show Ingredient</div>
          <a href=${
            recipeItem.recipe.url
          } target="_blank" class="btn btn-secondary mx-auto">Get Recipe</a>
        </div>
      </div>`;
    container.appendChild(output);
  });
};
// show ingredients
const show = (recipeItem) => {
  document.getElementById("ingd" + recipeItem).classList.toggle("d-none");
};
//hide loading spinner
const hidespinner = () => {
  spinner.style.display = "none";
};
