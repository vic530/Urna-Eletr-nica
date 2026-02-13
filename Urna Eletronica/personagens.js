const botaoHeroi = document.getElementById('bt-heroi');
const botaovilao = document.getElementById('bt-vilao');
const listaPersonagens = document.getElementById('lista-personagens');
const ariaPersonagens = document.querySelector('.aria-personagens');
const resultado = document.getElementById('resultado');

const criarLi = item => {

    const li = document.createElement('li');
    li.classList.add('modelo-voto');

    li.innerHTML = `
         <img class="img-personagem" 
            src="${item.imagem.url}"
        />
         <p class="nome-personagem">
            ${item.nome} <br> 
            Nº <span class="numero-pesonagem">${item.numero}</span>
        </p>
    `
    listaPersonagens.appendChild(li);
}



botaoHeroi.addEventListener('click', () => {

    resultadoBrancosNulos.innerHTML = '';
    resultadosTela.innerHTML = '';
    resultado.style.visibility = 'hidden';
    listaPersonagens.innerHTML = '';
    ariaPersonagens.style.display = 'flex';
    ariaPersonagens.style.visibility = 'visible'
    
    
    const heroi = candidatos.find(
        item => item.cargo === "Herói do Ano"
    );
    
    heroi.concorrentes.forEach(criarLi);
});

botaovilao.addEventListener('click', () => {
    
    resultadoBrancosNulos.innerHTML = '';
    resultadosTela.innerHTML = ''
    resultado.style.visibility = 'hidden';
    listaPersonagens.innerHTML = '';
    ariaPersonagens.style.display = 'flex';
    ariaPersonagens.style.visibility = 'visible'

    const vilao = candidatos.find( 
        item => item.cargo === "Vilão do Ano"
    );

    vilao.concorrentes.forEach(criarLi);
});