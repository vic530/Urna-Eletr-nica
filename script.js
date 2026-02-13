const numeroInput = document.getElementById('numero-candidato');
const nomeCandidato = document.getElementById('nome-candidato');
const fotoCandidato = document.getElementById('foto-candidato');
const cargoTexto = document.querySelector('.cargo');
const mensagem = document.querySelector('.mensagem')
const botoes = document.querySelectorAll('.botao');
const botaoCorrigir = document.querySelector('.botao-corrigir');
const botaoBranco = document.querySelector('.botao-branco');
const botaoConfirmar = document.querySelector('.botao-confirmar');
const botaoResultado = document.getElementById('bt-resultado');
const botaoNovaVotacao = document.getElementById('bt-nova-votacao');

const textSeuVoto = document.querySelector('.text-voto');
const bordaFoto = document.querySelector('.foto-perfil');
const textN = document.getElementById('textN');

const visor = document.getElementById('visor');
const telaR = document.getElementById('resultadosTela');
const resultadoBrancosNulos = document.getElementById('resultadoBrancosNulos');

let urnaBloqueada = false;

let etapaIndex = 0; // Controle as trocas de cargos
let etapaAtual = candidatos[etapaIndex];

let votoBranco = false;
let votos = [];





visor.textContent = "_".repeat(etapaAtual.caracteres);

const atualizarVisor = () => {
    const digitados = numeroInput.value.length;
    let valoritem = numeroInput.value;

    if ( digitados < etapaAtual.caracteres){
        let espaco = visor.textContent = "_".repeat(etapaAtual.caracteres - digitados);
        visor.textContent = valoritem + espaco;
        visor.style.animation = 'none';
    } else {
        visor.textContent = numeroInput.value;
    }
}

const digitarNumero = (numero) =>{
    if (urnaBloqueada) return;

    if (nomeCandidato.textContent === 'FIM'){
        return
    }

    if (numeroInput.value.length < etapaAtual.caracteres && votoBranco === false ){
        numeroInput.value += numero;

        atualizarVisor();
    } 
    if (numeroInput.value.length === etapaAtual.caracteres){
        buscarCandidato();
    }
};

const buscarCandidato = () => {
    const numeroDigitado = numeroInput.value; 
    
    const candidato = etapaAtual.concorrentes.find(
        item => item.numero === numeroDigitado
    );

    if(candidato) {
        nomeCandidato.textContent = candidato.nome;
        fotoCandidato.src = candidato.imagem.url ;
        mensagem.innerHTML = `
            Aperte a tela:<br/>
            CONFIRMA para CONFIRMAR este voto<br/>
            CORRIGE para REINICIAR este voto
        `

        textSeuVoto.style.visibility = 'visible';
        mensagem.style.visibility = 'visible';
        fotoCandidato.style.visibility = 'visible';
        bordaFoto.style.visibility = 'visible'

    } else {
        nomeCandidato.textContent = 'VOTO NULO';
        fotoCandidato.src = './assets/img/padrao.jpg'; //Foto padrão
        mensagem.innerHTML = `Caso CONFIRME, este voto será anulado.<br/>
            Para corrigir, pressione CORRIGE.
            `

        textSeuVoto.style.visibility = 'visible';
        mensagem.style.visibility = 'visible';
        bordaFoto.style.visibility = 'hidden';
        
    }
}

const iniciarEtapa = () => { 
    etapaAtual = candidatos[etapaIndex];
    cargoTexto.textContent = etapaAtual.cargo;

    votoBranco = false;

    numeroInput.value = '';
    nomeCandidato.textContent = '';

    fotoCandidato.style.visibility = 'hidden';
    mensagem.style.visibility = 'hidden';
    textSeuVoto.style.visibility = 'hidden';
    bordaFoto.style.visibility = 'hidden';
    textN.style.visibility = "visible";
    visor.style.visibility = 'visible';

    visor.textContent = "_".repeat(etapaAtual.caracteres);
    visor.style.animation = 'blink 1.5s infinite';
}

