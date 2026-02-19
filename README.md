# Wise

A pixel-perfect, fully editable banking interface simulator designed for content creation, mockups, and demos. Built with React and TypeScript, this app mimics the Wise fintech platform's user interface.

## Features

- **Multi-Currency Accounts**: Support for EUR, USD, GBP, and THB with individual balances
- **Transaction History**: Comprehensive transaction list with filtering by date and status
- **Director Mode**: Floating control panel for real-time UI editing
- **Editable UI**: Click to edit balances, transaction amounts, user names, and more
- **Transfer Calculator**: Currency conversion tool with exchange rate visualization
- **Responsive Design**: Mobile-optimized layouts

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nico4ns-ops/wise-app.git
   cd wise-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Director Mode

Click the settings icon (⚙️) in the bottom-right corner to open Director Mode:

- **Toggle Editable UI**: Enable/disable inline editing of all UI elements
- **Add Transactions**: Create custom transactions with recipient, amount, currency, and direction

### Editing Content

When Editable UI is enabled:
- Click on balances to edit them
- Click on transaction amounts, recipients, or descriptions to modify
- Click on the user name to change it

## Project Structure

```
├── App.tsx              # Main application component
├── index.tsx            # React entry point
├── index.html           # HTML template
├── types.ts             # TypeScript interfaces
├── constants.tsx        # Initial mock data
├── components/
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── AccountDetail.tsx # Account details page
│   ├── AccountInfo.tsx  # Account information view
│   ├── ProfilePage.tsx  # User profile page
│   ├── TransactionItem.tsx # Transaction display
│   └── EditControl.tsx  # Director mode controls
└── vite.config.ts       # Vite configuration
```

## License

MIT License - see [LICENSE](LICENSE) for details
