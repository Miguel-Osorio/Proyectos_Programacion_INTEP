import Librería_Crud_lista as labestia
def main():
     base_datos = ["Hockerson","Miguel","Farfan"]
     variable_ciclo = True
     while variable_ciclo:
         print ("opción 1: crear")
         print ("opción 2: leer")
         print ("opción 3: actualizar")
         print ("opción 4: eliminar")
         print ("opción 5: salir")
         opcion = int(input("ingrese una opción"))
         if opcion == 1:
             labestia.crear(base_datos) 
         elif opcion == 2:
             labestia.leer(base_datos)
         elif opcion == 3:
             labestia.actualizar(base_datos)
         elif opcion == 4:
             labestia.eliminar(base_datos)
         elif opcion == 5:
             variable_ciclo = False
         else:
             print ("opción no valida")
         
main()