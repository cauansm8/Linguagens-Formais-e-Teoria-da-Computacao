function testarRegex(){
    const expressao = document.getElementById("expressao").value;
    const texto1 = document.getElementById("texto1").value;
    const texto2 = document.getElementById("texto2").value;
    const inputtexto1 = document.getElementById("texto1");
    const inputtexto2 = document.getElementById("texto2");

    const regex = new RegExp(expressao);

    const valido1 = texto1.match(regex);
    const valido2 = texto2.match(regex);

    if (expressao === "") {
        inputtexto1.style.backgroundColor = "white"
        inputtexto2.style.backgroundColor = "white"
        document.getElementById("texto1").value = "";
        document.getElementById("texto2").value = "";
        return;
    }

    if (valido1) {
        inputtexto1.style.backgroundColor = "#dcfce7"
        document.getElementById("label1").textContent = "Texto 1 - Válido";
    } else {
        inputtexto1.style.backgroundColor = "#fee2e2"
        document.getElementById("label1").textContent = "Texto 1 - Inválido";
    }

    if (valido2) {
        inputtexto2.style.backgroundColor = "#dcfce7"
        document.getElementById("label2").textContent = "Texto 2 - Válido";
    } else {
        inputtexto2.style.backgroundColor = "#fee2e2"
        document.getElementById("label2").textContent = "Texto 2 - Inválido";
    }
}