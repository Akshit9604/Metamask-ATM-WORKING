import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async (amount) => {
    if (atm) {
      let tx = await atm.deposit(amount);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async (amount) => {
    if (atm) {
      let tx = await atm.withdraw(amount);
      await tx.wait();
      getBalance();
    }
  };

  const payFuel = async (amount) => {
    if (atm) {
      let tx = await atm.payFuel(amount);
      await tx.wait();
      getBalance();
    }
  };

  const payInsurance = async (amount) => {
    if (atm) {
      let tx = await atm.payInsurance(amount);
      await tx.wait();
      getBalance();
    }
  };

  const payRent = async (amount) => {
    if (atm) {
      let tx = await atm.payRent(amount);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount} className="btn">Link Your Metamask Wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <button className="info-btn">Account ID: {account}</button>
        <button className="info-btn">Remaining Balance: {balance}</button>
        <div className="action-buttons">
          <button onClick={() => deposit(1)} className="action-btn">Deposit 1 ETH</button>
          <button onClick={() => withdraw(1)} className="action-btn">Withdraw 1 ETH</button>
          <button onClick={() => deposit(2)} className="action-btn">Deposit 2 ETH</button>
          <button onClick={() => withdraw(2)} className="action-btn">Withdraw 2 ETH</button>
          <button onClick={() => payFuel(1)} className="action-btn">Pay Fuel (1 ETH)</button>
          <button onClick={() => payInsurance(1)} className="action-btn">Pay Insurance (1 ETH)</button>
          <button onClick={() => payRent(1)} className="action-btn">Pay Rent (1 ETH)</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Hello! Metacrafters ATM welcomes you on behalf of METAMASK</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          font-family: sans-serif;
          background-color: #48E0FF;
          padding: 280px;
        }
        .btn, .info-btn, .action-btn {
          font-family: cursive;
          color: black;
          border: 10px solid;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 20px;
          border-radius: 40px;
          font-weight: bolder;
          margin: 10px;
        }
        .btn {
          background-color: #4874FF;
        }
        .info-btn {
          background-color: #FFFF00;
        }
        .action-btn {
          background-color: plum;
        }
        .action-buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </main>
  );
}
