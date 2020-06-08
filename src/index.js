import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useEthers = () => {
  // let provider = null;
  const [provider, setProvider] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    const updateNetwork = async () => {
      // await window.ethereum.enable();
      const p = new ethers.providers.Web3Provider(window.ethereum);
      window.provider = p;

      const [a, { chainId, name }] = await Promise.all([p.listAccounts(), p.getNetwork()]);

      setProvider(p);
      setAccounts(a);
      setNetwork({ chainId, name });
    };

    if (window.ethereum) {
      updateNetwork();

      window.ethereum.on('accountsChanged', () => updateNetwork());
      window.ethereum.on('networkChanged', () => updateNetwork());
    }
  }, []);

  return { accounts, network, provider };
};

export default useEthers;
