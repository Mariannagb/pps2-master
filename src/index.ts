import * as readline from "readline";
import { Jogador } from "./domain/Jogador";
import { Time } from "./domain/Time";
import { ConstrutorPlanoDePartida } from "./patterns/builder/MatchPlanBuilder";
import { HallDaFamaDoClube } from "./patterns/singleton/HallDaFamaDoClube";
import { DiadeJogo } from "./patterns/facade/DiadeJogo";
import {
  EstrategiaOfensiva,
  EstrategiaEquilibrada,
} from "./patterns/strategy/EstrategiaTatica";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fazerPergunta = (pergunta: string): Promise<string> =>
  new Promise((resolver) =>
    rl.question(pergunta, (resposta) => resolver(resposta.trim()))
  );

function carregarTimeBase(): Time {
  const time = new Time(
    "CR Vasco da Gama",
    ["preto", "branco", "cruz de malta"],
    '"Vamos todos cantar de coração"'
  );

  const escalação = [
    new Jogador("Léo Jardim", "Goleiro", 90),
    new Jogador("Paulo Henrique", "Lateral Direito", 85),
    new Jogador("Carlos Cuesta", "Zagueiro", 87),
    new Jogador("Robert Renan", "Zagueiro", 88),
    new Jogador("Lucas Piton", "Lateral Esquerdo", 86),
    new Jogador("Cauan Barros", "Volante", 84),
    new Jogador("Thiago Mendes", "Meia", 89),
    new Jogador("Philipe Coutinho", "Meia Ofensivo", 93),
    new Jogador("Rayan", "Ponta Direita", 95),
    new Jogador("Pablo Vegetti", "Centroavante", 95),
    new Jogador("Roberto Dinamite (inspiracional)", "Lenda", 99),
  ];

  escalação.forEach((jogador) => time.adicionarJogador(jogador));
  return time;
}

async function inicializar(): Promise<void> {
  console.log("=== Planejador de Partida – Vasco da Gama ===");

  const nomeDoTorcedor =
    (await fazerPergunta("Qual é o seu nome, torcedor cruzmaltino? ")) ||
    "Torcedor Vascaíno";

  const adversario =
    (await fazerPergunta(
      "Qual adversário vamos superar hoje? (Enter = Flamengo) "
    )) || "Flamengo";

  const opcaoEstrategia =
    (await fazerPergunta(
      "Escolha a estratégia (1 = Ataque Total | 2 = Controle Inteligente): "
    )) || "1";

  const respostaGols = await fazerPergunta(
    "Quantos gols o Vasco vai marcar? "
  );

  const golsPrevistos =
    Number(respostaGols) > 0 ? Number(respostaGols) : 3;

  const estrategia =
    opcaoEstrategia === "2"
      ? new EstrategiaEquilibrada()
      : new EstrategiaOfensiva();

  const time = carregarTimeBase();
  const hallDaFama = HallDaFamaDoClube.obterInstancia();

  // Registrar feitos históricos
  hallDaFama.registrarDestaque(
    "Campeão da Copa Libertadores da América de 1998"
  );
  hallDaFama.registrarDestaque(
    "Tetracampeão Brasileiro (1974, 1989, 1997, 2000)"
  );

  const discursoMotivacional = `${nomeDoTorcedor}, hoje o Gigante da Colina mostra, mais uma vez, que é maior do que o Flamengo e qualquer outro rival.`;

  const construtor = new ConstrutorPlanoDePartida()
    .definirTime(time)
    .definirAdversario(adversario)
    .definirEstadio("Estádio São Januário")
    .definirEstrategia(estrategia)
    .definirDiscursoMotivacional(discursoMotivacional)
    .definirGolsPrevistos(golsPrevistos);

  time.jogadores.forEach((jogador) => construtor.adicionarJogador(jogador));

  const fachada = new DiadeJogo(hallDaFama);
  const plano = fachada.prepararPartida(construtor);

  console.log("\n--- Pré-jogo ---");
  console.log(fachada.criarNarrativa(plano, nomeDoTorcedor));

  rl.close();
}

inicializar().catch((erro) => {
  console.error("Algo inesperado aconteceu:", erro);
  rl.close();
  process.exit(1);
});
