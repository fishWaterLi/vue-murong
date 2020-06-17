import CryptoJS from 'crypto-js/crypto-js'

const encrypt = {
  iv: '30313233343536373839414243444546',
  key: '3132333435363738393041424344454631323334353637383930414243444566',
  AESEncrypt: function (src) {
    let key1 = CryptoJS.enc.Hex.parse(encrypt.key);
    let iv1 = CryptoJS.enc.Hex.parse(encrypt.iv);
    let enc = CryptoJS.AES.encrypt(src, key1, {
      iv: iv1,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return enc.ciphertext.toString();
  },
  AESDecrypt: function (enced) {
    let key1 = CryptoJS.enc.Hex.parse(encrypt.key);
    let iv1 = CryptoJS.enc.Hex.parse(encrypt.iv);

    var dec = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(enced), key1, {
      iv: iv1,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(dec);
  }
}

export default encrypt
