const gramatica = document.getElementById("gramatica");

function criarProducao() {
    const linha = document.createElement("div");
    linha.classList.add("producao");

    const lhs = document.createElement("input");
    lhs.type = "text";
    lhs.classList.add("lhs");
    lhs.setAttribute("aria-label", "Lado esquerdo da produção");

    const seta = document.createElement("span");
    seta.textContent = "→";

    const rhs = document.createElement("input");
    rhs.type = "text";
    rhs.classList.add("rhs");
    rhs.setAttribute("aria-label", "Lado direito da produção");

    linha.append(lhs, seta, rhs);
    gramatica.appendChild(linha);

    return linha;
}

function verificarUltimaLinha() {
    const linhas = gramatica.querySelectorAll(".producao");
    const ultimaLinha = linhas[linhas.length - 1];

    const lhs = ultimaLinha.querySelector(".lhs");
    const rhs = ultimaLinha.querySelector(".rhs");

    // Cria uma linha nova somente quando a produção
    // atual estiver completamente preenchida.
    if (lhs.value.trim() !== "" && rhs.value.trim() !== "") {
        criarProducao();
    }
}

gramatica.addEventListener("input", (event) => {
    if (event.target.matches(".lhs, .rhs")) {
        verificarUltimaLinha();
    }
});


function pertence(cadeia, inicial, gramatica) {
    // Cada configuração contém o não terminal atual
    // e a posição da cadeia que já foi consumida.
    const pilha = [[inicial, 0]];
    const visitados = new Set();

    while (pilha.length > 0) {
        const [estado, posicao] = pilha.pop();

        const chave = `${estado}|${posicao}`;

        if (visitados.has(chave)) {
            continue;
        }

        visitados.add(chave);

        // A cadeia inteira foi consumida.
        // O não terminal atual pode gerar ε?
        if (posicao === cadeia.length) {
            if ((gramatica[estado] ?? []).includes("")) {
                return true;
            }

            // Uma produção que termina em terminal
            // também pode ter aceitado na iteração anterior.
            continue;
        }

        for (const producao of gramatica[estado] ?? []) {
            // Produção vazia: não consome símbolos.
            if (producao === "") {
                continue;
            }

            const terminal = producao[0];

            // O terminal produzido precisa coincidir
            // com o próximo símbolo da cadeia.
            if (terminal !== cadeia[posicao]) {
                continue;
            }

            if (producao.length === 1) {
                // Produção A → a: encerra a derivação.
                if (posicao + 1 === cadeia.length) {
                    return true;
                }
            } else {
                // Produção A → aB: continua em B.
                const proximoEstado = producao.slice(1);

                pilha.push([proximoEstado, posicao + 1]);
            }
        }
    }

    return false;
}

function testarCadeia() {
    const gramatica = {};

    const primeiroLhs = document.querySelector('.lhs').value.trim();

    if (primeiroLhs != 'S') {
        window.alert('Comece com S na primeira coluna!');
        return;
    }


    document.querySelectorAll(".producao").forEach(linha => {
        const lhs = linha.querySelector(".lhs").value.trim();
        const rhs = linha.querySelector(".rhs").value.trim();

        // Ignora somente linhas em que ambos os campos estão vazios.
        if (lhs === "" && rhs === "") return;

        // Se o LHS estiver vazio, a produção é inválida.
        if (lhs === "") {
            window.alert("Preencha o LHS da produção.");
            return;
        }

        if (!gramatica[lhs]) {
            gramatica[lhs] = [];
        }

        // RHS vazio representa vazio.
        gramatica[lhs].push(rhs);
    });

    const cadeia = document.getElementById("cadeia").value;
    const resultado = document.getElementById("resultado");

    const aceita = pertence(cadeia, "S", gramatica);

    if (resultado.content = aceita) {
        resultado.textContent = "Cadeia aceita pela gramática!";
        resultado.style.color = "green";
    } else {
        resultado.textContent = "Cadeia rejeitada pela gramática.";
        resultado.style.color = "red";
    }
}
