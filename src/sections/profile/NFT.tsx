'use client';

import { NFTMintCard, NFTCard } from '@coinbase/onchainkit/nft';
import { NFTTitle, NFTOwner, NFTMedia, NFTNetwork, NFTLastSoldPrice } from '@coinbase/onchainkit/nft/view'; 
import {
  NFTCreator, 
  NFTCollectionTitle, 
  NFTQuantitySelector, 
  NFTAssetCost, 
  NFTMintButton, 
} from '@coinbase/onchainkit/nft/mint';
import { getPublicClient, readContract } from '@wagmi/core';
import { base } from 'viem/chains';
import { config } from "@/components/providers/WagmiProvider";
import { useEffect, useState } from 'react';

const nftContract = {
  address: '0x793b391D33Ee6FbdA58718952ca41Daf8F701aaF' as `0x${string}`,
  abi: [
    {
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'owner', type: 'address' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      name: 'tokenOfOwnerByIndex',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'owner', type: 'address' }, { name: 'index', type: 'uint256' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      name: 'tokenURI',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'tokenId', type: 'uint256' }],
      outputs: [{ type: 'string' }],
    },
  ],
};

async function getUserTokenIds(owner: `0x${string}`) {
  const balance = await readContract(config, {
    address: nftContract.address,
    abi: nftContract.abi,
    functionName: 'balanceOf',
    args: [owner],
    chainId: base.id,
  });
  
  const ids = [];
  for (let i = 0; i < Number(balance); i++) {
    const tokenId = await readContract(config, {
      address: nftContract.address,
      abi: nftContract.abi,
      functionName: 'tokenOfOwnerByIndex',
      args: [owner, BigInt(i)],
      chainId: base.id,
    });
    ids.push(tokenId);
  }
  
  return ids;
}

async function getTokenMetadata(tokenId: bigint) {
  const tokenUri = await readContract(config, {
    ...nftContract,
    functionName: 'tokenURI',
    args: [tokenId],
  });
  
  const httpUri = (tokenUri as string).replace('ipfs://', 'https://ipfs.io/ipfs/');
  const metadata = await fetch(httpUri).then((res) => res.json());
  
  return { tokenId: tokenId.toString(), ...metadata };
}

export default function NFT() {
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const tokenIds = await getUserTokenIds("0x0000000000000000000000000000000000000000");
        const tokenMetadata = await Promise.all(
          (tokenIds as bigint[]).map(getTokenMetadata)
        );
        console.log(tokenMetadata);
        setMetadata(tokenMetadata);
      } catch (error) {
        console.error("Error loading NFT data:", error);
      }
    };
    
    load();
  }, []);

    return (
        <div>
            <NFTMintCard
            contractAddress="0x793b391D33Ee6FbdA58718952ca41Daf8F701aaF"
            onStatus={(status) => console.log('status', status)}
            onError={(error) => console.log('error', error)}
            onSuccess={(transaction) => console.log('success', transaction)}
          >
            <NFTMedia />
            <NFTCreator />
            <NFTCollectionTitle />
            <NFTQuantitySelector />
            <NFTAssetCost />
            <NFTMintButton />
          </NFTMintCard>

          <NFTCard
            contractAddress="0x793b391D33Ee6FbdA58718952ca41Daf8F701aaF"
            tokenId="1"
            onStatus={(status) => console.log('status', status)}
            onError={(error) => console.log('error', error)}
            onSuccess={(transaction) => console.log('success', transaction)}
          >
          </NFTCard>    
        </div>
    )
}