from bs4 import BeautifulSoup
import requests
import locale

URL = "https://www.hotel.com.br/hoteis-em-pelotas.html"
req = requests.get(URL)
data = []


def formatar_dinheiro(valor_centavos):
    valor_real = valor_centavos / 100
    locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')
    valor_formatado = locale.currency(valor_real, grouping=True, symbol='R$ ')
    return valor_formatado


def load_data():
    html = BeautifulSoup(req.content, "html.parser")
    items = html.findAll("div", {"id": "listaHot"})
    for item in items:
        nome = item.find("h2").string
        preco = item.find("div", {"class": "caixaPreco"}).p.strong.string
        preco_centavos = preco.replace("R$", "").replace(",", "").strip()
        preco_numerico = int(preco_centavos)
        endereco = item.find("div", {"class": "listaHotContent"}).h3.string
        data.append(
            {"nome": nome, "preco": preco_numerico, "endereco": endereco})


def exibir_menu():
    print("* Menu de ações *")
    print("1. Listar Hotéis")
    print("2. Pesquisar por endereço (ou parte)")
    print("3. Listar em ordem de preço")
    print("0. Sair")


def listar_hoteis(order_by="nome", search=None):
    if not data:
        load_data()

    if search:
        hoteis_filtrados = [
            hotel for hotel in data if search.lower() in hotel['endereco'].lower()]
    else:
        hoteis_filtrados = data

    sorted_data = sorted(hoteis_filtrados, key=lambda x: x[order_by])

    print("")
    print("| Nome                                 | Preço        | Endereço")

    for hotel in sorted_data:
        preco_formatado = formatar_dinheiro(hotel['preco'])
        nome = hotel['nome'].ljust(36)
        preco = preco_formatado.rjust(12)
        endereco = hotel['endereco']
        print(f"| {nome} | {preco} | {endereco} ")

    print("")


print("Bem-vindo ao Hotel Scraper, como posso ajudar?\n")
while True:
    exibir_menu()
    opcao = input("\nDigite o número da opção desejada =>")
    if opcao == "1":
        listar_hoteis()
    elif opcao == "2":
        search = input("\n Pesquisa por endereço =>")
        listar_hoteis(search=search)
    elif opcao == "3":
        listar_hoteis(order_by="preco")
    elif opcao == "0":
        break
    else:
        print("\n ~~ Opção inválida, tente novamente. ~~ \n")
