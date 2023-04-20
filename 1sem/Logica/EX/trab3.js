const prompt = require("prompt-sync")();

let running = true;

const listHeader = "\n. ID... Item........................ Quantidade.. Loja................";
const listFooter = ":....................................................................:\n";
const separator = "=".repeat(70);

const deletedNothing = "Bom, então os deixei como estavam! Voltando ao menu!";

const informationItem =
  "Informe o nome do item, a quantidade, unidade e tipo de estabelecimento (Padaria, Supermercado, etc)\n";

const informationUnit =
  "Unidades aceitas: [g] gramas, [kg] kilogramas, [ml] mililitros, [l] litros, [u] unidades.\n";

const informationExit = "Digite [sair] para voltar ao menu a qualquer momento.";

const invalidIDmsg = "Não consegui encontrar esse item... Voltando ao menu!";

const currentItems = [];
const currentAmounts = [];
const currentUnits = [];
const currentStores = [];

const removedItems = [];
const removedAmounts = [];
const removedUnits = [];
const removedStores = [];

function askUser(message) {
  return prompt(`${message} > `).toUpperCase();
}

function formatUnit(unit) {
  let formatedUnit = "";
  if (unit.includes("KG") || unit.includes("KILO")) {
    formatedUnit = "kg";
  } else if (unit.includes("G")) {
    formatedUnit = "g";
  } else if (unit.includes("M")) {
    formatedUnit = "ml";
  } else if (unit.includes("L")) {
    formatedUnit = "l";
  } else if (unit.includes("U")) {
    formatedUnit = "un.";
  } else if (unit != "") {
    formatedUnit = "other";
  }
  return formatedUnit;
}

function userEntry() {
  return prompt(`Comando: `).toUpperCase();
}

function identifyById(actionDescription) {
  return `Identifique o item que deseja ${actionDescription} pelo seu índice (número de identificação).`;
}

//1
function add() {
  console.log("");
  console.log("= = = = = Inclusão sequencial de Items = = = = =");
  console.log(informationItem + informationUnit);

  while (true) {
    console.log(informationExit + "\n\n - Incluindo um novo item:");

    const itemName = askUser(" | Nome do Item");
    if (itemName == "SAIR") {
      break;
    }

    const amount = askUser(" | Quantidade");
    if (amount == "SAIR") {
      break;
    }

    let unit = formatUnit(askUser(" | Unidade"));
    while (unit == "other") {
      console.log(" | UNIDADE INVÁLIDA: " + informationUnit);
      unit = formatUnit(askUser(" | Indique uma unidade válida"));
    }
    if (unit == "SAIR") {
      break;
    }

    const store = askUser(` | Estabelecimento`);
    if (store == "SAIR") {
      break;
    }

    currentItems.push(itemName);
    currentAmounts.push(amount);
    currentUnits.push(unit);
    currentStores.push(store);

    console.log(` - ${itemName} adicionado com sucesso. Vamos para o próximo!\n`);
  }
}

