import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { colors } from '../../theme';

import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../../constants';

import UnlockModal from '../unlock/unlockModal.jsx';

import Store from '../../stores';
const emitter = Store.emitter;
const store = Store.store;

const styles = theme => ({
  root: {
    verticalAlign: 'top',
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '40px',
    },
  },
  header: {
    border: 'none',
    width: '100%',
    display: 'flex',
    padding: '2rem 3rem',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      padding: '1rem 2rem',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    cursor: 'pointer',
  },
  links: {
    display: 'flex',
  },
  link: {
    fontWeight: '900',
    padding: '.5rem 2rem',
    borderRadius: '2rem',
    margin: '0 1rem',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#FBF6F0' },
  },
  linkActive: {
    fontWeight: '900',
    backgroundColor: '#000',
    color: '#fff',
    padding: '.5rem 2rem',
    borderRadius: '2rem',
    margin: '0 1rem',
    cursor: 'pointer',
  },
  socialLink: {
    margin: '0 1rem',
  },
  account: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flex: '0',
    },
  },
  walletAddress: {
    padding: '1rem',
    borderRadius: '.5rem',
    backgroundColor: '#F8F2EC',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      background: '#fff',
      color: '#000',
    },
    '&:active': {
      background: '#000',
      color: '#fff',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      position: 'absolute',
      top: '5rem',
    },
  },
  connectedDot: {
    background: colors.compoundGreen,
    opacity: '1',
    borderRadius: '10px',
    width: '10px',
    height: '10px',
    marginRight: '3px',
    marginLeft: '6px',
  },
  name: {
    paddingLeft: '24px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  disclaimer: {
    padding: '12px',
    border: '1px solid #F8F2EC',
    borderRadius: '0',
    background: '#F8F2EC',
    marginBottom: '2rem',
    fontWeight: 900,
    color: '#000',
  },
});

class Header extends Component {
  constructor(props) {
    super();

    this.state = {
      account: store.getStore('account'),
      modalOpen: false,
    };
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
  }

  connectionConnected = () => {
    this.setState({ account: store.getStore('account') });
  };

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account') });
  };

  render() {
    const { classes } = this.props;

    const { account, modalOpen } = this.state;

    var address = null;
    if (account.address) {
      address = account.address.substring(0, 6) + '...' + account.address.substring(account.address.length - 4, account.address.length);
    }

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.icon}>
            <img
              alt=""
              src={require('../../assets/beefy.svg')}
              height={'40px'}
              onClick={() => {
                this.nav('');
              }}
            />
            <Typography
              variant={'h3'}
              className={classes.name}
              onClick={() => {
                this.nav('');
              }}
            >
              beefy.finance
            </Typography>
          </div>
          <div className={classes.links}>
            <Typography variant={'h5'} className={classes.disclaimer}>
              This project is in Beta. Use with caution and DYOR.
            </Typography>
          </div>
          <div className={classes.account}>
            {/* FIXME: check this */}
            {address && (
              <Typography variant={'h4'} className={classes.walletAddress} noWrap onClick={this.addressClicked}>
                {address}
                <div className={classes.connectedDot}></div>
              </Typography>
            )}
            {!address && (
              <Typography variant={'h4'} className={classes.walletAddress} noWrap onClick={this.addressClicked}>
                Connect your wallet
              </Typography>
            )}
          </div>
        </div>
        {modalOpen && this.renderModal()}
      </div>
    );
  }

  renderLink = screen => {
    const { classes } = this.props;

    return (
      <div
        className={
          window.location.pathname === '/' + screen || (window.location.pathname === '/stake' && screen === 'staking')
            ? classes.linkActive
            : classes.link
        }
        onClick={() => {
          this.nav(screen);
        }}
      >
        {screen}
      </div>
    );
  };

  renderSocial = (url, name) => {
    const style = {
      textDecoration: 'none',
      margin: '0 1rem',
      display: 'flex',
      alignItems: 'center',
    };

    return (
      <a href={url} style={style} target="_blank" rel="noopener noreferrer">
        <img alt="" src={require(`../../assets/${name}.svg`)} height={'24px'} />
      </a>
    );
  };

  nav = screen => {
    this.props.history.push('/' + screen);
  };

  addressClicked = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  renderModal = () => {
    return <UnlockModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} />;
  };
}

export default withRouter(withStyles(styles)(Header));
