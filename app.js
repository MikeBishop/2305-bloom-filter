const CryptoJS = require('crypto-js');
const MD5 = CryptoJS.MD5;
const SHA1 = CryptoJS.SHA1;

class BloomFilter {
    constructor(numHash, size) {
        this.numHash = numHash;
        this.array = Array(size).fill(false);
    }

    addElement(word) {
        let h0 = this.hash(0, word, this.array.length);
        let h1 = this.hash(1, word, this.array.length);
        let h2 = this.hash(2, word, this.array.length);
        this.array[h0] = true;
        this.array[h1] = true;
        this.array[h2] = true;
    }

    isPresent(word) {
        let h0 = this.hash(0, word, this.array.length);
        let h1 = this.hash(1, word, this.array.length);
        let h2 = this.hash(2, word, this.array.length);
        return this.array[h0] && this.array[h1] && this.array[h2];
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
