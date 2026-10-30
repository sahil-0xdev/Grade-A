"""
FastAPI Backend Application for Grade A
Local-first, zero-cloud dependency, transparent educational analytics.
"""
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import json

from app.services.validation import parse_and_validate_file
from app.services.analysis import analyze_cohort, evaluate_student, DEFAULT_THRESHOLDS, DEFAULT_WEIGHTS

app = FastAPI(
    title="Grade A - Academic Early-Warning API",
    description="Local-first deterministic educational diagnostics engine",
    version="1.0.0"
)

# Allow local frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    students: List[Dict[str, Any]]
    thresholds: Optional[Dict[str, Any]] = None
    weights: Optional[Dict[str, Any]] = None

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Grade A FastAPI Backend",
        "engine": "Pandas + Deterministic Rule Scoring",
        "version": "1.0.0"
    }

@app.get("/api/demo-data")
def get_demo_data():
    # Return path to demo records or lightweight synthetic response
    sample = [
        {
            "studentId": "STU-1001",
            "name": "Aarav Sharma",
            "className": "Senior",
            "section": "S2",
            "attendancePct": 67,
            "assignmentsPct": 50,
            "averageMarks": 46,
            "test1": 62, "test2": 51, "test3": 44
        },
        {
            "studentId": "STU-1002",
            "name": "Marcus Vance",
            "className": "Senior",
            "section": "S1",
            "attendancePct": 63,
            "assignmentsPct": 50,
            "averageMarks": 42,
            "test1": 58, "test2": 45, "test3": 39
        },
        {
            "studentId": "STU-1018",
            "name": "Sophia Taylor",
            "className": "Senior",
            "section": "S1",
            "attendancePct": 97,
            "assignmentsPct": 100,
            "averageMarks": 94,
            "test1": 92, "test2": 95, "test3": 96
        }
    ]
    analyzed = analyze_cohort(sample)
    return {"students": analyzed, "count": len(analyzed)}

@app.post("/api/upload/preview")
async def upload_preview(file: UploadFile = File(...)):
    contents = await file.read()
    result = parse_and_validate_file(contents, file.filename)
    return JSONResponse(content=result)

@app.post("/api/analyse")
def run_analysis(request: AnalysisRequest):
    analyzed = analyze_cohort(request.students, request.thresholds, request.weights)
    return {
        "success": True,
        "count": len(analyzed),
        "students": analyzed
    }

@app.post("/api/what-if")
def simulate_what_if(student: Dict[str, Any]):
    simulated = evaluate_student(student)
    return {"simulated": simulated}

class GroqChatRequest(BaseModel):
    prompt: str
    students: Optional[List[Dict[str, Any]]] = None
    model: Optional[str] = "openai/gpt-oss-120b"
    api_key: Optional[str] = None

@app.post("/api/ai/groq-chat")
def groq_chat(req: GroqChatRequest):
    """
    Local-first proxy for Groq AI inference.
    Can use environment GROQ_API_KEY or key provided in request.
    """
    import os
    import urllib.request
    import urllib.error

    groq_key = req.api_key or os.getenv("GROQ_API_KEY", "")

    if not groq_key:
        return {
            "success": False,
            "error": "No Groq API Key found. Provide in request or set GROQ_API_KEY environment variable.",
            "isFallback": True,
            "text": "Please provide your Groq API key to activate live Llama 3.3 inference."
        }

    # Prepare grounding summary of student records
    students_summary = ""
    if req.students:
        students_summary = f"Active Students ({len(req.students)} records):\n" + "\n".join([
            f"- {s.get('name')} (ID: {s.get('studentId')}, Class: {s.get('className')}, Att: {s.get('attendancePct')}%, Marks: {s.get('averageMarks')}%, Risk: {s.get('riskLevel')})"
            for s in req.students[:15]
        ])

    payload = {
        "model": req.model,
        "messages": [
            {
                "role": "system",
                "content": f"You are Grade A AI, an educational early-warning advisor for teachers. Answer clearly and non-punitively.\n\nContext:\n{students_summary}"
            },
            {
                "role": "user",
                "content": req.prompt
            }
        ],
        "temperature": 0.2,
        "max_tokens": 1024
    }

    try:
        req_data = json.dumps(payload).encode("utf-8")
        request_obj = urllib.request.Request(
            "https://api.groq.com/openai/v1/chat/completions",
            data=req_data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {groq_key}",
                "User-Agent": "GradeA-Educational-Engine/1.0"
            }
        )
        with urllib.request.urlopen(request_obj, timeout=15) as resp:
            resp_body = json.loads(resp.read().decode("utf-8"))
            answer = resp_body["choices"][0]["message"]["content"]
            return {
                "success": True,
                "text": answer,
                "modelUsed": req.model
            }
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        return {
            "success": False,
            "error": f"Groq HTTP {e.code}: {error_body}"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
