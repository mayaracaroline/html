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
var currentUrl = [];
var btn = [];



// Função updateRows()
// Descrição: Função que cria e atualiza linhas de uma tabela.
// Parâmetros: character - json que será usado para preencher as linhas da tabela.
function updateRows(characters) {
    tblBody.innerHTML = '';
    for (let i = 0; i < Math.ceil(characters.count/10); i++)
    {
        currentUrl[i] = "https://swapi.co/api/people/?page=" + (i+1); 
    }

      // Laço  para criar linhas, colunas e inserir os respectivos valores
    for (let i = 0; i < characters.results.length; i++)          // row
    { 
      var character = characters.results[i];                 // Para receber a collection de personagens
      var row = document.createElement("tr");                // Cria a linha da tabela 
      var tdProperty = [];                                  // Para receber as colunas (proporcional a qtd de 
//                                                              propriedades
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

  return currentUrl;
}
  
function insertBtn(currentUrl){
  var btnPrevious = document.getElementById("previousPage");
  var btnNext = document.getElementById("nextPage");
  var idBtn = document.getElementById("btn");
  var body = document.getElementById("body"); 
  for (let i = 0; i < currentUrl.length; i++)
  {
    btn[i]= document.createElement("button");
    btn[i].setAttribute("id", "btn");
    btn[i].innerHTML = i + 1;
    body.appendChild(btn[i]);
    btn[i].addEventListener("click", function(){ currentPage(currentUrl[i])});
  }       
}


//Função nextPage()
//Descrição: Função que busca dados em uma url externa e preenche a tabela e busca também 
//a próxima página.
function createPage(){
    fetch(nextUrl).then(response => {response.json().then(updateRows).then(insertBtn)});
}
function nextPage(){
  fetch(nextUrl).then(response => {response.json().then(updateRows)});
}

//Função previousPage()
//Descrição: Função que retorna dados da página anterior e preenche a tabela.
function previousPage(){
  fetch(previousUrl).then(response => {response.json().then(updateRows)})
}

function currentPage(url) {
  fetch(url).then(response => {response.json().then(updateRows)})
}

// Inserir bordas na tabela //
table.setAttribute("border", "1");

createPage(); // chamada da função para preencher pela primeira vez a tabela