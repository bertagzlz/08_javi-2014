// JavaScript Document
          // Aumentar y disminuir letra
					// requiere en el documento un <class="texto-normal">....
var tamanoLetrapordefecto = 130;
var p = tamanoLetrapordefecto;
var tamanoLetraminimo = 110;
var tamanoLetramaximo = 180;
var identidadLetra;

function aumentaLetra() {
    if (p < tamanoLetramaximo) {
    p += 5;
    //identidadLetra = document.getElementById('tamano');
		
		identidadLetra=$(".texto-normal").css('font',String(p)+'%/1.25em garamond, georgia, "times new roman", serif');
    }
}

function disminuyeLetra() {
    if (p > tamanoLetraminimo) {
    p -= 5;
    identidadLetra=$(".texto-normal").css('font',String(p)+'%/1.25em garamond, georgia, "times new roman", serif');
    }
}

// FIN Aumentar y disminuir letra

