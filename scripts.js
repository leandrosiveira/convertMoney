// Cotação de moedas do dia

const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// Obtendo elementos do formulario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input para receber apenas números

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  //console.log(amount.value) apenas para visualizar os characters recebendo o valor de "" abaixo quando digitado
  amount.value = amount.value.replace(hasCharactersRegex, "")

})


// Capturando o evento do formulario (enviar)

// form.onsubmit = function() {

// } // usando função anônima no lugar o arrow function

form.onsubmit = (event) => {
  event.preventDefault() //para não recarregar a pagina e piscar a tela

 // console.log(currency.value) // para mostrar q está pegando o tipo da moeda

  switch (currency.value){
    case "USD":
      convertCurrency(amount.value, USD, "US$") // aqui realmente está atribuindo os valores
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

// Função para converter moedas

function convertCurrency(amount, price, symbol) {
  // console.log(amount, price, symbol) // apenas mostrar se está pegando os três valores corretamente.
    try {
      // Exibindo a cotação da moeda selecionada
      description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
      // Aplica a classe q exibe o footer para mostras o resultado
      footer.classList.add("show-result")
      
      // // calcula o total, primeira forma
      // let total = String(amount * price).replace(".", ",") // o String é para converter o amount e o price em string para poder substituir a o ponto por virgula usando o replace()
      //calcula o total, segunda forma
      let total = amount * price

      if (isNaN(total)) {
        return alert("Por favor, digite o valor corretamente para converter.")
      }
      
      total = formatCurrencyBRL(total).replace("R$", "")
      
      // Verifica se o resultado não é um número, apenas preventivo pois o input não permite entrada de outros caracteres além de numeros
      
      // Exibe o resultado total
      result.textContent = `${total} Reais`

    } catch (error) {
      // remove a classe do footer removendo ele da tela
      console.log(error)
      footer.classList.remove("show-result")
      alert("Não foi possível converter. Tente novamente")  
    }
}


//Formatando moeda para BRL nas letras miudas da descrição

function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", { //convert o value para number em Number(value) para poder acessar o recurso de .toLocaleString, e convert para string em .toLocaleString para o tipo pt-BR (R$ 00,00). Retorna para a função formatCurrencyBRL, formatado como moeda e BRL, sendo essa função usada acima em description
    style: "currency", //style é moeda
    currency: "BRL", // a moeda é BRL
  })
}