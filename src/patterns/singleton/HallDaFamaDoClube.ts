export class HallDaFamaDoClube {
  private static instancia: HallDaFamaDoClube;
  private readonly destaques = new Set<string>();

  private constructor() {}

  static obterInstancia(): HallDaFamaDoClube {
    if (!HallDaFamaDoClube.instancia) {
      HallDaFamaDoClube.instancia = new HallDaFamaDoClube();
    }
    return HallDaFamaDoClube.instancia;
  }

  registrarDestaque(destaque: string): void {
    this.destaques.add(destaque);
  }

  listarDestaques(): string[] {
    return [...this.destaques];
  }
}
