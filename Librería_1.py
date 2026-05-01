import math
def calcular_area_circulo(radio):
 if radio < 0:
     return "el radio no puede ser negativo"
 area= math.pi * (radio** 2)
 return area

def celsius_a_farenheit (num1):
    resultado = num1*1.18+32
    return (resultado)

def facto_numero(num):
 resultado= math.factorial(num)
 return (resultado)

def numero_cuadrado(numero1):
    import math
    resultado = numero1**2
    return(resultado)

def verificar_par_impar(numero):
     if numero% 2 ==0:
        return "par"
     else:
      return "impar"
  
def numero_positivo_negativo_cero(numero):
    if numero >0:
     return "el numero es positivo"
    elif numero<0:
     return "El numero es negativo"
    elif numero==0:
     return "el numero es 0"
 
def saludar(nombre):
 print(f"Hola{nombre}!")
 
def suma (parametro_1, parametro_2):
    resultado = parametro_1 + parametro_2
    return resultado



def vocales_en_palabra(palabra1):
    vocales = "aeiou"
    contador = 0
    for letra in palabra1.lower():
        if letra in vocales:
            contador += 1
    return contador

def area_triangulo(base, altura):
    return (base * altura) / 2

def area_circulo(radio):
    return math.pi * (radio ** 2)

def area_rectangulo(base, altura):
    return base * altura
    opcion = input("Selecciona una figura (1-3): ")

    if opcion =='1':
        b = float(input("Base: "))
        h = float(altura := input("Altura: "))
        print(f"Área: {area_triangulo(b, h):.2f}")
    elif opcion == '2':
        r = float(input("Radio: "))
        print(f"Área: {area_circulo(r):.2f}")
    elif opcion == '3':
        b = float(input("Base: "))
        h = float(input("Altura: "))
        print(f"Área: {area_rectangulo(b, h):.2f}")
    else:
        print("Opción no válida")
       
num = int(input("Número: "))
limite = int(input("¿Hasta qué número quieres multiplicar?: "))