# ChainVault: Web-Based Crypto Wallet

ChainVault is a modern, open-source web wallet supporting multiple blockchains (Solana & Ethereum). Built with React, TypeScript, Vite, and Tailwind CSS, it provides a fast, secure, and user-friendly interface for generating and managing wallets.

---

## Features

- 🔒 **Multi-chain support:** Solana & Ethereum
- 🪪 **Mnemonic phrase generation** (BIP39)
- 🗝️ **View/copy public & private keys**
- 🗑️ **Add/delete/clear wallets**
- 🌗 **Light/Dark theme toggle**
- ⚡ **Fast build & hot reload (Vite)**
- 🎨 **Responsive UI with Tailwind CSS**
- ✅ **TypeScript & ESLint for code quality**

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

```sh
git clone https://github.com/SIDDHAARTHAA/web_based_crypto_wallet.git
cd web_based_crypto_wallet
npm install
```

### Development

```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```sh
npm run build
```
The production-ready files will be in the `dist` folder.

To preview the production build locally:
```sh
npm run preview
```

---

## Project Structure

```
├── src/
│   ├── components/        # React components
│   ├── contexts/          # React context providers
│   ├── utils/             # Utility functions
│   ├── main.tsx           # App entry point
│   └── index.css          # Tailwind & global styles
├── public/                # Static assets
├── index.html             # HTML template
├── package.json           # Scripts & dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── ...
```

---

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code with ESLint
- `npm run typecheck` – Type-check with TypeScript
- `npm run clean` – Remove build artifacts

---

## Security Notice

- **Never share your private keys or secret phrases.**
- This project is for educational/demo purposes. Do not use with real funds.


## Credits

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)
- [ethers.js](https://docs.ethers.org/)

---

## Author

Made by [Sid](https://x.com/sid_likescoding)
