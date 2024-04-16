class Calculadora {
  constructor() {
    this.nrVisor = "0";
    this.ptDecimal = false;
    this.estadoErro = false;
    this.memTemp = "";
    this.memoria = 0;

    this.iniciouSegundo = false;
    this.op = {
      NOP: 0,
      SUM: 1,
      SUB: 2,
      MULT: 3,
      DIV: 4,
    };

    this.ligada = true;
    this.opAtual = this.op.NOP;
  }

  ligar() {
    this.ligada = true;
  }

  // Desliga a calculadora
  desligar() {
    this.ligada = false;
    this.nrVisor = "0"; // Limpa o visor ao desligar
  }

  // Retorna true se a calculadora estiver ligada, caso contrário, retorna false
  estaLigada() {
    return this.ligada;
  }
  trocarSinal() {
    if (this.nrVisor !== "0") {
      // Verifica se o número no visor não é zero
      if (this.nrVisor[0] === "-") {
        // Se o número no visor já for negativo, remove o sinal
        this.nrVisor = this.nrVisor.slice(1);
      } else {
        // Se o número no visor for positivo, adiciona o sinal negativo
        this.nrVisor = "-" + this.nrVisor;
      }
    }
  }

  // Recebe dígito
  recebeDigito(dig) {
    if (this.estadoErro) return;
    if (dig.length != 1) return;
    if ((dig < "0" || dig > "9") && dig != ".") return;
    if (!this.iniciouSegundo && this.opAtual != this.op.NOP) {
      this.iniciouSegundo = true;
      this.ptDecimal = false;
      this.nrVisor = "0";
    }
    if (this.nrVisor.length == 10) return;
    if (dig == ".") {
      if (this.ptDecimal) return;
      this.ptDecimal = true;
    }
    if (this.nrVisor == "0") {
      this.nrVisor = dig == "." ? "0." : dig;
    } else {
      this.nrVisor += dig;
    }
  }

  // Define a operação atual
  defineOperacao(op) {
    if (this.estadoErro) return;
    switch (op) {
      case "+":
        this.opAtual = this.op.SUM;
        break;
      case "-":
        this.opAtual = this.op.SUB;
        break;
      case "/":
        this.opAtual = this.op.DIV;
        break;
      case "*":
        this.opAtual = this.op.MULT;
        break;
    }
    this.memTemp = this.nrVisor;
  }

  // Executa operação: tecla igual
  igual() {
    if (this.estadoErro) return;
    if (this.opAtual == this.op.NOP) return;
    let num1 = parseFloat(this.memTemp);
    let num2 = parseFloat(this.nrVisor);
    let resultado = 0;
    switch (this.opAtual) {
      case this.op.SUM:
        resultado = num1 + num2;
        break;
      case this.op.SUB:
        resultado = num1 - num2;
        break;
      case this.op.MULT:
        resultado = num1 * num2;
        break;
      case this.op.DIV:
        if (num2 == 0) {
          this.estadoErro = true;
          this.nrVisor = "ERRO!";
          return;
        }
        resultado = num1 / num2;
        break;
    }
    // Arredonda o resultado para 10 casas decimais
    this.nrVisor = String(resultado.toFixed(10));
    this.opAtual = this.op.NOP;
    this.ptDecimal = false;
    this.memTemp = "";
    this.iniciouSegundo = false;
  }

  // Tecla C - reinicia tudo, exceto memória
  teclaC() {
    this.nrVisor = "0";
    this.ptDecimal = false;
    this.iniciouSegundo = false;
    this.opAtual = this.op.NOP;
    this.memTemp = "";
    this.estadoErro = false;
  }

  // tecla M+ : acrescenta à memória o número no visor
  teclaMmais() {
    if (this.estadoErro) return;
    this.memoria += parseFloat(this.nrVisor);
  }

  // tecla M- : subtrai da memória o número no visor
  teclaMmenos() {
    if (this.estadoErro) return;
    this.memoria -= parseFloat(this.nrVisor);
  }

  // tecla RM : recupera o conteúdo da memória -> coloca no visor
  teclaRM() {
    if (this.estadoErro) return;
    this.nrVisor = String(this.memoria);
  }

  // tecla CLM : limpa totalmente o conteúdo da memória -> atribui 0
  teclaCLM() {
    if (this.estadoErro) return;
    this.memoria = 0;
  }
}

// ===================================================================
//  REAÇÃO A EVENTOS DO MOUSE
// ===================================================================

// ATUALIZA O VALOR NO VISOR
let mostraVisor = () => {
  document.getElementById("visor-id").innerHTML = calculadora.nrVisor;
};

// RECEBE UM DÍGITO (OU PONTO)
let digito = (dig) => {
  calculadora.recebeDigito(dig);
  mostraVisor();
};

// RECEBE A OPERAÇÃO ATUAL
let defOp = (op) => {
  if (calculadora.opAtual != calculadora.op.NOP) {
    igual();
    mostraVisor();
  }
  calculadora.defineOperacao(op);
};

// CALCULA A OPERAÇÃO
let igual = () => {
  calculadora.igual();
  mostraVisor();
};

// TECLA C: LIMPA TUDO, EXCETO MEMÓRIA
let teclaC = () => {
  calculadora.teclaC();
  mostraVisor();
};

// M+ ACRESCENTA À MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmais = () => {
  calculadora.teclaMmais();
};

// M- SUBTRAI DA MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmenos = () => {
  calculadora.teclaMmenos();
};

// PÕE NO VISOR O CONTEÚDO DA MEMÓRIA
let teclaRM = () => {
  calculadora.teclaRM();
  mostraVisor();
};

// APAGA TODO O CONTEÚDO DA MEMÓRIA
let teclaCLM = () => {
  calculadora.teclaCLM();
};
mostraVisor = () => {
  if (calculadora.estaLigada()) {
    document.getElementById("visor-id").innerHTML = calculadora.nrVisor;
  } else {
    document.getElementById("visor-id").innerHTML = "";
  }
};

function toggleCalculadora() {
  if (calculadora.estaLigada()) {
    calculadora.desligar();
  } else {
    calculadora.ligar();
  }
  mostraVisor();
}
function trocarSinal() {
  if (calculadora.estaLigada()) {
    calculadora.trocarSinal();
    mostraVisor();
  }
}

// ===================================================================
//  INÍCIO DO PROCESSAMENTO
// ===================================================================
let calculadora = new Calculadora();
