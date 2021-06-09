import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

import UnlockModal from "../unlock/unlockModal.jsx";
import Store from "../../stores/store";
import { colors } from "../../theme/theme";
import config from "../../config";

import gifNeonYellow from "../../assets/NFT-dark-backdrop-with-neon-yellow.gif";

import {
  JOIN_POOL,
  REMOVE_POOL,
  NFT_POOL,
  CONFIGURE_RETURNED,
  GET_BALANCES,
  GET_BALANCES_RETURNED,
  NFT_POOL_RECEIVED,
} from "../../constants/constants";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "600px",
    width: "100%",
    alignItems: "center",
    margin: "0 auto",
  },
  intro: {
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "600px",
  },
  introCenter: {
    minWidth: "100%",
    textAlign: "center",
    padding: "48px 0px",
  },
  investedContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    minWidth: "100%",
    [theme.breakpoints.up("md")]: {
      minWidth: "800px",
    },
  },
  connectContainer: {
    padding: "12px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "450px",
    [theme.breakpoints.up("md")]: {
      width: "450",
    },
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
  },
  disclaimer: {
    padding: "15px 40px",
    background: "rgba(80, 79, 105, 0.4)",
    borderRadius: "5px",
    marginBottom: "2rem",
    fontWeight: 600,
    color: "white",
    letterSpacing: "-0.02em",
  },
  nftPools: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  nftPoolContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "260px",
    padding: "2rem 3rem",
    marginBottom: "2rem",
    borderRadius: "5px",
    background: "#504F69",
  },
  title: {
    width: "100%",
    color: colors.darkGray,
    minWidth: "100%",
    marginLeft: "20px",
  },
  poolName: {
    paddingBottom: ".2rem",
    color: "white",
  },
  poolLogo: {
    width: "80px",
    margin: "0 auto 16px",
  },
  poolBrief: {
    color: "#A19C98",
    marginBottom: "22px",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
  contractLabel: {
    color: "#DEDDFF",
    paddingBottom: "20px",
  },
  contractAddress: {
    color: "#53AEA3",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
  actionButton: {
    color: "#fff",
    borderColor: "#000",
    background: "#000",
    fontWeight: "900",
    padding: ".1rem 2rem",
    "&:hover": {
      background: "#5A8F69",
    },
  },
  overview: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "28px 30px",
    borderRadius: "5px",
    marginTop: "40px",
    width: "100%",
    background: "#504F69",
  },
  overviewField: {
    display: "flex",
    flexDirection: "column",
    margin: "0 5px",
  },
  overviewTitle: {
    color: "#DEDDFF",
  },
  overviewValue: {
    color: "white",
  },
  actions: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    background: "#504F69",
    padding: "28px 30px",
    borderRadius: "5px",
    marginTop: "40px",
  },
  actionContainer: {
    minWidth: "calc(50% - 40px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
  },
  actionButton: {
    color: "#fff",
    borderColor: "#000",
    background: "#000",
    fontWeight: "900",
    padding: ".1rem 2rem",
    "&:hover": {
      background: "#5A8F69",
    },
  },
  primaryButton: {
    color: "#fff",
    borderColor: "#000",
    background: "#000",
    fontWeight: "900",
    padding: ".1rem 2rem",
    minHeight: "4rem",
    minWidth: "14rem",
    borderRadius: "5px",
    "&:hover": {
      background: "#5A8F69",
    },
  },
  buttonText: {
    fontWeight: "700",
  },
  valContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  actionInput: {
    padding: "0px 0px 12px 0px",
    "& input": {
      fontSize: "1.2rem",
      borderBottom: "1px solid #DEDDFF",
      color: "white",
    },
  },
  inputAdornment: {
    fontWeight: "600",
    fontSize: "1.5rem",
    color: "#DEDDFF",
  },
  assetIcon: {
    display: "inline-block",
    verticalAlign: "middle",
    borderRadius: "25px",
    background: "#dedede",
    height: "30px",
    width: "30px",
    textAlign: "center",
    marginRight: "16px",
  },
  balances: {
    width: "100%",
    textAlign: "right",
    paddingRight: "20px",
    cursor: "pointer",
    color: "#DEDDFF",
  },
  stakeButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    align: "center",
    marginTop: "2rem",
  },
  requirement: {
    display: "flex",
    alignItems: "center",
  },
  check: {
    paddingTop: "6px",
  },
  voteLockMessage: {
    margin: "20px",
  },
  title: {
    color: "white",
    marginBottom: "2rem",
    width: "100%",
    textAlign: "center",
  },
  nftGif: {
    width: "15em",
  },
  nftGifContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "260px",
    padding: "2rem 3rem",
    borderRadius: "5px",
    background: "#504F69",
  },
});

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

