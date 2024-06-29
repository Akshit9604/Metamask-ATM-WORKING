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

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const deposit2 = async () => {
    if (atm) {
      let tx = await atm.deposit(2);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw2 = async () => {
    if (atm) {
      let tx = await atm.withdraw(2);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount} style={{fontFamily:'cursive', backgroundColor: '#4874FF', color: 'black', border: '10px', padding: '10px 20px', cursor: 'pointer',fontsize:'20px',borderRadius:'40px',fontWeight:'bolder' }}>Link Your Metamask Wallet to Metacrafters</button>;
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <button style={{fontFamily:'cursive',backgroundColor: '#FFFF00', color: 'black', border: '10px', padding: '10px 20px', cursor: 'pointer',fontsize:'20px',borderRadius:'40px',fontWeight:'bolder'}}>Account I'D: {account}</button>
        <p></p><button style={{fontFamily:'cursive',backgroundColor: '#FFFF00', color: 'black', border: '10px', padding: '10px 20px', cursor: 'pointer',fontsize:'20px',borderRadius:'40px',fontWeight:'bolder'}}>Remaining Balance : {balance}</button>
        <p></p>
        <button onClick={deposit} style={{ fontFamily:'cursive',backgroundColor: 'plum', color: 'black', border: '10px', padding: '10px 20px', cursor: 'pointer',fontsize:'20px',borderRadius:'40px',fontWeight:'bolder' }}>Deposit 1 ETH</button>
        <button onClick={withdraw} style={{fontFamily:'cursive', backgroundColor: 'plum', color: 'black', border: '10px', padding: '10px 20px', cursor: 'pointer',fontsize:'20px',borderRadius:'40px',fontWeight:'bolder' }}>Withdraw 1 ETH</button>
        <button onClick={deposit2} style={{ fontFamily:'cursive',backgroundColor: 'plum', color: 'black', border: '10px', padding: '10px 20px', cursor: 'pointer',fontsize:'20px',borderRadius:'40px',fontWeight:'bolder' }}>Deposit 2 ETH</button>
        <button onClick={withdraw2} style={{fontFamily:'cursive', backgroundColor: 'plum', color: 'black', border: '10px', padding: '10px 20px', cursor: 'pointer',fontsize:'20px',borderRadius:'40px',fontWeight:'bolder' }}>Withdraw 2 ETH</button>

      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Hello ! , Metacrafters ATM welcomes you on behalf of METAMASK</h1>
      </header>
      {initUser()}
      <style jsx>{`
  .container {
    text-align: center;
    font-Family: sans-serif;
    background-color: #48E0FF;
    padding: 280px;
  }
  

`}</style>

    </main>
  );
}
