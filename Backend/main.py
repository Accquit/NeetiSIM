from fastapi import FastAPI
from policy_simulation import (
    baseline,
    apply_policy,
    calculate_impact_score
)

app = FastAPI(title="NeetiSIM Backend")

@app.get("/")
def home():
    return {"message": "NeetiSIM backend is running"}

@app.get("/simulate-policy")
def simulate_policy(policy: str):
    after = apply_policy(policy, baseline)
    score = calculate_impact_score(baseline, after)

    return {
        "policy": policy,
        "baseline": baseline,
        "after_policy": after,
        "impact_score": score
    }
@app.get("/compare-policies")
def compare_policies(policy_a: str, policy_b: str):
    after_a = apply_policy(policy_a, baseline)
    score_a = calculate_impact_score(baseline, after_a)

    after_b = apply_policy(policy_b, baseline)
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
        "recommended_policy": recommendation
    }
