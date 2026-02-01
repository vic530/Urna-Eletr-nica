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


let etapaAtual = candidatos[0]
let votoBranco = false;
let totalVotos = [];
let valorVoto = '';

cargoTexto.textContent = etapaAtual.cargo;

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

    if(candidato) {
        textSeuVoto.style.visibility = 'visible';
        fotoCandidato.style.visibility = 'visible';
        mensagem.style.visibility = 'visible';
        bordaFoto.style.visibility = 'visible' 
        nomeCandidato.textContent = candidato.nome;
        fotoCandidato.src = candidato.imagem.url || './assets/img/padrao.jpg';
        mensagem.innerHTML = `
            Aperte a tela:<br/>
            CONFIRMA para CONFIRMAR este voto<br/>
            CORRIGE para REINICIAR este voto
        `
    } else {
        nomeCandidato.textContent = 'VOTO NULO';
        fotoCandidato.src = '';
        mensagem.textContent = 'NÚMERO IVÁLIDO';
        bordaFoto.style.visibility = 'hidden';
        mensagem.style.visibility = 'visible';
    }

}

const iniciarEtapa = () => { 
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
    textSeuVoto.style.visibility = 'visible';
    mensagem.style.visibility = 'visible';
    textN.style.visibility = "hidden";
    bordaFoto.style.visibility = 'hidden';
    nomeCandidato.textContent = 'VOTO EM BRANCO';
    fotoCandidato.src = '';
    mensagem.innerHTML = `
            Aperte a tela:<br/>
            CONFIRMA para CONFIRMAR este voto<br/>
            CORRIGE para REINICIAR este voto
            `  

}

const confirmarVoto = () => {

 totalVotos.push(valorVoto);

    numeroInput.value = '';
    nomeCandidato.textContent = '';
    fotoCandidato.src = '';
    numeroInput.value = '';
    mensagem.style.visibility = 'hidden';
    textSeuVoto.style.visibility = 'hidden';
    bordaFoto.style.visibility = 'hidden';
    textN.style.visibility = "visible";
    
    votoBranco = false;
    valorVoto = '';
}



botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        const valorTecla = botao.value;
        
        digitarNumero(valorTecla);
    })
});
botaoCorrigir.addEventListener('click', () =>{  
    
    iniciarEtapa();
});
botaoBranco.addEventListener('click', () => {

    botoBranco();
});
botaoConfirmar.addEventListener('click', () => {
    
    confirmarVoto();
});

  









