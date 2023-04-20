import math

original_data = "55,0 55,5 56,3 57,1 57,7 57,8 58,0 58,4 59,2 60,0 60,5 61,0 61,3 62,0 62,7 63,1 63,7 63,8 63,9 64,0 64,5 64,7 65,0 65,0 65,2 65,5 66,0 66,3 66,8 66,9"
split_data = original_data.split(' ')
number_data = []

for each in split_data:
    number = each.replace(',', '.')
    number_data.append(float(number))

number_data.sort()

n = len(number_data)

k = math.sqrt(n)

print(f"data: {number_data}")
print(f"n = {n}")
print(f"k = {k}")
