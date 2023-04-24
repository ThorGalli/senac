
# nome_arq = input("Nome do Arquivo: ")
nome_arq = "laranjal.txt"

arq = open(nome_arq, "r")

# insere o texto, converte suas palavras em maiúsculas e
# adiciona as palavras a uma lista

palavras = []
for linha in arq:
    for palavra in linha.split():
        palavras.append(palavra.upper())

dicionario = {}

for palavra in palavras:
    num = dicionario.get(palavra, None)
    if num == None:
        dicionario[palavra] = 1
    else:
        dicionario[palavra] = num + 1

ordenadas = sorted(dicionario.items(),
                   key=lambda d: d[1], reverse=True)

significativos = 0
i = 0
max = len(ordenadas)
blackList = ["DE", "E", "A", "O", "DA", "QUE", "PARA", "EM",
             "UM", "FOI", "NO", "DO", "COM", "É", "DOS", "MAIS", "MUITO", "–"]
top = []
while significativos < 10 and i < max:
    if ordenadas[i][0] not in blackList:
        significativos += 1
        top.push(ordenadas[i])
        print(f'{i + 1}º Lugar: {ordenadas[i][1]} x {ordenadas[i][0]}')
