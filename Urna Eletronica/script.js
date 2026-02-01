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

let etapaIndex = 0; // Controle as trocas de cargos
let etapaAtual = candidatos[etapaIndex];

let votoBranco = false;
let votos = [];

let estadoVoto = ``;

const digitarNumero = (numero) =>{
    
    if (numeroInput.value.length < etapaAtual.caracteres && votoBranco === false ){
        numeroInput.value += numero;
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

        estadoVoto = candidato 
    } else {
        nomeCandidato.textContent = 'VOTO NULO';
        fotoCandidato.src = './assets/img/padrao.jpg'; //Foto padrão
        mensagem.textContent = 'NÚMERO IVÁLIDO';

        bordaFoto.style.visibility = 'hidden';
        
        
        estadoVoto = candidato
    }

}

const iniciarEtapa = () => { 
    etapaAtual = candidatos[etapaIndex];
    cargoTexto.textContent = etapaAtual.cargo;

    votoBranco = false;

    numeroInput.value = '';
    nomeCandidato.textContent = '';
    fotoCandidato.src = '';
    numeroInput.value = '';

    mensagem.style.visibility = 'hidden';
    textSeuVoto.style.visibility = 'hidden';
    bordaFoto.style.visibility = 'hidden';
    textN.style.visibility = "visible";

    
}

const botoBranco = () => {
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
    
}

const confirmarVoto = () => {

    if(numeroInput.value.length === etapaAtual.caracteres){
        votos.push({
            cargo: etapaAtual.cargo,
            numero: numeroInput.value,
            tipo: nomeCandidato.textContent === 'VOTO NULO' ? 'NULO' : 'VALIDO'
        });
        avancarEtapa();
        return;
    }
    
    if (votoBranco){
        votos.push({
            cargo: etapaAtual.cargo,
            tipo: 'BRANCO'
        });

        avancarEtapa();
        return;

    } 
    
    alert('Digite o número completo ou escolha BRANCO');
    
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
     document.querySelector('main').innerHTML = `
        <h1 style="color:white">FIM</h1>
        <p style="color:white">VOTO COMPUTADO COM SUCESSO</p>
    `;
    console.log(votos);
}



botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        const valorTecla = botao.value;
        
        digitarNumero(valorTecla);
    })
});
botaoCorrigir.addEventListener('click', iniciarEtapa);
botaoBranco.addEventListener('click', botoBranco);
botaoConfirmar.addEventListener('click', confirmarVoto);

  









