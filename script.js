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
  var row = document.createElement("tr");
  var tblBody = document.getElementById("characters-tbody");
  
   //    Colunas  //
  var tdName = row.insertCell(0);
  var tdHeight = row.insertCell(1);
  var tdMass = row.insertCell(2);
  var tdByear = row.insertCell(3);
  var tdGender = row.insertCell(4);

  //  Inserir valores nas colunas //
  tdName.innerHTML =  luke.name;
  tdHeight.innerHTML = luke.height;
  tdMass.innerHTML = luke.mass;
  tdByear.innerHTML = luke.birth_year;
  tdGender.innerHTML = luke.gender;
  tblBody.appendChild(row);
  table.appendChild(tblBody);

  // Inserir bordas na tabela //
  table.setAttribute("border", "1");

