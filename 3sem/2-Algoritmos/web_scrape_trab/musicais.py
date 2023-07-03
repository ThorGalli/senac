from bs4 import BeautifulSoup
import requests
import locale

buscas = []

url_busca_tritons = "https://www.tritons.com.br/catalogsearch/result/?q="
url_busca_megasom = "https://www.megasom.com.br/loja/busca.php?loja=1139574&palavra_busca="

NO_DISCOUNT = "Sem_Desconto"
data_tritons = []
data_megasom = []
prefered_field = "name"
prefer_reverse = False
debugging = False

def get_order_prefs():
    prefs = ""
    if prefered_field == "name":
        prefs += "Nome"
    elif prefered_field == "preco":
        prefs += "Preço"
    elif prefered_field == "preco_a_vista":
        prefs += "Preço a vista"
    if prefer_reverse:
        prefs += " decrescente"
    else:
        prefs += " crescente"
    return prefs

def display_as_BRL(valor_centavos):
    if valor_centavos == NO_DISCOUNT or valor_centavos == 0:
        return NO_DISCOUNT
    valor_centavos = int(valor_centavos)
    valor_real = valor_centavos / 100
    locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')
    valor_formatado = locale.currency(valor_real, grouping=True, symbol='R$ ')
    return valor_formatado

def string_to_cents(valor_string):
    if valor_string == NO_DISCOUNT:
        return 0
    valor_string = valor_string.replace("R$", "")
    valor_string = valor_string.replace(".", "")
    valor_string = valor_string.replace(",", "")
    valor_string = valor_string.strip()
    valor_centavos = int(valor_string)
    return valor_centavos

def clean_string(valor_string):
    valor_string = valor_string.replace("\n", "")
    valor_string = valor_string.strip()
    valor_string = " ".join(valor_string.split())
    return valor_string


def populate_data_tritons(html):
    print("=> populaing: data_tritons...")
    global data_tritons
    try:
        div_tabela = html.find("section", {"class": "category-products"})
        items = div_tabela.findAll("li", {"class": "item"})
    except:
        print("Nenhum item encontrado na pesquisa.")
        return

    products = []
    for item in items:
        try:
            name = item.find("h2", {"class": "product-name"}).a["title"]
            preco = item.find("span", {"class": "regular-price"}).span.string
            try:
                preco_a_vista = item.find(
                    "p", {"class": "precoProduto"}).span.string
            except:
                preco_a_vista = NO_DISCOUNT

            name = clean_string(name)
            preco = clean_string(preco)
            preco = string_to_cents(preco)
            preco_a_vista = clean_string(preco_a_vista)
            preco_a_vista = string_to_cents(preco_a_vista)
            product = {"name": name, "preco": preco,
                          "preco_a_vista": preco_a_vista, "loja": "Tritons"}
            if debugging:
                print(product)

            products.append(product)
        except:
            print("Nenhum item encontrado na pesquisa.\n")
            return
        
    print("successfully populated data_tritons with " +
    str(len(products)) + " items.\n")
    data_tritons = data_tritons + products
        

def populate_data_megason(html):
    print("=> populating: data_megason...")
    global data_megasom

    try:
        ul_tabela = html.find("ul", {"class": "list-product"})
        items = ul_tabela.findAll("li", {"class": "item"})
    except:
        print("No items found in megason search.")
        return

    products = []
    for item in items:
        try:
            name = item.find("div", {"class": "product-name"}).string
            preco = item.find("span", {"class": "current-price"}).string
            try:
                preco_a_vista = item.find(
                    "span", {"class": "preco-avista precoAvista"}).getText()
            except:
                preco_a_vista = NO_DISCOUNT
                
            name = clean_string(name)
            preco = clean_string(preco)
            preco = string_to_cents(preco)
            preco_a_vista = clean_string(preco_a_vista)
            preco_a_vista = string_to_cents(preco_a_vista)

            product = {"name": name, "preco": preco,
                          "preco_a_vista": preco_a_vista, "loja": "Megasom"}
            
            if debugging:
                print(product)

            products.append(product)
        except:
            print("No items found in megason search.\n")
            return
    print("successfully populated data_megason with " +
    str(len(products)) + " items.\n")
    data_megasom = data_megasom + products
    

