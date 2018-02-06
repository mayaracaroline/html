(function(){ 
//------------------------------------------- Declarações --------------------------------------------------------------
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
var currentUrl = []; // Array que recebe a URL de todas as páginas
var btn = []; // Array para a criação de botões
var currentPage = 1;

// -------------------------- Functions ---------------------------------------//
// Função updateRows()
// Descrição: Função que cria e atualiza linhas de uma tabela.
// Parâmetros: character - json que será usado para preencher as linhas da tabela.

    function updateRows(characters) {
    tblBody.innerHTML = '';                                   //Limpa a tabela para inserir dados da próxima página
    //Laço para inserir a URL referente a página desejada 
    //    character.count = Total de personagens
    for (let i = 0; i < Math.ceil(characters.count/10); i++)
    {
        currentUrl[i] = "https://swapi.co/api/people/?page=" + (i+1); 
    }
    // Laço  para criar linhas, colunas e inserir os respectivos valores
    for (let i = 0; i < characters.results.length; i++)        // row
    { 
      var character = characters.results[i];                  // Para receber a collection de personagens
      var row = document.createElement("tr");                 // Cria a linha da tabela 
      var tdProperty = [];                                    // Para receber as colunas (proporcional a qtd de 
//                                                               propriedades
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
    nextUrl = characters.next;                                          // Para receber a url da próxima página
    previousUrl = characters.previous;                                  // Para receber a url da página anterior

    if (currentPage === 9 )                                              // Indica última página
    {
      document.getElementById("nextPage").style.display = "none";       // Oculta o botão Next
      document.getElementById("previousPage").style.display = "inline"; //Mostra o botão Previous
    }
    else if (currentPage === 1)                                         // Indica primeira página
    {
      document.getElementById("previousPage").style.display = "none";   // Oculta o botão Previous
      document.getElementById("nextPage").style.display = "inline";     // Mostra o botão Next  
    }
    else                                                                // Caso contrário mostra ambos os botões
    {
      document.getElementById("nextPage").style.display = "inline"; 
      document.getElementById("previousPage").style.display = "inline"; 
    }
  return currentUrl; //Retorna a URL para a função createBtn
}

// --------------------------------------------------------------------//
// Função: createBtn()
// Descrição: Função que cria os botões para navegar entre as páginas
// Parâmetros: URL da página que será direcionada ao clicar no botão
function createBtn(currentUrl){
  var body = document.getElementById("body"); 
  var btnNext = document.getElementById("nextPage");
  var btnPrevious = document.getElementById("previousPage");
  btnNext.addEventListener("click", function(){nextPage()});
  btnPrevious.addEventListener("click", function(){previousPage()});
  var divButton = document.getElementById("div-button"); 
  //Laço para criação de botões para navegar entre as páginas 
  for (let i = 0; i < currentUrl.length; i++)
  {
   let pageNumber = i+1;
    btn[i] = document.createElement("button");                    //Criação de botões conforme a quantidade de páginas
    btn[i].setAttribute("class", "btn");                          //Definir class para os botões
    btn[i].setAttribute("data-page-number", pageNumber);
    btn[i].innerHTML = pageNumber;                                     //Enumerar botões
    divButton.appendChild(btn[i]);
    btn[i].addEventListener("click", function(){ goToPage(pageNumber) }); //Adiciona onClick ao botão
    divButton.insertBefore(btn[i],btnNext); 
  } 
  btn[0].setAttribute("class","btn btnActive");
}

// --------------------------------------------------------------------//

//Função: btnAnimation()
//Descrição: Função que altera a cor do botão para indicar em qual página está.
function btnAnimation(pageNumber){
  var btnAll = document.querySelectorAll(".btn");                // Seleciona todos os elementos com a class .btn
    btnAll.forEach(function(element){                            // Itera pela lista de elementos removendo a class btnActive
    element.classList.remove("btnActive");
  });
  var currentPageButton = document.querySelectorAll('[data-page-number="' + pageNumber + '"]'); //Seleciona o elemento com atributo data-page com valor = a i+1
    currentPageButton.forEach(function(element){                 // Itera pela lista adicionando a class btnActive ao botão selecionado
    element.classList.add("class","btnActive");
  });
}

// --------------------------------------------------------------------//
//Função: createPage()
//Descrição: Função que cria a tabela quando a página é carregada pela primeira vez
//Obs.: Cria os botões através da função createBtn
function createPage(){
  fetch(nextUrl).then(response => {response.json().then(updateRows).then(createBtn)});
}
//Função nextPage()
//Descrição: Função que busca dados em uma url externa e preenche a tabela e busca também 
//a próxima página.
function nextPage(){
  goToPage(currentPage+1);

}
// --------------------------------------------------------------------//
//Função previousPage()
//Descrição: Função que retorna dados da página anterior e preenche a tabela.
function previousPage(){
    goToPage(currentPage-1);
}
// --------------------------------------------------------------------//
//Função: goToPage()
//Descrição: Função que recebe um número de página, concatena a URL padrão
//e direciona para essa página.
//Obs.: Utiliza a updateRows() para preencher a tabela e btnAnimation para alterar a cor dos botões. 
function goToPage(pageNumber) {
  var url = "https://swapi.co/api/people/?page=" + pageNumber;
  currentPage = pageNumber;
  fetch(url).then(response => {response.json().then(updateRows)})
  btnAnimation(pageNumber);
}
// --------------------------------------------------------------------//

createPage(); // chamada da função para preencher pela primeira vez a tabela
})();