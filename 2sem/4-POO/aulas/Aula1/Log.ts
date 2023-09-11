export default class Log {
  title = (msg: string) => {
    const character = "=";
    const total = 60;
    const length = msg.length;
    const firula = character.repeat((total - length) / 2 - 1);
    console.log(firula + " " + msg + " " + firula);
  };

  msg = (msg: string) => {
    console.log(msg);
  };
  clear = () => {
    this.msg("\n".repeat(100));
  };
}
