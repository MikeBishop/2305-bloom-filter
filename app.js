const CryptoJS = require('crypto-js');
const MD5 = CryptoJS.MD5;
const SHA1 = CryptoJS.SHA1;

class BloomFilter {
    constructor(numHash, size) {
        this.numHash = numHash;
        this.array = Array(size).fill(false);
    }

    addElement(word) {
        let indices = Array(this.numHash).fill().map((_, i) => this.hash(i, word, this.array.length));
        indices.forEach(i => this.array[i] = true);
    }

    isPresent(word) {
        let indices = Array(this.numHash).fill().map((_, i) => this.hash(i, word, this.array.length));
        return indices.every(i => this.array[i]);
    }

    hash(i, word, length) {
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
                return (this.hash(0, word, length) + i * this.hash(1, word, length)) % length;
                break;
        }
    }
}


module.exports = { BloomFilter };
