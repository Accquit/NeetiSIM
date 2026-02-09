import requests

def get_live_aqi(latitude=28.61, longitude=77.23):
    """
    Fetches real-time AQI data from OpenMeteo for a given location.
    Default location: New Delhi (28.61, 77.23).
    """
    url = "https://air-quality-api.open-meteo.com/v1/air-quality"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "pm10,pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone,aerosol_optical_depth,dust",
        "hourly": "pm10,pm2_5,nitrogen_dioxide",
        "timezone": "auto",
        "forecast_days": 1
    }

    try:
        response = requests.get(url, params=params)
        data = response.json()
        
        current = data.get("current", {})
        
        # OpenMeteo returns specific pollutant values. 
        # We calculate a rough AQI based on Indian standards (CPCB) for PM2.5/PM10 as a proxy.
        # This is a simplification as full AQI calculation is complex.
        
        pm2_5 = current.get("pm2_5", 0)
        pm10 = current.get("pm10", 0)
        no2 = current.get("nitrogen_dioxide", 0)
        
        # Simple proxy AQI calculation (approximate)
        # In reality, this follows CPCB breakpoints
        aqi = max(pm2_5 * 2, pm10, no2) 
        
        return {
            "aqi": int(aqi),
            "pm2_5": pm2_5,
            "pm10": pm10,
            "no2": no2,
            "so2": current.get("sulphur_dioxide", 0),
            "ozone": current.get("ozone", 0),
            "source": "OpenMeteo API"
        }
        
    except Exception as e:
        print(f"Error fetching AQI data: {e}")
        # Fallback data if API fails
        return {
            "aqi": 300,
            "pm2_5": 150,
            "pm10": 250,
            "no2": 80,
            "source": "Fallback Data"
        }
