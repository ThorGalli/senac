from bs4 import BeautifulSoup
import requests
import locale

url_pel = "https://www.cineflix.com.br/programacao/shopping-pelotas/"

req = requests.get(url_pel)

data = []


def formatar_dinheiro(valor_centavos):
    valor_real = valor_centavos / 100
    locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')
    valor_formatado = locale.currency(valor_real, grouping=True, symbol='R$ ')
    return valor_formatado


def load_data():
    html = BeautifulSoup(req.content, "html.parser")
    div_tabela = html.find("div", {"class": "programacao_list"})
    items = div_tabela.findAll("tr", {"class": "prog_line"})
    movies = []
    for item in items:
        title = item.find("td", {"class": "title_td"}).div.get_text()
        idioma = item.find("td", {"class": "idioma"}).span.string
        age = item.find("i")["title"]
        movies.append({"title": title, "idioma": idioma, "age": age})
    for movie in movies:
        print(movie)
        print()


def exibir_menu():
    print("* Menu de ações *")
    print("1. Filmes em Pelotas")
    print("2. Filmes em Porto Alegre")
    print("3. Exclusivos de cada cidade")
    print("4. Todos os filmes em cartas")
    print("0. Sair")


print("Bem-vindo ao Cineflix Scraper, como posso ajudar?\n")
while True:
    exibir_menu()
    opcao = input("\nDigite o número da opção desejada =>")
    if opcao == "1":
        print("1")
        load_data()
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
