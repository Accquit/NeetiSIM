# 🌍 NeetiSIM - AI-Powered Environmental Policy Simulation Platform

> **Empowering policymakers with data-driven insights to combat air pollution**

NeetiSIM is an intelligent governance platform that combines real-time environmental data, AI-driven policy recommendations, and quantitative impact simulation to help policymakers make informed decisions about air quality management.

![NeetiSIM Dashboard](https://img.shields.io/badge/Status-Active-success)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Python%20%7C%20FastAPI-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Problem Statement

Air pollution is one of the most critical environmental challenges facing urban India. With AQI levels frequently crossing hazardous thresholds in major cities, policymakers need:
- **Real-time insights** into pollution levels across multiple cities
- **Evidence-based policy recommendations** tailored to specific scenarios
- **Quantitative impact projections** before implementing costly interventions
- **Comparative analysis** of multiple policy options

NeetiSIM addresses these challenges through an integrated platform that simulates policy outcomes before real-world implementation.

---

## ✨ Key Features

### 📊 **Multi-City Dashboard**
- Real-time AQI monitoring for Delhi, Mumbai, and Bangalore
- Key metrics: PM2.5, NO2, SO2, CO levels
- 7-day trend visualization
- Health status indicators

### 🤖 **AI Policy Architect**
- Gemini AI-powered policy recommendations
- Context-aware suggestions based on pollution scenarios
- Intelligent fallback for offline operation
- Supports queries about traffic, industrial, agricultural, and construction pollution

### 🎮 **Interactive Policy Simulator**
- Before/after impact visualization
- Budget allocation controls (₹500M - ₹5000M)
- Real-time impact score calculation
- Quantitative predictions for AQI, PM2.5, and NO2 reduction

### 📈 **5-Year Projection Model**
- Long-term AQI trend forecasting
- City-specific baseline modeling
- Budget-impact correlation analysis

### ⚖️ **Policy Comparison Tool**
- Side-by-side comparison of multiple policies
- Cost-effectiveness analysis
- Impact score ranking
- Export-ready comparison reports

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19.2.4 with TypeScript
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 7.13
- **Charts**: Recharts 3.7
- **Maps**: Leaflet + React Leaflet
- **Build Tool**: Vite 7.3

### **Backend**
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn (ASGI)
- **Data Processing**: NumPy, Pandas
- **CORS**: Enabled for local development

### **AI Integration**
- **Model**: Google Gemini API (gemini-1.5-flash)
- **SDK**: @google/generative-ai 0.24.1
- **Fallback**: Intelligent rule-based simulation

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm
- Python 3.8+
- Git

### **Installation**

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/NeetiSIM.git
cd NeetiSIM
```

#### 2️⃣ Setup Frontend
```bash
cd Frontend
npm install
```

#### 3️⃣ Setup Backend
```bash
cd ../Backend
pip install fastapi uvicorn numpy pandas
```

#### 4️⃣ Configure Gemini API (Optional)
If you want to use the real Gemini API instead of simulation mode:

1. Get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Open `Frontend/src/services/GeminiService.ts`
3. Replace the API key on line 4:
```typescript
const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");
```

---

## 💻 Running the Application

### **Start Backend Server**
```bash
cd Backend
python -m uvicorn main:app --reload
```
Backend will run on `http://localhost:8000`

### **Start Frontend Development Server**
```bash
cd Frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### **Access the Application**
Open your browser and navigate to: **http://localhost:5173**

---

## 📖 Usage Guide

### **1. Dashboard Overview**
- Select a city from the dropdown (Delhi/Mumbai/Bangalore)
- View current AQI and pollution metrics
- Analyze 7-day trends and 5-year projections

### **2. Policy Simulation**
1. Navigate to **Simulator** page
2. Select a policy from the dropdown
3. Adjust budget allocation using the slider
4. View before/after comparison and impact score

### **3. AI Policy Generator**
1. Click **"Ask AI Assistant"** button
2. Describe your pollution scenario (e.g., "Traffic congestion causing high NO2")
3. Click **"Generate Policy Strategy"**
4. Review AI-generated policy recommendation

### **4. Policy Comparison**
1. Go to **Comparison** page
2. Select 2-3 policies to compare
3. Adjust budgets for each policy
4. Analyze side-by-side impact metrics

---

## 🗂️ Project Structure

```
NeetiSIM/
├── Frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # Button, MetricCard, etc.
│   │   │   ├── charts/      # AQIChart, PollutionMap
│   │   │   └── layout/      # Navbar, Footer
│   │   ├── pages/           # Route components
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Simulator.tsx
│   │   │   └── Comparison.tsx
│   │   ├── services/        # API and AI services
│   │   │   ├── api.ts
│   │   │   └── GeminiService.ts
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── Backend/
│   ├── main.py              # FastAPI application
│   ├── policy_simulation.py # Simulation logic
│   └── requirements.txt
│
└── README.md
```

---

## 🔌 API Documentation

### **Backend Endpoints**

#### `GET /api/baseline/{city_id}`
Get baseline environmental data for a city.

**Response:**
```json
{
  "city": "delhi",
  "baseline": {
    "aqi": 287,
    "pm25": 140,
    "no2": 65,
    "trend": [...]
  }
}
```

#### `POST /api/simulate`
Simulate policy impact.

**Request:**
```json
{
  "policy_id": "ev_transition",
  "budget": 2000,
  "city_id": "delhi"
}
```

**Response:**
```json
{
  "before": { "aqi": 287, "pm25": 140, "no2": 65 },
  "after": { "aqi": 215, "pm25": 105, "no2": 48 },
  "impact_score": 78
}
```

#### `POST /api/compare`
Compare multiple policies.

**Request:**
```json
{
  "policies": [
    {"id": "ev_transition", "budget": 2000},
    {"id": "industrial_monitoring", "budget": 1500}
  ],
  "city_id": "delhi"
}
```

---

## 🎨 Features Showcase

### **Responsive Design**
- Mobile-first approach
- Glassmorphism UI elements
- Smooth animations and transitions

### **Data Visualization**
- Interactive line charts for trends
- Color-coded health status indicators
- Real-time metric updates

### **AI Integration**
- Context-aware policy generation
- Natural language query processing
- Intelligent fallback for reliability

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**HackTU 2026 Submission**

- Project Lead & Full-Stack Developer
- AI Integration Specialist
- UI/UX Designer

---

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- OpenAQ for air quality data standards
- FastAPI and React communities for excellent documentation

---

## 📧 Contact

For questions or feedback, reach out to: **your.email@example.com**

---

<div align="center">
  <strong>Built with ❤️ for a cleaner, healthier India</strong>
</div>
