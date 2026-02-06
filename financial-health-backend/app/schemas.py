from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    business_type: str

class User(BaseModel):
    id: int
    username: str
    business_type: str

    class Config:
        from_attributes = True

class FinancialUpload(BaseModel):
    file_type: str 
    content: str 
    
class AnalysisResult(BaseModel):
    creditworthiness: float
    risks: list[str]
    recommendations: list[str]
    forecast: dict

    