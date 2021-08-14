import config from '../config';
import async from 'async';
import {
  ERROR,
  CONFIGURE,
  CONFIGURE_RETURNED,
  GET_BALANCES,
  GET_BALANCES_RETURNED,
  GET_BALANCES_PERPETUAL,
  GET_BALANCES_PERPETUAL_RETURNED,
  STAKE,
  STAKE_RETURNED,
  WITHDRAW,
  WITHDRAW_RETURNED,
  GET_REWARDS,
  GET_REWARDS_RETURNED,
  EXIT,
  EXIT_RETURNED,
} from '../constants';
import Web3 from 'web3';

import { binance, injected, walletconnect } from './connectors';

const Dispatcher = require('flux').Dispatcher;
const Emitter = require('events').EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

class Store {
  constructor() {
    this.store = {
      votingStatus: false,
      currentBlock: 0,
      universalGasPrice: '5',
      account: {},
      web3: null,
      connectorsByName: {
        MetaMask: injected,
        TrustWallet: injected,
        BinanceWallet: binance,
        WalletConnect: walletconnect,
      },
      web3context: null,
      languages: [
        {
          language: 'English',
          code: 'en',
        },
        {
          language: 'Japanese',
          code: 'ja',
        },
        {
          language: 'Chinese',
          code: 'zh',
        },
      ],
      proposals: [],

      rewardPools: [
                  {
          id: 'farmpcs',
          logo: 'sfnobg.png',
          name: 'PCS-LP',
          brief: 'get the gecko SPHN/BNB PCS LP earns SPHN',
          link: 'https://pancakeswap.finance/add/BNB/0xb58a579e8f987b52564A5fE08Fe5181dc2621a9c',
          depositsEnabled: true,
          tokens: [
            {
              id: 'sphn-farmpcs',
              logo: 'sfnobg.png',
              address: '0xe6b3b02cefaaca05635cadfe4ebb1dfbbde60732',
              symbol: 'SPHN-BNB hyperLP',
              abi: config.erc20ABI,
              rewardsToken: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              rewardsAddress: '0xDf904f97C2574f5F3837f1cD36C01479d22437C6',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'SPHN',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },

          {
          id: 'BUSDnew',
          logo: 'BUSD.svg',
          name: 'SPHN',
          brief: 'BUSD perma-pool',
          link: 'https://binance.org',
          depositsEnabled: true,
          tokens: [
            {
              id: 'sphn-busdnew',
              logo: 'BUSD.svg',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
              rewardsAddress: '0xCa8Ee9c4F51e6513B06be4a35E90B99a0Fa22B3b',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'BUSD',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
                        {
          id: 'wings',
          logo: 'wings.jpg',
          name: 'ENDED',
          brief: 'earns WINGS until 13/08/21',
          link: 'https://jetswap.finance',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-wings',
              logo: 'wings.jpg',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0x0487b824c8261462f88940f97053e65bdb498446',
              rewardsAddress: '0xF3c6ceB87452cBAb0Dd5a9da65fEA7B16e0B91FB',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'WINGS',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
                  {
          id: 'wingsold',
          logo: 'wings.jpg',
          name: 'ENDED',
          brief: 'earns WINGS until 03/08/21',
          link: 'https://jetswap.finance',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-wingsold',
              logo: 'wings.jpg',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0x0487b824c8261462f88940f97053e65bdb498446',
              rewardsAddress: '0xd5622fc189C220c04f252c55D8CbDbC7Ea4a5C3E',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'WINGS',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
                        {
          id: 'alloynew',
          logo: 'alloy.png',
          name: 'PAUSED',
          brief: 'ALLOY perma-pool',
          link: 'https://hyperjump.fi',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-alloynew',
              logo: 'alloy.png',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0x5ef5994fa33ff4eb6c82d51ee1dc145c546065bd',
              rewardsAddress: '0x3BD631b3FC0672614A0A98422c5b38c2fD7317E1',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'ALLOY',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
          {
          id: 'farmnew',
          logo: 'sfnobg.png',
          name: 'ENDED',
          brief: 'earns SPHN',
          link: 'https://siphon.finance',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-farmnew',
              logo: 'sfnobg.png',
              address: '0x402E6B9F9A2959d6f4eb398071d90270a6583C73',
              symbol: 'SPHN-BNB hyperLP',
              abi: config.erc20ABI,
              rewardsToken: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              rewardsAddress: '0xe46a1d9d043D74561e889C8Dd521cf3D5663736C',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'SPHN',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },

                {
          id: 'alloytemp',
          logo: 'alloy.png',
          name: 'ENDED',
          brief: 'ALLOY temp-pool',
          link: 'https://hyperjump.fi',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-alloytemp',
              logo: 'alloy.png',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0x5ef5994fa33ff4eb6c82d51ee1dc145c546065bd',
              rewardsAddress: '0x79C79781d509ad3EBD586AAd4Eda4da908A28691',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'ALLOY',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
        

                  {
          id: 'farm',
          logo: 'sfnobg.png',
          name: 'ENDED',
          brief: 'earns SPHN',
          link: 'https://siphon.finance',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-farm',
              logo: 'sfnobg.png',
              address: '0x402E6B9F9A2959d6f4eb398071d90270a6583C73',
              symbol: 'SPHN-BNB hyperLP',
              abi: config.erc20ABI,
              rewardsToken: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              rewardsAddress: '0xd2775ac622c48dc205Bdf74053FB9d2b695C561d',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'SPHN',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
        {
          id: 'alloy',
          logo: 'alloy.png',
          name: 'ENDED',
          brief: 'earns ALLOY',
          link: 'https://hyperjump.fi',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-alloy',
              logo: 'alloy.png',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0x5ef5994fa33ff4eb6c82d51ee1dc145c546065bd',
              rewardsAddress: '0xa5824bBabB25F8d3E03453E1a6A981c374C943D8',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'ALLOY',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },


                {
          id: 'cdmc',
          logo: 'cdmc.png',
          name: 'ENDED',
          brief: 'earns CDMC',
          link: 'https://t.me/coindemic',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-cdmc',
              logo: 'cdmc.png',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0xef52250c313df3321ce27290092cd9e984e6f33a',
              rewardsAddress: '0xB6a5514aBAEf7fa1D4ddE1657659245F25D46Fa2',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'CDMC',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },

        
          {
          id: 'farmno',
          logo: 'sfnobg.png',
          name: 'ENDED',
          brief: 'earns SPHN',
          link: 'https://siphon.finance',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-farmno',
              logo: 'sfnobg.png',
              address: '0x402E6B9F9A2959d6f4eb398071d90270a6583C73',
              symbol: 'SPHN-BNB hyperLP',
              abi: config.erc20ABI,
              rewardsToken: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              rewardsAddress: '0x8B29e163b2643F6e7Ab59330F52759327cB8F83C',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'SPHN',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
        {
          id: 'alloyno',
          logo: 'alloy.png',
          name: 'ENDED',
          brief: 'earns ALLOY',
          link: 'https://hyperjump.fi',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-alloyno',
              logo: 'alloy.png',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0x5ef5994fa33ff4eb6c82d51ee1dc145c546065bd',
              rewardsAddress: '0x1b11e43c80c341F3721b32EDAee1C46986C3A8f8',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'ALLOY',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
                {
          id: 'cdmcno',
          logo: 'cdmc.png',
          name: 'ENDED',
          brief: 'earns CDMC',
          link: 'https://t.me/coindemic',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-cdmcno',
              logo: 'cdmc.png',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0xef52250c313df3321ce27290092cd9e984e6f33a',
              rewardsAddress: '0x957049EFB41f31aB0204414ebB84db087aD03B1F',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'CDMC',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },

                {
          id: 'farmold',
          logo: 'sfnobg.png',
          name: 'ENDED',
          brief: 'Hyper LP earn sphn',
          link: 'https://siphon.finance',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-farmold',
              logo: 'sfnobg.png',
              address: '0x402E6B9F9A2959d6f4eb398071d90270a6583C73',
              symbol: 'SPHN-BNB hyperLP',
              abi: config.erc20ABI,
              rewardsToken: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              rewardsAddress: '0x75fE58852C96b3A47A7Aec22F15612F345b3cA85',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'SPHN',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
        {
          id: 'fts',
          logo: 'fts.svg',
          name: 'ENDED',
          brief: 'sphn',
          link: 'https://fortress.loans',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-fts',
              logo: 'fts.svg',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0x4437743ac02957068995c48e08465e0ee1769fbe',
              rewardsAddress: '0x4A2bD3F69D8D2B2134a6Ec07336D04f14A630236',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'FTS',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
        {
          id: 'BUSD',
          logo: 'BUSD.svg',
          name: 'ENDED',
          brief: 'sphn',
          link: 'https://binance.org',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-busd',
              logo: 'BUSD.svg',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
              rewardsAddress: '0xF9900C4252ED7d96Ca4cE3258f92CE9227EC7aa8',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'BUSD',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },

                {
          id: 'clock',
          logo: 'sfnobg.png',
          name: 'ENDED',
          brief: 'earns SPHN',
          link: 'https://siphon.finance',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-clock',
              logo: 'sfnobg.png',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              rewardsAddress: '0x60045F0de5F39EE424ab4b04E380444f311EE3a7',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'SPHN',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
        {
          id: 'oldsphn',
          logo: 'sfnobg.png',
          name: 'ENDED',
          brief: 'earns SPHN',
          link: 'https://siphon.finance',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-sphno',
              logo: 'sfnobg.png',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              rewardsAddress: '0xABd8515a641ac56E00632dfF6D860faD7F66f231',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'SPHN',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },

        {
          id: 'oldfts',
          logo: 'fts.svg',
          name: 'ENDED',
          brief: 'earns FTS',
          link: 'https://fortress.loans',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-ftso',
              logo: 'fts.svg',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0x4437743ac02957068995c48e08465e0ee1769fbe',
              rewardsAddress: '0x1b1b8BF0B7BFbA18f35674c1ebb3d408cb87091b',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'FTS',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },

        {
          id: 'OLDBUSD',
          logo: 'BUSD.svg',
          name: 'ENDED',
          brief: 'earns BUSD',
          link: 'https://binance.org',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-busdo',
              logo: 'BUSD.svg',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
              rewardsAddress: '0x071a961Ad32C3E1CdB4Ce9a1b03B235Ec1B595a6',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: 'BUSD',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },

        // {
        //   id: 'TEST',
        //   logo: 'BUSD.svg',
        //   name: 'SPHN',
        //   brief: 'earns WBNB',
        //   link: 'https://binance.org',
        //   depositsEnabled: true,
        //   tokens: [
        //     {
        //       id: 'SPHN',
        //       logo: 'BUSD.svg',
        //       address: '0x7d3cfe36776f39e6b7036e8e32d1a31fbfa579fa',
        //       symbol: 'SPHN',
        //       abi: config.erc20ABI,
        //       rewardsToken: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
        //       rewardsAddress: '0x891384B3ab22d2939c6D28FF0CE0c8e7D24c6895',
        //       rewardsABI: config.govPoolABI,
        //       rewardsSymbol: 'WBNB',
        //       decimals: 18,
        //       balance: 0,
        //       stakedBalance: 0,
        //       rewardsAvailable: 0,
        //       tvl: 0,
        //       rewardRate: 0,
        //     },
        //   ],
        // },
      ],
    };

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case CONFIGURE:
            this.configure(payload);
            break;
          case GET_BALANCES:
            this.getBalances(payload);
            break;
          case GET_BALANCES_PERPETUAL:
            this.getBalancesPerpetual(payload);
            break;
          case STAKE:
            this.stake(payload);
            break;
          case WITHDRAW:
            this.withdraw(payload);
            break;
          case GET_REWARDS:
            this.getReward(payload);
            break;
          case EXIT:
            this.exit(payload);
            break;
          default: {
            console.error('Unknown payload type:', payload);
          }
        }
      }.bind(this)
    );
  }

  getStore(index) {
    return this.store[index];
  }

  setStore(obj) {
    this.store = { ...this.store, ...obj };
    // console.log(this.store)
    return emitter.emit('StoreUpdated');
  }

  configure = async () => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const currentBlock = await web3.eth.getBlockNumber();

    store.setStore({ currentBlock: currentBlock });

    window.setTimeout(() => {
      emitter.emit(CONFIGURE_RETURNED);
    }, 100);
  };

  getBalancesPerpetual = async () => {
    const pools = store.getStore('rewardPools');
    const account = store.getStore('account');

    const web3 = new Web3(store.getStore('web3context').library.provider);

    const currentBlock = await web3.eth.getBlockNumber();
    store.setStore({ currentBlock: currentBlock });

    async.map(
      pools,
      (pool, callback) => {
        async.map(
          pool.tokens,
          (token, callbackInner) => {
            async.parallel(
              [
                callbackInnerInner => {
                  this._getERC20Balance(web3, token, account, callbackInnerInner);
                },
                callbackInnerInner => {
                  this._getstakedBalance(web3, token, account, callbackInnerInner);
                },
                callbackInnerInner => {
                  this._getRewardsAvailable(web3, token, account, callbackInnerInner);
                },
                callbackInnerInner => {
                  this._getTotalValueLocked(web3, token, account, callbackInnerInner);
                },
                callbackInnerInner => {
                  this._getRewardRate(web3, token, account, callbackInnerInner);
                },
              ],
              (err, data) => {
                if (err) {
                  console.log(err);
                  return callbackInner(err);
                }

                token.balance = data[0];
                token.stakedBalance = data[1];
                token.rewardsAvailable = data[2];
                token.tvl = data[3];
                token.rewardRate = data[4];

                callbackInner(null, token);
              }
            );
          },
          (err, tokensData) => {
            if (err) {
              console.log(err);
              return callback(err);
            }

            pool.tokens = tokensData;
            callback(null, pool);
          }
        );
      },
      (err, poolData) => {
        if (err) {
          console.log(err);
          return emitter.emit(ERROR, err);
        }
        store.setStore({ rewardPools: poolData });
        emitter.emit(GET_BALANCES_PERPETUAL_RETURNED);
        emitter.emit(GET_BALANCES_RETURNED);
      }
    );
  };

  getBalances = () => {
    const pools = store.getStore('rewardPools');
    const account = store.getStore('account');

    const web3 = new Web3(store.getStore('web3context').library.provider);

    async.map(
      pools,
      (pool, callback) => {
        async.map(
          pool.tokens,
          (token, callbackInner) => {
            async.parallel(
              [
                callbackInnerInner => {
                  this._getERC20Balance(web3, token, account, callbackInnerInner);
                },
                callbackInnerInner => {
                  this._getstakedBalance(web3, token, account, callbackInnerInner);
                },
                callbackInnerInner => {
                  this._getRewardsAvailable(web3, token, account, callbackInnerInner);
                },
                callbackInnerInner => {
                  this._getTotalValueLocked(web3, token, account, callbackInnerInner);
                },
                callbackInnerInner => {
                  this._getRewardRate(web3, token, account, callbackInnerInner);
                },
              ],
              (err, data) => {
                if (err) {
                  console.log(err);
                  return callbackInner(err);
                }

                token.balance = data[0];
                token.stakedBalance = data[1];
                token.rewardsAvailable = data[2];
                token.tvl = data[3];
                token.rewardRate = data[4];

                callbackInner(null, token);
              }
            );
          },
          (err, tokensData) => {
            if (err) {
              console.log(err);
              return callback(err);
            }

            pool.tokens = tokensData;
            callback(null, pool);
          }
        );
      },
      (err, poolData) => {
        if (err) {
          console.log(err);
          return emitter.emit(ERROR, err);
        }
        store.setStore({ rewardPools: poolData });
        emitter.emit(GET_BALANCES_RETURNED);
      }
    );
  };

  _checkApproval = async (asset, account, amount, contract, callback) => {
    try {
      const web3 = new Web3(store.getStore('web3context').library.provider);

      const erc20Contract = new web3.eth.Contract(asset.abi, asset.address);
      const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address });

      const ethAllowance = web3.utils.fromWei(allowance, 'ether');

      if (parseFloat(ethAllowance) < parseFloat(amount)) {
        await erc20Contract.methods.approve(contract, web3.utils.toWei('9999999999', 'ether')).send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
        });
        callback();
      } else {
        callback();
      }
    } catch (error) {
      console.log(error);
      if (error.message) {
        return callback(error.message);
      }
      callback(error);
    }
  };

  _checkApprovalWaitForConfirmation = async (asset, account, amount, contract, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.address);
    const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address });

    const ethAllowance = web3.utils.fromWei(allowance, 'ether');

    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      erc20Contract.methods
        .approve(contract, web3.utils.toWei('9999999999', 'ether'))
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
        })
        .on('transactionHash', function (hash) {
          callback();
        })
        .on('error', function (error) {
          if (!error.toString().includes('-32601')) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        });
    } else {
      callback();
    }
  };

  _getERC20Balance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.address);

