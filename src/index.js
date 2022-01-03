import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import MetamaskProvider from './utils/metamaskProvider';

function getLibrary(provider, connector) {
  return new Web3Provider(provider)
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <MetamaskProvider>
      <App />
    </MetamaskProvider>
  </Web3ReactProvider>,
  document.getElementById('root')
);