const brancoVoto = () => {
    if (urnaBloqueada) return;

    if (nomeCandidato.textContent === 'FIM'){
        return
    }

    votoBranco = true;

    numeroInput.value = '';
    nomeCandidato.textContent = 'VOTO EM BRANCO';
    fotoCandidato.src = '';
    mensagem.innerHTML = `
        Aperte a tela:<br/>
        CONFIRMA para CONFIRMAR este voto<br/>
        CORRIGE para REINICIAR este voto
        ` 

    textSeuVoto.style.visibility = 'visible';
    fotoCandidato.style.visibility = 'hidden';
    mensagem.style.visibility = 'visible';
    textN.style.visibility = "hidden";
    bordaFoto.style.visibility = 'hidden';
    visor.style.visibility = 'hidden';   
    
}

const confirmarVoto = () => {

    if (urnaBloqueada) return;

    if (nomeCandidato.textContent === 'FIM'){
        etapaIndex = 0;
        iniciarEtapa()
        return
    }

    if (votoBranco){
        votos.push({
            cargo: etapaAtual.cargo,
            tipo: 'BRANCO'
        });
        avancarEtapa();
        return;
    } 

    if (numeroInput.value.length < etapaAtual.caracteres) {
        mensagem.innerHTML = `Digite o número completo ou escolha BRANCO.`
        mensagem.style.visibility = 'visible'
        return
    
    }
   
    if(numeroInput.value.length === etapaAtual.caracteres){
        votos.push({
            cargo: etapaAtual.cargo,
            numero: numeroInput.value,
            tipo: nomeCandidato.textContent === 'VOTO NULO' ? 'NULO' : 'VALIDO'
        });
        avancarEtapa();
        return;
    }
      
}

const avancarEtapa = () => {
    etapaIndex++; 

    if (etapaIndex < candidatos.length) {
        iniciarEtapa()
    } else {
        finalizarVotacao();
    }
}

const finalizarVotacao = () => {

    nomeCandidato.textContent = 'FIM';
    numeroInput.value = '';
    cargoTexto.textContent = '';
    mensagem.innerHTML = `
        Seu voto foi concluído. Pressione 
        CONFIRMAR para encerrar a votação.
    `
    mensagem.style.visibility = 'visible'
    fotoCandidato.style.visibility = 'hidden';
    textSeuVoto.style.visibility = 'hidden';
    bordaFoto.style.visibility = 'hidden';
    textN.style.visibility = 'hidden';
    visor.style.visibility = 'hidden';

}

numeroInput.addEventListener('input', () => {
    const valor = numeroInput.value;
    const digitados = valor.length;

    if (digitados < etapaAtual.caracteres){
    const restantes = etapaAtual.caracteres - digitados;
        visor.textContent = "_".repeat(restantes)
    } else {
        visor.textContent = valor;
    }
    });



botoes.forEach((botao) => {

    botao.addEventListener('click', () => {
        const valorTecla = botao.value;
        
        digitarNumero(valorTecla);
    });
});



const verificarBracoNulo = () => {
    
    branco = 0;
    votorNulo = 0;

    votos.forEach((item) => {

        if (item.tipo === "BRANCO") {
            branco++
            console.log(`Votos branco: ${branco}`);
        }
        
        if (item.tipo === "NULO") {
            votorNulo++
            console.log(`Voto nulo: ${votorNulo}`)
        }
    });

    return { 
        branco,
        votorNulo
    }
}

const contarVotosPorCargo = (cargo) => {
    const contagem = {};

    votos.forEach((voto) => {

        if (voto.cargo === cargo && voto.tipo === "VALIDO") {

        const numero = voto.numero;

        if (contagem[numero]) {
            contagem[numero]++;
        } else {
            contagem[numero] = 1;
        }
        }
    });

    return contagem;
};

