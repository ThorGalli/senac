import Log from "./Log";
import Personagem from "./Personagem";

const prompt = require("prompt-sync")();

const log = new Log();
let running = true;
log.title("Running");

const opcoes = ["Sair", "Criar Personagem","Selecionar Personagem"];

const listarOpcoes = () =>{
  log.msg("Personagem:" + (personagem ? personagem.apelido : "nenhum"))
  log.msg(" ------------------------------------- ");
  log.msg("Opções:")
  opcoes.forEach((opt,index) => index!=0 && log.msg(`[${index}] ${opt}`))
  log.msg(`\n[0] ${opcoes[0]}`)
}

const listaDePersonagens:Personagem[] = []
let personagem:Personagem;

const sair = () => {
  running = false;
};

const criarPersonagem = () => {
  log.clear();
  log.msg(" - Bem vindo a criação de personagem - ");
  log.msg(" ------------------------------------- ");
  const apelido = prompt("Indique o apelido do personagem >");
  log.msg("... Criando " + apelido + " ...");
  const novoPersonagem = new Personagem(apelido)
  listaDePersonagens.push(novoPersonagem)
  personagem = listaDePersonagens[listaDePersonagens.length-1]
};

const selecionarPersonagem = () => {
  log.clear()
  log.msg(" - Bem vindo a seleção de personagem - ");
  log.msg(" ------------------------------------- ");
  listaDePersonagens.forEach((obj,index) =>log.msg(`[${index+1}] ${obj.apelido}`))
}

while (running) {
  log.msg("")
  listarOpcoes()
  const userEntry = prompt("> ");

    switch (+userEntry) {
      case 0:
        sair();
        break;
      case 1:
        criarPersonagem();
        break;
      case 2:
        selecionarPersonagem();
        break;
      default:
        log.msg("Não entendi o que você quer.");
        break;
    }
  
}

log.title("Done");
