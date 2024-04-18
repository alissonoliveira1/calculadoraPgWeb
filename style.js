class Calculadora {

  constructor() {
      this.nrVisor = '0';
      this.ptDecimal = false;
      this.estadoErro = false;
      this.memTemp = '';
      this.memoria = 0;
      this.mensagemErro = '';
      this.iniciouSegundo = false;
      this.op = {
          NOP: 0,
          SUM: 1,
          SUB: 2,
          MULT: 3,
          DIV: 4
      };
  
      this.ligada = true;
      this.opAtual = this.op.NOP;
  }

  ligar() {
    this.nrVisor = '0';
      this.ligada = true;
  }
  desligar() {
    this.ligada = false;
    this.nrVisor = '0'; 
}
teclaPorcentagem() {
  if (this.estadoErro) return;
  let num = parseFloat(this.nrVisor);
  this.nrVisor = String(num / 100);
}
  teclaQuadrado() {
    if (this.estadoErro) return;
    let num = parseFloat(this.nrVisor);
    this.nrVisor = String(num * num);
}
definirErro(mensagem) {
  this.estadoErro = true;
  this.nrVisor = 'ERRO!';
  this.mensagemErro = mensagem;
}
emErro() {
  return this.estadoErro;
}
limparErro() {
  this.estadoErro = false;
  this.mensagemErro = '';
}

  teclaRaizQuadrada() {
    if (this.estadoErro) return;
    let num = parseFloat(this.nrVisor);
    if (num < 0) {
        this.estadoErro = true;
        this.nrVisor = 'ERRO!';
        return;
    }
    this.nrVisor = String(Math.sqrt(num));
}
teclaInverso() {
  if (this.estadoErro) return;
  let num = parseFloat(this.nrVisor);
  if (num === 0) {
      this.estadoErro = true;
      this.nrVisor = 'ERRO!';
      return;
  }
  this.nrVisor = String(1 / num);
}





  
  


  estaLigada() {
      return this.ligada;
  }
  trocarSinal() {
      if (this.nrVisor !== '0') { 
          if (this.nrVisor[0] === '-') { 
              this.nrVisor = this.nrVisor.slice(1);
          } else { 
              this.nrVisor = '-' + this.nrVisor;
          }
      }
  }

  
  recebeDigito(dig) {
      if (this.estadoErro) return;
      if (dig.length != 1) return;
      if ((dig < '0' || dig > '9') && dig != '.') return;
      if (!this.iniciouSegundo && this.opAtual != this.op.NOP) {
          this.iniciouSegundo = true;
          this.ptDecimal = false;
          this.nrVisor = '0';
      }
      if (this.nrVisor.length == 10) return;
      if (dig == '.') {
          if (this.ptDecimal) return;
          this.ptDecimal = true;
      }
      if (this.nrVisor == '0') {
          this.nrVisor = dig == '.' ? '0.' : dig;
      } else {
          this.nrVisor += dig;
      }
  }


  defineOperacao(op) {
      if (this.estadoErro) return;
      switch (op) {
          case '+':
              this.opAtual = this.op.SUM;
              break;
          case '-':
              this.opAtual = this.op.SUB;
              break;
          case '/':
              this.opAtual = this.op.DIV;
              break;
          case '*':
              this.opAtual = this.op.MULT;
              break;
      }
      this.memTemp = this.nrVisor;
  }

  igual() {
    if (verificarErro()) return;
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
                this.definirErro('Divisão por zero não é permitida');
                return;
            }
            resultado = num1 / num2;
            break;
    }
    resultado = Math.round(resultado); // Arredonda o resultado para o inteiro mais próximo
    this.nrVisor = String(resultado);
    this.opAtual = this.op.NOP;
    this.ptDecimal = false;
    this.memTemp = '';
    this.iniciouSegundo = false;
}

 
  teclaC() {
      this.nrVisor = '0';
      this.ptDecimal = false;
      this.iniciouSegundo = false;
      this.opAtual = this.op.NOP;
      this.memTemp = '';
      this.estadoErro = false;
  }


  teclaMmais() {
      if (this.estadoErro) return;
      this.memoria += parseFloat(this.nrVisor);
  }

  
  teclaMmenos() {
      if (this.estadoErro) return;
      this.memoria -= parseFloat(this.nrVisor);
  }

 
  teclaRM() {
      if (this.estadoErro) return;
      this.nrVisor = String(this.memoria);
  }

 
  teclaCLM() {
      if (this.estadoErro) return;
      this.memoria = 0;
  }

}



let mostraVisor = () => {
  document.getElementById('visor-id').innerHTML = calculadora.nrVisor;
}


let digito = (dig) => {
  calculadora.recebeDigito(dig);
  mostraVisor();
}


let defOp = (op) => {
  if (calculadora.opAtual != calculadora.op.NOP) {
      igual();
      mostraVisor();
  }
  calculadora.defineOperacao(op);
}


let igual = () => {
  calculadora.igual();
  mostraVisor();
}


let teclaC = () => {
  calculadora.teclaC();
  mostraVisor();
}


let teclaMmais = () => {
  calculadora.teclaMmais();
}


let teclaMmenos = () => {
  calculadora.teclaMmenos();
}


let teclaRM = () => {
  calculadora.teclaRM();
  mostraVisor();
}


let teclaCLM = () => {
  calculadora.teclaCLM();
}
 mostraVisor = () => {
  if (calculadora.estaLigada()) {
      document.getElementById('visor-id').innerHTML = calculadora.nrVisor;
  } else {
      document.getElementById('visor-id').innerHTML = '';
  }
  
}
let raizQuadrada = () => {
  if (calculadora.estaLigada()) {
      calculadora.teclaRaizQuadrada();
      mostraVisor();
  }
}
let porcentagem = () => {
  if (calculadora.estaLigada()) {
      calculadora.teclaPorcentagem();
      mostraVisor();
  }}
let quadrado = () => {
  if (calculadora.estaLigada()) {
      calculadora.teclaQuadrado();
      mostraVisor();
  }
}
let inverso = () => {
  if (calculadora.estaLigada()) {
      calculadora.teclaInverso();
      mostraVisor();
  }
}


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
function verificarErro() {
  if (calculadora.emErro()) {
      mostraVisor();
      return true;
  }
  return false;
}


let calculadora = new Calculadora();