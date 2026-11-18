radio.onReceivedString(function (receivedString) {
    tablero.recibirJugada(receivedString);
})
// ==========================================
// CONFIGURACIÓN: CAMBIAR EL ID POR CADA TABLERO (0 al 8)
// ==========================================
// <--- CAMBIAR ESTE NÚMERO EN CADA MICRO:BIT DEL 0 AL 8
let ID_TABLERO = 0
class TableroTriqui {
    miID: number;
    grupoRadio: number;
    ocupado: boolean;

    constructor(id: number, grupo: number) {
        this.miID = id;
        this.grupoRadio = grupo;
        this.ocupado = false;
    }

    iniciar(): void {
        radio.setGroup(this.grupoRadio);
        // Mostrar el ID brevemente para identificar el tablero al configurarlo
        basic.showNumber(this.miID);
        basic.clearScreen();
    }

    recibirJugada(mensaje: string): void {
        // El mensaje llega como "ID:LETRA" (ej: "4:X")
        let partes = mensaje.split(":");
        if (partes.length === 2) {
            let idDestino = parseInt(partes[0]);
            let letra = partes[1];

            // Verificar si el mensaje es para mí y si no estoy ocupado
            if (idDestino === this.miID && !this.ocupado) {
                this.mostrarLetra(letra);
                this.ocupado = true;
            }
        }
    }

    mostrarLetra(letra: string): void {
        basic.clearScreen();
        if (letra === "X") {
            // Dibujar una X en la matriz de LEDs
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `);
        } else if (letra === "O") {
            // Dibujar una O (círculo) en la matriz de LEDs
            basic.showLeds(`
                . # # # .
                # . . . #
                # . . . #
                # . . . #
                . # # # .
                `);
        }
    }
}
let tablero = new TableroTriqui(ID_TABLERO, 1);
tablero.iniciar();

radio.onReceivedString(function (receivedString) {
    // Primero verificar si es señal de fin
    if (receivedString.indexOf("FIN:") === 0) {
        // Mostrar animación de fin
        for (let i = 0; i < 3; i++) {
            basic.showIcon(IconNames.Yes);
            basic.pause(200);
            basic.clearScreen();
            basic.pause(200);
        }
        return;
    }

    // Si no es fin, procesar jugada normal
    tablero.recibirJugada(receivedString);
});

