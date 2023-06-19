from bs4 import BeautifulSoup
import requests
import locale

url_busca = "https://www.tritons.com.br/catalogsearch/result/?q="

data = []


def formatar_dinheiro(valor_centavos):
    valor_real = valor_centavos / 100
    locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')
    valor_formatado = locale.currency(valor_real, grouping=True, symbol='R$ ')
    return valor_formatado


def search_box(busca):
    req = requests.get(url_busca + busca)
    html = BeautifulSoup(req.content, "html.parser")

    div_tabela = html.find("section", {"class": "category-products"})
    items = div_tabela.findAll("li", {"class": "item"})

    products = []
    for item in items:
        name = item.find("h2", {"class": "product-name"}).a["title"]
        preco = item.find("span", {"class": "regular-price"}).span.string
        preco_a_vista = item.find("p", {"class": "precoProduto"}).span.string
        products.append({"name": name, "preco": preco,
                        "preco_a_vista": preco_a_vista})
    for product in products:
        print(product)
        print()


def exibir_menu():
    print("* Menu de ações *")
    print("1. Buscar Instrumento")
    # print("2. Filmes em Porto Alegre")
    # print("3. Exclusivos de cada cidade")
    # print("4. Todos os filmes em cartas")
    print("0. Sair")


print("Bem-vindo ao Triton Scraper, como posso ajudar?\n")
while True:
    exibir_menu()
    opcao = input("\nDigite o número da opção desejada =>")
    if opcao == "1":
        print("1")
        busca = input("Pesquisa por produto =>")
        search_box(busca)
    elif opcao == "2":
        search = input("\n Pesquisa por endereço =>")
        print("2", search)
    elif opcao == "3":
        print("3")
    elif opcao == "4":
        print("4")
    elif opcao == "0":
        break
    else:
        print("\n ~~ Opção inválida, tente novamente. ~~ \n")
