import React from 'react';
import './Dashboard.css';

function Dashboard({ stats }) {
  const waterGoal = 2500; // ml
  const calorieGoal = 2000;
  const proteinGoal = 150; // grams

  const waterProgress = Math.min((stats.waterIntake / waterGoal) * 100, 100);
  const calorieProgress = Math.min((stats.totalCalories / calorieGoal) * 100, 100);
  const proteinProgress = Math.min((stats.totalProtein / proteinGoal) * 100, 100);

  return (
    <div className="dashboard">
      <h2>📊 Today's Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💧</div>
          <div className="stat-info">
            <h3>Water Intake</h3>
            <p className="stat-value">{stats.waterIntake} ml</p>
            <p className="stat-goal">Goal: {waterGoal} ml</p>
            <div className="progress-bar">
              <div 
                className="progress-fill water" 
                style={{ width: `${waterProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <h3>Calories</h3>
            <p className="stat-value">{stats.totalCalories} kcal</p>
            <p className="stat-goal">Goal: {calorieGoal} kcal</p>
            <div className="progress-bar">
              <div 
                className="progress-fill calories" 
                style={{ width: `${calorieProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-info">
            <h3>Protein</h3>
            <p className="stat-value">{stats.totalProtein}g</p>
            <p className="stat-goal">Goal: {proteinGoal}g</p>
            <div className="progress-bar">
              <div 
                className="progress-fill protein" 
                style={{ width: `${proteinProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-info">
            <h3>Meals Logged</h3>
            <p className="stat-value">{stats.mealsLogged}</p>
            <p className="stat-goal">Keep tracking!</p>
          </div>
        </div>
      </div>

      <div className="macros-breakdown">
        <h3>Macronutrient Breakdown</h3>
        <div className="macros-grid">
          <div className="macro-item">
            <span className="macro-label">Protein</span>
            <span className="macro-value">{stats.totalProtein}g</span>
          </div>
          <div className="macro-item">
            <span className="macro-label">Carbs</span>
            <span className="macro-value">{stats.totalCarbs}g</span>
          </div>
          <div className="macro-item">
            <span className="macro-label">Fat</span>
            <span className="macro-value">{stats.totalFat}g</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
