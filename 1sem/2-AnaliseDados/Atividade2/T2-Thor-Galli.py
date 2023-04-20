from scipy.stats import norm
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np


dataset1 = {
    'X': [6, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,  26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,   47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
    'Y': [6, -1, 0, 0, 5, 8, 5, 12, 9, 16, 10, 11, 11, 14, 16, 22, 13, 24, 16, 19, 18, 23, 25, 26, 22, 25, 27, 28, 29, 27, 29, 38, 39, 40, 40, 32, 43, 44, 44, 41, 42, 46, 45, 40, 43, 42, 44, 47, 54, 54, 51, 58, 49, 54, 56, 60, 63, 63, 64, 59, 62, 59, 67, 64, 64, 64, 65, 74, 74, 72, 75, 70, 79, 75, 74, 77, 74, 80, 82, 84, 81, 80, 82, 85, 87, 83, 86, 90, 93, 87, 93, 91, 98, 94, 95, 92, 99, 103, 103, 100]
}
x1 = np.array(dataset1['X'])
y1 = np.array(dataset1['Y'])


# --- QUESTAO 1 ---
print("--- QUESTAO 1 ---")
plt.scatter(x1, y1)
plt.title('QUESTAO 1, a) Scatterplot X x Y]')
plt.xlabel("X")
plt.ylabel("Y")
plt.show()
df1 = pd.DataFrame(dataset1, columns=["X", "Y"])
variancia = df1.var().values[0]
covariancia = df1.cov().values[0]
corr = np.corrcoef(x1, y1)

print(" a) [ANALISAR PLOT]")
print(" b) Linear")
print(" c) Variancia:", variancia)
print(" d) Covariancia:", covariancia)
print(" e) Correlacao:", corr)
print("")

# --- QUESTAO 2 ---
print("--- QUESTAO 2 ---")
print(" Verdadeiro")
print("")

# --- QUESTAO 3 ---
print("--- QUESTAO 3 ---")
dataset3 = [1.305, -0.142, 0.559, -1.165, 0.15, 0.848, 0.265, 0.937, -1.406, 0.23, 1.418, -0.799, 0.724, 0.461, 1.113, 0.134, 1.222, 0.076, -1.518, -2.419, 0.132, 0.915, 0.732, -1.333, 2.12, -0.607, -0.341, 0.072, -1.19, -0.82, 2.363, 1.035, -0.58, 0.1, 0.192, -0.37, -0.779, 2.509, 1.372, -0.095, -2.766, -0.682, 1.822, 0.461, -0.066, -0.668, -0.301, 0.51, 2.913, -1.467,
            1.233, -0.958, -0.753, -0.898, 2.806, 0.328, -0.33, -0.606, -2.285, 0.953, 0.829, -0.061, -1.593, 1.289, 0.894, 0.639, -0.533, -0.05, -0.528, 0.651, -0.114, -0.242, 1.352, 0.926, 1.209, -0.141, -0.599, -2.058, 1.836, -0.658, -1.499, -0.583, -0.456, 0.585, 1.961, -1.474, 0.137, 0.116, -0.044, -1.829, -0.186, 0.844, 0.839, -0.213, 0.073, 2.732, 0.999, 0.892, 0.556, 0.445]
df = pd.DataFrame(dataset3, columns=["Value"])
mean, std = norm.fit(dataset3)
plt.hist(dataset3, bins=25, density=True, alpha=0.6, color='b')
xmin, xmax = plt.xlim()
x = np.linspace(xmin, xmax, 100)
p = norm.pdf(x, mean, std)
plt.plot(x, p, 'k', linewidth=2)
plt.title("QUESTAO 3 - Dist Normal")
plt.show()
print(" [ANALISAR PLOT]")
print("")

# --- QUESTAO 4 ---
print("--- QUESTAO 4 ---")
dataset4 = {
    'consumo': [75, 100, 20, 75, 60, 75, 10, 10, 20, 200, 150, 120, 100, 120, 150, 120, 120, 100,
                75, 120, 20, 120, 10, 60, 20, 60, 100, 10, 200, 60, 60, 60, 100, 200, 10, 200, 100,
                60, 60, 200, 200, 75, 60, 150, 100, 100, 200, 120, 20, 100],
    'iluminacao': [1050, 1700, 240, 900, 720, 975, 140, 130, 200, 3800, 2250, 2280, 1600, 1680,
                   2250, 2160, 1800, 1600, 975, 2280, 220, 1680, 110, 840, 260, 780, 1500, 110,
                   3600, 720, 780, 900, 1300, 3200, 130, 4000, 1300, 900, 660, 3800, 4200, 825,
                   840, 2850, 1600, 1300, 3400, 2400, 240, 1400]
}
dados4 = pd.DataFrame(dataset4)
dados4.columns = ['Consumo', 'Iluminacao']
g4 = sns.lmplot(x='Consumo', y='Iluminacao', data=dados4)
plt.title("QUESTAO 4")
plt.xlabel("Cosumo")
plt.ylabel("Ilumianção")
plt.show()
print(" [ANALISAR PLOT]")
print("")

# --- QUESTAO 5 ---
print("--- QUESTAO 5 ---")
print(" c) 4,2,6,3,7,1,5")
