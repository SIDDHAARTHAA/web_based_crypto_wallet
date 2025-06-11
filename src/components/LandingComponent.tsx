import { useState } from 'react';
import WalletInterface from './WalletInterface';

const LandingComponent = () => {
    const [selectedChain, setSelectedChain] = useState<'Solana' | 'Ethereum' | null>(null);

    if (selectedChain) {
        return (
            <WalletInterface 
                chainType={selectedChain} 
                onChainChange={setSelectedChain} 
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 overflow-hidden py-2 px-4 max-w-[98%] my-10 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-mono font-bold">
                ChainVault supports multiple blockchains
            </h1>
            <p className="text-xl md:text-2xl font-mono font-semibold">
                Choose a blockchain to get started.
            </p>
            <div className="flex gap-6 w-full max-w-xs">
                <button 
                    type="button" 
                    className="flex-1 px-6 py-2 rounded-md bg-black border border-white 
                               text-white hover:bg-white hover:text-black transition 
                               btn-hover-effect"
                    onClick={() => setSelectedChain('Solana')}
                >
                    Solana
                </button>
                <button 
                    type="button" 
                    className="flex-1 px-6 py-2 rounded-md bg-black border border-white 
                               text-white hover:bg-white hover:text-black transition 
                               btn-hover-effect"
                    onClick={() => setSelectedChain('Ethereum')}
                >
                    Ethereum
                </button>
            </div>
        </div>
    );
};

export default LandingComponent;
