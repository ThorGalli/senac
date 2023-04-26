import random
import os

title = "~ Sweepy ~"
bomb_char = "X"
empty_char = " "
mark_char = "!"
padding = "   "
highscores = []


def read_file():
    if not os.path.isfile("highscores.csv"):
        return
    with open("highscores.csv", "r") as arq:
        lines = arq.readlines()
        for line in lines:
            split_line = line.split(";")
            score_data = {
                "name": split_line[0], "size": split_line[1], "value": split_line[2][0:-1]}
            highscores.append(score_data)


def salva_arquivo():
    with open("highscores.csv", "w") as arq:
        for score in highscores:
            arq.write(f'{score["name"]};{score["size"]};{score["value"]}\n')
        print("Alterações salvas com sucesso.")


def print_invalid_input():
    print("\nEscolha inválida. Por favor, tente novamente.\n")


def print_separator(size=32, char="="):
    print(char * size)


# Menu de seleção de tamanho do campo
def choose_size():
    print_separator()
    print(f"{'':^7}Tamanho do campo")
    print_separator()
    print(f"{'':^5}1. Pequeno (8x8)")
    print(f"{'':^5}2. Médio (12x12)")
    print(f"{'':^5}3. Grande (16x16)")
    print()
    print(f"{'':^5}0. Cancelar")
    print_separator()

    choice = input("\nDigite sua escolha: ")

    if choice == "1":
        size, bombs = 8, 10
    elif choice == "2":
        size, bombs = 12, 25
    elif choice == "3":
        size, bombs = 16, 50
    elif choice == "0":
        return None, None
    else:
        print_invalid_input()
        # Chama a função novamente para que o usuário escolha uma opção válida
        return choose_size()

    return size, bombs


# Retorna um mapa de preenchido com o caractere especificado
def generate_map(size, char):
    new_map = []
    for _row in range(size):
        new_row = []
        for _col in range(size):
            new_row.append(char)
        new_map.append(new_row)
    return new_map


# Retorna um mapa populado com bombas
def generate_bomb_map(size, bomb_amount):
    # Gera mapa vazio
    bomb_map = generate_map(size, char=0)

    # Coloca as bombas no mapa de forma aleatória (mas não em cima de outra bomba)
    bombs_placed = 0
    while bombs_placed < bomb_amount:
        row = random.randint(0, size - 1)
        col = random.randint(0, size - 1)
        if bomb_map[row][col] != bomb_char:
            bomb_map[row][col] = bomb_char
            bombs_placed += 1

    return bomb_map


def count_bombs_around(bomb_map, row, col):
    size = len(bomb_map)
    bombs_around = 0
    for row_around in range(max(0, row - 1), min(size, row + 2)):
        for col_around in range(max(0, col - 1), min(size, col + 2)):
            if bomb_map[row_around][col_around] == bomb_char:
                bombs_around += 1
    return bombs_around


def generate_game_map(size, bombs):
    bomb_map = generate_bomb_map(size, bombs)
    game_map = generate_map(size, char=0)

    for row in range(size):
        for col in range(size):
            if bomb_map[row][col] == bomb_char:
                game_map[row][col] = bomb_char
            else:
                bombs_around = count_bombs_around(bomb_map, row, col)
                game_map[row][col] = bombs_around

    return game_map


def print_coordinates(size):
    print(padding + " ", end="")
    for col in range(size):
        print(f" {chr(col + ord('A'))} ", end=" ")
    print()


def print_map(map):
    size = len(map)
    # Calculate the size of the game title based on the map size
    title_size = (size * 4 + 4 - len(title)) // 2

    # On the first row: print the game title and the coordinates
    print(" " * title_size + title)
    print_coordinates(size)
    print(padding + "┌" + "───┬" * (size - 1) + "───┐")

    for row in range(size):

        # Print the left border of the row
        print(f"{row+1:2} ", end="")

        # Print the contents of the row
        for col in range(size):
            print(f"│ {map[row][col]} ", end="")

        # Print the right border of the row and the chess-like coordinates
        print(f"│ {row+1:2}")

        # On the last row: print the bottom border of the map
        if row != size - 1:
            print(padding+"├" + "───┼" * (size - 1) + "───┤")

    print(padding + "└" + "───┴" * (size - 1) + "───┘")
    print_coordinates(size)


