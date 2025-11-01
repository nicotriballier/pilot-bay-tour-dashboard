'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import VersionDisplay from './VersionDisplay';

interface WeatherData {
  tempC?: string;
  wind?: string;
  visibility?: string;
  conditions?: string;
  ceiling?: string;
  fetchedDate?: string;
}

interface Airport {
  code: string;
  name: string;
  lat: number;
  lon: number;
  weather?: WeatherData;
}

const AIRPORTS: Airport[] = [
  { code: 'KSFO', name: 'San Francisco Intl', lat: 37.6213, lon: -122.3790 },
  { code: 'KOAK', name: 'Oakland Intl', lat: 37.7213, lon: -122.2200 },
  { code: 'KSJC', name: 'San Jose Intl', lat: 37.3639, lon: -121.9290 },
  { code: 'KSQL', name: 'San Carlos', lat: 37.5119, lon: -122.2500 },
  { code: 'KPAO', name: 'Palo Alto', lat: 37.4611, lon: -122.1150 },
  { code: 'KHWD', name: 'Hayward Executive', lat: 37.6592, lon: -122.1220 },
  { code: 'KHAF', name: 'Half Moon Bay', lat: 37.5134, lon: -122.5011 },
  { code: 'KLVK', name: 'Livermore', lat: 37.6934, lon: -121.8200 },
  { code: 'KCCR', name: 'Buchanan Field', lat: 37.9897, lon: -122.0569 },
  { code: 'KNUQ', name: 'Moffett Federal', lat: 37.4161, lon: -122.0494 },
  { code: 'KRHV', name: 'Reid-Hillview', lat: 37.3329, lon: -121.8197 },
  { code: 'KSUU', name: 'Travis AFB', lat: 38.2627, lon: -121.9273 },
  { code: 'KSTS', name: 'Sonoma County', lat: 38.5089, lon: -122.8128 },
  { code: 'KAPC', name: 'Napa County', lat: 38.2132, lon: -122.2807 },
  { code: 'KWVI', name: 'Watsonville', lat: 36.9357, lon: -121.7900 },
  { code: 'KMRY', name: 'Monterey Regional', lat: 36.5870, lon: -121.8429 },
  { code: 'KSMF', name: 'Sacramento Intl', lat: 38.6954, lon: -121.5908 },
  { code: 'KTCY', name: 'Tracy Municipal', lat: 37.6889, lon: -121.4417 },
  { code: 'KSCK', name: 'Stockton Metropolitan', lat: 37.8942, lon: -121.2383 },
  { code: 'KMOD', name: 'Modesto City-County', lat: 37.6258, lon: -120.9544 },
];

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function AirportMap() {
  const [selectedAirport, setSelectedAirport] = useState('KSQL');
  const [airportsWithWeather, setAirportsWithWeather] = useState(AIRPORTS);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch real weather data for all airports
    const fetchWeatherData = async () => {
      try {
        const airportCodes = AIRPORTS.map(a => a.code).join(',');
        const response = await fetch(
          `/api/weather?ids=${airportCodes}`
        );

        if (!response.ok) {
          // Try to get the detailed error message from the API response
          try {
            const errorData = await response.json();
            const errorMsg = errorData.error || `Failed to fetch weather data: ${response.status} ${response.statusText}`;
            console.error('Weather API error:', errorData);
            setWeatherError(errorMsg);
          } catch {
            const errorMsg = `Failed to fetch weather data: ${response.status} ${response.statusText}`;
            console.error(errorMsg);
            setWeatherError(errorMsg);
          }
          return;
        }

        // Clear any previous errors
        setWeatherError(null);

        const data = await response.json();
        console.log('METAR data:', data); // Debug log

        // Update airports with weather data
        const updatedAirports = AIRPORTS.map(airport => {
          const metar = data.find((m: { icaoId: string }) => m.icaoId === airport.code);

          if (metar) {
            console.log(`METAR for ${airport.code}:`, metar); // Debug log

            // Only process if we have essential weather data - NO DEFAULTS
            if (metar.temp === undefined || !metar.cover || metar.visib === undefined) {
              console.log(`⚠️ Incomplete weather data for ${airport.code} - not displaying weather`);
              return airport; // Return airport without weather data
            }

            // Format temperature with dew point if available
            const tempC = metar.dewp !== undefined
              ? `${Math.round(metar.temp)}°C (${Math.round(metar.dewp)}°C dew point)`
              : `${Math.round(metar.temp)}°C`;
            const visibility = `${metar.visib}SM`;
            const conditions = metar.cover; // Use correct API field name

            // Calculate ceiling from clouds array - only show actual ceilings (BKN/OVC)
            let ceiling = '';
            if (metar.clouds && Array.isArray(metar.clouds) && metar.clouds.length > 0) {
              // Find the lowest ceiling (BKN or OVC layers only)
              const ceilingLayers = metar.clouds.filter((cloud: { cover: string; base: number }) =>
                cloud.cover === 'BKN' || cloud.cover === 'OVC'
              );

              if (ceilingLayers.length > 0) {
                const lowestCeiling = Math.min(...ceilingLayers.map((cloud: { cover: string; base: number }) => cloud.base));
                ceiling = `${lowestCeiling}ft ceiling`;
              }
              // If no ceiling layers (only FEW/SCT), don't show ceiling
            }

            // Handle wind - only if we have complete wind data
            let wind;
            if (metar.wdir !== undefined && metar.wspd !== undefined) {
              if (metar.wspd === 0) {
                wind = 'No Wind'; // Real calm conditions
              } else if (metar.wdir === 'VRB') {
                wind = `VRB ${metar.wspd}kt`;
              } else {
                wind = `${String(metar.wdir).padStart(3, '0')}° ${metar.wspd}kt`;
              }
            } else {
              console.log(`⚠️ Incomplete wind data for ${airport.code} - not displaying weather`);
              return airport; // Return airport without weather data
            }

            // Convert UTC to PST/PDT (obsTime is in seconds, not milliseconds)
            const obsDate = new Date(metar.obsTime * 1000);

            // Get the formatted date with proper timezone abbreviation
            const fetchedDate = obsDate.toLocaleString('en-US', {
              timeZone: 'America/Los_Angeles',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZoneName: 'short'
            });

            return {
              ...airport,
              weather: {
                tempC,
                wind,
                visibility,
                conditions,
                ceiling,
                fetchedDate
              }
            };
          }

          return airport;
        });

        setAirportsWithWeather(updatedAirports);
      } catch (error) {
        const errorMsg = `Error fetching weather data: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(errorMsg);
        setWeatherError(errorMsg);
      }
    };

    fetchWeatherData();
    // Refresh weather data every 2 minutes
    const interval = setInterval(fetchWeatherData, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen relative">
      {weatherError && (
        <div className="absolute top-4 left-4 z-[1000] bg-red-600 border-2 border-red-800 text-white px-6 py-4 rounded-lg shadow-lg max-w-lg">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">⚠️</span>
            <strong className="font-bold text-lg">WEATHER DATA UNAVAILABLE</strong>
          </div>
          <div className="text-sm">{weatherError}</div>
        </div>
      )}
      <MapComponent
        airports={airportsWithWeather}
        selectedAirport={selectedAirport}
        onAirportSelect={setSelectedAirport}
      />
      <VersionDisplay />
    </div>
  );
}
