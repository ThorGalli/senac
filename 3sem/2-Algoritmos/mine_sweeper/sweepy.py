import random

bomb_char = "X"
empty_char = " "
padding = "   "

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
    bomb_map = generate_map(size, char = 0)
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
    game_map = generate_map(size, char = 0)

    for row in range(size):
        for col in range(size):
            if bomb_map[row][col] == bomb_char:
                game_map[row][col] = bomb_char
            else:
                bombs_around = 0
                for r in range(max(0, row - 1), min(size, row + 2)):
                    for c in range(max(0, col - 1), min(size, col + 2)):
                        if bomb_map[r][c] == bomb_char:
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

    

def game_loop(player_map, game_map):
    print_map(player_map)
    print_map(game_map)


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
        size, bombs = choose_size()
        player_map = generate_map(size, char = empty_char)
        game_map = generate_game_map(size, bombs)
        print("\nVamos começar!\n")
        game_loop(player_map, game_map)
    elif choice == "2":
        # code to view high scores goes here
        pass
    elif choice == "0":
        print("\nSaindo do jogo. Tchau!\n")
        break
    else:
        print_invalid_input()
