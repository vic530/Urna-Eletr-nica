const numeroInput = document.getElementById('numero-candidato');
const nomeCandidato = document.getElementById('nome-candidato');
const fotoCandidato = document.getElementById('foto-candidato');
const cargoTexto = document.querySelector('.cargo');
const mensagem = document.querySelector('.mensagem')
const botoes = document.querySelectorAll('.botao');
const botaoCorrigir = document.querySelector('.botao-corrigir');
const botaoBranco = document.querySelector('.botao-branco');
const botaoConfirmar = document.querySelector('.botao-confirmar');

const textSeuVoto = document.querySelector('.text-voto');
const bordaFoto = document.querySelector('.foto-perfil');
const textN = document.getElementById('textN');

const visor = document.getElementById('visor');

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
        (item) => item.numero === numeroDigitado
    );

    textSeuVoto.style.visibility = 'visible';
    mensagem.style.visibility = 'visible';

    if(candidato) {
        nomeCandidato.textContent = candidato.nome;
        fotoCandidato.src = candidato.imagem.url || './assets/img/padrao.jpg';
        mensagem.innerHTML = `
            Aperte a tela:<br/>
            CONFIRMA para CONFIRMAR este voto<br/>
            CORRIGE para REINICIAR este voto
        `

        fotoCandidato.style.visibility = 'visible';
        bordaFoto.style.visibility = 'visible'

    } else {
        nomeCandidato.textContent = 'VOTO NULO';
        fotoCandidato.src = './assets/img/padrao.jpg'; //Foto padrão
        mensagem.innerHTML = `Caso CONFIRME, este voto será anulado.<br/>
            Para corrigir, pressione CORRIGE.
            `

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
    mensagem.style.visibility = 'visible';
    textN.style.visibility = "hidden";
    bordaFoto.style.visibility = 'hidden';
    visor.style.visibility = 'hidden';   
    
}

const confirmarVoto = () => {

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
    fotoCandidato.style.visibility = 'hidden';
    textSeuVoto.style.visibility = 'hidden';
    bordaFoto.style.visibility = 'hidden';
    textN.style.visibility = 'hidden';
    visor.style.visibility = 'hidden';

    console.log(votos);
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
    })
});
botaoCorrigir.addEventListener('click', iniciarEtapa);
botaoBranco.addEventListener('click', brancoVoto);
botaoConfirmar.addEventListener('click', confirmarVoto);

  