class NftPools extends Component {
  constructor(props) {
    super();

    const account = store.getStore("account");
    const nftPools = store.getStore("nftPools");

    this.state = {
      nftPools: nftPools,
      loading: !(account && nftPools),
      account: account,
      currentPool: null,
      showGif: false,
      gif: null,
    };

    dispatcher.dispatch({ type: NFT_POOL, content: { asset: config.nftABI } });
  }

  componentWillMount() {
    emitter.on(NFT_POOL_RECEIVED, this.nftPoolsReceived);
  }

  componentWillUnmount() {
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
  }

  nftPoolsReceived = () => {
    const nftPools = store.getStore("nftPools");
    this.setState({ nftPools: nftPools });
  };

  configureReturned = () => {
    this.setState({ loading: false });
  };

  render() {
    const { classes } = this.props;
    const { modalOpen, currentPool } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant={"h5"} className={classes.disclaimer}>
          This project is in Beta. Audit still in progress DYOR.
        </Typography>
        <div className={classes.nftPools}>
          {currentPool ? this.renderCurrentPool() : this.renderNfts()}
        </div>
        {modalOpen && this.renderModal()}
      </div>
    );
  }

  renderNfts = () => {
    const { nftPools } = this.state;
    const { classes } = this.props;

    return (
      <>
        <div className={classes.intro}>
          <Button
            className={classes.actionButton}
            style={{ marginBottom: "2rem" }}
            onClick={() => {
              this.props.history.push("/staking");
            }}
          >
            Staking
          </Button>
        </div>
        {nftPools.poolInfo.map((nftPool) => {
          return this.renderNftPool(nftPool);
        })}
      </>
    );
  };

  renderCurrentPool = () => {
    const nftPools = store.getStore("nftPools");
    const { currentPool, showGif, gif } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {" "}
        <div className={classes.intro}>
          <Button
            className={classes.actionButton}
            onClick={() => {
              this.props.history.push("/nft");
              this.setState({ currentPool: null });
            }}
          >
            Back
          </Button>
        </div>
        {showGif && (
          <div className={classes.nftGifContainer}>
            <img className={classes.nftGif} src={gif} alt="" />
          </div>
        )}
        <div className={classes.overview}>
          <div className={classes.overviewLogo}>
            <img
              alt=""
              src={require("../../assets/" + nftPools.logo)}
              height="48px"
            />
          </div>

          <div className={classes.overviewField}>
            <Typography variant={"h3"} className={classes.overviewValue}>
              0
            </Typography>
            <Typography variant={"h4"} className={classes.overviewTitle}>
              Total Amount Paid
            </Typography>
          </div>
          <div className={classes.overviewField}>
            <Typography variant={"h3"} className={classes.overviewValue}>
              0
            </Typography>
            <Typography variant={"h4"} className={classes.overviewTitle}>
              Total Per NFT
            </Typography>
          </div>

          <div className={classes.overviewField}>
            <Typography variant={"h3"} className={classes.overviewValue}>
              0
            </Typography>
            <Typography variant={"h4"} className={classes.overviewTitle}>
              Last siphon payment
            </Typography>
          </div>
        </div>
        <div className={classes.overview}>
          <div className={classes.overviewLogo}>
            <img
              alt=""
              src={require("../../assets/" + nftPools.logo)}
              height="48px"
            />
          </div>

          <div className={classes.overviewField}>
            <Typography variant={"h3"} className={classes.overviewValue}>
              {nftPools.investCap}
            </Typography>
            <Typography variant={"h4"} className={classes.overviewTitle}>
              Invest Cap
            </Typography>
          </div>
          <div className={classes.overviewField}>
            <Typography variant={"h3"} className={classes.overviewValue}>
              {currentPool.investorNumber}
            </Typography>
            <Typography variant={"h4"} className={classes.overviewTitle}>
              Investor Number
            </Typography>
          </div>

          <div className={classes.overviewField}>
            <Typography variant={"h3"} className={classes.overviewValue}>
              {nftPools.maxInvestorNumber}
            </Typography>
            <Typography variant={"h4"} className={classes.overviewTitle}>
              Max Investor Number
            </Typography>
          </div>
        </div>
        <div className={classes.actions}>
          <div className={classes.actionContainer}>
            <Button
              className={classes.primaryButton}
              onClick={() =>
                dispatcher.dispatch({
                  type: JOIN_POOL,
                  content: {
                    asset: config.nftABI,
                    sphnAsset: config.sphnABI,
                    poolID: currentPool ? currentPool.poolID : "",
                  },
                })
              }
            >
              Join Pool
            </Button>
          </div>
          <div className={classes.actionContainer}>
            <Button
              className={classes.primaryButton}
              onClick={() =>
                dispatcher.dispatch({
                  type: REMOVE_POOL,
                  content: {
                    asset: config.nftABI,
                    poolID: currentPool ? currentPool.poolID : "",
                  },
                })
              }
            >
              Remove Pool
            </Button>
          </div>
        </div>
      </div>
    );
  };

  renderNftPool = (nftPool) => {
    const nftPools = store.getStore("nftPools");
    const { classes } = this.props;

    let address = null;
    let addy = "";

    if (nftPools) {
      addy = nftPools.nftAddress;
      address =
        addy.substring(0, 6) +
        "..." +
        addy.substring(addy.length - 4, addy.length);
    }

    return (
      <div className={classes.nftPoolContainer} key={nftPool.id}>
        <img
          alt={nftPool.poolID}
          className={classes.poolLogo}
          src={require("../../assets/" + nftPools.logo)}
        />
        <Typography variant="h3" className={classes.poolName}>
          {nftPool.poolName}
        </Typography>
        <a
          href={nftPools.link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.poolBrief}
        >
          {nftPools.brief}
        </a>
        <Typography
          varian="h4"
          className={classes.contractLabel}
          align="center"
        >
          Contract Address:
          <a
            href={`https://bscscan.com/address/${addy}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.contractAddress}
          >
            {` ${address}`}
          </a>
        </Typography>
        <Button
          className={classes.actionButton}
          onClick={() => {
            this.handleOpenButton(nftPool);
          }}
        >
          Open
        </Button>
      </div>
    );
  };

  handleOpenButton = (nftPool) => {
    console.log(nftPool);

    if (nftPool.poolName === "Atos") {
      this.setState({ showGif: true, gif: gifNeonYellow });
    } else if (nftPool.poolName === "Johnny") {
      this.setState({ showGif: true });
    }
    this.navigateNft(nftPool);
  };

  navigateNft = (nftPool) => {
    this.setState({ currentPool: nftPool });
  };

  renderModal = () => {
    return (
      <UnlockModal
        closeModal={this.closeModal}
        modalOpen={this.state.modalOpen}
      />
    );
  };

  overlayClicked = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };
}

export default withRouter(withStyles(styles)(NftPools));
