// Changelog data structure for the Bay Area Aviation Weather Map
export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  highlights: string[];
  sections: {
    title: string;
    emoji: string;
    items: string[];
  }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.2.0",
    date: "2025-10-29",
    title: "Major Safety Improvements",
    highlights: [
      "Enhanced error handling when aviationweather.gov is unreachable",
      "Smart image validation with EXIF metadata extraction",
      "Expanded to 20 airports with Central Valley coverage"
    ],
    sections: [
      {
        title: "Major Safety Improvements",
        emoji: "🚨",
        items: [
          "Clear error messages when aviationweather.gov is unreachable",
          "Prominent red warning banner displays \"WEATHER DATA UNAVAILABLE\"",
          "Prevents pilots from using the app when real weather data is not available",
          "Removed all mock/fallback weather data - never shows fake weather information",
          "EXIF metadata extraction from Lawrence Hall of Science camera image",
          "Automatic date validation - only displays images from the current day (Pacific Time)",
          "\"No Current Picture Available\" placeholder for outdated images",
          "Prevents misleading pilots with outdated visual conditions"
        ]
      },
      {
        title: "Expanded Airport Coverage",
        emoji: "🌍",
        items: [
          "Added KTCY (Tracy Municipal Airport)",
          "Added KSCK (Stockton Metropolitan Airport)",
          "Added KMOD (Modesto City-County Airport)",
          "Now covers 20 airports across Bay Area and Central Valley"
        ]
      },
      {
        title: "Improved Wind Display",
        emoji: "🌬️",
        items: [
          "Shows \"No Wind\" instead of \"N/A\" for calm conditions",
          "Proper zero-padding for wind directions (005° vs 5°)",
          "Better handling of variable wind conditions (VRB)"
        ]
      },
      {
        title: "Better Timezone Handling",
        emoji: "🕐",
        items: [
          "Dynamic timezone detection (PDT/PST) instead of hardcoded \"PST\"",
          "All timestamps now show correct Pacific Time abbreviation"
        ]
      },
      {
        title: "Technical Improvements",
        emoji: "🏗️",
        items: [
          "Expandable version display in bottom-right corner",
          "Build information with git hash, branch, and build date",
          "Copy-to-clipboard functionality for version info",
          "Better error logging and debugging information",
          "Cleaner UI with reduced redundant warning messages"
        ]
      }
    ]
  },
  {
    version: "1.1.0",
    date: "2025-10-28",
    title: "Airport Expansion",
    highlights: [
      "Added 3 new airports (Tracy, Stockton, Modesto)",
      "Expanded from 17 to 20 airports total"
    ],
    sections: [
      {
        title: "Airport Expansion",
        emoji: "🌍",
        items: [
          "Added 3 new airports (Tracy, Stockton, Modesto)",
          "Expanded from 17 to 20 airports total"
        ]
      },
      {
        title: "Bug Fixes",
        emoji: "🔧",
        items: [
          "Removed hardcoded weather data for all airports",
          "All airports now display real-time METAR data"
        ]
      }
    ]
  },
  {
    version: "1.0.0",
    date: "2025-10-28",
    title: "Initial Release",
    highlights: [
      "Interactive map with 17 Bay Area airports",
      "Real-time METAR weather data",
      "Live camera feeds and video streams"
    ],
    sections: [
      {
        title: "Initial Release",
        emoji: "🎉",
        items: [
          "Interactive map with 17 Bay Area airports",
          "Real-time METAR weather data from aviationweather.gov",
          "Sam's Chowder House camera feeds (North & South views)",
          "Treasure Island YouTube live stream",
          "Lawrence Hall of Science static camera view",
          "Auto-refresh every 2 minutes for weather data",
          "Auto-refresh every 30 seconds for camera feeds",
          "Visual indicators for non-VFR weather conditions",
          "Clickable airport markers with detailed weather information"
        ]
      },
      {
        title: "Aviation Features",
        emoji: "🛩️",
        items: [
          "Temperature, wind, visibility, and conditions for each airport",
          "METAR observation timestamps in Pacific Time",
          "Color-coded weather conditions (red for non-clear conditions)",
          "Coverage from Sacramento to Monterey, Pacific Coast to Central Valley"
        ]
      }
    ]
  }
];

export function getChangelogForVersion(version: string): ChangelogEntry | undefined {
  return CHANGELOG.find(entry => entry.version === version);
}

export function getLatestChangelog(): ChangelogEntry {
  return CHANGELOG[0];
}
