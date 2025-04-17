# Equilateral

![Equilateral]

## Overview

Equilateral Folio Visualizer is a comprehensive financial portfolio management and visualization dashboard built for Indian investors. This modern, responsive web application provides users with powerful tools to track, analyze, and optimize their investment portfolios in real-time.

## Features

### Core Features

- **Portfolio Dashboard**: Comprehensive overview of your investment portfolio with key metrics and performance indicators
- **Watchlist Management**: Track potential investments and monitor market movements
- **Account Management**: Manage multiple trading and demat accounts in one place
- **Real-time Market Data**: Live market updates and stock price tracking
- **Performance Analytics**: Detailed performance metrics with visual charts and graphs

### Premium Features (PRO)

- **Advanced Research Tools**: In-depth stock analysis and market research capabilities
- **Portfolio Simulator**: Test investment strategies without risking real money
- **What-If Analysis**: Simulate potential portfolio changes and visualize outcomes
- **Custom Alerts**: Set personalized alerts for price movements and market events

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Theming**: next-themes (Dark/Light mode support)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Chinmaynkr/equilateral.git

# Navigate to the project directory
cd equilateral-folio-visualizer

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080` (or another port if 8080 is in use).

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Preview the production build locally
npm run preview
# or
yarn preview
```

## Project Structure

```
/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── data/          # Mock data and data utilities
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and libraries
│   ├── pages/         # Application pages
│   ├── styles/        # Global styles and theme configuration
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Helper functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── index.html         # HTML entry point
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Key Components

- **PortfolioTab**: Displays portfolio holdings, performance metrics, and investment allocation
- **WatchlistTab**: Manages watchlists and displays tracked securities
- **ResearchTab** (PRO): Provides advanced research tools and market analysis
- **SimulatorTab** (PRO): Portfolio simulation and what-if analysis tools
- **AccountTab**: Account management and financial overview
- **TrendingTab**: Shows trending stocks and market movers
- **SettingsTab**: Application settings and preferences

## Customization

### Themes

The application supports both light and dark modes. The theme can be toggled using the theme switcher in the header.

### User Profiles

The application includes sample user profiles for demonstration purposes. In a production environment, these would be replaced with actual user data from an authentication system.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Recharts](https://recharts.org/) for the charting library
- [Framer Motion](https://www.framer.com/motion/) for animations

## Contact

For questions or support, please contact the Equilateral team at chinmaynkr@gmail.com or anupamnerkar7@gmail.com

---

© 2025 Equilateral. All rights reserved.
