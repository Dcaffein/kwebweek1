const util = require('util');
const crypto = require('crypto');
const pbkdf2 = util.promisify(crypto.pbkdf2);
const encrypt = async text => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const digest = await pbkdf2(text, '', 1, KEY_LEN, ALGO);
    console.log(`${text} | ${digest.toString('base64')}`);
};
(async () => await encrypt('samplepassword'))();

//     function pbkdf2(
//      password: BinaryLike,
//      암호화할 문자열

//      salt: BinaryLike,
//      salt 

//      iterations: number,
//      반복횟수
// 
//      keylen: number,
//      byte단위의 길이

//      digest: string,
//      알고리즘
//     callback: (err: Error | null, derivedKey: Buffer) => void,
// ): void;