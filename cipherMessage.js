//Criação da classe ShiftCipher e definição dos métodos da mesma:
class ShiftCipher {
    constructor(numValue) {
      this._value = numValue;
    }
  
    encrypt(string) {
      var arrOfCharCodes = [];
      var encArrOfCharCodes = [];
      var arrOfEncMessage = [];
      var upperCasedStr = string.toUpperCase();
  
      for (let i = 0; i < upperCasedStr.length; i++) {
      arrOfCharCodes.push(upperCasedStr.charCodeAt(i))
      };
      for (let j = 0; j < arrOfCharCodes.length; j++) {
        if (arrOfCharCodes[j] <= 64) {
          encArrOfCharCodes.push(arrOfCharCodes[j]);
        } else if (arrOfCharCodes[j] >= 91) {
          encArrOfCharCodes.push(arrOfCharCodes[j]);
        } else if (arrOfCharCodes[j] > 64) {
          if ((arrOfCharCodes[j] + this._value) > 90) {
            encArrOfCharCodes.push((arrOfCharCodes[j] - 26) + this._value);
          } else {
            encArrOfCharCodes.push(arrOfCharCodes[j] + this._value);
          }
        } else {
          encArrOfCharCodes.push(arrOfCharCodes[j]);
        }
      };
      for (let k = 0; k < encArrOfCharCodes.length; k++) {
        arrOfEncMessage.push(String.fromCharCode(encArrOfCharCodes[k]));
      };
      return arrOfEncMessage.join('');
    }
  
  
    decrypt(string) {
      var arrOfEncCodes = [];
      var decArrOfCharCodes = [];
      var arrOfDecMessage = [];
      var lowerCasedStr = string.toLowerCase();
  
      for (let i = 0; i < lowerCasedStr.length; i++) {
      arrOfEncCodes.push(lowerCasedStr.charCodeAt(i))
      };
      for (let j = 0; j < arrOfEncCodes.length; j++) {
        if (arrOfEncCodes[j] <= 64) {
          decArrOfCharCodes.push(arrOfEncCodes[j]);
        } else if (arrOfEncCodes[j] <= 96) {
          decArrOfCharCodes.push(arrOfEncCodes[j]);
        } else if ((arrOfEncCodes[j] >= 97) && (arrOfEncCodes[j] <= 122)) {
          if ((arrOfEncCodes[j] - this._value) < 97) {
            decArrOfCharCodes.push(arrOfEncCodes[j] + 26 - this._value);
          } else {
            decArrOfCharCodes.push(arrOfEncCodes[j] - this._value);
          }
        } else {
          decArrOfCharCodes.push(arrOfEncCodes[j]);
        }
      };
      for (let k = 0; k < decArrOfCharCodes.length; k++) {
        arrOfDecMessage.push(String.fromCharCode(decArrOfCharCodes[k]))
      };
      return arrOfDecMessage.join('').toLowerCase();
      }
    };

//Definição das variáveis associadas aos elementos HTML:
var mensagemACriptografar = document.getElementById('mens-a-criptografar');
var numDigitosParaAvancar = document.getElementById('qtde-digitos');
var mensagemCriptografada = document.getElementById('mens-cripto');
var mensOQueFazerComIsso = document.getElementById('recomendacao');
const botaoGerarMens = document.getElementById('gerar-mens');
const botaoVerMens = document.getElementById('ver-mens');

//Declaração das funções para tornar o site funcional:
botaoGerarMens.addEventListener('click', () => {
    let cipher = new ShiftCipher(Number(numDigitosParaAvancar.value));
    mensagemCriptografada.innerHTML = cipher.encrypt(mensagemACriptografar.value);
})  
