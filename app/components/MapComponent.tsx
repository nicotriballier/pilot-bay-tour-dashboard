'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

interface WeatherData {
  tempC?: string;
  wind?: string;
  visibility?: string;
  conditions?: string;
  fetchedDate?: string;
}

interface Airport {
  code: string;
  name: string;
  lat: number;
  lon: number;
  weather?: WeatherData;
}

interface MapComponentProps {
  airports: Airport[];
  selectedAirport: string;
  onAirportSelect: (code: string) => void;
}

// Sam's Chowder House camera location (5 miles northeast: ~0.0725 degrees north, ~0.0735 degrees east)
const SAMS_CHOWDER_HOUSE = { lat: 37.2234, lon: -122.393 };

// Treasure Island video marker location (5 miles south: ~0.0725 degrees south)
const TREASURE_ISLAND_VIDEO = { lat: 37.8199, lon: -123.0535 };

// Lawrence Hall of Science location (5 miles north - approximately 0.0725 degrees latitude)
const LAWRENCE_HALL = { lat: 37.7325, lon: -122.065 };


// Custom icon for airports with code and weather data (no pin)
const createAirportIcon = (isSelected: boolean, code: string, name: string, weather?: WeatherData) => {
  const isClear = weather?.conditions?.toUpperCase().includes('CLR') ||
                  weather?.conditions?.toUpperCase().includes('CLEAR') ||
                  weather?.conditions === 'CLR';
  const conditionsColor = isClear ? '#666' : '#ef4444';
  const zIndex = isSelected ? '1000' : 'auto';

  const weatherHtml = weather ? `
    <div style="
      background: white;
      padding: 6px 8px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      border: 2px solid #3b82f6;
      white-space: nowrap;
      font-size: 9px;
      line-height: 1.3;
      text-align: left;
      min-width: 110px;
      position: relative;
      z-index: ${zIndex};
    ">
      <div style="color: #000; font-weight: bold; font-size: 10px; margin-bottom: 3px;">${code}</div>
      <div style="color: #000; font-weight: bold;">${weather.tempC || 'N/A'}</div>
      <div style="color: #666;">${weather.wind || 'N/A'}</div>
      <div style="color: #666;">${weather.visibility || 'N/A'}</div>
      <div style="color: ${conditionsColor}; font-weight: ${isClear ? 'normal' : 'bold'};">${weather.conditions || 'N/A'}</div>
      <div style="color: #999; font-size: 7px; margin-top: 2px;">${weather.fetchedDate || 'N/A'}</div>
    </div>
  ` : `
    <div style="
      background: white;
      padding: 6px 8px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      border: 2px solid #3b82f6;
      white-space: nowrap;
      font-size: 9px;
      text-align: left;
      min-width: 110px;
      position: relative;
      z-index: ${zIndex};
    ">
      <div style="color: #000; font-weight: bold; font-size: 10px;">${code}</div>
      <div style="color: #999; font-size: 8px;">Loading...</div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-airport-marker',
    html: weatherHtml,
    iconSize: [120, 90],
    iconAnchor: [60, 45],
    popupAnchor: [0, -45],
  });
};

// Component to add combined camera image overlay (North and South)
function CameraOverlay() {
  const map = useMap();
  const overlayRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const cameraIcon = L.divIcon({
      className: 'camera-image-overlay',
      html: `
        <div style="
          background: white;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          border: 3px solid #10b981;
        ">
          <div style="display: flex; gap: 12px;">
            <div>
              <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Sam's Chowder House / KHAF (North)</div>
              <img
                src="https://cams.samschowderhouse.com/south.jpg?${Date.now()}"
                style="width: 480px; height: 360px; border-radius: 4px; display: block;"
                alt="Camera feed North"
              />
            </div>
            <div>
              <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Sam's Chowder House / KHAF (South)</div>
              <img
                src="https://cams.samschowderhouse.com/north.jpg?${Date.now()}"
                style="width: 480px; height: 360px; border-radius: 4px; display: block;"
                alt="Camera feed South"
              />
            </div>
          </div>
        </div>
      `,
      iconSize: [1008, 433],
      iconAnchor: [1008, 216],
    });

    overlayRef.current = L.marker([SAMS_CHOWDER_HOUSE.lat, SAMS_CHOWDER_HOUSE.lon], {
      icon: cameraIcon,
    }).addTo(map);

    // Refresh image every 30 seconds
    const interval = setInterval(() => {
      if (overlayRef.current) {
        const updatedIcon = L.divIcon({
          className: 'camera-image-overlay',
          html: `
            <div style="
              background: white;
              padding: 12px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.3);
              border: 3px solid #10b981;
            ">
              <div style="display: flex; gap: 12px;">
                <div>
                  <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Sam's Chowder House / KHAF (North)</div>
                  <img
                    src="https://cams.samschowderhouse.com/south.jpg?${Date.now()}"
                    style="width: 480px; height: 360px; border-radius: 4px; display: block;"
                    alt="Camera feed North"
                  />
                </div>
                <div>
                  <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Sam's Chowder House / KHAF (South)</div>
                  <img
                    src="https://cams.samschowderhouse.com/north.jpg?${Date.now()}"
                    style="width: 480px; height: 360px; border-radius: 4px; display: block;"
                    alt="Camera feed South"
                  />
                </div>
              </div>
            </div>
          `,
          iconSize: [1008, 433],
          iconAnchor: [1008, 216],
        });
        overlayRef.current.setIcon(updatedIcon);
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      if (overlayRef.current) {
        map.removeLayer(overlayRef.current);
      }
    };
  }, [map]);

  return null;
}

// Component to add video overlay
function VideoOverlay() {
  const map = useMap();
  const overlayRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const videoIcon = L.divIcon({
      className: 'video-overlay',
      html: `
        <div style="
          background: white;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          border: 3px solid #ef4444;
        ">
          <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Treasure Island</div>
          <iframe
            width="768"
            height="432"
            src="https://www.youtube.com/embed/BSWhGNXxT9A?autoplay=1&mute=1&loop=1&playlist=BSWhGNXxT9A"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style="border-radius: 4px; display: block;"
          ></iframe>
        </div>
      `,
      iconSize: [792, 516],
      iconAnchor: [396, 258],
    });

    overlayRef.current = L.marker([TREASURE_ISLAND_VIDEO.lat, TREASURE_ISLAND_VIDEO.lon], {
      icon: videoIcon,
    }).addTo(map);

    return () => {
      if (overlayRef.current) {
        map.removeLayer(overlayRef.current);
      }
    };
  }, [map]);

  return null;
}

// Component to add Lawrence Hall of Science overlay
function LawrenceHallOverlay() {
  const map = useMap();
  const overlayRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const lawrenceIcon = L.divIcon({
      className: 'lawrence-image-overlay',
      html: `
        <div style="
          background: white;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          border: 3px solid #f59e0b;
        ">
          <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Lawrence Hall of Science</div>
          <img
            src="https://www.ocf.berkeley.edu/~thelawrence/images/newview.jpg"
            style="width: 480px; height: 360px; border-radius: 4px; display: block;"
            alt="Lawrence Hall view"
          />
        </div>
      `,
      iconSize: [504, 396],
      iconAnchor: [252, 396],
    });

    overlayRef.current = L.marker([LAWRENCE_HALL.lat, LAWRENCE_HALL.lon], {
      icon: lawrenceIcon,
    }).addTo(map);

    return () => {
      if (overlayRef.current) {
        map.removeLayer(overlayRef.current);
      }
    };
  }, [map]);

  return null;
}


export default function MapComponent({ airports, selectedAirport, onAirportSelect }: MapComponentProps) {
  return (
    <MapContainer
      center={[37.55, -122.2]}
      zoom={10}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {airports.map((airport) => {
        return (
          <Marker
            key={airport.code}
            position={[airport.lat, airport.lon]}
            icon={createAirportIcon(airport.code === selectedAirport, airport.code, airport.name, airport.weather)}
            zIndexOffset={airport.code === selectedAirport ? 1000 : 0}
            eventHandlers={{
              click: () => onAirportSelect(airport.code),
            }}
          >
            <Popup>
              <div className="text-center">
                <div className="font-bold text-lg">{airport.code}</div>
                <div className="text-sm">{airport.name}</div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Camera image overlay - always visible */}
      <CameraOverlay />

      {/* Video overlay - always visible with autoplay */}
      <VideoOverlay />

      {/* Lawrence Hall of Science overlay */}
      <LawrenceHallOverlay />
    </MapContainer>
  );
}
