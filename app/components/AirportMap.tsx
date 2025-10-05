'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface WeatherData {
  tempC?: string;
  wind?: string;
  visibility?: string;
  conditions?: string;
  fetchedDate?: string;
}

const AIRPORTS = [
  { code: 'KSFO', name: 'San Francisco Intl', lat: 37.6213, lon: -122.3790, weather: { tempC: '18°C', wind: '290° 10kt', visibility: '10SM', conditions: 'Clear', fetchedDate: '2025-01-11' } },
  { code: 'KOAK', name: 'Oakland Intl', lat: 37.7213, lon: -122.2200, weather: { tempC: '19°C', wind: '300° 8kt', visibility: '10SM', conditions: 'Clear', fetchedDate: '2025-01-11' } },
  { code: 'KSJC', name: 'San Jose Intl', lat: 37.3639, lon: -121.9290, weather: { tempC: '20°C', wind: '320° 6kt', visibility: '10SM', conditions: 'Clear', fetchedDate: '2025-01-11' } },
  { code: 'KSQL', name: 'San Carlos', lat: 37.5119, lon: -122.2500, weather: { tempC: '18°C', wind: '280° 8kt', visibility: '10SM', conditions: 'Clear', fetchedDate: '2025-01-11' } },
  { code: 'KPAO', name: 'Palo Alto', lat: 37.4611, lon: -122.1150, weather: { tempC: '19°C', wind: '310° 7kt', visibility: '10SM', conditions: 'Clear', fetchedDate: '2025-01-11' } },
  { code: 'KHWD', name: 'Hayward Executive', lat: 37.6592, lon: -122.1220, weather: { tempC: '18°C', wind: '290° 9kt', visibility: '10SM', conditions: 'Clear', fetchedDate: '2025-01-11' } },
  { code: 'KHAF', name: 'Half Moon Bay', lat: 37.5134, lon: -122.5011, weather: { tempC: '16°C', wind: '310° 12kt', visibility: '10SM', conditions: 'Clear', fetchedDate: '2025-01-11' } },
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
];

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function AirportMap() {
  const [selectedAirport, setSelectedAirport] = useState('KSQL');
  const [airportsWithWeather, setAirportsWithWeather] = useState(AIRPORTS);

  useEffect(() => {
    // Fetch real weather data for all airports
    const fetchWeatherData = async () => {
      try {
        const airportCodes = AIRPORTS.map(a => a.code).join(',');
        const response = await fetch(
          `/api/weather?ids=${airportCodes}`
        );

        if (!response.ok) {
          console.error('Failed to fetch weather data');
          return;
        }

        const data = await response.json();
        console.log('METAR data:', data); // Debug log

        // Update airports with weather data
        const updatedAirports = AIRPORTS.map(airport => {
          const metar = data.find((m: { icaoId: string }) => m.icaoId === airport.code);

          if (metar) {
            console.log(`METAR for ${airport.code}:`, metar); // Debug log

            const tempC = metar.temp !== undefined ? `${Math.round(metar.temp)}°C` : 'N/A';
            const wind = metar.wdir && metar.wspd
              ? `${metar.wdir}° ${metar.wspd}kt`
              : 'N/A';
            const visibility = metar.visib !== undefined ? `${metar.visib}SM` : 'N/A';
            const conditions = metar.wxString || (metar.cldCvr1 ? metar.cldCvr1 : 'CLR');

            // Convert UTC to PST/PDT (obsTime is in seconds, not milliseconds)
            const obsDate = new Date(metar.obsTime * 1000);

            const fetchedDate = obsDate.toLocaleString('en-US', {
              timeZone: 'America/Los_Angeles',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }) + ' PST';

            return {
              ...airport,
              weather: {
                tempC,
                wind,
                visibility,
                conditions,
                fetchedDate
              }
            };
          }

          return airport;
        });

        setAirportsWithWeather(updatedAirports);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
    // Refresh weather data every 2 minutes
    const interval = setInterval(fetchWeatherData, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen">
      <MapComponent
        airports={airportsWithWeather}
        selectedAirport={selectedAirport}
        onAirportSelect={setSelectedAirport}
      />
    </div>
  );
}
