import uvicorn
import os
import sys

# Ensure backend folder is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("=" * 60)
    print("Grade A — FastAPI Local Backend Server")
    print("API Documentation: http://localhost:8000/docs")
    print("Health Check:      http://localhost:8000/api/health")
    print("=" * 60)
    uvicorn.run("app.main.py:app", host="127.0.0.1", port=8000, reload=True)
