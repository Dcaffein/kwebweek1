const randomBytes = util.promisify(crypto.randomBytes);
const encrypt1 = async text => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const salt = await randomBytes(32); //rainbow table을 사용하는 것을 막기위한 salt
    const digest = await pbkdf2(text, salt, 1, KEY_LEN, ALGO);
    console.log(`${text} | ${salt.toString('base64')} | ${digest.toString('base64')}`);
}

const encrypt2 = async text => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const salt = await randomBytes(32);
    const iter = Math.floor(Math.random() * 20000) + 200000;
    // Hashing을 여러번해서 rainbow table을 사용하는 것을 막음
    const digest = await pbkdf2(text, salt, iter, KEY_LEN, ALGO);
    console.log(`${text} | ${iter} | ${digest.toString('base64')}`);
};

const generatePassword = async password => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const salt = await randomBytes(32);
    const iter = Math.floor(Math.random() * 20000) + 200000;
    const digest = await pbkdf2(password, salt, iter, KEY_LEN, ALGO);
    return `${ALGO}:${salt.toString(
        'base64',
    )}:${iter}:${KEY_LEN}:${digest.toString('base64')}`;
    // 나눠서 저장하면 파악이 용이하기 때문에 하나의 문자열로 합쳐서 저장
};

const verifyPassword = async (password, hashedPassword) => {
    const [algo, encodedSalt, iterStr, keyLenStr, encodedDigest] =
        hashedPassword.split(':');
    const salt = Buffer.from(encodedSalt, 'base64');
    const iter = parseInt(iterStr, 10);
    const keyLen = parseInt(keyLenStr, 10);
    const storedDigest = Buffer.from(encodedDigest, 'base64');
    const digest = await pbkdf2(password, salt, iter, keyLen, algo);
    return Buffer.compare(digest, storedDigest) === 0;
};
