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
var nextUrl = 'https://swapi.co/api/people/';
var previousUrl = null;
var contPages = [];

// Função updateRows()
// Descrição: Função que cria e atualiza linhas de uma tabela.
// Parâmetros: character - json que será usado para preencher as linhas da tabela.
function updateRows(characters) {
    tblBody.innerHTML = '';

      // Laço  para criar linhas, colunas e inserir os respectivos valores
    for (i = 0; i < characters.results.length; i++)          // row
    { 
      console.log(i);
      var character = characters.results[i];                 // Para receber a collection de personagens
      var row = document.createElement("tr");                // Cria a linha da tabela 
      var tdProperty = [];                                  // Para receber as colunas (proporcional a qtd de 
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

    // Controlar quando os botões Previous e Next devem aparecer //
    nextUrl = characters.next;                                // Para receber a url da próxima página
    previousUrl = characters.previous;                        // Para receber a url da página anterior

    if (nextUrl === null )
    {
      document.getElementById("nextPage").style.display = "none";
    }
    else if (previousUrl === null)
    {
      document.getElementById("previousPage").style.display = "none";
    }
    else
    {
      document.getElementById("nextPage").style.display = "inline";
      document.getElementById("previousPage").style.display = "inline"; 
    }
}

//Função nextPage()
//Descrição: Função que busca dados em uma url externa e preenche a tabela e busca também 
//a próxima página.

function nextPage(){
  fetch(nextUrl).then(response => {response.json().then(updateRows)});
}

//Função previousPage()
//Descrição: Função que retorna dados da página anterior e preenche a tabela.
function previousPage(){
  fetch(previousUrl).then(response => {response.json().then(updateRows)})
}

// Inserir bordas na tabela //
table.setAttribute("border", "1");

nextPage(); // chamada da função para preencher pela primeira vez a tabela