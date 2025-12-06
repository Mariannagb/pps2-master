import { Jogador } from "./Jogador";

export class Time {
  constructor(
    public readonly nome: string,
    public readonly cores: string[],
    public readonly trechoDoHino: string,
    public readonly jogadores: Jogador[] = []
  ) {}

  adicionarJogador(jogador: Jogador): void {
    this.jogadores.push(jogador);
  }
}
