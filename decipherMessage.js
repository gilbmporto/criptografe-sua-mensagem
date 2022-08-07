//A Class to Encrypt and Decrypt messages:
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

//Variables of the Decrypt It Page:
var PostedEncryptedMessage = document.getElementById('ver-mens-a-descriptografar');
var messageToDecrypt = document.getElementById('mens-a-descriptografar');
var numOfDigitsToGoBack = document.getElementById('qtde-digitos-dec');
const decryptedMessage = document.getElementById('mens-descripto');
const InstructionsMessage = document.getElementById('mens-usuario');
const btnPostEncryptedMessage = document.getElementById('posted-encrypted-mens');
const btnSeeDecryptedMessage = document.getElementById('decrypted-mens');

//Variables representing the HTML elements - Loading 
const LoadingBar = document.getElementById('theInsideLoadBar');
const OutterLoadingBar = document.getElementById('theOutsideLoadBar');
var loadingTxt = document.getElementById("loadingTxt");

//Function to modify the website dinamically;
const modificarElementos = (tempo, func) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(func());
        }, tempo)
    }) 
};

//First, we need the message and the number of digits used by the person who encrypted the message:
btnPostEncryptedMessage.onclick = () => {
    PostedEncryptedMessage.innerHTML = messageToDecrypt.value;
    cipher = new ShiftCipher(Number(numOfDigitsToGoBack.value))
};

//Now, to decrypt the received message, we'll use this:
const decryptItNow = async () => {
    let firstAction = await modificarElementos(0, () => {
        OutterLoadingBar.style.display = 'block';
    });
    console.log(firstAction);
    let secondAction = await modificarElementos(500, () => {
        LoadingBar.style.width = '100%';
    });
    console.log(secondAction);
    let thirdAction = await modificarElementos(300, () => {
        loadingTxt.innerHTML = 'Loading';
    });
    console.log(thirdAction);
    let fourthAction = await modificarElementos(1300, () => {
        decryptedMessage.innerHTML = cipher.decrypt((PostedEncryptedMessage.innerHTML).toString());
        InstructionsMessage.style.display = 'block';
        InstructionsMessage.innerHTML = 'Mensagem acima descriptografada! 🔓';
    });
    console.log(fourthAction);
    let finalAction = await modificarElementos(200, () => {
        OutterLoadingBar.style.display = 'none';
        LoadingBar.style.width = '0%';
        loadingTxt.innerHTML = '';
    });
    console.log(finalAction);
};



btnSeeDecryptedMessage.addEventListener('click', decryptItNow);