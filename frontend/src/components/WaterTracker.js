import React, { useState, useEffect } from 'react';
import './WaterTracker.css';
import { getWaterIntakes, addWaterIntake, deleteWaterIntake } from '../services/api';

function WaterTracker({ onUpdate }) {
  const [waterEntries, setWaterEntries] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchWaterEntries();
  }, []);

  const fetchWaterEntries = async () => {
    try {
      const entries = await getWaterIntakes();
      setWaterEntries(entries);
    } catch (error) {
      console.error('Error fetching water entries:', error);
    }
  };

  const handleAddWater = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    try {
      await addWaterIntake(parseFloat(amount));
      setAmount('');
      await fetchWaterEntries();
      onUpdate();
    } catch (error) {
      console.error('Error adding water:', error);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await deleteWaterIntake(id);
      await fetchWaterEntries();
      onUpdate();
    } catch (error) {
      console.error('Error deleting water entry:', error);
    }
  };

  const quickAdd = async (ml) => {
    try {
      await addWaterIntake(ml);
      await fetchWaterEntries();
      onUpdate();
    } catch (error) {
      console.error('Error adding water:', error);
    }
  };

  const totalWater = waterEntries.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <div className="water-tracker">
      <h2>💧 Water Intake Tracker</h2>
      
      <div className="water-summary">
        <div className="total-water">
          <span className="total-label">Total Today</span>
          <span className="total-value">{totalWater} ml</span>
        </div>
      </div>

      <div className="quick-add-buttons">
        <button onClick={() => quickAdd(250)} className="quick-btn">
          +250ml
        </button>
        <button onClick={() => quickAdd(500)} className="quick-btn">
          +500ml
        </button>
        <button onClick={() => quickAdd(750)} className="quick-btn">
          +750ml
        </button>
      </div>

      <form onSubmit={handleAddWater} className="water-form">
        <input
          type="number"
          placeholder="Custom amount (ml)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />
        <button type="submit">Add Water</button>
      </form>

      <div className="water-entries">
        <h3>Today's Log</h3>
        {waterEntries.length === 0 ? (
          <p className="no-entries">No water logged yet. Start tracking!</p>
        ) : (
          <ul>
            {waterEntries.map((entry) => (
              <li key={entry.id} className="water-entry">
                <div className="entry-info">
                  <span className="entry-amount">💧 {entry.amount} ml</span>
                  <span className="entry-time">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="delete-btn"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WaterTracker;
