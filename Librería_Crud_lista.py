def crear (base_datos):
    valor = input("ingrese su nombre")
    base_datos.append(valor)
    return base_datos
def leer (base_datos):
    print (base_datos)
    for componente_actual in base_datos:
        print (componente_actual)
def actualizar (base_datos):
    try:
        valor=int(input("Que posicion va eliminar?"))
        base_datos[valor]=input("ingrese el nuevo valor")
        
    except:
        print ("Error con la base de datos")
    return (base_datos)

def eliminar (base_datos):
    valor=int (input("Que posición desea eliminar? Reviselo con la función leer"))
    base_datos.remove(base_datos[valor])   
    return eliminar  
def menu (lista):
    return "menu"