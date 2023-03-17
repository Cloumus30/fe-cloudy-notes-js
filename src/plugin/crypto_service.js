import cryptoJs from "crypto-js";


export const encryptBody = (body) =>{
    const encryptedString = cryptoJs.AES.encrypt(JSON.stringify(body), import.meta.env.VITE_CRYPTO_SECRET).toString();
    return {isis: encryptedString}
}