import pandas as pd
import io
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def process_file(filename: str, content: bytes) -> dict:
    if filename.endswith('.csv'):
        df = pd.read_csv(io.BytesIO(content))
    elif filename.endswith('.xlsx'):
        df = pd.read_excel(io.BytesIO(content))
    elif filename.endswith('.pdf'):
        # Simple text extraction (assume PDF is text-based; use basic str for demo)
        text = content.decode('utf-8', errors='ignore')
        # Convert to DF for consistency (dummy parsing)
        lines = text.split('\n')
        df = pd.DataFrame({'lines': lines})
    else:
        raise ValueError("Unsupported file")
    
    # Extract dimensions (simplified)
    data = {
        "revenue": df.get('revenue', pd.Series([0])).sum(),
        "costs": df.get('costs', pd.Series([0])).sum(),
        "expenses": df.get('expenses', pd.Series([0])).to_dict(),
        "receivables": df.get('receivables', 0).sum(),
        "payables": df.get('payables', 0).sum(),
        "inventory": df.get('inventory', 0).sum(),
        "loans": df.get('loans', 0).sum(),
        "tax": df.get('tax', {}).to_dict() if 'tax' in df else {}
    }
    return data

def analyze_financials(data: dict) -> dict:
    import pandas as pd

    df = pd.DataFrame([data])

    # Convert key columns to numbers (handle missing or invalid values safely)
    numeric_cols = ['revenue', 'costs', 'receivables', 'payables', 'inventory', 'loans']
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

    # Now safe to calculate
    revenue = df['revenue'].iloc[0] if 'revenue' in df else 0
    costs   = df['costs'].iloc[0]   if 'costs' in df   else 0

    credit_score = ((revenue - costs) / revenue * 100) if revenue > 0 else 0

    forecast = {
        "next_year_revenue": revenue * 1.10,
        "next_year_profit": (revenue * 1.10) - (costs * 1.05)
    }

    risks = []
    if costs > revenue * 0.7:
        risks.append("High cost ratio – more than 70% of revenue")
    if df['loans'].iloc[0] > revenue * 0.5:
        risks.append("High debt burden")

    recommendations = [
        "Review major expense categories",
        "Consider negotiating better supplier terms",
        "Explore short-term financing if receivables are high"
    ]

    # LLM part (keep or comment out if no key)
    try:
        prompt = f"Analyze this SME financial data: {data}. Provide risks, recommendations..."
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        insights = response.choices[0].message.content.split('\n')[:5]
        recommendations.extend([line.strip() for line in insights if line.strip()])
    except Exception as e:
        recommendations.append(f"AI insights unavailable: {str(e)}")

    return {
        "creditworthiness": round(float(credit_score), 2),
        "risks": risks,
        "recommendations": recommendations,
        "forecast": forecast
    }