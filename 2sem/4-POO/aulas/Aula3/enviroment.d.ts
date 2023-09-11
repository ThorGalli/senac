declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: 3001;
      JWT_KEY: "Aula#Prog_Web@89289838*#HqjwloJskmNswl";
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