//2
function update() {
  console.log("Bom. Antes de corrigir um item, vamos dar uma olhada na lista.");
  logList();

  if (currentItems.length < 1) {
    console.log("Como não há o que corrigir, voltaremos ao menu!");
    return;
  }

  console.log(informationExit);
  let userChoice = askUser(identifyById("corrigir"));

  if (userChoice == "SAIR") {
    return;
  } else {
    userChoice = Number(userChoice);
  }

  if (userChoice > currentItems.length || userChoice <= 0) {
    console.log(invalidIDmsg);
    return;
  }

  console.log(informationItem + informationUnit);
  console.log(`Corrigindo o item [${userChoice}] "${currentItems[userChoice - 1]}":`);

  userChoice -= 1;

  let itemName = askUser("Nome do Item (deixe vazio para não alterar)");
  if (itemName == "SAIR") {
    return;
  } else if (itemName == "") {
    itemName = currentItems[userChoice];
  }

  let amount = askUser("Quantidade (deixe vazio para não alterar)");
  if (amount == "SAIR") {
    return;
  } else if (amount == "") {
    amount = currentAmounts[userChoice];
  }

  let unit = formatUnit(askUser("Unidade (deixe vazio para não alterar)"));
  while (unit == "other") {
    console.log(
      "As unidades aceitas são: [g] gramas, [kg] kilogramas, [ml] mililitros, [l] litros, [u] unidades."
    );
    unit = formatUnit(askUser("Indique uma unidade válida"));
  }

  if (unit == "SAIR") {
    return;
  } else if (unit == "") {
    unit = currentUnits[userChoice];
  }

  let store = askUser("Estabelecimento (deixe vazio para não alterar)");
  if (store == "SAIR") {
    return;
  } else if (store == "") {
    store = currentStores[userChoice];
  }

  currentItems[userChoice] = itemName;
  currentAmounts[userChoice] = amount;
  currentUnits[userChoice] = unit;
  currentStores[userChoice] = store;

  console.log(separator);
  console.log(`${itemName} corrigido com sucesso. Voltando ao menu!`);
}

//3
function remove() {
  console.log("Bom. Antes de remover um item, vamos dar uma olhada na lista.");
  logList();

  if (currentItems.length < 1) {
    console.log("Como não há o que remover, voltaremos ao menu!");
    return;
  }

  console.log(informationExit);
  let userChoice = askUser(identifyById("remover"));

  if (userChoice == "SAIR") {
    return;
  } else {
    userChoice = Number(userChoice);
  }

  if (userChoice > currentItems.length || userChoice <= 0) {
    console.log(invalidIDmsg);
    return;
  }

  userChoice -= 1;
  const removed = currentItems.splice(userChoice, 1);

  removedItems.push(removed[0]);
  removedAmounts.push(currentAmounts.splice(userChoice, 1)[0]);
  removedUnits.push(currentUnits.splice(userChoice, 1)[0]);
  removedStores.push(currentStores.splice(userChoice, 1)[0]);

  console.log(
    `Pronto! "${removed[0]}" foi removido da lista. Você o encontrará na Lixeira se precisar. Voltando ao menu!`
  );
}

//4
function logList() {
  if (currentItems.length == 0) {
    console.log("Sua Lista de Compras está vazia... Sugiro [Incluir] um item.");
  } else {
    console.log("Aqui está a sua Lista de Compras:");
    console.log(listHeader);

    for (let i = 0; i < currentItems.length; i++) {
      console.log(
        `: [${i + 1}]`.padEnd(7) +
          ` ${currentItems[i]}`.padEnd(30) +
          `${currentAmounts[i]} ${currentUnits[i]}`.padEnd(13) +
          currentStores[i].padEnd(19) +
          ":"
      );
    }
    console.log(":....................................................................:\n");
  }
}

//5
function searchByName() {
  console.log("Indique o nome ou parte do nome do item a ser pesquisado.");
  console.log(informationExit);
  const search = askUser("Pesquisa");

  if (search == "SAIR") {
    return;
  }

  let table = "";
  let counter = 0;

  for (let i = 0; i < currentItems.length; i++) {
    if (currentItems[i].toUpperCase().includes(search)) {
      table +=
        "\n" +
        `: [${i + 1}]`.padEnd(7) +
        ` ${currentItems[i]}`.padEnd(30) +
        `${currentAmounts[i]} ${currentUnits[i]}`.padEnd(13) +
        currentStores[i].padEnd(19) +
        ":";
      counter = counter + 1;
    }
  }

  if (counter > 0) {
    console.log(listHeader + table);
    console.log(listFooter);
  } else {
    console.log(
      `Sinto muito, mas não encontrei itens através da sua busca "${search}". Voltando ao menu!`
    );
  }
}

