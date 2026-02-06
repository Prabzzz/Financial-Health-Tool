from sqlalchemy.orm import Session
from .models import User, FinancialData
from .schemas import UserCreate
# from passlib.context import CryptContext  # Add passlib to requirements if needed; pip install passlib[bcrypt]

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(db: Session, user: UserCreate):
    # hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, password=user.password, business_type=user.business_type)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def create_financial_data(db: Session, user_id: int, data: dict):
    db_data = FinancialData(user_id=user_id)
    db_data.encrypt_data(data)
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    return db_data

def get_financial_data(db: Session, data_id: int):
    db_data = db.query(FinancialData).filter(FinancialData.id == data_id).first()
    if db_data:
        return db_data.decrypt_data()
    return None