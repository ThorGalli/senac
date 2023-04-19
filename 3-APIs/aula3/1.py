
import requests
url_api = "http://localhost:3000/produtos"


def title(text, separator="-"):
    print()
    print(text)
    print(separator*30)


def create_product():
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
        _id = str(response.json()[_id])
        print(f"Produto cadastrado! Código: {_id}")
    except Exception as e:
        print("Erro na inserção:")
        print(e)


def read_products():
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


def update_product():
    _id = int(input("ID:"))
    response = requests.get(url_api+"/"+str(_id))
    produto = response.json
    if produto["id"] == 0:
        print("Erro, id inválido")
        return

    print("Informe os campos a serem alterados, deixe vazio para não alterar.")
    new_description = input(f"Descrição [{produto['descricao']}] =>")
    new_brand = input(f"Descrição [{produto['marca']}] =>")
    new_amount = input(f"Descrição [{produto['quant']}] =>")
    new_price = input(f"Descrição [{produto['preco']}] =>")

    new_product = {'descricao': new_description,
                  'marca': new_brand,
                  'quant': new_amount,
                  'preco': new_price}
    
    try:
        response = requests.put(url_api+"/"+str(_id), json=new_product)
        _id = str(response.json()[_id])
        print(f"Produto atualizado! Código: {_id}")
    except Exception as e:
        print("Erro na atualização do produto:")
        print(e)


def delete_product():
    raise NotImplementedError()


def search_product():
    raise NotImplementedError()


def get_stats():
    raise NotImplementedError()


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
        create_product()
    elif option == 2:
        read_products()
    elif option == 3:
        update_product()
    elif option == 4:
        delete_product()
    elif option == 5:
        search_product()
    elif option == 6:
        get_stats()
    elif option == 7:
        break
    else:
        print("Comando inválido")
