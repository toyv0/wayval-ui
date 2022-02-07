# wayval-ui

Wayval is a platform where you can mint an ERC-721 representation of an account's assets to provide verifiable account information.

this is the frontend repository that interacts with the Wave contract.
contract repo: https://github.com/toyv0/wayval-contract
contract deployed on mumbai testnet here: https://mumbai.polygonscan.com/address/0xA36210fA6072b9E4FB6b906C48D40cE8213F1bb7#code

to run locally: clone repo ➡️ "yarn install" ➡️ "yarn start" (make sure to add the contract address to a .env file and name the variable REACT_APP_WAVE_CONTRACT. Or you can just replace the 3 instances of REACT_APP_WAVE_CONTRACT with 0xA36210fA6072b9E4FB6b906C48D40cE8213F1bb7 

to interact with the wave contract make sure you have the mumbai testnet network setup in your wallet and have some test matic in your wallet(s)

link to add testnet (see add to metamask at bottom of page): https://mumbai.polygonscan.com/
get some test matic here: https://faucet.polygon.technology/

Try it out! Mint a wave to a wallet and recover it. You will get prompts to checkout the transactions as they complete on polygonscan. 

Any questions? Feel free to reach out to me on twitter @_toyvo. 
