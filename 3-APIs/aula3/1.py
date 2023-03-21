
import requests
url_api = "http://localhost:3000/produtos"


def title(text, separator="-"):
    print()
    print(text)
    print(separator*30)
    pass


def createProduct():
    description = input("Descrição.: ")
    brand = input("Marca.....: ")
    amount = input("Quantidade: ")
    price = input("Preço.....: ")
    product = {"descricao": description,
               "marca": brand,
               "quant": amount,
               "preco": price}
    try:
        response = requests.post(url_api, json=product)
        id = str(response.json()[id])
        print(f"Produto cadastrado! Código: {id}")
    except:
        print("erro na inserção")


def readProducts():
    title("Lista de Produtos")
    response = requests.get(url_api)
    products = response.json()
    print("Cód. Descrição do produto.......... Marca.......... Quant. Preço....")

    for prod in products:
        print(f"{prod['id']:4d}", end=" ")
        print(f"{prod['descricao']:30}", end=" ")
        print(f"{prod['marca']:15}", end=" ")
        print(f"{prod['quant']:6d}", end=" ")
        print(f"{prod['preco']:9.2f}")


def updateProduct():
    id = int(input("ID:"))
    response = requests.get(url_api+"/"+str(id))
    produto = response.json
    if produto["id"] == 0:
        print("Erro, id inválido")
        return

    print("Informe os campos a serem alterados, deixe vazio para não alterar.")
    newDescription = input(f"Descrição [{produto['descricao']}] =>")
    newBrand = input(f"Descrição [{produto['marca']}] =>")
    newAmount = input(f"Descrição [{produto['quant']}] =>")
    newPrice = input(f"Descrição [{produto['preco']}] =>")

    newProduct = {'descricao': newDescription,
                  'marca': newBrand,
                  'quant': newAmount,
                  'preco': newPrice}


def deleteProduct():
    pass


def searchProduct():
    pass


def getStats():
    pass


while True:
    title("Cadastro de produtos - Consome API")
    print("1. Inclusão de Produto")
    print("2. Listagem de Produtos")
    print("3. Alteração de Produto")
    print("4. Exclusão de Produto")
    print("5. Pesquisa por Código")
    print("6. Dados Estatístico")
    print("7. Finalizar")

    option = int(input("Informe a sua opção: "))
    if option == 1:
        createProduct()
    elif option == 2:
        readProducts()
    elif option == 3:
        updateProduct()
    elif option == 4:
        deleteProduct()
    elif option == 5:
        searchProduct()
    elif option == 6:
        getStats()
    elif option == 7:
        break
    else:
        print("Comando inválido")
