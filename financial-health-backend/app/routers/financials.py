from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud import create_financial_data, get_financial_data
from app.utils.data_processor import process_file, analyze_financials
from app.schemas import AnalysisResult

router = APIRouter()

@router.post("/upload/{user_id}")
async def upload_financial(user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(('.csv', '.xlsx', '.pdf')):
        raise HTTPException(400, "Invalid file type")

    content = await file.read()
    data = process_file(file.filename, content)

    db_data = create_financial_data(db, user_id, data)

    return {
        "message": "Data uploaded and encrypted",
        "data_id": db_data.id   # ← important line added
    }

@router.get("/analyze/{data_id}", response_model=AnalysisResult)
def analyze(data_id: int, db: Session = Depends(get_db)):
    data = get_financial_data(db, data_id)
    if not data:
        raise HTTPException(status_code=404, detail="Data not found")
    return analyze_financials(data)

# Mock Banking API Integration (Max 2: Bank1 and Payment1)
@router.get("/bank-integrate/{user_id}")
def integrate_bank(user_id: int):
    # Mock: Fetch from fictional Bank API
    return {"mock_bank_data": "Fetched balance: 10000"}

@router.get("/payment-integrate/{user_id}")
def integrate_payment(user_id: int):
    # Mock: Fetch from fictional Payment API
    return {"mock_payment_data": "Transactions: 50"}

@router.get("/gst-import/{user_id}")
def import_gst(user_id: int):
    # Optional mock GST import
    return {"mock_gst_data": "GST returns imported"}