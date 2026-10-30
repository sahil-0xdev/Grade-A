/**
 * Groq AI Service for Grade A
 * End-to-end integration with Groq's high-speed inference engine (Llama-3.3-70b / Llama-3.1-8b).
 * Supports contextual grounding on current cohort data with local-first privacy.
 */

const STORAGE_KEY_GROQ = 'grade_a_groq_api_key';
const STORAGE_KEY_MODEL = 'grade_a_groq_model';

export const AVAILABLE_GROQ_MODELS = [
  { id: 'openai/gpt-oss-120b', name: 'OpenAI GPT-OSS 120B (Recommended - High Accuracy)' },
  { id: 'openai/gpt-oss-20b', name: 'OpenAI GPT-OSS 20B (Ultra-Fast)' },
  { id: 'qwen/qwen3.8-27b', name: 'Qwen 3.8 27B (High Accuracy)' },
  { id: 'allam-2-7b', name: 'Allam 2 7B' },
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant' }
];

export function getGroqApiKey() {
  return localStorage.getItem(STORAGE_KEY_GROQ) || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GROQ_API_KEY) || '';
}

export function setGroqApiKey(key) {
  if (!key) {
    localStorage.removeItem(STORAGE_KEY_GROQ);
  } else {
    localStorage.setItem(STORAGE_KEY_GROQ, key.trim());
  }
}

export function getGroqModel() {
  const saved = localStorage.getItem(STORAGE_KEY_MODEL);
  if (saved && saved !== 'llama-3.1-8b-instant' && saved !== 'llama-3.3-70b-versatile') {
    return saved;
  }
  return 'openai/gpt-oss-120b';
}

export function setGroqModel(modelId) {
  localStorage.setItem(STORAGE_KEY_MODEL, modelId);
}

/**
 * Formats active student cohort into a concise, deterministic context payload for Groq
 */
export function buildCohortContext(students = []) {
  if (!students || students.length === 0) {
    return "Cohort Data: No active student records currently loaded.";
  }

  const highRisk = students.filter(s => s.riskLevel === 'High');
  const mediumRisk = students.filter(s => s.riskLevel === 'Medium');
  const lowRisk = students.filter(s => s.riskLevel === 'Low');
  const declining = students.filter(s => s.assessmentTrend === 'declining');
  const safeguard = students.filter(s => s.needsReview);

  // Summarize top high-risk / attention students
  const urgentSummary = [...highRisk, ...safeguard.filter(s => s.riskLevel !== 'High')]
    .slice(0, 8)
    .map(s => `- ${s.name} (ID: ${s.studentId}, Class: ${s.className || 'General'}, Risk: ${s.riskLevel}, Score: ${s.weightedScore}/100): Att ${s.attendancePct}%, Asg ${s.assignmentsPct}%, Avg Marks ${s.averageMarks}%, Trend: ${s.assessmentTrend || 'stable'}. Reason: ${s.reasons?.[0]?.text || 'Metrics below target'}. Suggested Action: ${s.recommendedAction || '1-on-1 review'}`)
    .join('\n');

  // Overall statistics
  const avgAtt = Math.round(students.reduce((a, s) => a + (s.attendancePct || 0), 0) / students.length);
  const avgAsg = Math.round(students.reduce((a, s) => a + (s.assignmentsPct || 0), 0) / students.length);
  const avgMrk = Math.round(students.reduce((a, s) => a + (s.averageMarks || 0), 0) / students.length);

  return `
COHORT SUMMARY:
- Total Enrolled Students: ${students.length}
- High Priority Risk: ${highRisk.length} students (${Math.round((highRisk.length / students.length) * 100)}%)
- Medium Priority Risk: ${mediumRisk.length} students
- Low Priority / On Track: ${lowRisk.length} students
- Declining Multi-Test Trends: ${declining.length} students
- Cohort Benchmarks: Avg Attendance ${avgAtt}%, Avg Assignments ${avgAsg}%, Avg Marks ${avgMrk}%

STUDENTS REQUIRING ATTENTION:
${urgentSummary || 'No high-risk students flagged.'}

ALL STUDENT ROSTER (Compact summary):
${students.map(s => `${s.studentId} | ${s.name} | ${s.className} | Risk: ${s.riskLevel} | Att: ${s.attendancePct}% | Asg: ${s.assignmentsPct}% | Marks: ${s.averageMarks}% | Trend: ${s.assessmentTrend || 'stable'}`).join('\n')}
`;
}

