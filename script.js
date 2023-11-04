const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const gameOver = document.querySelector(".game-over");
const restart = document.querySelector(".restart");
var spanPontuacao = document.querySelector(".pontuacao");
var spanMaiorPontuacao = document.querySelector(".maiorPontuacao");
var contador = 0;

let valorMaiorPontuacao = localStorage.getItem("maiorPontuacao");
spanMaiorPontuacao.innerHTML = `Maior pontuação: ${valorMaiorPontuacao}`;

function jump() {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 800);
}

document.addEventListener("keydown", jump);

// segunda logica descobrir qual distancia o pipe encosta no mario, no caso 140px
// se o bottom do mario for 0 ou seja ele no chao encerra o jogo
const loopPosicaoPipe = setInterval(() => {
  const PosicaoPipe = pipe.offsetLeft;
  //pequena gambiarra para pegar o estilo bottom
  //outra pequena gambiarra para transformar o valor que esta em string para 'int'
  // tirando o 'px' com o replace
  const PosicaoMario = +window.getComputedStyle(mario).bottom.replace("px", "");

  if (PosicaoPipe <= 140 && PosicaoMario <= 60 && PosicaoPipe > 0) {
    pipe.style.animation = "none";
    pipe.style.left = `${PosicaoPipe}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${PosicaoMario}px`;

    mario.style.zIndex = 2;
    mario.style.width = "85px";
    mario.style.marginLeft = "70px";
    mario.src = "./img/game-over.png";

    gameOver.style.display = "block";

    if (contador > valorMaiorPontuacao) {
      localStorage.setItem("maiorPontuacao", contador);
    }
    clearInterval(loopPosicaoPipe);
  }
  if (PosicaoPipe < 140 && PosicaoPipe < 0) {
    contador++;
    spanPontuacao.innerHTML = `${contador}`;
  }
}, 10);

function reload() {
  window.location.reload();
  gameOver.style.display = "none";
}