# Valida input de jogada
def validate_input(player_input, valid_coords):

    # Quebra o input para verificar as coordenadas e o comando
    split_input = str(player_input).split()
    coords = split_input[0]
    command = split_input[1] if len(split_input) > 1 else None

    # Um input válido deve ter pelo menos 2 caracteres
    if len(coords) < 2:
        return False, None, None

    # O primeiro caractere deve ser uma letra, o resto deve ser um número
    letter = str(coords[0]).upper()
    number = coords[1:]

    # Verifica se a letra
    if letter not in valid_coords:
        return False, None, None

    # Verifica se o número é um inteiro válido
    try:
        number = int(number)
    except ValueError:
        return False, None, None

    # Verifica se o número está dentro do range válido
    if number < 1 or number > len(valid_coords):
        return False, None, None

    # Se o input for válido, retorna as coordenadas e o comando
    coord_values = (number - 1, valid_coords.index(letter))
    return True, coord_values, command


def get_tile(map, coords):
    return map[coords[0]][coords[1]]


# Utilização de recursão para revelar os tiles ao redor caso o tile atual seja zero
def reveal_tiles_around_zeros(player_map, game_map, coord):
    size = len(game_map)
    row, col = coord

    # Se o tile atual não for zero, não continua a recursão
    if (game_map[row][col] != 0):
        return player_map

    # Loop para revelar os tiles ao redor do tile atual
    for row_around in range(max(0, row - 1), min(size, row + 2)):
        for col_around in range(max(0, col - 1), min(size, col + 2)):
            if player_map[row_around][col_around] == empty_char:
                player_map[row_around][col_around] = game_map[row_around][col_around]
                # Chamada recursiva para revelar os tiles ao redor do tile atual
                player_map = reveal_tiles_around_zeros(
                    player_map, game_map, (row_around, col_around))

    # Ao final da recursão, retorna o mapa do jogador
    return player_map


# Game loop principal de uma partida
def game_loop(player_map, game_map):
    # Variáveis para controle do jogo
    size = len(game_map)
    valid_coords = []
    for i in range(size):
        valid_coords.append(chr(i + ord('A')))

    print_map(game_map)  # Debug, TODO: remover depois

    # Loop principal do jogo
    while True:
        # Mostra o mapa e instruções para o jogador
        print_map(player_map)
        print('Digite a coordenada para jogar, ex: =>A1\nAdicione -m para marcar uma bomba, ex: =>A1 -m\n')

        # Pega a jogada do jogador e valida
        player_input = input("Sua jogada =>")
        is_valid, coord, command = validate_input(player_input, valid_coords)

        # Se a jogada for inválida, mostra mensagem de erro e pede outra jogada
        if not is_valid:
            print_invalid_input()
            continue

        # Pega o tile dos dois mapas para comparação
        game_tile = get_tile(game_map, coord)
        player_tile = get_tile(player_map, coord)

        # Verifica se o jogador marcou um tile ou se revelou um tile vazio
        if command == "-m":
            new_tile = mark_char if player_tile == empty_char else empty_char
        else:
            new_tile = game_tile

        # Atualiza o mapa do jogador com o novo tile
        if new_tile == bomb_char:
            print("Você perdeu!")
            print_map(game_map)
            break
        elif new_tile == 0:
            # Revela os tiles ao redor do tile atual recursivamente
            player_map = reveal_tiles_around_zeros(player_map, game_map, coord)
        else:
            player_map[coord[0]][coord[1]] = new_tile


def start_game(map_size, bomb_amount):
    print_separator()
    print("Carregando ... ", end="")
    player_map = generate_map(map_size, char=empty_char)
    game_map = generate_game_map(map_size, bomb_amount)
    print("pronto!")
    print_separator()
    game_loop(player_map, game_map)


def main_menu():
    while True:
        print_separator()
        print(f"{'':^7}Sweepy")
        print_separator(size=16, char=' -')
        print(f"{'':^5}1. Jogar")
        print(f"{'':^5}2. Ver Pontuações")
        print(f"{'':^5}0. Sair")
        print_separator()

        choice = input("\nDigite sua escolha: ")

        if choice == "1":
            map_size, bomb_amount = choose_size()
            if map_size == None:
                continue
            else:
                start_game(map_size, bomb_amount)
        elif choice == "2":
            # code to view high scores goes here
            pass
        elif choice == "0":
            print("\nSaindo do jogo. Tchau!\n")
            break
        else:
            print_invalid_input()


main_menu()
