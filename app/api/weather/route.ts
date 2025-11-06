import { NextResponse } from 'next/server';

// In-memory cache with timestamps
interface CacheEntry {
  data: unknown;
  timestamp: number;
}

const weatherCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  if (!ids) {
    return NextResponse.json({ error: 'Missing airport IDs' }, { status: 400 });
  }

  const airportIds = ids.split(',');

   // Check cache first
  const cacheKey = ids; // Use the IDs string as cache key
  const cachedEntry = weatherCache.get(cacheKey);
  const now = Date.now();

  if (cachedEntry && (now - cachedEntry.timestamp) < CACHE_DURATION) {
    console.log(`📦 Returning cached weather data for ${airportIds.length} airports: ${ids}`);
    return NextResponse.json(cachedEntry.data);
  }

  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    console.log(`🌤️  Fetching weather data for ${airportIds.length} airports: ${ids}`);

    const response = await fetch(
      `https://aviationweather.gov/api/data/metar?ids=${ids}&format=json&taf=false`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Bay Area Aviation Weather)',
          'Accept': 'application/json',
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Aviation Weather API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Cache the successful response
    weatherCache.set(cacheKey, {
      data,
      timestamp: now,
    });

    // Log successful request for debugging
    console.log(`✅ Weather data fetched and cached for ${airportIds.length} airports`);

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error fetching METAR data from aviationweather.gov:', error);

    // Determine the specific error type for better user messaging
    let errorMessage = 'Weather service temporarily unavailable';
    let statusCode = 503;

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Weather service timeout - please try again';
        statusCode = 504;
      } else if (error.message.includes('ConnectTimeoutError') || error.message.includes('fetch failed')) {
        errorMessage = 'Aviation weather service (aviationweather.gov) is currently unreachable.';
        statusCode = 503;
      }
    }

    console.error(`🚫 Returning error to user: ${errorMessage}`);

    return NextResponse.json(
      {
        error: errorMessage,
        details: 'Real-time weather data is not available. Do not use for flight planning.',
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}
