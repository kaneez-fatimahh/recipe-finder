let container = document.getElementById("container");
let input = document.getElementById("input");
let searchBtn = document.getElementById("button-addon2");

let func = async () => {
  try {
    let url =
      "https://api.edamam.com/search?q=meat&app_id=eaa27b60&app_key=f02d46b15e42e56c3137f24194783f50&from=0&to=100";
    let response = await fetch(url);
    let data = await response.json();
    let recipe = data.hits;
    console.log(data);
    display(recipe); 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

func();

let fetchSearch = async () => {
 
  try {
    let url =
      `https://api.edamam.com/search?q=${input.value}&app_id=eaa27b60&app_key=f02d46b15e42e56c3137f24194783f50&from=0&to=100`;
    let response = await fetch(url);
    let data = await response.json();
    let recipe = data.hits;
    console.log(data);
    container.innerHTML=" "
    display(recipe); 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  input.value = ""
};

let display = (recipe) => {
  if (recipe.length === 0) {
    let msg = document.createElement("h5");
    msg.innerText = "No Recipes Found";
    container.appendChild(msg);
  }

  recipe.forEach((recipeItem) => {
    let output = document.createElement("div");
    output.setAttribute("class","d-inline-flex col-lg-4 col-md-6 col-12 my-4 justify-content-center "
    );
    output.innerHTML += `
      <div class="card" style="width: 16rem;">
      <img src="${recipeItem.recipe.image}" class="card-img-top" alt="... ">
        <div class="card-body">
       <h6 class="card-text">${recipeItem.recipe.label}</small></h6>
       <p class="card-text">${recipeItem.recipe.cuisineType}</small></h6>
          <p class="card-title d-none text-start ingd " id="ingd">${recipeItem.recipe.ingredientLines
            .map((x) => x)
            .join(" ")}</p>
          <div class="btn btn-primary my-2"onclick="show()">Show Ingredient</div>
          <a href=${
            recipeItem.recipe.url
          } target="_blank" class="btn btn-secondary mx-auto">Get Recipe</a>
        </div>
      </div>`;
    container.appendChild(output);
   
  });
};

const show = (recipeItem) => {
console.log(recipeItem)
};



