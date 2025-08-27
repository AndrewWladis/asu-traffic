'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [occupancyData, setOccupancyData] = useState([
    { id: 0, name: 'Hayden Library', building: 'LIB', occupancyPercentage: 10, lastUpdated: '3 min ago' },
    { id: 1, name: 'Sun Devil Fitness Center', building: 'SDFCT', occupancyPercentage: 20, lastUpdated: '3 min ago' },
    { id: 2, name: 'Memorial Union', building: 'MU', occupancyPercentage: 50, lastUpdated: '1 min ago' },
    { id: 3, name: 'Noble Library', building: 'Noble', occupancyPercentage: 80, lastUpdated: '2 min ago' },
    { id: 4, name: 'Mountain America Stadium', building: 'MAS', occupancyPercentage: 5, lastUpdated: '5 min ago' },
    { id: 5, name: 'Desert Financial Arena', building: 'DFA', occupancyPercentage: 8, lastUpdated: '4 min ago' },
    { id: 6, name: 'Gammage Auditorium', building: 'GAM', occupancyPercentage: 95, lastUpdated: '6 min ago' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getOccupancyLevel = (percentage) => {
    if (percentage < 30) return 'low';
    if (percentage < 70) return 'medium';
    return 'high';
  };

  const getOccupancyColor = (percentage) => {
    const level = getOccupancyLevel(percentage);
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getOccupancyText = (percentage) => {
    const level = getOccupancyLevel(percentage);
    switch (level) {
      case 'low': return 'Not Crowded';
      case 'medium': return 'Moderately Crowded';
      case 'high': return 'Very Crowded';
      default: return 'Unknown';
    }
  };

  const getOccupancyIcon = (percentage) => {
    const level = getOccupancyLevel(percentage);
    switch (level) {
      case 'low': return '😌';
      case 'medium': return '😐';
      case 'high': return '😰';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-white">MORTEY ASU</h1>
            </div>
            <div className="text-sm text-gray-300">
              Last updated: {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </header>

      {/* Building Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Current Building Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {occupancyData.map((building) => (
              <div key={building.id} className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-700">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{building.name}</h4>
                      <p className="text-sm text-gray-400">{building.building}</p>
                    </div>
                    <div className="text-3xl">{getOccupancyIcon(building.occupancyPercentage)}</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-3 h-3 ${getOccupancyColor(building.occupancyPercentage)} rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-300">
                      {getOccupancyText(building.occupancyPercentage)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {building.occupancyPercentage}% Occupied
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Updated {building.lastUpdated}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              Built by RicksMortey. Real-time building occupancy data for Arizona State University.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              For students, by students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
