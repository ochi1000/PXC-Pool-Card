const { v4: uuidv4 } = require('uuid');
const algosdk = require('algosdk');

const createWallet = () => {
    const generatedAccount = algosdk.generateAccount();
    const passphrase = algosdk.secretKeyToMnemonic(generatedAccount.sk);
    const walletAddress = generatedAccount.addr;
    console.log(`My address: ${walletAddress}`);
    console.log(`My passphrase: ${passphrase}`);
    return walletAddress;
};

module.exports = {
    createWallet
};
