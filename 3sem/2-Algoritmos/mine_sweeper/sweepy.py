import random
import os

bomb_char = "X"
empty_char = " "
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


def print_separator(size=32):
    print("=" * size)


def choose_size():
    print_separator()
    print(f"{'':^7}Tamanho do campo")
    print_separator()
    print(f"{'':^5}1. Pequeno (8x8)")
    print(f"{'':^5}2. Médio (12x12)")
    print(f"{'':^5}3. Grande (16x16)")
    print_separator()

    choice = input("\nDigite sua escolha: ")

    if choice == "1":
        size, bombs = 8, 10
    elif choice == "2":
        size, bombs = 12, 25
    elif choice == "3":
        size, bombs = 16, 50
    else:
        print_invalid_input()
        return choose_size()

    return size, bombs


def generate_map(size, char):
    map = []
    for row in range(size):
        new_row = []
        for col in range(size):
            new_row.append(char)
        map.append(new_row)
    return map


def generate_bomb_map(size, bombs):
    bomb_map = generate_map(size, char=0)
    bombs_placed = 0
    while bombs_placed < bombs:
        row = random.randint(0, size - 1)
        col = random.randint(0, size - 1)
        if bomb_map[row][col] != bomb_char:
            bomb_map[row][col] = bomb_char
            bombs_placed += 1

    return bomb_map


def generate_game_map(size, bombs):
    bomb_map = generate_bomb_map(size, bombs)
    game_map = generate_map(size, char=0)

    for row in range(size):
        for col in range(size):
            if bomb_map[row][col] == bomb_char:
                game_map[row][col] = bomb_char
            else:
                bombs_around = 0
                for row_around in range(max(0, row - 1), min(size, row + 2)):
                    for col_around in range(max(0, col - 1), min(size, col + 2)):
                        if bomb_map[row_around][col_around] == bomb_char:
                            bombs_around += 1
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
    title_size = (size * 4 + 4 - len("Sweepy")) // 2

    # On the first row: print the game title and the coordinates
    print(" " * title_size + "Sweepy")
    print_coordinates(size)
    print(padding+"┌" + "───┬" * (size - 1) + "───┐")

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


def validate_input(player_input, valid_coords):
    split_input = str(player_input).split()
    coords_input = split_input[0]
    command = player_input[1] if len(coords_input) > 1 else None

    if len(coords_input) < 2:
        return False, None, None

    letter = coords_input[0]
    number = coords_input[1:]

    try:
        letter = str(letter).upper()
        if str(letter).upper() not in valid_coords:
            return False, None, None
        number = int(number)
        if number < 1 or number > len(valid_coords):
            return False, None, None
    except:
        return False, None, None

    coord_values = (number-1, valid_coords.index(letter))
    return True, coord_values, command


def get_tile(map, coords):
    return map[coords[0]][coords[1]]


def game_loop(player_map, game_map):
    playing = True
    size = len(game_map)
    valid_coords = []
    for i in range(size):
        valid_coords.append(chr(i + ord('A')))

    print_map(game_map)
    while playing:
        print_map(player_map)
        player_input = input(">")
        is_valid, coord_values, command = validate_input(
            player_input, valid_coords)
        if is_valid:
            game_tile = get_tile(game_map, coord_values)
            player_tile = get_tile(player_map, coord_values)

            new_tile = "." if command == "-m" else game_tile
            player_map[coord_values[0]][coord_values[1]] = new_tile
        else:
            print_invalid_input()


def start_game():
    size, bombs = choose_size()
    print_separator()
    print("Carregando ... ", end="")
    player_map = generate_map(size, char=empty_char)
    game_map = generate_game_map(size, bombs)
    print("pronto!")
    print_separator()
    game_loop(player_map, game_map)


while True:
    print_separator()
    print(f"{'':^7}Sweepy")
    print_separator()
    print(f"{'':^5}1. Jogar")
    print(f"{'':^5}2. Ver Pontuações")
    print(f"{'':^5}0. Sair")
    print_separator()

    choice = input("\nDigite sua escolha: ")

    if choice == "1":
        start_game()
    elif choice == "2":
        # code to view high scores goes here
        pass
    elif choice == "0":
        print("\nSaindo do jogo. Tchau!\n")
        break
    else:
        print_invalid_input()
