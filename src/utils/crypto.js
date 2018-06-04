import {
  getSignature
} from '../service/login';
import {
  randomStr
} from './random-str';

const CryptoJS = require('./lib/crypto');

const encrypt = (str, IV = '') => {
  const encryptIV = IV || randomStr(16);
  const SECRET_KEY = getSignature();
  const key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(SECRET_KEY));
  const iv = CryptoJS.enc.Utf8.parse(encryptIV);
  const code = CryptoJS.AES.encrypt(str, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  }).toString();

  return {
    encryptIV,
    code
  };
};

const decrypt = (str, encryptIV) => {
  try {
    const SECRET_KEY = getSignature();
    const key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(SECRET_KEY));
    const iv = CryptoJS.enc.Utf8.parse(encryptIV);
    const res = CryptoJS.AES.decrypt(str, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return res.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decrypt Error:', error.message);
    throw error;
  }
};

export {
  encrypt,
  decrypt
};