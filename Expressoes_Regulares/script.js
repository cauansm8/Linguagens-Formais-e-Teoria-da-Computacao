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
        return;
    }

    if (valido1) {
        inputtexto1.style.backgroundColor = "#dcfce7"
    } else {
        inputtexto1.style.backgroundColor = "#fee2e2"
    }

    if (valido2) {
        inputtexto2.style.backgroundColor = "#dcfce7"
    } else {
        inputtexto2.style.backgroundColor = "#fee2e2"
    }
}