//6
function searchByStore() {
  console.log("Indique o nome ou parte do nome da loja a ser pesquisada.");
  console.log(informationExit);
  const search = askUser("Pesquisa");

  if (search == "SAIR") {
    return;
  }

  let counter = 0;
  let table = "";

  for (let i = 0; i < currentItems.length; i++) {
    if (currentStores[i].toUpperCase().includes(search)) {
      table +=
        "\n" +
        `: [${i + 1}]`.padEnd(7) +
        ` ${currentItems[i]}`.padEnd(30) +
        `${currentAmounts[i]} ${currentUnits[i]}`.padEnd(13) +
        currentStores[i].padEnd(19) +
        ":";
      counter = counter + 1;
    }
  }

  if (counter > 0) {
    console.log(listHeader + table);
    console.log(listFooter);
  } else {
    console.log(
      `Sinto muito, mas não encontrei nenhum item na sua lista para o estabelecimento "${search}". Voltando ao menu!`
    );
  }
}

//7
function logTrash() {
  if (removedItems.length == 0) {
    console.log("Sua Lixeira está vazia...");
  } else {
    console.log("Aqui está a sua Lixeira:");
    console.log(listHeader);

    for (let i = 0; i < removedItems.length; i++) {
      console.log(
        `: [${i + 1}]`.padEnd(7) +
          ` ${removedItems[i]}`.padEnd(30) +
          `${removedAmounts[i]} ${removedUnits[i]}`.padEnd(13) +
          removedStores[i].padEnd(19) +
          ":"
      );
    }
    console.log(listFooter);
    console.log(
      "Se deseja restaurar algum desses itens, utilize a função [Restaurar]. Voltando ao menu!"
    );
  }
}

//8
function restore() {
  console.log("Bom. Antes de remover um item, vamos dar uma olhada na lixeira.");
  logTrash();

  if (removedItems.length < 1) {
    console.log("Não há o que restaurar. Voltando ao menu!");
    return;
  }

  let userChoice = askUser(identifyById("restaurar"));

  if (userChoice == "SAIR") {
    return;
  } else {
    userChoice = Number(userChoice);
  }

  if (userChoice > removedItems.length || userChoice <= 0) {
    console.log(invalidIDmsg);
    return;
  }

  userChoice -= 1;
  const restored = removedItems.splice(userChoice, 1);

  currentItems.push(restored[0]);
  currentAmounts.push(removedAmounts.splice(userChoice, 1)[0]);
  currentUnits.push(removedUnits.splice(userChoice, 1)[0]);
  currentStores.push(removedStores.splice(userChoice, 1)[0]);

  console.log(`Pronto! "${restored[0]}" foi restaurado à lista. Voltando ao menu!`);
}

//9
  function emptyTrash() {
  const confirm = askUser("Tem certeza que deseja DELETAR TODOS OS ITENS da lixeira? [S/N]");

  if (confirm.includes("S")) {
    if (currentItems.length > 0) {
      removedItems.splice(0, removedItems.length);
      removedAmounts.splice(0, removedAmounts.length);
      removedUnits.splice(0, removedUnits.length);
      removedStores.splice(0, removedStores.length);
      console.log("Pronto, a lixeira está limpinha! Voltando ao menu!");
    } else {
      console.log(
        "Uuh... Okay... Eu... Esvaziei a sua lixeira... Mesmo que ela já estivesse vazia... Voltando ao menu..."
      );
    }
  } else {
    console.log(deletedNothing);
  }
}

//10
function resetList() {
  const confirm = askUser("Tem certeza que deseja REMOVER TODOS OS ITENS da lista? [S/N]");

  if (confirm.includes("S")) {
    if (currentItems.length > 0) {
      removedItems.push(currentItems.splice(0, currentItems.length));
      removedAmounts.push(currentAmounts.splice(0, currentAmounts.length));
      removedUnits.push(currentUnits.splice(0, currentUnits.length));
      removedStores.push(currentStores.splice(0, currentStores.length));
      console.log(
        "Pronto, a lista está limpinha e, se precisar, os itens podem ser encontrados na lixeira! Voltando ao menu!"
      );
    } else {
      console.log(
        "Uuh... Okay... Eu... Esvaziei a sua lista... Mesmo que ela já estivesse vazia... Voltando ao menu..."
      );
    }
  } else {
    console.log(deletedNothing);
  }
}

