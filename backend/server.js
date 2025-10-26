const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data storage (replace with database in production)
let waterIntakes = [];
let meals = [];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Vive.ai API' });
});

// Water intake routes
app.get('/api/water', (req, res) => {
  res.json(waterIntakes);
});

app.post('/api/water', (req, res) => {
  const { amount, timestamp } = req.body;
  const waterEntry = {
    id: Date.now(),
    amount: parseFloat(amount),
    timestamp: timestamp || new Date().toISOString()
  };
  waterIntakes.push(waterEntry);
  res.status(201).json(waterEntry);
});

app.delete('/api/water/:id', (req, res) => {
  const id = parseInt(req.params.id);
  waterIntakes = waterIntakes.filter(entry => entry.id !== id);
  res.status(204).send();
});

// Meal routes
app.get('/api/meals', (req, res) => {
  res.json(meals);
});

app.post('/api/meals', (req, res) => {
  const { name, calories, protein, carbs, fat, timestamp } = req.body;
  const mealEntry = {
    id: Date.now(),
    name,
    calories: parseFloat(calories),
    protein: parseFloat(protein),
    carbs: parseFloat(carbs),
    fat: parseFloat(fat),
    timestamp: timestamp || new Date().toISOString()
  };
  meals.push(mealEntry);
  res.status(201).json(mealEntry);
});

app.delete('/api/meals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  meals = meals.filter(entry => entry.id !== id);
  res.status(204).send();
});

// AI Highlights route (simulated)
app.get('/api/highlights', (req, res) => {
  const totalWater = waterIntakes.reduce((sum, entry) => sum + entry.amount, 0);
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  
  const highlights = [];
  
  // Generate simulated AI highlights based on data
  if (totalWater < 2000) {
    highlights.push({
      id: 1,
      type: 'warning',
      title: 'Hydration Alert',
      message: `You've logged ${totalWater}ml of water today. Try to reach at least 2000ml for optimal hydration.`
    });
  } else {
    highlights.push({
      id: 1,
      type: 'success',
      title: 'Great Hydration!',
      message: `Excellent! You've consumed ${totalWater}ml of water today. Keep up the good work!`
    });
  }
  
  if (meals.length === 0) {
    highlights.push({
      id: 2,
      type: 'info',
      title: 'Start Tracking',
      message: 'Log your first meal to get personalized nutrition insights.'
    });
  } else if (totalCalories > 2500) {
    highlights.push({
      id: 2,
      type: 'warning',
      title: 'Calorie Check',
      message: `You've consumed ${totalCalories} calories today. Consider lighter options for your next meal.`
    });
  } else {
    highlights.push({
      id: 2,
      type: 'success',
      title: 'Balanced Intake',
      message: `You're at ${totalCalories} calories today with ${totalProtein}g of protein. Looking good!`
    });
  }
  
  if (meals.length >= 3) {
    highlights.push({
      id: 3,
      type: 'success',
      title: 'Consistent Tracking',
      message: `You've logged ${meals.length} meals today. Consistency is key to reaching your health goals!`
    });
  }
  
  res.json(highlights);
});

// Stats route
app.get('/api/stats', (req, res) => {
  const totalWater = waterIntakes.reduce((sum, entry) => sum + entry.amount, 0);
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);
  
  res.json({
    waterIntake: totalWater,
    mealsLogged: meals.length,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
