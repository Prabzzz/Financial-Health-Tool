# app/models.py
from sqlalchemy import Column, Integer, String, Float, JSON, LargeBinary
from app.base import Base               # ← changed line
from cryptography.fernet import Fernet
import os
import json

# Load key safely
secret_key_str = os.getenv("SECRET_KEY")
if not secret_key_str:
    raise ValueError("SECRET_KEY is missing in .env file")

try:
    key = secret_key_str.encode()  # must already be base64 string
    cipher = Fernet(key)
except Exception as e:
    raise ValueError(
        "Invalid Fernet SECRET_KEY in .env. "
        "It must be exactly 32 bytes, URL-safe base64-encoded. "
        "Generate one with: Fernet.generate_key()"
    ) from e

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    business_type = Column(String)  # e.g., Manufacturing, Retail

class FinancialData(Base):
    __tablename__ = "financial_data"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    encrypted_data = Column(LargeBinary)

    def encrypt_data(self, data: dict):
        # Convert dict → JSON string → bytes → encrypt
        json_str = json.dumps(data, default=str)   # default=str handles any non-serializable
        encrypted = cipher.encrypt(json_str.encode())
        self.encrypted_data = encrypted

    def decrypt_data(self) -> dict:
        # Decrypt → bytes → string → JSON back to dict
        decrypted_bytes = cipher.decrypt(self.encrypted_data)
        json_str = decrypted_bytes.decode()
        return json.loads(json_str)