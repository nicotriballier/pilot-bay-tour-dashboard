# Bay Area Aviation Weather Map

As a pilot, I use this app to quickly see the weather conditions for bay tours. This interactive map displays real-time METAR weather data for airports across the San Francisco Bay Area, along with live camera feeds and video streams to help assess current flying conditions.

Live app [pilot.nicopowered.com](https://pilot.nicopowered.com/)

**Author:** Nico Triballier

Made with ❤️ using [Anthropic APIs](https://www.anthropic.com/), [Next.js](https://nextjs.org), [OpenStreetMap](https://www.openstreetmap.org/), and [aviationweather.gov APIs](https://aviationweather.gov/)

## Features

- **Real-time METAR weather data** for 17 Bay Area airports (KSFO, KOAK, KSJC, KSQL, KPAO, KHWD, KHAF, KLVK, KCCR, KNUQ, KRHV, KSUU, KSTS, KAPC, KWVI, KMRY, KSMF)
- **Live camera feeds** from Sam's Chowder House (KHAF area)
- **Live video stream** from Treasure Island
- **Lawrence Hall of Science view** for Berkeley area conditions
- Weather data updates every 2 minutes
- Interactive map with clickable airport markers

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pilot-bay-tour-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Build the application:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

Start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
```

## How to Use

1. The map displays all Bay Area airports with real-time weather information
2. Click on any airport marker to bring it to the front
3. Weather boxes show:
   - Airport code
   - Temperature (°C)
   - Wind direction and speed
   - Visibility
   - Conditions (non-clear conditions highlighted in red)
   - Observation time (PST/PDT)
4. Camera feeds and video streams update automatically

## Technologies Used

- **Next.js 15.5.4** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling
- **Leaflet & React-Leaflet** - Interactive maps
- **OpenStreetMap** - Map tiles
- **aviationweather.gov API** - Real-time METAR data

## Deployment

This app is ready to deploy to Vercel with zero configuration.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nicotriballier/pilot-bay-tour-dashboard)

**Or manually:**

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your repository
4. Vercel will auto-detect Next.js - click "Deploy"
5. Your app will be live at `https://your-project.vercel.app`

Vercel automatically:
- Detects the Next.js framework
- Configures build settings
- Deploys on every push to main
- Provides preview deployments for PRs
- Handles API routes and serverless functions

## License

This project is open source and available under the MIT License.
