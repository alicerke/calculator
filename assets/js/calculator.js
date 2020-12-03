'use strcit';

let calcString = '';
const numbersArr = [];
const operatorsArr = [];
let result = 0;

const keys = document.querySelectorAll('[data-value]');
const output = document.querySelector('.output');
const equal = document.querySelector('[data-equal]');
const clear = document.querySelector('[data-clear]');

const operatorsObj = {
    '+': (number1, number2) => (number1 + number2),                                                             
    '-': (number1, number2) => (number1 - number2),                                                             
    '*': (number1, number2) => (number1 * number2),                                                             
    '/': (number1, number2) => (number1 / number2)                                                              
};

// Számok és az operatorok beolvasása egy stringbe.
keys.forEach( keys => {
    keys.addEventListener('click', (event) => {
        calcString += event.target.dataset.value;
        writeOutput(calcString);
    });
});

// Számok és az operátorok kiírása az .output classú input elembe.
function writeOutput(value) {
    output.value = value;
};

// Egyenlőség jel button megnyomásának kezelése.
equal.addEventListener('click', () => {
    console.log(calcString);
    stringSort(calcString);
    numbersArr.forEach( item => {
        if ( isNaN(item) ) {
            clearAll();
            const error = 'Error';
            writeOutput(error); 
        } else {
            resultOperations ();
            writeOutput(result);
            clearAll();
        }
    });
});

// Clear button lenyomása
clear.addEventListener('click', () => {
    clearAll();
    const clearOut = '';
    writeOutput(clearOut);
});

// A számokat és az operátorokat tartalmazó strin szétválogatása kettő tömbbe.
function stringSort (string) {
    let num = '';
    const acceptableSigns = ['+', '-', '/', '*'];
    for (let i = 0; i < string.length; i += 1) {
        if (acceptableSigns.indexOf(string[i]) === -1) {
            num += string[i];
        } else {
            numbersArr.push(parseFloat(num));
            num = '';
            operatorsArr.push(string[i]);
        };
    };
    numbersArr.push(parseFloat(num));
    return numbersArr, operatorsArr;
};

// Tisztítjuk a tömböket és stringet.
const clearAll = () => {
    numbersArr.splice(0, numbersArr.length); 
    operatorsArr.splice(0, operatorsArr.length); 
    calcString = ''; 
};

// Műveletek elvégzése
function resultOperations () {
    result = numbersArr[0];
    operatorsArr.forEach((item, index) => { 
        result = operatorsObj[item](result, numbersArr[index+1])
    });
    console.log(result);
    return result;
};
