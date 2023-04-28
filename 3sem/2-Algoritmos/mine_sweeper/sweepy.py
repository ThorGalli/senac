import random
import os

title = "~ Sweepy ~"
bomb_char = "X"
empty_char = " "
mark_char = "!"
padding = "   "
highscores = []

MAP_SMALL = {"name": "Pequeno", "size": 6, "bomb_amount": 5}
MAP_MEDIUM = {"name": "Médio", "size": 9, "bomb_amount": 12}
MAP_LARGE = {"name": "Grande", "size": 12, "bomb_amount": 20}

active_maps = [MAP_SMALL, MAP_MEDIUM, MAP_LARGE]


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
    print()
    print_separator()
    print(f"{'':^7}Tamanho do campo")
    print_separator(size=16, char=' -')

    print(f"{'':^5}1. Pequeno ({MAP_SMALL['size']}x{MAP_SMALL['size']})")
    print(f"{'':^5}2. Médio ({MAP_MEDIUM['size']}x{MAP_MEDIUM['size']})")
    print(f"{'':^5}3. Grande ({MAP_LARGE['size']}x{MAP_LARGE['size']})")
    print()
    print(f"{'':^5}0. Cancelar")
    print_separator()

    choice = input("\nDigite sua escolha: ")

    if choice == "1":
        map_selected = MAP_SMALL
    elif choice == "2":
        map_selected = MAP_MEDIUM
    elif choice == "3":
        map_selected = MAP_LARGE
    elif choice == "0":
        return None
    else:
        print_invalid_input()
        # Chama a função novamente para que o usuário escolha uma opção válida
        return choose_size()

    return map_selected


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
    title_size = (size * 4 + 4 - len(title)) // 2

    # Imprime o  título e o topo do tabuleiro
    print(" " * title_size + title)
    print_coordinates(size)
    print(padding + "┌" + "───┬" * (size - 1) + "───┐")

    # Imprime as linhas do tabuleiro
    for row in range(size):
        print(f"{row + 1:2} ", end="")

        for col in range(size):
            print(f"│ {map[row][col]} ", end="")

        print(f"│ {row + 1:2}")

        if row != size - 1:
            print(padding + "├" + "───┼" * (size - 1) + "───┤")

    # Imprime a base do tabuleiro
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
        return None, None

    # O primeiro caractere deve ser uma letra, o resto deve ser um número
    letter = str(coords[0]).upper()
    number = coords[1:]

    # Verifica se o resto do input é um número inteiro
    try:
        number = int(number)
    except ValueError:
        return None, None

    # Verifica se o número está dentro do intervalo válido
    if number < 1 or number > len(valid_coords):
        return None, None
    # Verifica se a letra está dentro do intervalo válido
    if letter not in valid_coords:
        return None, None

    # Se o input for válido, retorna as coordenadas e o comando
    coord_values = (number - 1, valid_coords.index(letter))
    return coord_values, command

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


def count_revealed(_map):
    count = 0
    size = len(_map)
    for row in range(size):
        for col in range(size):
            tile = _map[row][col]
            if tile != empty_char and tile != mark_char:
                count += 1
    return count


def count_marked(_map):
    count = 0
    size = len(_map)
    for row in range(size):
        for col in range(size):
            tile = _map[row][col]
            if tile == mark_char:
                count += 1
    return count


def game_over(game_map):
    print("  ____     ____     ____    __  __   _ ")
    print(" |  _ \\   / __ \\   / __ \\  |  \\/  | | |")
    print(" | |_) | | |  | | | |  | | | \\  / | | |")
    print(" |  _ <  | |  | | | |  | | | |\\/| | | |")
    print(" | |_) | | |__| | | |__| | | |  | | |_|")
    print(" |____/   \\____/   \\____/  |_|  |_| (_)")
    print("\nVocê perdeu! Cheque o mapa revelado!\n")
    print_map(game_map)
    input("\nPressione [Enter] para voltar ao menu.\n")


