// Cria elementos de uma tabela //
var table = document.getElementById("characters-table");    // Para receber a tabela "characters-table"
var tblBody = document.getElementById("characters-tbody");  // Para receber o tbody

// Lista de propriedades que serão utilizadas no for
var propList = [
  "name",
  "height",
  "mass",
  "hair_color",
  "eye_color",
  "birth_year",
  "gender",
];


// Função createRows()
// Descrição: Função que cria linhas de uma tabela.
// Parâmetros: character - json que será usado para preencher as linhas da tabela.
function createRows(characters) {
      // Laço  para criar linhas, colunas e inserir os respectivos valores
    for (i = 0; i < characters.results.length; i++)          // row
    { 
      var character = characters.results[i];                 // Para receber a collection de personagens
      var row = document.createElement("tr");                // Cria a linha da tabela 
      var tdProperty = [];                                   // Para receber as colunas (proporcional a qtd de 
//                                                              propriedades) 
      for (j = 0; j < propList.length ; j++)
      {
        var prop = propList[j];                              // Recebe uma propriedade de propList referente ao índice
        tdProperty[j] = document.createElement("td");        // Cria um novo <td> a cada iteração do for
        tdProperty[j].innerHTML = character[prop];           // Insere o valor referente a propriedade no <td> criado
//                                                              anteriormente
        row.appendChild(tdProperty[j]);
      }
      tblBody.appendChild(row);  
    }
}

fetch('https://swapi.co/api/people/').then(response => {response.json().then(createRows)});

// Inserir bordas na tabela //
table.setAttribute("border", "1");