/**
 * System prompt grounding the assistant as Grade A's Senior Educational Diagnostics Advisor
 */
function createSystemPrompt(students = []) {
  const context = buildCohortContext(students);

  return `You are "Grade A AI" — an expert academic early-warning assistant and educational diagnostics advisor for teachers, academic coordinators, and school administrators.

YOUR PRIMARY GOALS:
1. Provide accurate, non-punitive, data-backed insights on student performance based ON THE EXACT DATA PROVIDED BELOW.
2. Highlight early warning patterns: attendance drops, missing assignments, and multi-test score trajectories.
3. Suggest practical, empathetic, actionable support strategies (e.g. peer tutoring, remedial test review, private check-in, counselor meetings).
4. Never invent fake student IDs or hallucinate grades. If asked about a student not in the roster, state that they are not in the current cohort.
5. Format your answers clearly with markdown: bullet points, bold names, and concise executive summaries.

ETHICAL GUIDELINES:
- Grade A is strictly a diagnostic aid to help educators support students earlier.
- Do NOT suggest punitive disciplinary measures or grading penalties. Emphasize empathy, timely intervention, and root-cause understanding.

CURRENT STUDENT DATA GROUNDING:
${context}
`;
}

/**
 * Sends chat request to Groq API
 */
export async function askGroqAI(question, students = [], conversationHistory = []) {
  const apiKey = getGroqApiKey();
  let model = getGroqModel();

  // If no API key is set, use the intelligent local fallback
  if (!apiKey) {
    return generateLocalFallbackResponse(question, students);
  }

  const systemMessage = {
    role: 'system',
    content: createSystemPrompt(students)
  };

  const formattedHistory = conversationHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text
  }));

  const messages = [
    systemMessage,
    ...formattedHistory,
    { role: 'user', content: question }
  ];

  // Candidates in priority order
  const candidateModels = [
    model,
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'qwen/qwen3.8-27b'
  ].filter((m, idx, arr) => m && arr.indexOf(m) === idx);

  let lastError = null;

  for (const currentModel of candidateModels) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: currentModel,
          messages: messages,
          temperature: 0.2,
          max_tokens: 1024,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errMsg = errData.error?.message || response.statusText;
        if (response.status === 401) {
          throw new Error('Invalid Groq API Key. Please verify your key at https://console.groq.com/keys');
        } else if (response.status === 429) {
          throw new Error('Groq rate limit reached. Please wait a few seconds or try a lighter model.');
        } else if (response.status === 404 || errMsg.includes('does not exist') || errMsg.includes('model_not_found')) {
          // Model does not exist or user doesn't have access; continue to next fallback model
          lastError = new Error(`Model ${currentModel} unavailable: ${errMsg}`);
          continue;
        }
        throw new Error(`Groq API Error: ${errMsg}`);
      }

      const data = await response.json();
      const replyText = data.choices?.[0]?.message?.content || "No response received from Groq.";

      // If we healed to a working model, save it
      if (currentModel !== model) {
        setGroqModel(currentModel);
      }

      return {
        success: true,
        text: replyText,
        modelUsed: currentModel,
        tokensUsed: data.usage?.total_tokens || 0
      };
    } catch (error) {
      if (error.message && (error.message.includes('Invalid Groq API Key') || error.message.includes('rate limit'))) {
        throw error;
      }
      lastError = error;
    }
  }

  console.error('All Groq model attempts failed:', lastError);
  return {
    success: false,
    error: lastError?.message || 'Failed to communicate with Groq AI API.',
    fallbackText: generateLocalFallbackResponse(question, students).text
  };
}

/**
 * Intelligent deterministic local fallback responder
 * Allows testing the AI Assistant even before the user pastes their Groq API Key!
 */
