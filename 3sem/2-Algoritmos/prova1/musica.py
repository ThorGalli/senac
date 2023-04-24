import os

descricoes = []
precos = []
marcas = []

def ler_arquivo():
  if not os.path.isfile("musical_instruments.csv"):
    return
  with open("musical_instruments.csv", "r") as arq:
    linhas = arq.readlines()
    for linha in linhas:
      partes = linha.split(";")
      descricoes.append(partes[0])
      precos.append(float(partes[1]))
      marcas.append(partes[2][0:-1]) 

def salva_arquivo():
  with open("musical_instruments.csv", "w") as arq:
    for descricao, preco, marca in zip(descricoes, precos, marcas):
      arq.write(f"{descricao};{preco};{marca}\n")
    print("Alterações salvas com sucesso.") 

def titulo(texto, sublinhado="-"):
  print()
  print(texto)
  print(sublinhado*30)

def cadastrar():
  titulo("Inclusão de Instrumento")
  descricao = input("Descrição: ")
  preco = float(input("Preço: "))
  marca = input("Marca: ")
  descricoes.append(descricao)
  precos.append(preco)
  marcas.append(marca)
  print("Ok! instrumento cadastrado com sucesso")

def listar():
  titulo("Lista de instrumentos Cadastrados")
  print("Nº Descrição.................. Preço... Marca.....")
  for x, (instrumento, preco, marca) in enumerate(zip(descricoes, precos, marcas), start=1):
    print(f"{x:2} {instrumento:27} {float(preco):>8.2f} {marca}")

def pesquisar():
  titulo("Pesquisa por Nome")
  pesquisa = input("Pesquisar por nome: ")
  print("Nº Descrição.................. Preço... Marca.....") 
  for x, (instrumento, preco, marca) in enumerate(zip(descricoes, precos, marcas), start=1):
    if pesquisa.upper() in instrumento.upper():
      print(f"{x:2} {instrumento:27} {preco:>8.2f} {marca}")

def pesquisar_marca():
  titulo("Pesquisa por Marca")
  pesquisa = input("Pesquisar por marca: ")
  print("Nº Descrição.................. Preço... Marca.....")
  for x, (instrumento, preco, marca) in enumerate(zip(descricoes, precos, marcas), start=1):
    if pesquisa.upper() in marca.upper():
      print(f"{x:2} {instrumento:27} {preco:>8.2f} {marca}")

def excluir():
  listar() 
  titulo("Exclusão de instrumento")
  num = int(input("Nº do instrumento a Excluir: "))
  if num <= 0 or num > len(descricoes):
    print("Número inválido")
    return
  descricoes.pop(num-1)
  precos.pop(num-1)
  marcas.pop(num-1)
  
def pesquisa_total():
  titulo("Pesquisa com Total")
  pesquisa = input("Pesquisar por nome: ")
  print("Nº Descrição.................. Preço... Marca.....") 

  contar_quantidade = 0
  contar_precos = 0
  for x, (instrumento, preco, marca) in enumerate(zip(descricoes, precos, marcas),   start=1):
    if pesquisa.upper() in instrumento.upper():
      contar_quantidade += 1
      contar_precos += float(preco)
      print(f"{x:2} {instrumento:27} {preco:>8.2f} {marca}")

  total_quantidade = int(len(descricoes))
  total_estoque = float(sum(precos))

  print(f'Nº de instrumentos da pesquisa "{pesquisa}": {contar_quantidade}')
  print(f'Total de precos da pesquisa... "{pesquisa}": {contar_precos:.2f}')
  print(f'******************************')
  print(f'Total de instrumentos: {total_quantidade}')
  print(f'Valor total em estoque: {total_estoque:.2f}')

ler_arquivo()
while True:
  titulo("Cadastro de instrumentos", "=")
  print("1. Cadastrar instrumento")
  print("2. Listar os instrumentos")
  print("3. Excluir instrumento")
  print("4. Pesquisar por Nome")
  print("5. Pesquisar por Marca")
  print("6. Pesquisa com Total")
  print("7. Finalizar")
  opcao = int(input("Opção: "))
  if opcao == 1:
    cadastrar()
  elif opcao == 2:
    listar()
  elif opcao == 3:
    excluir()
  elif opcao == 4:
    pesquisar()
  elif opcao == 5:
    pesquisar_marca()
  elif opcao == 6:
    pesquisa_total()
  elif opcao == 7:
    salva_arquivo()
    break