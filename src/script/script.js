//import doc

import {getData,cocktailDb,} from './module.js';
import {savedCocktailToGrid} from './saved.js';


//indexedDB

let db = cocktailDb('CocktailDb', {
  cocktails : `id,name,category,alcoholic,glasstype,ingredients,measurement,instructions,image`
});

document.addEventListener('DOMContentLoaded', () => {
  getData(db.cocktails, data => {
    savedCocktailToGrid(data);
    
  })
});
