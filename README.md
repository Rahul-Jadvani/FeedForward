# FeedForward

![FeedForward](https://via.placeholder.com/800x400?text=FeedForward)

## About FeedForward

FeedForward is an intelligent, scalable platform designed to connect surplus food sources with individuals and organizations in need, while incentivizing participation through rewards and reputation systems.

The platform leverages blockchain technology, AI, and real-time notifications to create an ecosystem where food waste is minimized and hunger is addressed through community-powered solutions.

## Core Features

### 🚩 FoodFlag System

- Create and manage food donation listings with detailed information
- Real-time matching between food donors and recipients
- GPS-enabled navigation to donation pickup points

### 💰 FeedCoin Rewards

- Earn tokens for successful donations and pickups
- Build reputation through consistent participation
- Redeem tokens for marketplace perks and benefits

### 🌐 Decentralized Governance

- Community-driven decision making through DAO voting
- Transparent donation tracking using blockchain
- NFT badges for achievements and milestones

### 🤖 AI-Powered Features

- Smart inventory integration to predict food expiry
- Demand forecasting for efficient food distribution
- Special protocols for disaster response and farmer distress

## Tech Stack

### Frontend

- Next.js 14+
- React 18
- TailwindCSS
- Recharts (data visualization)
- Three.js / React Three Fiber (3D elements)
- @react-google-maps/api for maps integration

### Backend

- Node.js with Express
- PostgreSQL database
- JWT authentication

### Blockchain Integration (Planned)

- Ethereum/Polygon smart contracts
- ERC-20 tokens (FeedCoin)
- NFT badges for achievements

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/feedforward.git
cd feedforward
```

2. Install frontend dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

4. Set up the backend:

```bash
cd server
npm install
```

5. Configure backend environment variables:
   Create a `.env` file in the server directory:

```
PORT=3001
DB_URI=postgresql://username:password@localhost:5432/feedforward
JWT_SECRET=your_jwt_secret
```

6. Run the development servers:

Frontend:

```bash
# In the root directory
npm run dev
```

Backend:

```bash
# In the server directory
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
feedforward/
├── src/                  # Frontend source code
│   ├── app/              # Next.js app directory
│   │   ├── (Pages)/      # Route groups for pages
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   │   ├── manual-ui/    # Custom components
│   │   └── ui/           # UI library components
│   └── lib/              # Utilities and helpers
├── server/               # Backend code
│   ├── database/         # Database connection and models
│   ├── routes/           # API routes
│   └── index.js          # Server entry point
├── public/               # Static assets
└── package.json          # Project dependencies
```

## User Roles

1. **Donor**: Individuals, businesses, and organizations with surplus food
2. **Recipient**: NGOs, community kitchens, and verified individuals in need
3. **Admin**: Platform managers who ensure safety and compliance
4. **Sponsors**: Corporate partners providing rewards and funding
5. **FeedCoin Holders**: Users participating in platform governance

## Roadmap

### Phase 1: Core Platform

- Basic user roles and authentication
- FoodFlag creation and claiming
- Simple map interface
- Initial verification system

### Phase 2: Smart Features

- AI inventory integration
- Notification system
- Enhanced mapping
- Basic rewards system

### Phase 3: Blockchain & Tokens

- FeedCoin implementation
- Smart contract deployment
- Wallet integration
- NFT badges
- Initial marketplace

### Phase 4: Advanced Features

- DAO governance system
- Disaster response capabilities
- Advanced analytics
- Farmer distress donations
- Full gamification features

## Contributing

We welcome contributions to FeedForward! If you're interested in helping, please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All contributors and community members
- Organizations fighting food waste and hunger
- Open source projects that made this possible

---

_FeedForward - Revolutionizing Food Donation with Blockchain_
