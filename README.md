# Vive.ai - AI-Powered Health Tracking App

An AI-powered health app that helps users track hydration and nutrition, providing actionable highlights to improve health habits.

## Features
✅ **Water Intake Tracking** - Log water consumption with quick-add buttons (250ml, 500ml, 750ml) or custom amounts
✅ **Meal Logging** - Track meals with complete nutritional information (calories, protein, carbs, fat)
✅ **AI-Generated Highlights** - Get personalized health insights based on your daily activity (currently simulated)
✅ **Interactive Dashboard** - View real-time stats with progress bars and visualizations
✅ **Quick Add Meals** - Pre-configured common foods for faster logging
✅ **Responsive Design** - Works beautifully on desktop and mobile devices

## Tech Stack
- **Framework**: React + Node.js/Express
- **Frontend**: React 18 with modern hooks and functional components
- **Backend**: Node.js with Express REST API
- **Styling**: CSS3 with modern gradients, animations, and responsive design
- **State Management**: React hooks (useState, useEffect)
- **HTTP Client**: Fetch API for backend communication

## Project Structure
```
/frontend
  ├── public/
  │   └── index.html
  ├── src/
  │   ├── components/
  │   │   ├── Dashboard.js       # Main stats overview
  │   │   ├── Dashboard.css
  │   │   ├── WaterTracker.js    # Water intake logging
  │   │   ├── WaterTracker.css
  │   │   ├── MealLogger.js      # Meal tracking
  │   │   ├── MealLogger.css
  │   │   ├── Highlights.js      # AI insights display
  │   │   └── Highlights.css
  │   ├── services/
  │   │   └── api.js             # Backend API integration
  │   ├── App.js                 # Main app component
  │   ├── App.css
  │   ├── index.js
  │   ├── index.css
  │   └── package.json
/backend
  ├── server.js                  # Express server with REST API
  └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup
```bash
cd backend
npm install
npm start
```
✅ Server runs on **http://localhost:5000**

**Available API Endpoints:**
- `GET /api/stats` - Get daily statistics
- `GET /api/highlights` - Get AI-generated insights
- `GET /api/water` - Get all water entries
- `POST /api/water` - Add water intake (body: {amount: number})
- `DELETE /api/water/:id` - Delete water entry
- `GET /api/meals` - Get all meals
- `POST /api/meals` - Add meal (body: {name, calories, protein, carbs, fat})
- `DELETE /api/meals/:id` - Delete meal

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
✅ App runs on **http://localhost:3000**

The frontend will automatically connect to the backend API at http://localhost:5000.

## Using the Application

### 1. Dashboard Tab 📊
- View your daily water intake progress (goal: 2500ml)
- Track total calories consumed (goal: 2000 kcal)
- Monitor protein intake (goal: 150g)
- See total meals logged
- View macronutrient breakdown (protein, carbs, fat)

### 2. Water Tab 💧
- Quick add buttons for common amounts (250ml, 500ml, 750ml)
- Custom amount input for precise tracking
- View today's water log with timestamps
- Delete entries if needed
- See total water intake in real-time

### 3. Meals Tab 🍽️
- Quick add common foods:
  - Chicken Breast (165 cal, 31g protein)
  - Brown Rice (216 cal, 45g carbs)
  - Greek Yogurt (130 cal, 11g protein)
  - Banana (105 cal, 27g carbs)
- Log custom meals with complete nutritional info
- View meal history with timestamps
- Delete entries if needed

### 4. AI Highlights (Sidebar) 🤖
- Get personalized insights based on your activity:
  - Hydration alerts and encouragements
  - Calorie intake recommendations
  - Consistency tracking rewards
- Color-coded highlights (success, warning, info)
- Updates automatically as you log data

## Features in Detail

### Simulated AI Highlights
The app generates intelligent insights based on your logged data:
- **Hydration Tracking**: Alerts if water intake is below 2000ml
- **Calorie Monitoring**: Warnings if exceeding 2500 calories
- **Consistency Rewards**: Positive feedback for regular meal logging
- **Personalized Messages**: Dynamic content based on your specific data

### Data Persistence
Currently uses in-memory storage on the backend. Data resets when server restarts.

## Future Enhancements
- 🔮 Real AI API integration (OpenAI GPT-4, Claude, etc.)
- 🔐 User authentication and personalized accounts
- 💾 Database integration (MongoDB, PostgreSQL)
- 📱 Mobile app version (React Native)
- 📊 Advanced analytics and charts
- 🎯 Custom goal setting
- 🔔 Push notifications and reminders
- 📅 Historical data tracking (weekly/monthly views)
- 🍎 Food database integration
- 🏋️ Exercise tracking integration

## Development

### Running in Development Mode
For hot-reloading during development:

**Backend:**
```bash
cd backend
npm install -g nodemon  # Install nodemon globally
npm run dev             # Uses nodemon for auto-restart
```

**Frontend:**
```bash
cd frontend
npm start  # Includes hot-reload by default
```

### Code Structure
- **Component-based architecture**: Each feature is a separate React component
- **Service layer**: API calls are centralized in `services/api.js`
- **Modular CSS**: Each component has its own stylesheet
- **RESTful API**: Clean endpoint structure following REST principles

## Contributing
Contributions are welcome! Areas for improvement:
- Adding more food items to the quick-add list
- Implementing charts/graphs for data visualization
- Adding export functionality (CSV, PDF)
- Improving AI simulation logic
- Adding unit tests

## License
MIT License - Feel free to use this project for learning or as a foundation for your own health tracking app!

## Support
For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using React and Node.js**
