# Metamask-ATM-WORKING(Decentralised Banking Website)
### README

This project is a basic React application that interacts with a smart contract deployed on the Ethereum blockchain using MetaMask. The application allows users to connect their MetaMask wallet, view their account details, and perform deposit and withdrawal operations.

#### Requirements

To run this application locally, you need:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MetaMask browser extension installed in your browser with an Ethereum account set up.

#### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

#### Usage

1. **Connect MetaMask**: Click on the "Link Your Metamask Wallet to Metacrafters" button to connect your MetaMask wallet to the application.

2. **View Account Information**: Once connected, your Ethereum account ID will be displayed, along with your current balance.

3. **Deposit/Withdraw ETH**: Use the provided buttons to deposit or withdraw either 1 ETH or 2 ETH from the connected account.

#### Features

- **Connection Status**: The application checks if MetaMask is installed and prompts the user to connect if not connected.
  
- **Contract Interaction**: It interacts with a smart contract deployed at `0x5FbDB2315678afecb367f032d93F642f64180aa3`, using functions defined in `Assessment.sol`.

- **Dynamic Updates**: The balance updates dynamically after each deposit or withdrawal operation.

#### Notes

- Ensure MetaMask is properly set up with sufficient ETH for deposit and gas fees.
  
- This application is a basic example and may require modifications for production use, such as error handling and security considerations.

#### Credits

This project utilizes React.js, ethers.js for Ethereum interactions, and MetaMask for wallet integration.

#### License

This project is licensed under the [MIT License](LICENSE).
