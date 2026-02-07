import pandas as pd
from sklearn.linear_model import LinearRegression

# -------------------------------
# 1. LOAD DATA
# -------------------------------
data = pd.read_csv("delhi-weather-aqi-2025.csv")

# Keep only required columns
required_columns = [
    "aqi_index",
    "pm2_5",
    "no2",
    "location"
]
data = data[required_columns]

# -------------------------------
# 2. BASELINE CALCULATION
# -------------------------------
baseline = {
    "aqi_index": data["aqi_index"].mean(),
    "pm2_5": data["pm2_5"].mean(),
    "no2": data["no2"].mean()
}

print("Baseline Pollution Levels:")
print(baseline)

# -------------------------------
# 3. TRAIN REGRESSION MODEL
# -------------------------------
# Inputs: PM2.5, NO2
# Output: AQI
X = data[["pm2_5", "no2"]]
y = data["aqi_index"]

regression_model = LinearRegression()
regression_model.fit(X, y)

print("\nRegression Model Coefficients:")
print("PM2.5 weight:", regression_model.coef_[0])
print("NO2 weight:", regression_model.coef_[1])

print(
    f"\nAQI ≈ {regression_model.coef_[0]:.2f} × PM2.5 + "
    f"{regression_model.coef_[1]:.2f} × NO₂"
)

# -------------------------------
# 4. POLICY IMPACT ASSUMPTIONS
# -------------------------------
POLICY_IMPACTS = {
    "EV Subsidy": {
        "aqi_index": 0.10,
        "pm2_5": 0.12,
        "no2": 0.25
    },
    "Tree Cover": {
        "aqi_index": 0.15,
        "pm2_5": 0.20,
        "no2": 0.05
    },
    "Cool Roofs": {
        "aqi_index": 0.05,
        "pm2_5": 0.08,
        "no2": 0.02
    },
    "Public Transport": {
        "aqi_index": 0.12,
        "pm2_5": 0.15,
        "no2": 0.20
    }
}

# -------------------------------
# 5. APPLY POLICY
# -------------------------------
# -------------------------------
# 5. APPLY POLICY
# -------------------------------
def apply_policy(policy_name, baseline, budget=100):
    impact = POLICY_IMPACTS[policy_name]
    result = {}
    
    # Diminishing Returns Logic
    # Budget of 100 Cr is baseline (factor = 1.0)
    # Budget of 500 Cr -> factor ≈ 2.6 (not 5.0)
    # This simulates realistic scaling difficulty
    scaling_factor = (budget / 100) ** 0.6
    
    for metric in baseline:
        # Calculate reduction with scaling
        base_reduction = impact.get(metric, 0)
        actual_reduction_percent = base_reduction * scaling_factor
        
        # Cap reduction at 90% (realistic maximum)
        if actual_reduction_percent > 0.90:
            actual_reduction_percent = 0.90
            
        reduction_amount = baseline[metric] * actual_reduction_percent
        result[metric] = max(0, round(baseline[metric] - reduction_amount, 2))

    return result

# -------------------------------
# 6. REGRESSION ADJUSTMENT
# -------------------------------
def regression_adjustment(pm25, no2):
    predicted_aqi = regression_model.predict([[pm25, no2]])[0]
    return predicted_aqi

# -------------------------------
# 7. IMPACT SCORE (ML-ENHANCED)
# -------------------------------
WEIGHTS = {
    "aqi_index": 0.4,
    "pm2_5": 0.35,
    "no2": 0.25
}

def calculate_impact_score(baseline, after):
    base_score = 0

    for metric in baseline:
        reduction_percent = (
            (baseline[metric] - after[metric]) / baseline[metric]
        )
        base_score += reduction_percent * WEIGHTS[metric]

    predicted_aqi = regression_adjustment(
        after["pm2_5"],
        after["no2"]
    )

    adjustment_factor = baseline["aqi_index"] / predicted_aqi
    final_score = base_score * adjustment_factor

    return round(final_score * 100, 2)

# -------------------------------
# 8. TEST WITH ONE POLICY
# -------------------------------
policy = "Tree Cover"
after_policy = apply_policy(policy, baseline)
impact_score = calculate_impact_score(baseline, after_policy)

print(f"\nAfter applying policy: {policy}")
print(after_policy)
print("\nFinal ML-Adjusted Impact Score:", impact_score)
