# Privacy Ain't Free

A simple landing page comparing the costs of private ETH and ERC-20 token transfers versus transparent transfers. This site demonstrates the current state of privacy solutions in the Ethereum ecosystem and highlights the need for cheaper, faster, and better UX privacy tools.

## Overview

[privacyaintfree.xyz](https://privacyaintfree.xyz) showcases a cost comparison between:

- **Standard Transparent Transfers** (baseline)
- **Privacy Pools**
- **Railgun**
- **Tornado Cash**

The comparison includes:
- ETH transfer costs
- ERC-20 token transfer costs
- Transaction speed
- User experience rating

## Purpose

The site makes the case that in order to reach adoption, privacy solutions need to be cheap, fast, and provide great UX that matches transparent transfers.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Geist Font**

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd privacyaintfree
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
privacyaintfree/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main landing page
│   └── globals.css     # Global styles
├── public/             # Static assets
└── package.json        # Dependencies
```

## Development

The page is built with Next.js App Router and uses React Server Components by default. The comparison data is currently hardcoded in the component but can be easily updated or moved to a data source.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Deployment

This site can be deployed to any platform that supports Next.js:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Cloudflare Pages**
- Any Node.js hosting service

## License

MIT
