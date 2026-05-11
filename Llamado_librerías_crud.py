import Librería_crud as campillo
def main():
     base_datos = ["Miguel", "Andres", "Brayan", "Lasprilla","Juan"]
     variable_ciclo = True
     while variable_ciclo:
         print ("opción 1: crear")
         print ("opción 2: leer")
         print ("opción 3: actualizar")
         print ("opción 4: eliminar")
         print ("opción 5: salir")
         opcion = int(input("ingrese una opción"))
         if opcion == 1:
             campillo.crear(base_datos) 
         elif opcion == 2:
             campillo.leer(base_datos)
         elif opcion == 3:
             campillo.actualizar(base_datos)
         elif opcion == 4:
             campillo.eliminar(base_datos)
         elif opcion == 5:
             variable_ciclo = False
         else:
             print ("opción no valida")
         
main()