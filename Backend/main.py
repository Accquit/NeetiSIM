from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from policy_simulation import (
    baseline,
    apply_policy,
    calculate_impact_score
)
from aqi_service import get_live_aqi

app = FastAPI(title="NeetiSIM Backend")

# Enable CORS for Frontend (Port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "NeetiSIM backend is running"}

@app.get("/live-aqi")
def live_aqi(lat: float = 28.61, lon: float = 77.23):
    return get_live_aqi(lat, lon)

@app.get("/simulate-policy")
def simulate_policy(policy: str, budget: int = 100):
    after = apply_policy(policy, baseline, budget)
    score = calculate_impact_score(baseline, after)

    return {
        "policy": policy,
        "input_budget": budget,
        "baseline": baseline,
        "after_policy": after,
        "impact_score": score
    }
@app.get("/compare-policies")
def compare_policies(policy_a: str, policy_b: str, budget: int = 100):
    # Apply both policies with the same budget for fair comparison
    after_a = apply_policy(policy_a, baseline, budget)
    score_a = calculate_impact_score(baseline, after_a)

    after_b = apply_policy(policy_b, baseline, budget)
    score_b = calculate_impact_score(baseline, after_b)

    recommendation = (
        policy_a if score_a > score_b else policy_b
    )

    return {
        "policy_a": {
            "name": policy_a,
            "impact_score": score_a,
            "after_policy": after_a
        },
        "policy_b": {
            "name": policy_b,
            "impact_score": score_b,
            "after_policy": after_b
        },
        "recommended_policy": recommendation,
        "budget_used": budget
    }
