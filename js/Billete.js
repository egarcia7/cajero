class Billete {
	constructor(valor, cantidad) {
		this.imagen = new Image();
		this.valor = valor;
		this.cantidad = cantidad
		this.imagen.src = imagenes[this.valor];
	}
}
