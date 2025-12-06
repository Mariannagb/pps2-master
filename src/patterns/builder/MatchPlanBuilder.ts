import { Time } from "../../domain/Time";
import { Jogador } from "../../domain/Jogador";
import { EstrategiaTatica } from "../strategy/EstrategiaTatica";

export interface PlanoDePartida {
  time: Time;
  adversario: string;
  estadio: string;
  escalação: Jogador[];
  estrategia: EstrategiaTatica;
  discursoMotivacional: string;
  golsPrevistos: number;
}

export class ConstrutorPlanoDePartida {
  private readonly plano: Partial<PlanoDePartida> = { escalação: [] };

  definirTime(time: Time): this {
    this.plano.time = time;
    return this;
  }

  definirAdversario(adversario: string): this {
    this.plano.adversario = adversario;
    return this;
  }

  definirEstadio(estadio: string): this {
    this.plano.estadio = estadio;
    return this;
  }

  definirEstrategia(estrategia: EstrategiaTatica): this {
    this.plano.estrategia = estrategia;
    return this;
  }

  definirDiscursoMotivacional(texto: string): this {
    this.plano.discursoMotivacional = texto;
    return this;
  }

  definirGolsPrevistos(gols: number): this {
    this.plano.golsPrevistos = gols;
    return this;
  }

  adicionarJogador(jogador: Jogador): this {
    this.plano.escalação?.push(jogador);
    return this;
  }

  construir(): PlanoDePartida {
    const {
      time,
      adversario,
      estadio,
      escalação,
      estrategia,
      discursoMotivacional,
      golsPrevistos,
    } = this.plano;

    if (
      !time ||
      !adversario ||
      !estadio ||
      !escalação?.length ||
      !estrategia ||
      !discursoMotivacional ||
      golsPrevistos === undefined
    ) {
      throw new Error("Plano de partida incompleto. Verifique os campos obrigatórios.");
    }

    return {
      time,
      adversario,
      estadio,
      escalação,
      estrategia,
      discursoMotivacional,
      golsPrevistos,
    };
  }
}
