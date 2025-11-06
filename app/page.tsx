import AirportMap from './components/AirportMap';
import UserProfile from './components/UserProfile';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top-right user profile */}
      <div className="absolute top-4 right-4 z-[1000]">
        <UserProfile />
      </div>
      
      <AirportMap />
    </div>
  );
}