export function generateLocalFallbackResponse(question, students = []) {
  const q = question.toLowerCase();
  const highRisk = students.filter(s => s.riskLevel === 'High');
  const declining = students.filter(s => s.assessmentTrend === 'declining');
  const total = students.length;

  if (q.includes('high risk') || q.includes('who is at risk') || q.includes('highest') || q.includes('failing')) {
    if (highRisk.length === 0) {
      return {
        success: true,
        isFallback: true,
        text: `### Cohort Risk Summary\nGreat news! Currently, **0 students** are flagged in the High Priority tier. All active records meet the established baseline standards.\n\n*(Note: Add your free Groq API Key to enable open-ended natural conversation).*`
      };
    }
    const list = highRisk.slice(0, 5).map(s => 
      `* **${s.name}** (\`${s.studentId}\` - ${s.className || 'Senior'}): Score **${s.weightedScore}/100** | Attendance: **${s.attendancePct}%** | Assignments: **${s.assignmentsPct}%**\n  * *Trigger:* ${s.reasons?.[0]?.text || 'Multiple signals below support threshold'}\n  * *Suggested Next Step:* ${s.recommendedAction || '1-on-1 private academic check-in'}`
    ).join('\n\n');

    return {
      success: true,
      isFallback: true,
      text: `### 🚨 High Priority Students (${highRisk.length} flagged out of ${total})\n\nBased on deterministic weighted scoring, here are the students needing proactive support:\n\n${list}\n\n💡 **Recommendation:** Prioritize a supportive 1-on-1 check-in before the upcoming assessment cycle.\n\n*(Connect your free Groq API key in AI Settings for deeper LLM reasoning).*`
    };
  }

  if (q.includes('declining') || q.includes('trend') || q.includes('downward')) {
    const list = declining.slice(0, 5).map(s => 
      `* **${s.name}** (\`${s.studentId}\`): Downward trajectory across assessments. Latest score: **${s.assessmentHistory?.slice(-1)[0]?.marks || s.averageMarks}%**`
    ).join('\n');

    return {
      success: true,
      isFallback: true,
      text: `### 📉 Students with Declining Assessment Trends\n\nGrade A detected **${declining.length} students** with downward trajectories across sequential test evaluations:\n\n${list || 'No students currently show consistent score declines.'}\n\n💡 **Action:** Review test item breakdowns to catch specific topic gaps early.`
    };
  }

  if (q.includes('summary') || q.includes('overview') || q.includes('cohort') || q.includes('class')) {
    const avgAtt = Math.round(students.reduce((a, s) => a + (s.attendancePct || 0), 0) / (total || 1));
    const avgAsg = Math.round(students.reduce((a, s) => a + (s.assignmentsPct || 0), 0) / (total || 1));
    const avgMrk = Math.round(students.reduce((a, s) => a + (s.averageMarks || 0), 0) / (total || 1));

    return {
      success: true,
      isFallback: true,
      text: `### 📊 Cohort Executive Health Overview\n\n* **Total Active Students:** ${total}\n* **High Priority Attention:** ${highRisk.length} (${Math.round((highRisk.length / (total || 1)) * 100)}%)\n* **Average Attendance Rate:** ${avgAtt}%\n* **Average Assignment Discipline:** ${avgAsg}%\n* **Average Test Mastery:** ${avgMrk}%\n\nGrade A recommends prioritizing the ${highRisk.length} flagged profiles for coordinated educator follow-ups.`
    };
  }

  // Default helpful response with instructions to set Groq key
  return {
    success: true,
    isFallback: true,
    text: `### Grade A AI Assistant\n\nI can analyze your student cohort in real time! You can ask me:\n\n* *"Which students are at the highest risk?"*\n* *"Who has declining test scores?"*\n* *"Suggest an intervention plan for STU-1004"*\n* *"Summarize class attendance and assignments"*\n\n🔑 **To enable full generative conversational power:** Click the **"Configure Groq Key"** button above to paste your free Groq API key from [console.groq.com/keys](https://console.groq.com/keys).`
  };
}
