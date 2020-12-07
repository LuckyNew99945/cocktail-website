
import {bulkCreate, getData,cocktailDb,makeUI} from './module.js';

let db = cocktailDb('CocktailDb', {
  cocktails : `id,name,category,alcoholic,glasstype,ingredients,measurement,instructions,image`
});

const searchRecipe = document.getElementById('searchRecipe');
const okRecipe = document.getElementById('okRecipe');
const searchResultDetail = document.querySelector('.search-result-detail');
const searchResultGrid = document.querySelector('.search-result-grid');


//after click ok button on recipe page input form doing the process
okRecipe.onclick = async (e) => {
  e.preventDefault();

  let recipe = [];

  

  const searchInput = searchRecipe.value;

  try {
    recipe = await searchCocktail(searchInput);
    // console.log(recipe);
    // console.log(recipeId);
  } catch (error) {
    // console.log(error);
  }

  // console.log(recipe);

  recipe.drinks.map(el => {
    // console.log(el);
    makeUI('img','src',el.strDrinkThumb,searchResultGrid,el.idDrink);
  })
};

//get Cocktail details with data-id
const getCocktailById = async (cocktailId) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
  const data = await response.json();
  cocktailToDOM(data);
}


//search recipe in recipe page  by type recipe name
const searchCocktail = async (searchInput) => {

  //Clear single recipe detail if displayed

  searchResultDetail.innerHTML = '';

  searchResultGrid.innerHTML = '';

  if(searchInput.trim()) {
    const response = await fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();

    return data;

  }

}


//make cocktail recipe detail and insert it to search-result-details
const cocktailToDOM = (cocktail) => {
  const ingredients = [];

  const cocktailData = cocktail.drinks[0];

  const measures = [];

  // console.log(cocktailData.strDrink);

  // console.log(cocktailData);

  
  

  for (let i = 1; i < 20; i++) {
    ingredients.push(cocktailData[`strIngredient${i}`]);
    measures.push(cocktailData[`strMeasure${i}`]);
  }

  const filteredIngredient = ingredients.filter(ing => 
    !(ing === null || ing === undefined)
  );

  const filteredMeasure = measures.filter(mea => !(mea === null || mea === undefined));



  

//  console.log(filteredIngredient);

  
  console.log(cocktailData);



  searchResultDetail.innerHTML = `
  <div class="recipe">
  <img src="${cocktailData.strDrinkThumb}"></img>
  <h1>${cocktailData.strDrink}</h1>
  <h1>${cocktailData.strCategory}</h1>
  <h1>${cocktailData.strAlcoholic}</h1>
  <h1>${cocktailData.strGlass}</h1>
  <ul>
  ${filteredIngredient.map((ing) => `<li>${ing}</li>`).join("")}
  </ul>
  <ul>
   ${filteredMeasure.map(mea => `<li>${mea}</li>`).join('')}
  </ul>
  <p>${cocktailData.strInstructions}</p>
  <button id="saveBtn">Save Recipe</button>
  </div>
  
  `;

  saveBtn.onclick = e => {
    e.preventDefault();

    // console.log('saved');



    let flag = bulkCreate(db.cocktails, {
      id: cocktailData.idDrink,
      name: cocktailData.strDrink,
      category: cocktailData.strCategory,
      alcoholic: cocktailData.strAlcoholic,
      glasstype: cocktailData.strGlass,
      ingredients: filteredIngredient,
      measurement: filteredMeasure,
      instructions: cocktailData.strInstructions,
      image: cocktailData.strDrinkThumb,
    })

    console.log(flag);




    getData(db.cocktails, data => {
      // console.log(data);
      console.log(data);
      savedCocktailToGrid(data);

      
      
    })


  }

}

searchResultGrid.onclick = async e => {
  const item = e.target;

  console.log(item);

  let recipe = [];

  // console.log(item);

  if(item.getAttribute('data-id')) {
    const recipeId = item.getAttribute('data-id');
    recipe = await getCocktailById(recipeId);
  }


}