import { PlanoDePartida } from "../builder/MatchPlanBuilder";
import { HallDaFamaDoClube } from "../singleton/HallDaFamaDoClube";

export class DiadeJogo {
  constructor(private readonly hallDaFama: HallDaFamaDoClube) {}

  prepararPartida(construtor: { construir: () => PlanoDePartida }): PlanoDePartida {
    return construtor.construir();
  }

  criarNarrativa(plano: PlanoDePartida, nomeDoTorcedor: string): string {
    const destaques = this.hallDaFama.listarDestaques().join(" | ");
    const textoEscalacao = plano.escalação
      .map((jogador) => ` - ${jogador.posicao}: ${jogador.nome}`)
      .join("\n");

    return [
      `Obrigado por confiar, ${nomeDoTorcedor}!`,
      `${plano.time.nome} chega a ${plano.estadio} para enfrentar o ${plano.adversario}, já sabendo que é superior, principalmente quando o rival veste rubro-negro.`,
      `Estratégia escolhida: ${plano.estrategia.nome}. ${plano.estrategia.descreverEstiloDeJogo(plano.golsPrevistos)}`,
      `Discurso motivacional: ${plano.discursoMotivacional}`,
      `Escalação base:\n${textoEscalacao}`,
      `Previsão otimista: ${plano.golsPrevistos} gols vascaínos.`,
      `Sala de troféus (Singleton): ${destaques}`,
      `Gigante da Colina pronto para provar, outra vez, que é melhor que o Flamengo.`,
    ].join("\n");
  }
}