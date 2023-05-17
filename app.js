const CryptoJS = require('crypto-js');
const MD5 = CryptoJS.MD5;
const SHA1 = CryptoJS.SHA1;

function addElement(word, array) {
    let h0 = hash(0, word, array.length);
    let h1 = hash(1, word, array.length);
    let h2 = hash(2, word, array.length);
    array[h0] = true;
    array[h1] = true;
    array[h2] = true;
}

function isPresent(word, array) {
    let h0 = hash(0, word, array.length);
    let h1 = hash(1, word, array.length);
    let h2 = hash(2, word, array.length);
    return array[h0] && array[h1] && array[h2];
}

function hash(i, word, length) {
    let hexString;
    switch (i) {
        case 0:
            hexString = MD5(word).toString(CryptoJS.enc.Hex).substring(0, 8);
            return parseInt(hexString, 16) % length;
            break;
        case 1:
            hexString = SHA1(word).toString(CryptoJS.enc.Hex).substring(0, 8);
            return parseInt(hexString, 16) % length;
            break;
        default:
            return (hash(0, word, length) + i * hash(1, word, length)) % length;
            break;
    }
}

module.exports = { addElement, isPresent };
