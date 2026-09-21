/**
 * Conversión de unidades de yardas, pies, pulgadas y metros.
 * @method conventirUnidades
 * @param {string} id - Id del elemento input en el html
 * @param {number} valor - Valor a convertir
 * @return {void}
 */

function conventirUnidades(id, valor) {
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

