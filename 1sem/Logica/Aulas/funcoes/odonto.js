const prompt = require("prompt-sync")();

const pacientes = [];

function incluir() {
  const nome = prompt("Incluir paciente (insira o nome): >");
  pacientes.push(nome);
  console.log("Ok! Paciente Cadastrado com Sucesso!!!");
}

function listar() {
  console.log("Lista de pacientes em espera:\n");
  for (const paciente of pacientes) {
    console.log(paciente);
  }
}

function atender() {
  if (pacientes.length == 0) {
    console.log("Não há pacientes na lista. Retornando ao Menu.");
    return;
  }
  const primeiro = pacientes[0];
  console.log(`Paciente ${primeiro} encaminhado para o atendimento...`);
  pacientes.shift();
  console.log(`Paciente ${primeiro} atendido!`);
}

function urgencia() {
  const primeiro = prompt("Nome do paciente a ser atendido com urgência: >");
  console.log(`O paciente ${primeiro} será o próximo a ser atendido.`);
  pacientes.unshift(primeiro);
}

function separator() {
  console.log("-".repeat(40));
}

do {
  separator();
  console.log("\nConsultório Odontológico:");
  console.log("0. Finalizar");
  console.log("1. Incluir Paciente");
  console.log("2. Listar Pacientes");
  console.log("3. Atender Paciente");
  console.log("4. Atendimento de Urgência");

  const opcao = Number(prompt("Opção: "));
  separator();

  if (opcao == 0) {
    break;
  } else if (opcao == 1) {
    incluir();
  } else if (opcao == 2) {
    listar();
  } else if (opcao == 3) {
    atender();
  } else if (opcao == 4) {
    urgencia();
  } else {
    console.log("Comando Inválido :(");
  }
} while (true);