def scrape_and_populate(busca):
    print("\n=> searching for: " + busca+"\n")
    buscas.append(busca)
    req_tritons = requests.get(url_busca_tritons + busca)
    req_megason = requests.get(url_busca_megasom + busca)
    html_tritons = BeautifulSoup(req_tritons.content, "html.parser")
    html_megason = BeautifulSoup(req_megason.content, "html.parser")

    populate_data_tritons(html_tritons)
    populate_data_megason(html_megason)


    print("=> searching complete.")


def print_list(titulo, lista, mostrar_loja=False):
    global prefer_reverse, prefered_field
    ordered_list = sorted(lista, key=lambda k: k[prefered_field], reverse=prefer_reverse)
    
    if len(ordered_list) == 0:
        print(f"Nenhum item encontrado na {titulo}.")
    elif mostrar_loja:
        print(f"\n{titulo.center(114)}")
        print(f"{'Loja'.ljust(8)} | {'Nome do Item'.ljust(80)} | {'Preço'.rjust(12)} | {'Preço à vista'.rjust(12)}")
        print("-" * 114)
        for item in ordered_list:
            print(f"{item['loja'].ljust(8)} | {item['name'].ljust(80)[:80]} | {display_as_BRL(item['preco']).rjust(12)} | {display_as_BRL(item['preco_a_vista']).rjust(12)}")
        print(f'\n{"Total de itens na lista: " + str(len(ordered_list))}')
        print()
    else:
        print(f"\n{titulo.center(114)}")
        print(f"{'Nome do Item'.ljust(80)} | {'Preço'.rjust(12)} | {'Preço à vista'.rjust(12)}")
        print("-" * 114)
        for item in ordered_list:
            print(f"{item['name'].ljust(80)[:80]} | {display_as_BRL(item['preco']).rjust(12)} | {display_as_BRL(item['preco_a_vista']).rjust(12)}")
        print(f'\n{"Total de itens na lista: " + str(len(ordered_list))}')
        print()


def search_by_word(busca):
    searched_list = []
    for item in data_tritons + data_megasom:
        if busca.lower() in item["name"].lower():
            searched_list.append(item)

    print_list(f"Resultados para '{busca}'", searched_list, True)


def search_by_price(lower, upper):
    global prefered_field
    searched_list = []
    try:
        lower = int(lower) * 100
        upper = int(upper) * 100
    except:
        print("Os preços devem ser números inteiros.")
        return
    
    if upper  == 0:
        upper = 2147483647
    
    if lower > upper:
        print("O preço mínimo deve ser menor que o preço máximo.")
        return
    

    for item in data_tritons + data_megasom:
        if item["preco"] >= lower and item["preco"] <= upper:
            searched_list.append(item)

    backup_sorting = prefered_field
    prefered_field = "preco"
    print_list(f"Resultados entre {display_as_BRL(lower)} e {display_as_BRL(upper)}", searched_list, True)
    prefered_field = backup_sorting


def ask_orderby():
    global prefered_field
    global prefer_reverse
    print("\n┏━ Ordernar por: ")
    print("┣[1] Nome")
    print("┣[2] Preço")
    print("┣[3] Preço à vista")
    field = input("\nDigite o número da opção desejada =>")

    if field not in ["1", "2", "3"]:
        print("Opção inválida.")
        return ask_orderby()
    
    order = input("Ordem crescente ou decrescente? [c/d] =>")

    if order not in ["c", "d"]:
        print("Opção inválida.")
        return ask_orderby()

    if order == "c":
        prefer_reverse = False
    else:
        prefer_reverse = True

    if field == "1":
        prefered_field = "name"
    elif field == "2":
        prefered_field = "preco"
    elif field == "3":
        prefered_field = "preco_a_vista"
   
    



def display_lists():
    if len(data_tritons) == 0 and len(data_megasom) == 0:
        print("Lista vazia. Tente pesquisar um instrumento primeiro.")
        return
    
    print_list("Tritons", data_tritons)
    print_list("Megasom", data_megasom)


def display_discounted_list():
    data_desconto = []
    data_sem_desconto = []

    for item in data_tritons + data_megasom:
        if item["preco_a_vista"] != 0:
            data_desconto.append(item)
        else:
            data_sem_desconto.append(item)

    if len(data_desconto) == 0:
        print("Não encontramos produtos com desconto :/.")
        return
    
    print_list("Itens com Desconto", data_desconto, True)
    print_list("Itens sem Desconto", data_sem_desconto, True)
    

