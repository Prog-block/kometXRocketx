import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const API_KEY = '4f2d1527-33ed-4011-8cd6-83e0ccb0caaf'; // Replace with your actual API key

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://api.rocketx.exchange/v1/quotation", {
          headers: {
            'Authorization': `ApiKey ${API_KEY}`
          },
          params: {
            fromToken: '0x2C5dcd12141c56FBEa08e95f54f12c8B22d492Eb', // USDC token address
            toToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',   // USDT token address
            fromChainId: 1, // Ethereum Mainnet chain ID
            toChainId: 1,   // Ethereum Mainnet chain ID
            fromAmount: '1000000', // 1 USDC in smallest unit (USDC has 6 decimals)
          }
        });
        console.log("The data is", response.data);
        setQuote(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
      }
    };

    fetchQuote();
  }, [API_KEY]);

  const performSwap = async () => {
    // Implementation for performing the swap
  };

  return (
    <div className="App">
      {quote ? (
        <div>
          <h2>Quote Details</h2>
          <pre>{JSON.stringify(quote, null, 2)}</pre>
          <button onClick={performSwap}>Swap Tokens</button>
        </div>
      ) : (
        <div>Loading quote...</div>
      )}

      {transactionHash && (
        <div>
          <h2>Transaction Successful</h2>
          <p>Transaction Hash: {transactionHash}</p>
        </div>
      )}
    </div>
  );
}

export default App;
