import React, { useState, useEffect } from 'react';
import './MealLogger.css';
import { getMeals, addMeal, deleteMeal } from '../services/api';

function MealLogger({ onUpdate }) {
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const mealsData = await getMeals();
      setMeals(mealsData);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.calories) return;

    try {
      await addMeal({
        name: formData.name,
        calories: parseFloat(formData.calories) || 0,
        protein: parseFloat(formData.protein) || 0,
        carbs: parseFloat(formData.carbs) || 0,
        fat: parseFloat(formData.fat) || 0
      });
      setFormData({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
      });
      await fetchMeals();
      onUpdate();
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  const handleDeleteMeal = async (id) => {
    try {
      await deleteMeal(id);
      await fetchMeals();
      onUpdate();
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const quickAddMeal = async (mealData) => {
    try {
      await addMeal(mealData);
      await fetchMeals();
      onUpdate();
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  const commonMeals = [
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
    { name: 'Greek Yogurt (1 cup)', calories: 130, protein: 11, carbs: 9, fat: 5 },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 }
  ];

  return (
    <div className="meal-logger">
      <h2>🍽️ Meal Logger</h2>

      <div className="quick-meals">
        <h3>Quick Add Common Foods</h3>
        <div className="quick-meals-grid">
          {commonMeals.map((meal, index) => (
            <button
              key={index}
              onClick={() => quickAddMeal(meal)}
              className="quick-meal-btn"
            >
              <div className="meal-name">{meal.name}</div>
              <div className="meal-stats">
                {meal.calories} cal | {meal.protein}g protein
              </div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="meal-form">
        <h3>Log Custom Meal</h3>
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Meal name *"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="number"
            name="calories"
            placeholder="Calories *"
            value={formData.calories}
            onChange={handleInputChange}
            min="0"
            required
          />
          <input
            type="number"
            name="protein"
            placeholder="Protein (g)"
            value={formData.protein}
            onChange={handleInputChange}
            min="0"
            step="0.1"
          />
        </div>
        <div className="form-row">
          <input
            type="number"
            name="carbs"
            placeholder="Carbs (g)"
            value={formData.carbs}
            onChange={handleInputChange}
            min="0"
            step="0.1"
          />
          <input
            type="number"
            name="fat"
            placeholder="Fat (g)"
            value={formData.fat}
            onChange={handleInputChange}
            min="0"
            step="0.1"
          />
        </div>
        <button type="submit" className="submit-btn">Add Meal</button>
      </form>

      <div className="meals-list">
        <h3>Today's Meals</h3>
        {meals.length === 0 ? (
          <p className="no-meals">No meals logged yet. Start tracking!</p>
        ) : (
          <ul>
            {meals.map((meal) => (
              <li key={meal.id} className="meal-entry">
                <div className="meal-header">
                  <h4>{meal.name}</h4>
                  <button
                    onClick={() => handleDeleteMeal(meal.id)}
                    className="delete-btn"
                  >
                    ✕
                  </button>
                </div>
                <div className="meal-details">
                  <span className="meal-detail">🔥 {meal.calories} cal</span>
                  <span className="meal-detail">💪 {meal.protein}g protein</span>
                  <span className="meal-detail">🍞 {meal.carbs}g carbs</span>
                  <span className="meal-detail">🥑 {meal.fat}g fat</span>
                </div>
                <div className="meal-time">
                  {new Date(meal.timestamp).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MealLogger;
