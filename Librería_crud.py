def crear (arreglo):
    valor = input("ingrese su nombre")
    arreglo.append(valor)
    return arreglo
def leer (arreglo):
    print (arreglo)
    for componente_actual in arreglo:
        print (componente_actual)
def actualizar (arreglo):
    valor=input("Va a ingresar un nuevo valor? Cuál será? Trás agregarlo, compruebe con la función leer")
    arreglo.append(valor)
    return (actualizar)
def eliminar (arreglo):
    valor=int (input("Que posición desea eliminar? Reviselo con la función leer"))
    arreglo.remove(arreglo[valor])   
    return eliminar  
def menu (arreglo):
    return "menu"