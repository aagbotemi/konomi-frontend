import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "material-react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";
import { WagmiConfig, createClient, chain } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import MaterialToastContainer from "./components/core/MaterialToastContainer";
import 'animate.css';

const alchemyId = process.env.ALCHEMY_ID;

const chains = [chain.goerli];

const client = createClient(
  getDefaultClient({
    appName: "Konomi Token",
    alchemyId,
    chains,
  })
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
  <WagmiConfig client={client}>
    <MaterialToastContainer />
    <ConnectKitProvider theme="midnight" mode="dark">
      <App />
    </ConnectKitProvider>
  </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