const descobrirVencedorPorCargo = (cargo) => {

    const contagem = contarVotosPorCargo(cargo);
    const bocosNulos = verificarBracoNulo();

    let vencedorNumero = null;
    let maiorQtd = 0;
    const totalGeral = votos.length;

        // Descobre quem tem mais votos
    for (let numero in contagem) {
        if (contagem[numero] > maiorQtd) {
        maiorQtd = contagem[numero];
        vencedorNumero = numero;
        }
    }
        // Soma total de votos válidos
    const totalVotosValidos = Object.values(contagem).reduce((acumulador, votos) => {
        return acumulador + votos;
    }, 0);

        // Calcula a porcentagem correta do vencedor
    const porcentagemVotos =  totalVotosValidos > 0
      ? ((maiorQtd / totalVotosValidos) * 100).toFixed(2)
      : 0;

        // Busca o candidato comoleto
    const etapa = candidatos.find( c => c.cargo === cargo);
    
    const candidatoVencedor = etapa.concorrentes.find(candidato => {
        return candidato.numero === vencedorNumero
    })

    // Calcula a porcentagem votos brancos e nulos
    const brancosPorcentagem = totalGeral > 0 ?
     ((bocosNulos.branco / totalGeral) * 100).toFixed(1) : 0;

    const nulosPorcentagem = totalGeral > 0 ? 
    ((bocosNulos.votorNulo / totalGeral) * 100).toFixed(1) : 0;

    return {
        cargo,
        candidato: candidatoVencedor,
        votos: maiorQtd,
        total: totalVotosValidos,
        porcentagem: { porcentagemVotos,brancosPorcentagem,nulosPorcentagem}
    }
};

const resultadoNaTela = () => {

    
    const ariaPersonagens = document.querySelector('.aria-personagens');
    const brancoNuleTela = document.getElementById('resultadoBrancosNulos');
    

    ariaPersonagens.style.display = 'none';
   
    telaR.innerHTML = '';
    brancoNuleTela.innerHTML = '';

    candidatos.forEach(etapa => {
        const resultado = descobrirVencedorPorCargo(etapa.cargo)
        
        const div = document.createElement('div');
        div.classList.add('resultado-cargo');

        let conteudo = `<h4>${resultado.cargo}</h4>`;

        if (!resultado.candidato) {
            conteudo += `
                <p>Nenhum voto válido.</p>
            `;
        } else {
            conteudo += `

                <img class="img-resultado"
                    src="${resultado.candidato.imagem.url}"
                />
                <p><strong class="resultadoNome">  ${resultado.candidato.nome}</strong></p>
                <p><strong class="resultadoPorcetagem">votos: ${resultado.porcentagem.porcentagemVotos}%</strong></p>
            `            
        }

        brancoNuleTela.innerHTML = `
            <p><strong class="resutadobraco">Votos brancos: ${resultado.porcentagem.brancosPorcentagem}%</strong> </p>
            <p><strong class="resutadobraco">Votos nulos: ${resultado.porcentagem.nulosPorcentagem}%<strong></p>
            `

        div.innerHTML = conteudo;
        telaR.appendChild(div);
    });
    
}

const novaVotacao = () => {
    etapaIndex = 0;
    votos = [];
    // Esconde tela de resultado
    const containerResultado = document.getElementById('resultado');
    containerResultado.style.visibility = 'hidden';
    // Limpa tela de resultados
    document.getElementById('resultadosTela').innerHTML = '';
    document.getElementById('resultadoBrancosNulos').innerHTML = '';
    // Esconde aria de personagens
    const ariaPersonagens = document.querySelector('.aria-personagens');
    ariaPersonagens.style.visibility = 'hidden';

    
    iniciarEtapa();
}



botaoCorrigir.addEventListener('click', iniciarEtapa);
botaoBranco.addEventListener('click', brancoVoto);
botaoConfirmar.addEventListener('click', confirmarVoto);

botaoResultado.addEventListener('click', () => {
    resultado.style.visibility = 'visible';
    urnaBloqueada = true;
    resultadoNaTela();
});
botaoNovaVotacao.addEventListener('click', () => {
    urnaBloqueada = false;
    novaVotacao();
});

  

 