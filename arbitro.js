radio.onReceivedString(function (receivedString) {
    // Ignorar los mensajes de "FIN:" que nosotros mismos enviamos
    if (receivedString.indexOf("FIN:") != 0) {
        arbitro.procesarJugada(receivedString);
    }
})
class ArbitroTriqui {
    grupoRadio: number;
    tablero: string[];       // 9 posiciones: "", "X" u "O"
    turnoActual: string;     // "X" u "O"
    juegoTerminado: boolean;
    ganador: string;         // "X", "O", "EMPATE" o ""

    constructor(grupo: number) {
        this.grupoRadio = grupo;
        this.tablero = ["", "", "", "", "", "", "", "", ""];
        this.turnoActual = "X";  // X empieza
        this.juegoTerminado = false;
        this.ganador = "";
    }

    iniciar(): void {
        radio.setGroup(this.grupoRadio);
        basic.showIcon(IconNames.SmallDiamond);
        basic.pause(500);
        basic.showString("ARB");
        basic.clearScreen();
        // Mostrar quién empieza
        basic.showString("X");
        basic.pause(1000);
        basic.clearScreen();
    }

    // Recibe el mensaje "ID:LETRA" (ej: "4:X")
    procesarJugada(mensaje: string): void {
        if (this.juegoTerminado) return;

        let partes = mensaje.split(":");
        if (partes.length !== 2) return;

        let id = parseInt(partes[0]);
        let letra = partes[1];

        // Validaciones
        if (id < 0 || id > 8) return;
        if (letra !== "X" && letra !== "O") return;

        // ¿Ya está ocupada la casilla?
        if (this.tablero[id] !== "") return;

        // ¿Es el turno correcto?
        if (letra !== this.turnoActual) return;

        // Registrar la jugada
        this.tablero[id] = letra;

        // Feedback visual en el árbitro
        basic.showIcon(IconNames.Yes);
        basic.pause(100);

        // Verificar si hay ganador o empate
        let resultado = this.verificarResultado();

        if (resultado === "X" || resultado === "O") {
            this.declararGanador(resultado);
        } else if (resultado === "EMPATE") {
            this.declararEmpate();
        } else {
            // Cambiar turno
            this.turnoActual = (this.turnoActual === "X") ? "O" : "X";
            this.mostrarTurno();
        }
    }

    verificarResultado(): string {
        // Combinaciones ganadoras (8 líneas del triqui)
        let lineas = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columnas
            [0, 4, 8], [2, 4, 6]              // Diagonales
        ];

        for (let i = 0; i < lineas.length; i++) {
            let a = lineas[i][0];
            let b = lineas[i][1];
            let c = lineas[i][2];

            if (this.tablero[a] !== "" &&
                this.tablero[a] === this.tablero[b] &&
                this.tablero[b] === this.tablero[c]) {
                return this.tablero[a];  // "X" u "O"
            }
        }

        // ¿Hay empate? Todas las casillas llenas
        let lleno = true;
        for (let j = 0; j < 9; j++) {
            if (this.tablero[j] === "") {
                lleno = false;
                break;
            }
        }
        if (lleno) return "EMPATE";

        return "";  // Juego continúa
    }

    declararGanador(letra: string): void {
        this.juegoTerminado = true;
        this.ganador = letra;

        // Animación: mostrar letra ganadora parpadeando
        for (let k = 0; k < 5; k++) {
            basic.clearScreen();
            basic.pause(200);
            if (letra === "X") {
                basic.showLeds(`
                    # . . . #
                    . # . # .
                    . . # . .
                    . # . # .
                    # . . . #
                    `);
            } else {
                basic.showLeds(`
                    . # # # .
                    # . . . #
                    # . . . #
                    # . . . #
                    . # # # .
                    `);
            }
            basic.pause(200);
        }

        // Anunciar quién ganó
        basic.clearScreen();
        basic.showString("P" + ((letra === "X") ? "1" : "2"));
        basic.showString("WIN");
        basic.showIcon(IconNames.Happy);

        // Enviar señal de fin de juego a todos
        radio.sendString("FIN:" + letra);
    }

    declararEmpate(): void {
        this.juegoTerminado = true;
        this.ganador = "EMPATE";

        basic.clearScreen();
        basic.showString("EMPATE");
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `);

        // Enviar señal de fin de juego
        radio.sendString("FIN:EMPATE");
    }

    mostrarTurno(): void {
        // Mostrar el turno actual con un punto pequeño
        basic.clearScreen();
        if (this.turnoActual === "X") {
            led.plot(0, 0);
        } else {
            led.plot(4, 4);
        }
    }
}
let arbitro = new ArbitroTriqui(1);
arbitro.iniciar();

// Escuchar todos los mensajes de radio
radio.onReceivedString(function (receivedString) {
    // Ignorar los mensajes de "FIN:" que nosotros mismos enviamos
    if (receivedString.indexOf("FIN:") !== 0) {
        arbitro.procesarJugada(receivedString);
    }
});

