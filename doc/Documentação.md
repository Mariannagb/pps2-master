
# **Documento de Arquitetura – Padrões de Projeto aplicados ao domínio Futebol (Vasco da Gama)**

## **1. Contexto Geral**

O sistema simula um *pré-jogo* do Vasco da Gama, permitindo que o torcedor informe preferências e receba uma narrativa personalizada contendo escalação, estratégia tática, discurso motivacional e feitos históricos do clube.
Para que o código fosse **flexível, reutilizável, organizado e expansível**, foram aplicados quatro padrões clássicos de projeto: **Singleton, Builder, Strategy e Facade**.

---

# **2. Padrões de Projeto Utilizados**

---

## ✅ **Singleton — `HallDaFamaDoClube`**

### **Problema tratado**

Era necessário manter **um único registro oficial** de feitos históricos, evitando duplicações e garantindo consistência ao longo da aplicação.

### **Aplicabilidade**

* Quando deve existir uma **única instância global**.
* Quando essa instância é utilizada por diversas partes do sistema.
* Quando é necessário preservar um *estado único e compartilhado*.

### **Por que usar aqui**

A sala de troféus do Vasco deve ser única. O Singleton impede versões paralelas ou inconsistentes do Hall da Fama.

### **Como foi implementado**

* Construtor privado.
* Método estático `obterInstancia()` garante acesso único.
* Conjunto interno `Set<string>` evita duplicações.


```
[ Toda a aplicação ]
          |
      obterInstancia()
          |
   [ Única sala de troféus ]
```

---

## ✅ **Builder — `ConstrutorPlanoDePartida`**

### **Problema tratado**

Criar um objeto complexo e obrigatório (plano de partida) exigia muitos parâmetros, o que tornava fácil gerar objetos incompletos ou mal inicializados.

### **Aplicabilidade**

* Construção de objetos complexos.
* Necessidade de preenchimento gradual.
* Validação centralizada.

### **Por que usar aqui**

O plano exige: time, adversário, estádio, estratégia, discurso, escalação e previsão de gols.
Com o Builder:

* A criação fica mais legível.
* É possível adicionar jogadores de forma fluente.
* A validação ocorre **apenas no final**, no método `construir()`.
* Objeto parcial (`Partial<>`) para segurança.

```
ConstrutorPlanoDePartida
       |   definirTime()
       |   definirEstrategia()
       |   adicionarJogador()
       V
    construir() → PlanoDePartida pronto
```

---

## ✅ **Strategy — `EstrategiaTatica`**

### **Problema tratado**

Cada partida pode usar uma estratégia diferente (ofensiva ou equilibrada). Codificar esse comportamento diretamente no fluxo criaria condicionais rígidas e pouco expansíveis.

### **Aplicabilidade**

* Quando diferentes comportamentos devem ser intercambiáveis.
* Quando novas variações precisam ser adicionadas sem modificar código existente.

### **Por que usar aqui**

As estratégias:

* Têm a mesma interface (`descreverEstiloDeJogo`)
* Podem ser trocadas dinamicamente pelo torcedor
* Podem crescer (ex.: Retranca Absoluta, Pressão Total)

```
            EstrategiaTatica
            /              \
EstrategiaOfensiva   EstrategiaEquilibrada
```

---

## ✅ **Facade — `DiaDeJogo`**

### **Problema tratado**

A camada de interface (CLI) não pode lidar diretamente com Builder, Strategy e Singleton.
Isso traria acoplamento excessivo e dificultaria evoluções futuras.

### **Aplicabilidade**

* Simplificação de subsistemas complexos.
* Criação de um ponto único de operação.
* Redução do acoplamento entre camadas.

### **Por que usar aqui**

A Facade oferece:

* Um método simples para montar o plano: `prepararPartida()`
* Uma interface amigável para criar a narrativa final.

Isso deixa o arquivo `index.ts` muito mais limpo e claro.

```
[ CLI ]
   |
   V
[DiaDeJogo]
   |— usa Builder
   |— usa Singleton
   |— usa Strategy
   V
Gera narrativa final da partida
```

---

# **3. Fluxo Completo do Sistema**

1. O usuário fornece nome, adversário, quantidade de gols e tipo de estratégia.
2. O sistema monta o elenco base do Vasco da Gama (`carregarTimeBase`).
3. O `HallDaFamaDoClube` (Singleton) registra as glórias históricas.
4. O `ConstrutorPlanoDePartida` recebe os dados e constrói o plano com segurança.
5. O `DiaDeJogo` coordena tudo e gera a narrativa final.
6. A CLI exibe uma mensagem personalizada reforçando o orgulho vascaíno.

---

# **4. Por hoje é só pessoal, obrigado pela atenção professor e boas festas ;D**