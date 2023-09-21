let imagenes = [];
imagenes["1"] = "./assets/img/1.png";
imagenes["5"] = "./assets/img/5.png";
imagenes["10"] = "./assets/img/10.png";
imagenes["20"] = "./assets/img/20.png";
imagenes["50"] = "./assets/img/50.png";
imagenes["100"] = "./assets/img/100.png";
imagenes["500"] = "./assets/img/500.png";

let caja = [];
caja.push( new Billete(500, 5));
caja.push( new Billete(100, 10));
caja.push( new Billete(50, 15));
caja.push( new Billete(20, 20));
caja.push( new Billete(10, 25));
caja.push( new Billete(5, 30));

contar();

let dinero = 0;
let div = 0;
let papeles = 0;
let entregado = [];

const resultado = document.getElementById("resultado");
const boton = document.getElementById("extraer");
const texto = document.getElementById("dinero");

boton.addEventListener("click", entregarDinero);

let obj;
let array = [];

function entregarDinero() {
	dinero = parseInt(texto.value);
	if (isNaN(dinero)) {
		mensajeError();
	} else {
		operacionDinero(dinero);
	}
}

function operacionDinero(dinero) {
	if (total >= dinero) {
		for (let billete of caja) {
			if (dinero > 0) {
				div = Math.floor(dinero / billete.valor);
				if (div > billete.cantidad) {
					papeles = billete.cantidad;
				} else {
					papeles = div;
				}
				billete.cantidad = billete.cantidad - papeles;
				for (let i = 0; i < papeles; i++) {
					entregado.push(new Billete(billete.valor, 1));
				}
				dinero = dinero - (billete.valor * papeles);
			}
		}
		if (dinero == 0) {
			resultado.innerHTML += "Se ha retirado: <br />";
			for(let e of entregado) {
				resultado.innerHTML += "<img src=" + e.imagen.src + " />";
		
				obj = e.imagen.src;
				array.push(obj);
			}

			entregaDinero(array);
			
			resultado.innerHTML += "<hr />";
			contar();
		} else {
			mensajeSinFondos();
		}
	} else {
		mensajeSinCupo();
	}
}

function contar() {
	total = 0;
	for (let tot of caja) {
		total = total + (tot.valor * tot.cantidad);
	}
}

const mensajeError = () => {
    Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Debes elegir seleccionar una cantidad de dinero!',
		confirmButtonColor: '#d33',
		confirmButtonText: 'Salir',
		backdrop: 'rgba(255, 5, 5, 0.45)',
		padding: '2rem'
	}).then(() => {
		location.reload();
	}); 
}

const mensajeSinFondos = () => {
    Swal.fire({
        title: 'Transacción rechazada',
		text: "No tengo los billetes para esa suma, intenta otro valor",
		icon: 'warning',
        confirmButtonColor: 'orange',
		confirmButtonText: 'Salir',
		imageUrl: './assets/img/1.png',
        backdrop: 'rgba(244, 220, 56, .45)',
        padding: '2rem'
    });
}

const mensajeSinCupo = () => {
    Swal.fire({
        title: 'Transacción rechazada',
		text: "Soy un cajero pobre y no tengo dinero",
		icon: 'warning',
        confirmButtonColor: 'orange',
		confirmButtonText: 'Salir',
        backdrop: 'rgba(244, 220, 56, .45)',
        padding: '2rem'
    });
}

const entregaDinero = (params) => {
	let array = params;
	console.log(array);
	
	Swal.fire({
		title: 'Transacción en proceso',
		text: "Deseas continuar con la transacción",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Si, continuar!',
		confirmButtonColor: '#28a745',
		cancelButtonColor: '#dc3545',
		cancelButtonText: 'No, cancelar!',
		reverseButtons: true,
		backdrop: 'rgba(244, 220, 56, .45)',
        padding: '2rem'
	}).then((result) => {
		if (result.isConfirmed) {
			for (let i = 0; i < array.length; i++) {
				const element = array[i];
				console.log(element);
								
				Swal.fire({
					icon: 'success',
					title: 'Exitoso...',
					text: 'Transacción exitosa!',
					confirmButtonColor: '#28a745',
					confirmButtonText: 'Continuar',				
					html: 
					`
						<img src=${element} /> `+
						`<img src=${element} />
					`,				
					backdrop: 'rgba(43, 165, 137, .45)',
					padding: '2rem'
				}).then(() => {
					location.reload();
				});
			}			
		} else if (
		  /* Read more about handling dismissals below */
		  result.dismiss === Swal.DismissReason.cancel
		) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Cancelaste la transacción!',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Salir',
				backdrop: 'rgba(255, 5, 5, 0.45)',
        		padding: '2rem'
			}).then(() => {
				location.reload();
			});
		}
	});
}
