import User from "../Entities/User";

const prompt = require("prompt-sync")();

export class GameLoop {
  //Atributos
  private running: boolean;
  private user: User | undefined;
  private actions: Array<string>;

  //Construtor
  constructor() {
    this.running = true;
    this.actions = ["Sair"];
  }

  //Métodos
  public get IsRunning(): boolean {
    return this.running;
  }

  public Start(): void {
    const userName = prompt("Qual o seu nome? >");
    this.user = new User(userName);
    console.log("Obrigado por participar,", this.user.userName);
    this.Loop();
  }

  public Loop(): void {
    this.DisplayActions();
    const chosenAction = prompt("> ");
    const feedback = this.Execute(chosenAction);
    console.log(feedback);
  }

  private Stop(): string {
    this.running = false;
    return "Tchau";
  }

  private Execute(action: string): string {
    let feedback: string = "";
    switch (+action) {
      case 0:
        feedback = this.Stop();
        break;
      case 1:
    }
    return feedback;
  }

  private DisplayActions(): void {
    console.log("Escolha uma ação:");
    console.log(this.FormatActionList());
  }

  private FormatActionList(): Array<string> {
    const actionList = this.actions.map((action, index) =>
      index != 0 ? `[${index}] ${action}` : ""
    );

    actionList.push(`[0] ${this.actions[0]}`);
    return actionList.filter((action) => action != "");
  }
}
