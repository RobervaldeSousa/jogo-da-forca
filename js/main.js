const listaPalavras = ['javascript', 'html', 'css', 'aprender', 'programar'];

let palavraEscolhida;
let exibicaoPalavra;
let letrasChutadas;
let tentativasRestantes;
let numeroErros;

function iniciarJogo() {
    document.getElementById('botao-reiniciar').style.display = 'none';
    document.getElementById("entrada-palavra").disabled = false;
    //ESCOLHER UMA PALAVRA ALEATÓRIA
    palavraEscolhida = listaPalavras[Math.floor(Math.random()*listaPalavras.length)];

    //INICIALIZAR A EXIBIÇÃO COM UNDERLINES "_"
    exibicaoPalavra = Array(palavraEscolhida.length).fill('_');

    //INICIALIZAR O NÚMERO MÁXIMO DE TENTATIVAS
    letrasChutadas = [];

    //DEFINIR O NÚMERO MÁXIMO DE TENTATIVAS
    tentativasRestantes = 7;

    //INICIALIZA O NÚMERO DE ERROS
    numeroErros = 0;

    atualizarExibicao();

}

function atualizarExibicao() {
    document.getElementById("exibicao-palavra").innerText = exibicaoPalavra.join(' ');
    document.getElementById('letras-chutadas').innerText = `${letrasChutadas.join(', ')}`;

    document.getElementById('mensagem').innerText = '';
    document.getElementById('imagem').src = `../img/forca ${numeroErros}.png`;

    //VERIFICAR SE O JOGO TERMINOU
    if(tentativasRestantes === 0) {
        encerrarJogo('VOCÊ MORREU!')

        } else if(!exibicaoPalavra.includes('_')) {
            encerrarJogo('PARABÉNS! VOCÊ VECEU!');
        }

}

function chutarLetra() {
    const entradaLetra = document.getElementById('entrada-palavra');
    const letra = entradaLetra.value.toLowerCase();

    if(!letra.match(/[a-zà-ùç]/i)) {
        alert('Por favor insira uma letra válida! 👍');
        return;
    }
    if(letrasChutadas.includes(letra)) {
        alert('Voê já tentou esta letra 🤔! Tente outra.' );
        return;
    }

    letrasChutadas.push(letra);

    if(palavraEscolhida.includes(letra)) {
        for (let i = 0; i < palavraEscolhida.length; i++) {
            if(palavraEscolhida[i] === letra) {
                exibicaoPalavra[i] = letra;
            }
            
        }
    } else {
        tentativasRestantes--;
        numeroErros++;
    }

    entradaLetra.value = '';
    atualizarExibicao();
}

function encerrarJogo(mensagem) {
    //DESABILITAR O CAMPO DE DIGITAÇÃO
    document.getElementById("entrada-palavra").disabled = true;

    document.getElementById('mensagem').style.display = 'block';
    //EXIBIR MENSAGEM
    document.getElementById('mensagem').innerText = mensagem;

    //EXIBIR O BOTÃO REINICIAR
    document.getElementById('botao-reiniciar').style.display = 'block';
}

iniciarJogo()