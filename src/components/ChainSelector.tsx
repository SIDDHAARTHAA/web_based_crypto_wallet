interface ChainSelectorProps {
  selectedChain: 'Solana' | 'Ethereum';
  onChainSelect: (chain: 'Solana' | 'Ethereum') => void;
}

const ChainSelector = ({ selectedChain, onChainSelect }: ChainSelectorProps) => {
  return (
    <div className="flex gap-6 border-b border-gray-200 dark:border-gray-800 mb-8">
      <button
        onClick={() => onChainSelect('Solana')}
        className={`px-4 py-2 font-medium transition-all ${
          selectedChain === 'Solana'
            ? 'border-b-2 border-black dark:border-white -mb-[2px]'
            : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
        }`}
      >
        Solana
      </button>
      <button
        onClick={() => onChainSelect('Ethereum')}
        className={`px-4 py-2 font-medium transition-all ${
          selectedChain === 'Ethereum'
            ? 'border-b-2 border-black dark:border-white -mb-[2px]'
            : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
        }`}
      >
        Ethereum
      </button>
    </div>
  );
};

export default ChainSelector;