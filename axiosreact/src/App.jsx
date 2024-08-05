import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const API_KEY = '4f2d1527-33ed-4011-8cd6-83e0ccb0caaf';

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
            fromNetwork: 1, // Ethereum Mainnet chain ID
            toNetwork: 1,   // Ethereum Mainnet chain ID
            amount: '1000000', // 1 USDC in smallest unit (USDC has 6 decimals)
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




  // const performSwap = async () => {
  //   if (!quote) return;

  //   try {
  //     const response = await axios.post("https://api.rocketx.exchange/v1/swap", {
  //       fromToken: quote.fromToken,
  //       toToken: quote.toToken,
  //       fromChainId: quote.fromChainId,
  //       toChainId: quote.toChainId,
  //       fromAmount: quote.fromAmount,
  //       toAmount: quote.toAmount, // Use the toAmount from the quotation response if available
  //       slippage: quote.slippage, // Include any other necessary parameters from the quote response
  //       // You may need additional fields like recipient address, gas price, etc.
  //     }, {
  //       headers: {
  //         'Authorization': `ApiKey ${API_KEY}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     console.log("Swap response data is", response.data);
  //     setTransactionHash(response.data.transactionHash); // Adjust based on actual response structure
  //   } catch (error) {
  //     console.error("Error performing swap:", error.response ? error.response.data : error.message);
  //   }
  // };