def display_statistics():
    total_buscas =str(len(buscas))

    # total de itens e soma de todos os valores TRITON
    total_tritons = len(data_tritons)
    soma_tritons = 0
    for item in data_tritons:
        soma_tritons += item["preco"]

    # total de itens e soma de todos os valores MEGASOM
    total_megasom = len(data_megasom)
    soma_megasom = 0
    for item in data_megasom:
        soma_megasom += item["preco"]

    # total de itens e soma de todos os valores
    total_geral = total_tritons + total_megasom
    soma_geral = soma_tritons + soma_megasom

    soma_tritons_desconto = 0
    for item in data_tritons:
        if item["preco_a_vista"] != NO_DISCOUNT:
            soma_tritons_desconto += item["preco_a_vista"]
        else:
            soma_tritons_desconto += item["preco"]
    soma_megasom_desconto = 0
    for item in data_megasom:
        if item["preco_a_vista"] != NO_DISCOUNT:
            soma_megasom_desconto += item["preco_a_vista"]
        else:
            soma_megasom_desconto += item["preco"]
    soma_geral_desconto = soma_tritons_desconto + soma_megasom_desconto
    # exibição dos totais
    print(f'\nTotal de Buscas realizadas: {total_buscas} busca(s)')
    print('\nTotais da Triton:')
    print(f'{str(total_tritons)} itens')
    print(f'{display_as_BRL(soma_tritons)} reais, ou {display_as_BRL(soma_tritons_desconto)} reais com desconto a vista')
    print(f'(economia de {display_as_BRL(soma_tritons - soma_tritons_desconto)}))')
    print('\nTotais da Megasom:')
    print(f'{str(total_megasom)} itens')
    print(f'{display_as_BRL(soma_megasom)} reais, ou {display_as_BRL(soma_megasom_desconto)} reais com desconto a vista')
    print(f'(economia de {display_as_BRL(soma_megasom - soma_megasom_desconto)} comprando a vista)')
    print('\nTotais Gerais:')
    print(f'{str(total_geral)} itens')
    print(f'{display_as_BRL(soma_geral)} reais, ou {display_as_BRL(soma_geral_desconto)} reais com desconto a vista')
    print(f'(economia de {display_as_BRL(soma_geral - soma_geral_desconto)} comprando a vista)')


def delete_all_data():
    user_input = input("Tem certeza que deseja apagar todos os dados? [s/n] =>")
    if user_input.lower() == "s":
        data_tritons.clear()
        data_megasom.clear()
        buscas.clear()
        print("Dados apagados.")
    else:
        print("Operação cancelada.")


# inicio do programa
print("Bem-vindo ao Musical Scraper, como posso ajudar?\n")



def exibir_menu():
    todas_buscas = ", ".join(buscas)
    print("\n~~~~Musical Scraper")
    if len(buscas) > 0:
       print("Buscas realizadas: " + todas_buscas)
        
    print(f'\nTotal de Itens:\nTritons: {str(len(data_tritons))} itens,  Megasom: {str(len(data_megasom))} itens ')
    print(f'Ordenação atual: {get_order_prefs()}')
    print("\n┏━ Menu de ações, digite a opção desejada")
    print("┣[1] Popular Lista de Produtos")
    print("┣[2] Exibir Listas por Loja")
    print("┣[3] Exibir Listas com e sem Desconto")
    print("┣[4] Preferencias de Ordenação")
    print("┣[5] Pesquisar por palavra (ou parte dela)")
    print("┣[6] Pesquisar intervalo de preço")
    print("┣[7] Exibir estatísticas")
    print("┣[8] Limpar tudo")
    print("┗[9] Sair")

while True:
    exibir_menu()
    opcao = input("\nDigite o número da opção desejada =>")
    if opcao == "1":
        busca = input("Pesquisa por produto =>")
        scrape_and_populate(busca)
    elif opcao == "2":
        display_lists()
    elif opcao == "3":
        display_discounted_list()
    elif opcao == "4":
        ask_orderby()    
        display_lists()
    elif opcao == "5":
        busca = input("Digite o termo de busca => ")
        search_by_word(busca)
    elif opcao == "6":
        print("A pesquisa é feita com valores inteiros, em reais.")
        lower = input("Digite o valor inicial => R$ ")
        upper = input("Digite o valor final (0 para infinito) => R$ ")
        search_by_price(lower, upper)
    elif opcao == "7":
        display_statistics()
    elif opcao == "8":
        delete_all_data()
    elif opcao == "9":
        break
    else:
        print("\n ~~ Opção inválida, tente novamente. ~~ \n")
