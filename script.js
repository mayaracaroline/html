var luke = {
  'name': 'Luke Skywalker',
  'height': '172',
  'mass': '77',
  'hair_color': 'blond',
  'skin_color': 'fair',
  'eye_color': 'blue',
  'birth_year': '19BBY',
  'gender': 'male',
  'homeworld': 'https://swapi.co/api/planets/1/',
  'films': [
    'https://swapi.co/api/films/2/',
    'https://swapi.co/api/films/6/',
    'https://swapi.co/api/films/3/',
    'https://swapi.co/api/films/1/',
    'https://swapi.co/api/films/7/'
  ],
  'species': [
    'https://swapi.co/api/species/1/'
  ],
  'vehicles': [
    'https://swapi.co/api/vehicles/14/',
    'https://swapi.co/api/vehicles/30/'
  ],
  'starships': [
    'https://swapi.co/api/starships/12/',
    'https://swapi.co/api/starships/22/'
  ],
  'created': '2014-12-09T13:50:51.644000Z',
  'edited': '2014-12-20T21:17:56.891000Z',
  'url': 'https://swapi.co/api/people/1/'
};


// Cria elementos de uma tabela //
var table = document.getElementById("characters-table");
var tblBody = document.getElementById("characters-tbody");
var propList = [
  "name",
  "height",
  "mass",
  "hair_color",
  "eye_color",
  "birth_year",
  "gender",

];

for (i = 0; i < characters.results.length; i++) // row
{ 
  var character = characters.results[i];
  var row = document.createElement("tr");
  var tdProperty = [];

  for (j = 0; j < propList.length ; j++)
  {
    var prop = propList[j];
    tdProperty[j] = document.createElement("td");
    tdProperty[j].innerHTML = character[prop];
    row.appendChild(tdProperty[j]);
  }

  tblBody.appendChild(row);  
}

//console.log(Object.keys(characters.results[i]));
//console.log(character);
// Inserir bordas na tabela //
table.setAttribute("border", "1");