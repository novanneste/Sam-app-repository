const API_BASE_URL = 'http://localhost:5000/api';

export const getStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  return response.json();
};

export const getHighlights = async () => {
  const response = await fetch(`${API_BASE_URL}/highlights`);
  return response.json();
};

export const getWaterIntakes = async () => {
  const response = await fetch(`${API_BASE_URL}/water`);
  return response.json();
};

export const addWaterIntake = async (amount) => {
  const response = await fetch(`${API_BASE_URL}/water`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });
  return response.json();
};

export const deleteWaterIntake = async (id) => {
  await fetch(`${API_BASE_URL}/water/${id}`, {
    method: 'DELETE',
  });
};

export const getMeals = async () => {
  const response = await fetch(`${API_BASE_URL}/meals`);
  return response.json();
};

export const addMeal = async (mealData) => {
  const response = await fetch(`${API_BASE_URL}/meals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mealData),
  });
  return response.json();
};

export const deleteMeal = async (id) => {
  await fetch(`${API_BASE_URL}/meals/${id}`, {
    method: 'DELETE',
  });
};
