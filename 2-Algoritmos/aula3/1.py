
names = []
ages = []
courses = []


def input_number(message):
    user_input = ""
    try:
        user_input = int(input(message))
    except ValueError:
        print("O valor deve ser um número...")
        print()
        input_number(message)
    return user_input


def create_student():
    print("* Novo Estudante *")
    name = input("Nome: ")
    age = input_number("Idade: ")
    course = input("Curso: ")
    names.append(name)
    ages.append(age)
    courses.append(course)
    print(f"* {name} cadastrado com sucesso! *")


def list_students():
    print("* Lista de Estudantes *")
    for i in range(0, len(names)):
        print(f"[{i+1}] {names[i]} {ages[i]} {courses[i]}")


def search_student():
    print("* Pesquisar por nome ou curso *")
    search = input("Pesquisa: ").lower()
    found = []
    for i in range(0, len(names)):
        if search in names[i].lower() or search in courses[i].lower():
            found.append(i)
    print()
    if len(found) > 0:
        for i in found:
            print(f"[{i+1}] {names[i]} {ages[i]} {courses[i]}")
    else:
        print("- Nenhum resultado -")


def delete_student():
    pass


def student_stats():
    pass


while True:
    print()
    print("== Cadastro de Alunos ==")
    print("[1] Cadastrar Aluno")
    print("[2] Listar Alunos")
    print("[3] Pesquisar por Nome")
    print("[4] Excluir")
    print("[5] Resumo")
    print("[6] Finalizar")
    print("========================")
    print()
    option = input_number("Opção: ")
    print()
    if option == 1:
        create_student()
    elif option == 2:
        list_students()
    elif option == 3:
        search_student()
    elif option == 4:
        delete_student()
    elif option == 5:
        student_stats()
    elif option == 6:
        break
    else:
        print("Comando inválido.")
        print()
