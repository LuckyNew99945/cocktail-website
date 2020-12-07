const cocktailDb = (dbName, table) => {
  //Create DB

  const db = new Dexie(dbName);
  db.version(1).stores(table);
  
  db.open();

  return db;
}

//Insert Function

const bulkCreate = (dbtable, data) => {
  let flag = empty(data);

  if(flag) {
    dbtable.bulkAdd([data]);
    console.log('data inserted sucess');
  } else {
    console.log('please provide data...');
  }

  return flag;
}

const empty = object => {
  let flag = false;

  for (const key in object) {
    if (object[key] != '' &&object.hasOwnProperty(key)) {
      flag = true;
      
    } else {
      flag = false;
    }
  }

  return flag;
}

//get data from db

const getData = (dbtable, fn) => {
  let index = 0;
  let obj = {};

  dbtable.count(count => {
    if(count) {
      dbtable.each(table => {


        obj = sortObj(table);

        fn(obj, index++);
        
      })
    } else {
      fn(0);
    }
  })
}

//sort object

const sortObj = sortobj => {
  let obj = {};
  obj = {
    id: sortobj.id,
    name : sortobj.name,
    category : sortobj.category,
    alcoholic : sortobj.alcoholic,
    glasstype : sortobj.glasstype,
    ingredients : sortobj.ingredients,
    measurement : sortobj.measurement,
    instructions : sortobj.instructions,
    image: sortobj.image
  }

  return obj;
}


//make UI for cocktail image grid
const makeUI = (tagname,attr,value,appendto,dataId) => {
  const element = document.createElement(tagname);
  element.setAttribute(`${attr}`,`${value}`);
  element.setAttribute(`data-id`, dataId);
  if(appendto) appendto.appendChild(element);
}

export {
  bulkCreate,getData,cocktailDb,sortObj,makeUI
}



