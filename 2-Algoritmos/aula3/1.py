
names = []
ages = []
courses = []


def read_file():
    with open("alunos.txt", "r") as file:
        lines = file.readlines()
        names.clear()
        ages.clear()
        courses.clear()
        for line in lines:
            name, age, course = line.replace("\n", "").split(";")
            names.append(name)
            ages.append(age)
            courses.append(course)


def save_file():
    with open("alunos.txt", "w") as file:
        for name, age, course in zip(names, ages, courses):
            file.write(f"{name};{age};{course}\n")
    print("As informações dos alunos foram salvas com sucesso.")


def title(text, separator="="):
    print()
    print(text)
    print(separator*40)


def input_number(message):
    user_input = input(message)
    is_num = user_input.isnumeric()
    if is_num:
        return int(user_input)
    else:
        print("O valor deve ser um número...")
        print()
        input_number(message)


def create_student():
    title("* Novo Estudante *")
    name = input("Nome: ")
    age = input_number("Idade: ")
    course = input("Curso: ")
    names.append(name)
    ages.append(age)
    courses.append(course)
    print(f"* {name} cadastrado com sucesso! *")


def list_students():
    title("* Lista de Estudantes *")
    print("ID. Nome................ Idade Curso")
    for i in range(0, len(names)):
        print(f"[{i+1}] {names[i]:20}  {ages[i]:3}  {courses[i]}")


def search_student():
    title("* Pesquisar por nome ou curso *")
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


def delete_student(show_list=True):
    if show_list:
        title("* Remover aluno *")
        print("Escolha o aluno  a ser removido pelo seu ID, consultando a lista abaixo:")
        list_students()
    print()
    id = input_number("Excluir aluno com ID (ou 0 para cancelar): ")
    if id == 0:
        print("Operação cancelada.")
        return
    if id < 0 or id > len(names):
        print("ID inválido.")
        delete_student(show_list=False)
        return
    name = names[id-1]
    names.pop(id-1)
    ages.pop(id-1)
    courses.pop(id-1)
    print(f'Aluno "{name}" removido com sucesso!')


def student_stats():
    pass


def run_loop():
    while True:
        title("== Cadastro de Alunos ==")
        print("[1] Cadastrar Aluno")
        print("[2] Listar Alunos")
        print("[3] Pesquisar por Nome")
        print("[4] Excluir")
        print("[5] Resumo")
        title("[6] Finalizar")
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


print("\nInicializando...\n")
read_file()
run_loop()
save_file()
print("\nEncerrando.\n")
