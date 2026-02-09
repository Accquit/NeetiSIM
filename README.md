# NitiSIM - AI-Powered Environmental Policy Simulation Platform

> **Empowering policymakers with data-driven insights to combat air pollution**

NitiSIM is an intelligent governance platform that combines real-time environmental data, AI-driven policy recommendations, and quantitative impact simulation to help policymakers make informed decisions about air quality management.

[Website Link](https://bit.ly/nitisim)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Python%20%7C%20FastAPI-blue)

---

## Problem Statement - Climate Action (SDG 13)

Air pollution is one of the most critical environmental challenges facing urban India. With AQI levels frequently crossing hazardous thresholds in major cities, policymakers need:
- **Real-time insights** into pollution levels across multiple cities
- **Evidence-based policy recommendations** tailored to specific scenarios
- **Quantitative impact projections** before implementing costly interventions
- **Comparative analysis** of multiple policy options

NitiSIM addresses these challenges through an integrated platform that simulates policy outcomes before real-world implementation.

---

## Key Features

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

## Tech Stack

### **Frontend**
- **Framework**: React 19.2.4 with TypeScript
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 7.13
- **Charts**: Recharts 3.7
- **Maps**: Leaflet + React Leaflet
- **Build Tool**: Vite 7.3
- Deployed on web using Cloudflare Pages

### **Backend**
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn (ASGI)
- **Data Processing**: NumPy, Pandas
- **CORS**: Enabled for local development
- Deployed on web using Renderer

### **AI Integration**
- **Model**: Google Gemini API (gemini-1.5-flash)
- **SDK**: @google/generative-ai 0.24.1
- **Fallback**: Intelligent rule-based simulation

## 🗂️ Project Structure

```
NitiSIM/
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

## Features Showcase

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Team

**HackTU 7.0 Submission**

- Yashasvi Jaiswal
- Kushaj Sethi
- Shrey Singh

---

## 📧 Contact

For questions or feedback, reach out to: **yashasvi.jaiswal.2006@gmail.com**

---

<div align="center">
  <strong>Built with ❤️ for a cleaner, healthier India</strong>
</div>
