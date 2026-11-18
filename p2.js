input.onPinPressed(TouchPin.P2, function () {
    p2.enviarJugada();
})
input.onButtonPressed(Button.B, function () {
    p2.enviarJugada();
})
let valY = 0
let valX = 0
class JugadorTriqui {
    idJugador: string;
    letra: string;
    posicionActual: number;
    grupoRadio: number;

    constructor(id: string, letra: string, grupo: number) {
        this.idJugador = id;
        this.letra = letra;
        this.posicionActual = 4;
        this.grupoRadio = grupo;
    }

    iniciar(): void {
        radio.setGroup(this.grupoRadio);
        basic.showString(this.idJugador);
        this.mostrarCursor();
    }

    mostrarCursor(): void {
        basic.clearScreen();
        let x = this.posicionActual % 3;
        let y = Math.floor(this.posicionActual / 3);
        led.plot(x, y);
    }

    moverCursor(direccion: string): void {
        let x2 = this.posicionActual % 3;
        let y2 = Math.floor(this.posicionActual / 3);

        if (direccion === "izquierda" && x2 > 0) x2--;
        if (direccion === "derecha" && x2 < 2) x2++;
        if (direccion === "arriba" && y2 > 0) y2--;
        if (direccion === "abajo" && y2 < 2) y2++;

        this.posicionActual = (y2 * 3) + x2;
        this.mostrarCursor();
    }

    enviarJugada(): void {
        let mensaje = this.posicionActual.toString() + ":" + this.letra;
        radio.sendString(mensaje);
        basic.showIcon(IconNames.Yes);
        basic.pause(200);
        this.mostrarCursor();
    }
}
let p2 = new JugadorTriqui("P2", "O", 1);
p2.iniciar();
basic.forever(function () {
    valX = pins.analogReadPin(AnalogPin.P0)
    valY = pins.analogReadPin(AnalogPin.P1)
    if (valX > 700) {
        p2.moverCursor("izquierda");
        basic.pause(200)
    } else if (valX < 300) {
        p2.moverCursor("derecha");
        basic.pause(200)
    } else if (valY > 700) {
        p2.moverCursor("arriba");
        basic.pause(200)
    } else if (valY < 300) {
        p2.moverCursor("abajo");
        basic.pause(200)
    }
})

radio.onReceivedString(function (receivedString) {
    if (receivedString.indexOf("FIN:") === 0) {
        basic.clearScreen();
        basic.showIcon(IconNames.No);
        basic.pause(3000);
        basic.showString("FIN");
        basic.pause(2000);
        control.reset();
    }
});

