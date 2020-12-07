import {getData,cocktailDb} from './module.js';


let db = cocktailDb('CocktailDb', {
  cocktails : `id,name,category,alcoholic,glasstype,ingredients,measurement,instructions,image`
});

const savedSearchResultGrid = document.querySelector('.search-result-grid-saved');
const savedSearchResultDetail = document.querySelector('.search-result-detail-saved');

const getSavedCocktailById = async (cocktailId) => {
  getData(db.cocktails, datas => {
    console.log(datas.id);
    if(datas.id === cocktailId) {

      

    savedSearchResultDetail.innerHTML =  `
    <div class="recipe">
    <img src="${datas.image}" data-id="${datas.id}"></img>
    <h1>${datas.name}</h1>
    <h1>${datas.category}</h1>
    <h1>${datas.alcoholic}</h1>
    <h1>${datas.glasstype}</h1>
    <ul>
      ${datas.ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    <ul>
      ${datas.measurement.map(mea => `<li>${mea}</li>`).join('')}
    </ul>
    <p>${datas.instructions}</p>
    <button id="deleteBtn">Delete Recipe</button>
    </div>

    `;

    deleteBtn.onclick = e => {
      const imgItem = e.target.parentElement.children[0].dataset.id;
      // let id = parseInt(e.target.dataset.id);
      console.log(imgItem);
      db.cocktails.delete(imgItem);
      window.location.reload();
    }

    
  

    }
  })

  
}

const savedCocktailToGrid = (savedCocktail) => {
 

  const img = document.createElement('img');
  img.setAttribute('src',savedCocktail.image);
  img.setAttribute(`data-id`, savedCocktail.id);
  savedSearchResultGrid.appendChild(img);
}

savedSearchResultGrid.onclick = async e => {
  e.preventDefault();

  const savedItem = e.target;

  let savedRecipe = [];

  if(savedItem.getAttribute('data-id')) {
    const savedRecipeId = savedItem.getAttribute('data-id');
    const savedRecipe = await getSavedCocktailById(savedRecipeId);
  }
}

export {getSavedCocktailById, savedCocktailToGrid};
