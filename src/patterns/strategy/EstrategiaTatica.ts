export interface EstrategiaTatica {
  readonly nome: string;
  descreverEstiloDeJogo(golsPrevistos: number): string;
}

export class EstrategiaOfensiva implements EstrategiaTatica {
  readonly nome = "Ataque Total";

  descreverEstiloDeJogo(golsPrevistos: number): string {
    return `Linha alta, triangulações rápidas e ${golsPrevistos} gols para deixar claro que o Vasco atropela qualquer rival, sobretudo o Flamengo.`;
  }
}

export class EstrategiaEquilibrada implements EstrategiaTatica {
  readonly nome = "Controle Inteligente";

  descreverEstiloDeJogo(golsPrevistos: number): string {
    return `Posse paciente, marcação forte e contra-ataques cirúrgicos para garantir ${golsPrevistos} gols e reafirmar a superioridade vascaína.`;
  }
}

