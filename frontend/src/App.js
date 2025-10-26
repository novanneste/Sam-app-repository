import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import WaterTracker from './components/WaterTracker';
import MealLogger from './components/MealLogger';
import Highlights from './components/Highlights';
import { getStats, getHighlights } from './services/api';

function App() {
  const [stats, setStats] = useState({
    waterIntake: 0,
    mealsLogged: 0,
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0
  });
  const [highlights, setHighlights] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  const fetchData = async () => {
    try {
      const statsData = await getStats();
      const highlightsData = await getHighlights();
      setStats(statsData);
      setHighlights(highlightsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDataUpdate = () => {
    fetchData();
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌱 Vive.ai</h1>
        <p>AI-Powered Health Tracking</p>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={activeTab === 'water' ? 'active' : ''}
          onClick={() => setActiveTab('water')}
        >
          💧 Water
        </button>
        <button 
          className={activeTab === 'meals' ? 'active' : ''}
          onClick={() => setActiveTab('meals')}
        >
          🍽️ Meals
        </button>
      </nav>

      <main className="app-main">
        <div className="content-wrapper">
          <div className="main-content">
            {activeTab === 'dashboard' && <Dashboard stats={stats} />}
            {activeTab === 'water' && <WaterTracker onUpdate={handleDataUpdate} />}
            {activeTab === 'meals' && <MealLogger onUpdate={handleDataUpdate} />}
          </div>
          
          <aside className="highlights-sidebar">
            <Highlights highlights={highlights} />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
