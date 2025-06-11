// Me\web-3 wallet app\src\components\WalletInterface.tsx
import { useState } from 'react';
import { Eye, EyeOff, Copy, Trash2, Grid, List } from 'lucide-react';
import ChainSelector from './ChainSelector';
import toast from 'react-hot-toast';
import { copyToClipboard } from '../utils/clipboard';

interface WalletInterfaceProps {
  chainType: 'Solana' | 'Ethereum';
  onChainChange: (chain: 'Solana' | 'Ethereum') => void;
}

interface WalletData {
  id: string;
  chainType: 'Solana' | 'Ethereum';
  publicKey: string;
  privateKey: string;
}

const WalletInterface = ({ chainType, onChainChange }: WalletInterfaceProps) => {
  const [showWallets, setShowWallets] = useState(false);
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [isGridView, setIsGridView] = useState(false);
  const [showPrivateKeyFor, setShowPrivateKeyFor] = useState<string | null>(null);
  const [secretPhrase, setSecretPhrase] = useState('');
  const [secretWords, setSecretWords] = useState<string[]>([]);

  // Simple dummy wallet generation for now
  const generateWallet = () => {
    try {
      const dummyWords = ['hurdle', 'uncle', 'elder', 'mercy', 'sketch', 'initial', 
                         'aerobic', 'cereal', 'farm', 'mother', 'tide', 'sadness'];
      
      if (!secretPhrase) {
        setSecretWords(dummyWords);
        setSecretPhrase(dummyWords.join(' '));
      }

      const newWallet: WalletData = {
        id: Math.random().toString(36).slice(2),
        chainType,
        publicKey: `0x${Math.random().toString(16).slice(2)}`,
        privateKey: `0x${Math.random().toString(16).slice(2)}`,
      };

      setWallets(prev => [...prev, newWallet]);
      setShowWallets(true);
      toast.success('Wallet generated successfully!');
    } catch (error) {
      console.error('Wallet generation error:', error);
      toast.error('Failed to generate wallet');
    }
  };

  const clearWallets = () => {
    setWallets([]);
    setSecretWords([]);
    setSecretPhrase('');
    setShowWallets(false);
    toast.success('All wallets cleared successfully!');
  };

  const deleteWallet = (id: string) => {
    const updatedWallets = wallets.filter(wallet => wallet.id !== id);
    setWallets(updatedWallets);
    if (updatedWallets.length === 0) {
      setSecretWords([]);
      setSecretPhrase('');
      setShowWallets(false);
    }
    toast.success('Wallet deleted successfully!');
  };

  const handleCopy = async (text: string, type: string) => {
    if (await copyToClipboard(text)) {
      toast.success(`${type} copied to clipboard!`);
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const filteredWallets = wallets.filter(wallet => wallet.chainType === chainType);

  return (
    <div className="animate-slideDown">
      <ChainSelector selectedChain={chainType} onChainSelect={onChainChange} />
      
      {!showWallets ? (
        <div className="flex flex-col gap-8 py-2">
          <h1 className="text-4xl md:text-5xl font-mono font-bold">
            Secret Recovery Phrase
          </h1>
          <p className="text-xl md:text-2xl font-mono">
            Save these words in a safe place.
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Enter your secret phrase (or leave blank to generate)"
              value={secretPhrase}
              onChange={(e) => setSecretPhrase(e.target.value)}
              className="flex-1 w-full p-4 rounded-lg border border-gray-300 
                       dark:border-gray-700 bg-white dark:bg-gray-800 
                       text-black dark:text-white"
            />
            <button 
              onClick={generateWallet}
              className="w-full md:w-auto px-6 py-4 rounded-lg bg-black 
                       dark:bg-white text-white dark:text-black font-medium 
                       btn-hover-effect whitespace-nowrap"
            >
              Generate Wallet
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 animate-fadeIn">
          {secretWords.length > 0 && (
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-mono font-bold mb-4">Your Secret Phrase</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
                {secretWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCopy(word, 'Word')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-center 
                             hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {idx + 1}. {word}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleCopy(secretWords.join(' '), 'Secret phrase')}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 
                         flex items-center gap-2 mt-2"
              >
                <Copy size={16} /> Click Anywhere To Copy
              </button>
            </div>
          )}

          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-mono font-bold">
              {chainType} Wallet{filteredWallets.length > 1 ? 's' : ''}
            </h2>
            <div className="flex gap-4">
              {filteredWallets.length > 1 && (
                <button
                  onClick={() => setIsGridView(!isGridView)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isGridView ? <List size={20} /> : <Grid size={20} />}
                </button>
              )}
              <button
                onClick={generateWallet}
                className="px-4 py-2 rounded-lg bg-black dark:bg-white 
                         text-white dark:text-black font-medium btn-hover-effect"
              >
                Add Wallet
              </button>
              <button
                onClick={clearWallets}
                className="px-4 py-2 rounded-lg bg-red-500 
                         text-white font-medium btn-hover-effect"
              >
                Clear Wallets
              </button>
            </div>
          </div>

          <div className={`grid ${
            filteredWallets.length > 1 && isGridView 
              ? 'grid-cols-1 md:grid-cols-2 gap-6' 
              : 'grid-cols-1 gap-4'
          }`}>
            {filteredWallets.map((wallet) => (
              <div key={wallet.id} 
                   className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 relative">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() => deleteWallet(wallet.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-1">Public Key</p>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-sm">{wallet.publicKey}</code>
                      <button
                        onClick={() => handleCopy(wallet.publicKey, 'Public key')}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-1">Private Key</p>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-sm">
                        {showPrivateKeyFor === wallet.id ? wallet.privateKey : '•'.repeat(64)}
                      </code>
                      <button
                        onClick={() => handleCopy(wallet.privateKey, 'Private key')}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => setShowPrivateKeyFor(
                          showPrivateKeyFor === wallet.id ? null : wallet.id
                        )}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      >
                        {showPrivateKeyFor === wallet.id ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletInterface;