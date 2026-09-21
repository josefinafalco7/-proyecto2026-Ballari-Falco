/**
 * Conversión de unidades de yardas, pies, pulgadas y metros.
 * @method conventirUnidades
 * @param {string} id - Id del elemento input en el html
 * @param {number} valor - Valor a convertir
 * @return {void}
 */

function conventirUnidades(id, valor) {
    let metro, pulgada, pie, yarda;
if(isNaN(valor)){
    alert("Se ingresó un valor incorrecto: " + id);
    document.getElementById("pulgada").value = valor * "";
        document.getElementById("pie").value = valor * "";
        document.getElementById("yarda").value = valor * "";
    }
    else if(id == "metro") {
        document.getElementById("pulgada").value = valor * 39.3701;
        document.getElementById("pie").value = valor * 3.28084;
        document.getElementById("yarda").value = valor * 1.09361;
    }
     else if(id == "pie") {
        document.getElementById("pulgada").value = valor * 39.3701;
        document.getElementById("metro").value = valor * 3.28084;
        document.getElementById("yarda").value = valor * 1.09361;
    }
 else if(id == "yarda") {
        document.getElementById("pulgada").value = valor * 39.3701;
        document.getElementById("pie").value = valor * 3.28084;
        document.getElementById("metro").value = valor * 1.09361;
    }
}
/**
 * Conversión de unidades de grados a radianes
 * @method conventirGR
 * @param {string} id - Id del elemento input en el html
 */

    function convertirGR(id) {
        let grad, rad;
        if(id == "grados") {
            grad = document.getElementById("grados").value;
            rad = grad * Math.PI / 180;
        } else if(id == "radianes") {
            rad = document.getElementById("radianes").value;
            grad = rad * 180 / Math.PI;
        }
        document.getElementById("grados").value = grad;
        document.getElementById("radianes").value = rad;
    }

function mostrar_ocultar(valorMO) {
    if(valorMO == "val_mostrar"){
        document.getElementById("divMO").style.display = "block";
    } else if(valorMO == "val_ocultar"){
        document.getElementById("divMO").style.display = "none";
    }

}

let mostrarModal = () => {
    document.getElementById("modal").style.display = "block";
}

let cerrarModal = () => {
    document.getElementById("modal").style.display = "none";
}

function calcularSuma() {
    var num1, num2;
    num1 = Number(document.getElementById("nums1").value);
    num2 = Number(document.getElementById("nums2").value);
    document.getElementById("totalS").value = num1 + num2;
}

function calcularResta() {
    var num1, num2;
    num1 = Number(document.getElementById("numr1").value);
    num2 = Number(document.getElementById("numr2").value);
    document.getElementById("totalR").value = num1 - num2;
}

function calcularMultiplicacion() {
    var num1, num2;
    num1 = Number(document.getElementById("numm1").value);
    num2 = Number(document.getElementById("numm2").value);
    document.getElementById("totalM").value = num1 * num2;
}

function calcularDivision() {
    var num1, num2;
    num1 = Number(document.getElementById("numd1").value);
    num2 = Number(document.getElementById("numd2").value);
    document.getElementById("totalD").value = num1 / num2;
}