def game_win(size):
    print(" __          __  _____   _   _   _ ")
    print(" \\ \\        / / |_   _| | \\ | | | |")
    print("  \\ \\  /\\  / /    | |   |  \\| | | |")
    print("   \\ \\/  \\/ /     | |   | . ` | | |")
    print("    \\  /\\  /     _| |_  | |\\  | |_|")
    print("     \\/  \\/     |_____| |_| \\_| (_)")
    print("\nVocê venceu!\n")
    player_name = input("Insira seu nome para registrar sua vitória: ")
    print("TODO: Mostrar colocação")
    input("\nPressione [Enter] para voltar ao menu.\n")


# Game loop principal de uma partida
def game_loop(player_map, game_map, bomb_amount):
    # Variáveis para controle do jogo
    size = len(game_map)
    tile_amount = size*size
    safe_amount = tile_amount - bomb_amount
    valid_coords = []
    for i in range(size):
        valid_coords.append(chr(i + ord('A')))

    # Loop principal do jogo
    while True:
        # Mostra o mapa e instruções para o jogador
        revealed_amount = count_revealed(player_map)
        marked_amount = count_marked(player_map)
        if revealed_amount == safe_amount:
            game_win(size)
            break

        print()
        print_map(player_map)
        print(f'Revelados: {revealed_amount}/{safe_amount}', end=" | ")
        print(f'Marcados: {marked_amount}',  end=" | ")
        print(f'Bombas: {bomb_amount}\n')
        print('Digite a coordenada para jogar, ex: =>A1')
        print('Adicione -m para marcar uma bomba, ex: =>A1 -m')
        print('E para desistir, digite 0\n')

        # Pega a jogada do jogador e valida
        player_input = input("Sua jogada =>")
        if player_input == "0":
            game_over(game_map)
            break
        coord, command = validate_input(player_input, valid_coords)

        # Se a jogada for inválida, mostra mensagem de erro e pede outra jogada
        if coord == None:
            print_invalid_input()
            continue

        row, col = coord
        # Pega o tile dos dois mapas para comparação
        game_tile = game_map[row][col]
        player_tile = player_map[row][col]

        # Impede jogadas repetidas
        if player_tile == game_tile:
            print_invalid_input()
            continue

        # Verifica se o jogador marcou um tile ou se clicou em um tile
        if command != None and "-m" in command:
            new_tile = mark_char if player_tile == empty_char else empty_char
        else:
            new_tile = game_tile

        # Computa a jogada
        if new_tile == bomb_char:
            # Encerra o jogo
            game_over(game_map)
            break
        elif new_tile == 0:
            # Revela os tiles ao redor do tile atual recursivamente
            player_map = reveal_tiles_around_zeros(player_map, game_map, coord)
        else:
            # Apenas revela o tile escolhido
            player_map[row][col] = new_tile


def start_game(map_selected):
    print_separator()
    print("Carregando ... ", end="")
    size = map_selected['size']
    bomb_amount = map_selected['bomb_amount']
    player_map = generate_map(size, char=empty_char)
    game_map = generate_game_map(size, bomb_amount)
    print("pronto!")
    print_separator()
    game_loop(player_map, game_map, bomb_amount)


def main_menu():
    while True:
        print()
        print_separator()
        print(f"{'':^7}Sweepy")
        print_separator(size=16, char=' -')
        print(f"{'':^5}1. Jogar")
        print(f"{'':^5}2. Ver Pontuações")
        print()
        print(f"{'':^5}0. Sair")
        print_separator()

        choice = input("\nDigite sua escolha: ")

        if choice == "1":
            map_selected = choose_size()
            if map_selected == None:
                continue
            else:
                start_game(map_selected)
        elif choice == "2":
            # code to view high scores goes here
            pass
        elif choice == "0":
            print("\nSaindo do jogo. Tchau!\n")
            break
        else:
            print_invalid_input()


main_menu()