    try {
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      balance = parseFloat(balance) / 10 ** asset.decimals;
      callback(null, parseFloat(balance));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getstakedBalance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

    try {
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      balance = parseFloat(balance) / 10 ** asset.decimals;
      callback(null, parseFloat(balance));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getRewardsAvailable = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

    try {
      var earned = await erc20Contract.methods.earned(account.address).call({ from: account.address });
      earned = parseFloat(earned) / 10 ** asset.decimals;
      callback(null, parseFloat(earned));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getTotalValueLocked = async (web3, asset, account, callback) => {
    let lpTokenContract = new web3.eth.Contract(asset.abi, asset.address);
    try {
      let tvl = await lpTokenContract.methods.balanceOf(asset.rewardsAddress).call({ from: account.address });
      tvl = parseFloat(tvl) / 10 ** asset.decimals;
      callback(null, parseFloat(tvl));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getRewardRate = async (web3, asset, account, callback) => {
    let rewardsPoolContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);
    try {
      let rewardRate = await rewardsPoolContract.methods.rewardRate().call({ from: account.address });
      rewardRate = parseFloat(rewardRate) / 10 ** asset.decimals;
      callback(null, parseFloat(rewardRate));
    } catch (ex) {
      return callback(ex);
    }
  };

  _checkIfApprovalIsNeeded = async (asset, account, amount, contract, callback, overwriteAddress) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, overwriteAddress ? overwriteAddress : asset.address);
    const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address });

    const ethAllowance = web3.utils.fromWei(allowance, 'ether');
    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      asset.amount = amount;
      callback(null, asset);
    } else {
      callback(null, false);
    }
  };

  _callApproval = async (asset, account, amount, contract, last, callback, overwriteAddress) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, overwriteAddress ? overwriteAddress : asset.address);
    try {
      if (last) {
        await erc20Contract.methods.approve(contract, web3.utils.toWei('9999999999', 'ether')).send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
        });
        callback();
      } else {
        erc20Contract.methods
          .approve(contract, web3.utils.toWei('9999999999', 'ether'))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
          })
          .on('transactionHash', function (hash) {
            callback();
          })
          .on('error', function (error) {
            if (!error.toString().includes('-32601')) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          });
      }
    } catch (error) {
      if (error.message) {
        return callback(error.message);
      }
      callback(error);
    }
  };

  stake = payload => {
    const account = store.getStore('account');
    const { asset, amount } = payload.content;

    this._checkApproval(asset, account, amount, asset.rewardsAddress, err => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      this._callStake(asset, account, amount, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(STAKE_RETURNED, res);
      });
    });
  };

  _callStake = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

    var amountToSend = web3.utils.toWei(amount, 'ether');
    if (asset.decimals !== 18) {
      amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    }

    yCurveFiContract.methods
      .stake(amountToSend)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
      })
      .on('transactionHash', function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} });
        }
      })
      .on('receipt', function (receipt) {
        console.log(receipt);
      })
      .on('error', function (error) {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch(error => {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  withdraw = payload => {
    const account = store.getStore('account');
    const { asset, amount } = payload.content;

    this._callWithdraw(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(WITHDRAW_RETURNED, res);
    });
  };

  _callWithdraw = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

    var amountToSend = web3.utils.toWei(amount, 'ether');
    if (asset.decimals !== 18) {
      amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    }

    yCurveFiContract.methods
      .withdraw(amountToSend)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
      })
      .on('transactionHash', function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} });
        }
      })
      .on('receipt', function (receipt) {
        console.log(receipt);
      })
      .on('error', function (error) {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch(error => {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  getReward = payload => {
    const account = store.getStore('account');
    const { asset } = payload.content;

    this._callGetReward(asset, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(GET_REWARDS_RETURNED, res);
    });
  };

  _callGetReward = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

    yCurveFiContract.methods
      .getReward()
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
      })
      .on('transactionHash', function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} });
        }
      })
      .on('receipt', function (receipt) {
        console.log(receipt);
      })
      .on('error', function (error) {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch(error => {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  exit = payload => {
    const account = store.getStore('account');
    const { asset } = payload.content;

    this._callExit(asset, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(EXIT_RETURNED, res);
    });
  };

  _callExit = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

    yCurveFiContract.methods
      .exit()
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
      })
      .on('transactionHash', function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} });
        }
      })
      .on('receipt', function (receipt) {
        console.log(receipt);
      })
      .on('error', function (error) {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch(error => {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  _getGasPrice = async () => {
    return store.getStore('universalGasPrice');
  };
}

var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter,
};
