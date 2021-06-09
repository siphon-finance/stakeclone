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
  JOIN_POOL,
  REMOVE_POOL,
  NFT_POOL,
  NFT_POOL_RECEIVED,
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
      universalGasPrice: '20',
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

      nftPools: {
        id: 'sphn',
        logo: 'sfnobg.png',
        name: 'SPHN',
        brief: 'earns SPHN',
        link: 'https://siphon.finance',
        nftAddress: '0xf375dA1429658c2Fe04BD6b1ea6B2f7158781a30',
        sphnNifty: '0x180edb4e907442fbe188af3369e430d9b8d6556c',
        depositsEnabled: true,
        pools: [88, 888],
        poolInfo: [],
        poolLength: 2,
        investCap: 0,
        maxInvestorNumber: 0,
        maxPoolCapacity: 0,
      },

      rewardPools: [
        {
          id: 'sphn',
          logo: 'sfnobg.png',
          name: 'SPHN',
          brief: 'earns SPHN',
          link: 'https://siphon.finance',
          depositsEnabled: true,
          tokens: [
            {
              id: 'sphn-sphn',
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
          id: 'fts',
          logo: 'fts.svg',
          name: 'SPHN',
          brief: 'earns FTS',
          link: 'https://fortress.loans',
          depositsEnabled: true,
          tokens: [
            {
              id: 'sphn-fts',
              logo: 'fts.svg',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SRT',
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
          id: 'BUSD',
          logo: 'BUSD.svg',
          name: 'SPHN',
          brief: 'earns BUSD',
          link: 'https://binance.org',
          depositsEnabled: true,
          tokens: [
            {
              id: 'sphn-busd',
              logo: 'BUSD.svg',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SRT',
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

        {
          id: 'clock',
          logo: 'sfnobg.png',
          name: 'SPHN',
          brief: 'earns ?',
          link: 'https://siphon.finance',
          depositsEnabled: false,
          tokens: [
            {
              id: 'sphn-clock',
              logo: 'sfnobg.png',
              address: '0xb58a579e8f987b52564a5fe08fe5181dc2621a9c',
              symbol: 'SPHN',
              abi: config.erc20ABI,
              rewardsToken: '0xA1448795fc2489EadAF5e90d8c7d4cbdc8EF5D19',
              rewardsAddress: '0xF6d33a859Ee04C77E480d438Fe4E93e52857fCBB',
              rewardsABI: config.govPoolABI,
              rewardsSymbol: '?',
              decimals: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              tvl: 0,
              rewardRate: 0,
            },
          ],
        },
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
          case NFT_POOL:
            this.nftPool(payload);
            break;
          case JOIN_POOL:
            this.joinPool(payload);
            break;
          case REMOVE_POOL:
            this.removePool(payload);
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

  nftPool = async (payload) => {
    const account = store.getStore('account');
    const nftPools = store.getStore('nftPools');
    const { asset } = payload.content;
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const nftContract = new web3.eth.Contract(asset, nftPools.nftAddress);

    let poolInfo = [];

    for (let i = 0; i < nftPools.poolLength; i++) {
      try {
        const tmp = await nftContract.methods
          .sphnPools(nftPools.pools[i])
          .call({ from: account.address });
        poolInfo.push(tmp);
      } catch (err) {}
    }

    const _investCap = await nftContract.methods._investCap().call();
    const _maxPoolCapacity = await nftContract.methods
      ._maxPoolCapacity()
      .call();
    const _maxInvestorNumber = await nftContract.methods
      ._maxInvestorNumber()
      .call();

    store.setStore({
      nftPools: {
        ...nftPools,
        poolInfo: [...poolInfo],
        investCap: web3.utils.fromWei(_investCap),
        maxPoolCapacity: _maxPoolCapacity,
        maxInvestorNumber: _maxInvestorNumber,
      },
    });
    window.setTimeout(() => {
      emitter.emit(NFT_POOL_RECEIVED);
    }, 100);
  };

  joinPool = async (payload) => {
    const account = store.getStore('account');
    const nftPools = store.getStore('nftPools');
    const { asset, sphnAsset, poolID } = payload.content;
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const nftContract = new web3.eth.Contract(asset, nftPools.nftAddress);
    const sphnNiftyContract = new web3.eth.Contract(
      sphnAsset,
      nftPools.sphnNifty
    );

    console.log(payload.content);
    await nftContract.methods
      .joinNftPool(
        poolID,
        'https://gateway.pinata.cloud/ipfs/QmT5cv8bACuAsJtDrffe5ZwSTexqJtNjUjCCW5DpRrWxyQ'
      )
      .send({ from: account.address, value: 0 });

    const isApproved = await sphnNiftyContract.methods
      .isApprovedForAll(account.address, nftPools.nftAddress)
      .call();

    if (!isApproved) {
      await sphnNiftyContract.methods
        .setApprovalForAll(nftPools.nftAddress)
        .send({ from: account.address });
    }
  };

  removePool = async (payload) => {
    const account = store.getStore('account');
    const nftPools = store.getStore('nftPools');
    const { asset, poolID } = payload.content;
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const nftContract = new web3.eth.Contract(asset, nftPools.nftAddress);
    const tokenId = await nftContract.methods
      .nftIndicies(account.address)
      .call();

    console.log('====', tokenId);

    if (tokenId > 0) {
      await nftContract.methods
        .removeFromNftPool(poolID)
        .send({ from: account.address, value: 0 });
    }
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
                (callbackInnerInner) => {
                  this._getERC20Balance(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
                (callbackInnerInner) => {
                  this._getstakedBalance(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
                (callbackInnerInner) => {
                  this._getRewardsAvailable(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
                (callbackInnerInner) => {
                  this._getTotalValueLocked(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
                (callbackInnerInner) => {
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
                (callbackInnerInner) => {
                  this._getERC20Balance(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
                (callbackInnerInner) => {
                  this._getstakedBalance(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
                (callbackInnerInner) => {
                  this._getRewardsAvailable(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
                (callbackInnerInner) => {
                  this._getTotalValueLocked(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
                (callbackInnerInner) => {
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
      const allowance = await erc20Contract.methods
        .allowance(account.address, contract)
        .call({ from: account.address });

      const ethAllowance = web3.utils.fromWei(allowance, 'ether');

      if (parseFloat(ethAllowance) < parseFloat(amount)) {
        await erc20Contract.methods
          .approve(contract, web3.utils.toWei('9999999999', 'ether'))
          .send({
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

  _checkApprovalWaitForConfirmation = async (
    asset,
    account,
    amount,
    contract,
    callback
  ) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.address);
    const allowance = await erc20Contract.methods
      .allowance(account.address, contract)
      .call({ from: account.address });

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
      var balance = await erc20Contract.methods
        .balanceOf(account.address)
        .call({ from: account.address });
      balance = parseFloat(balance) / 10 ** asset.decimals;
      callback(null, parseFloat(balance));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getstakedBalance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );

    try {
      var balance = await erc20Contract.methods
        .balanceOf(account.address)
        .call({ from: account.address });
      balance = parseFloat(balance) / 10 ** asset.decimals;
      callback(null, parseFloat(balance));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getRewardsAvailable = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );

    try {
      var earned = await erc20Contract.methods
        .earned(account.address)
        .call({ from: account.address });
      earned = parseFloat(earned) / 10 ** asset.decimals;
      callback(null, parseFloat(earned));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getTotalValueLocked = async (web3, asset, account, callback) => {
    let lpTokenContract = new web3.eth.Contract(asset.abi, asset.address);
    try {
      let tvl = await lpTokenContract.methods
        .balanceOf(asset.rewardsAddress)
        .call({ from: account.address });
      tvl = parseFloat(tvl) / 10 ** asset.decimals;
      callback(null, parseFloat(tvl));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getRewardRate = async (web3, asset, account, callback) => {
    let rewardsPoolContract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );
    try {
      let rewardRate = await rewardsPoolContract.methods
        .rewardRate()
        .call({ from: account.address });
      rewardRate = parseFloat(rewardRate) / 10 ** asset.decimals;
      callback(null, parseFloat(rewardRate));
    } catch (ex) {
      return callback(ex);
    }
  };

  _checkIfApprovalIsNeeded = async (
    asset,
    account,
    amount,
    contract,
    callback,
    overwriteAddress
  ) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      overwriteAddress ? overwriteAddress : asset.address
    );
    const allowance = await erc20Contract.methods
      .allowance(account.address, contract)
      .call({ from: account.address });

    const ethAllowance = web3.utils.fromWei(allowance, 'ether');
    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      asset.amount = amount;
      callback(null, asset);
    } else {
      callback(null, false);
    }
  };

  _callApproval = async (
    asset,
    account,
    amount,
    contract,
    last,
    callback,
    overwriteAddress
  ) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      overwriteAddress ? overwriteAddress : asset.address
    );
    try {
      if (last) {
        await erc20Contract.methods
          .approve(contract, web3.utils.toWei('9999999999', 'ether'))
          .send({
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

  stake = (payload) => {
    const account = store.getStore('account');
    const { asset, amount } = payload.content;

    this._checkApproval(asset, account, amount, asset.rewardsAddress, (err) => {
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

    const yCurveFiContract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );

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
      .catch((error) => {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  withdraw = (payload) => {
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

    const yCurveFiContract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );

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
      .catch((error) => {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  getReward = (payload) => {
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

    const yCurveFiContract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );

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
      .catch((error) => {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  exit = (payload) => {
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

    const yCurveFiContract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );

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
      .catch((error) => {
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