//11
function statistics() {
  console.log("= = = = = Algumas estatísticas da sua Lista = = = = =");
  console.log("TOTAL de itens na lista de compras:", currentItems.length);
  console.log("TOTAL de itens na lixeira:", removedItems.length);
  console.log(
    "\nNúmero de itens cadastrados com unidade de massa (g ou kg):",
    currentUnits.filter((unit) => unit.includes("g")).length
  );
  console.log(
    "Número de itens cadastrados com unidade de volume (ml ou l):",
    currentUnits.filter((unit) => unit.includes("l")).length
  );
  console.log(
    "Número de itens cadastrados por unidade:",
    currentUnits.filter((unit) => unit.includes("u")).length
  );
  const uniqueStores = new Set(currentStores);
  console.log("Número de estabelecimentos diferentes cadastrados:", uniqueStores.size);
}

//0
function exit() {
  const answer = askUser("Deseja mesmo sair? [S/N]");
  if (answer.includes("S")) {
    console.log(`Okay! Até a próxima!`);
    running = false;
  } else {
    console.log("Ufa! Pensei que você ia mesmo me desligar!");
    console.log("Vamos voltar para o menu!");
  }
}

function dislexaMenu() {
  console.log("\n.Dislexa_Menu_____________________________________________.");
  console.log("| Aqui está o que posso fazer:                            |");
  console.log("|                                                         |");
  console.log("|  [1]  [Incluir] um item.                                |");
  console.log("|  [2]  [Corrigir] um item                                |");
  console.log("|  [3]  [Excluir] um item                                 |");
  console.log("|  [4]  Mostrar a [Lista] de compras                      |");
  console.log("|  [5]  Pesquisar um [Item] por nome                      |");
  console.log("|  [6]  Pesquisar um item pela [Loja] onde ele é vendido  |");
  console.log("|  [7]  Mostrar [Lixeira]                                 |");
  console.log("|  [8]  [Restaurar] um item                               |");
  console.log("|  [9]  [Esvaziar] a lixeira                              |");
  console.log("|  [10] [Resetar] a lista                                 |");
  console.log("|  [11] [Detalhes] da lista de compras (estatísticas)     |");
  console.log("|  [0]  [Sair] do programa                                |");
  console.log("|_________________________________________________________|\n");
}

// ------------------------------------------------ Programa Principal --------------------------------------------------- //

// Bem vindo
console.log("");
console.log("Olá, eu sou a Dislexa, sua assistente de compras!");

while (running) {
  dislexaMenu();
  const action = userEntry();
  console.log("");

  console.log(separator);
  if (action == "1" || action.includes("INC")) {
    add();
  } else if (action == "2" || action.includes("COR")) {
    update();
  } else if (action == "3" || action.includes("EXC")) {
    remove();
  } else if (action == "4" || action.includes("LIS")) {
    logList();
  } else if (action == "5" || action.includes("IT")) {
    searchByName();
  } else if (action == "6" || action.includes("LO")) {
    searchByStore();
  } else if (action == "7" || action.includes("LIX")) {
    logTrash();
  } else if (action == "8" || action.includes("REST")) {
    restore();
  } else if (action == "9" || action.includes("ESV")) {
    emptyTrash();
  } else if (action == "10" || action.includes("RESE")) {
    resetList();
  } else if (action == "11" || action.includes("DET")) {
    statistics();
  } else if (action == "0" || action.includes("SA")) {
    exit();
  } else {
    console.log(
      "Desculpe, não entendi :(\nOs comandos que aceito ficam indicados entre chaves => [...] "
    );
  }
  console.log(separator);
}
