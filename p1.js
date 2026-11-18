class JugadorTriqui {
    idJugador: string;
    letra: string;
    posicionActual: number;
    grupoRadio: number;


    constructor(id: string, letra: string, grupo: number) {
        this.idJugador = id;
        this.letra = letra;
        this.posicionActual = 4; // Empezar en el centro
        this.grupoRadio = grupo;
    }

    iniciar(): void {
        radio.setGroup(this.grupoRadio);
        basic.showString(this.idJugador);
        this.mostrarCursor();
    }

    mostrarCursor(): void {
        basic.clearScreen();
        // Convertir posición (0-8) a coordenadas X,Y (0-2)
        let x = this.posicionActual % 3;
        let y = Math.floor(this.posicionActual / 3);
        led.plot(x, y);
    }

    moverCursor(direccion: string): void {
        let x = this.posicionActual % 3;
        let y = Math.floor(this.posicionActual / 3);

        if (direccion === "izquierda" && x > 0) x--;
        if (direccion === "derecha" && x < 2) x++;
        if (direccion === "arriba" && y > 0) y--;
        if (direccion === "abajo" && y < 2) y++;

        this.posicionActual = (y * 3) + x;
        this.mostrarCursor();
    }

    enviarJugada(): void {
        // Formato del mensaje: "ID_TABLERO:LETRA"
        // Ej: "0:X" (El tablero 0 debe mostrar X)
        let mensaje = this.posicionActual.toString() + ":" + this.letra;
        radio.sendString(mensaje);

        // Feedback visual
        basic.showIcon(IconNames.Yes);
        basic.pause(200);
        this.mostrarCursor();
    }

    bloquearPorFinDeJuego(): void {
        basic.clearScreen();
        basic.showIcon(IconNames.No);
        basic.pause(3000);
        basic.showString("FIN");
        basic.pause(2000);
        control.reset();  // Reiniciar al terminar
    }

}

// Instanciar al Jugador 1
let p1 = new JugadorTriqui("P1", "X", 1);

// Configuración inicial
p1.iniciar();

// Control del Joystick (Simulado con botones A/B y Pines analógicos)
// Nota: Si usas un joystick físico, conecta X a P0 e Y a P1
basic.forever(() => {
    let valX = pins.analogReadPin(AnalogPin.P0);
    let valY = pins.analogReadPin(AnalogPin.P1);

    // Zona muerta para evitar movimientos involuntarios
    if (valX > 700) {
        p1.moverCursor("izquierda");
        basic.pause(200);
    } else if (valX < 300) {
        p1.moverCursor("derecha");
        basic.pause(200);
    } else if (valY > 700) {
        p1.moverCursor("arriba");
        basic.pause(200);
    } else if (valY < 300) {
        p1.moverCursor("abajo");
        basic.pause(200);
    }
});

// Botón del Joystick para confirmar (conectado a P2)
input.onPinPressed(TouchPin.P2, () => {
    p1.enviarJugada();
});

// Fallback con Botón B para confirmar
input.onButtonPressed(Button.B, () => {
    p1.enviarJugada();
});
