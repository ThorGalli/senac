const prompt = require('prompt-sync')()

const nPacientes = Number(prompt("Número de pacientes: "));

const ate5pacientes = (nPacientes <= 5)
const nPacientesPar = (nPacientes % 2 == 0)
let message = ""

if (ate5pacientes) {
    message = "Dentista A: " + nPacientes + " pacientes."
} else {
    if (nPacientesPar) {
        message = "Dentista A: " + nPacientes / 2 + " pacientes.\n"
        message += "Dentista B: " + nPacientes / 2 + " pacientes."
    } else {
        const nPacA = (nPacientes - 1) / 2
        const nPacB = (nPacientes + 1) / 2
        message = "Dentista A: " + nPacA + " pacientes.\n"
        message += "Dentista B: " + nPacB + " pacientes"
    }
}
console.log(message)
console.log("\n\n-----------------------------------------------------\n");