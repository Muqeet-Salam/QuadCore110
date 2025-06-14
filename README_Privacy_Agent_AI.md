
# 🧠 Personal Data Privacy Guardian AI Agent

An offline, intelligent AI agent that analyzes your browsing activity in real time to detect trackers, monitor cookies, calculate privacy risk, and optionally generate legal actions — all without sending your data to the cloud.

---

## 🚀 Features

- 🔍 **Real-time browser data analysis** (cookies, trackers, network patterns)
- 🔐 **Detect and classify privacy threats** using custom rule sets
- 🧠 **Local LLM integration (via Ollama)** to explain privacy risks or generate GDPR/DPDP requests
- 📊 **Privacy risk scoring engine**
- 📁 **Report generation and logging**
- ❌ **No data leaves your machine** — works entirely offline

---

## 🧰 Tech Stack

| Area            | Tech Used                            |
|------------------|--------------------------------------|
| AI Agent Engine  | Python + FastAPI / Flask             |
| Cookie/Network Scan | Selenium + requests + httpx       |
| Local LLM        | [Ollama](https://ollama.com/) + LLaMA 3 / Mistral |
| Storage/Logs     | local JSON / SQLite (optional)       |
| UI (optional)    | Streamlit or simple terminal interface |

---

## 📁 Folder Structure

```
privacy-agent/
├── main.py                # Entry point for the AI agent
├── scanner/
│   ├── network_scanner.py # Monitors HTTP requests
│   ├── cookie_parser.py   # Extracts and analyzes cookies
│   └── risk_engine.py     # Calculates privacy risk
├── llm/
│   └── ollama_integration.py  # Handles local LLM prompts
├── reports/
│   └── logs.json          # Saved scans
├── ui/
│   └── streamlit_ui.py    # Optional dashboard
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/privacy-guardian-ai-agent.git
cd privacy-guardian-ai-agent
```

### 2. Create Virtual Environment & Install Dependencies

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

---

### 3. Install and Start Ollama Locally

Download from: https://ollama.com/download

Then run:

```bash
ollama pull llama3
ollama run llama3
```

---

### 4. Run the AI Agent

```bash
python main.py
```

or with FastAPI (optional):

```bash
uvicorn main:app --reload
```

---

## 🧠 How It Works

1. **You provide a URL**
2. The agent:
   - Uses `httpx` or `Selenium` to visit the page
   - Extracts cookies and outbound requests
   - Classifies trackers
   - Assigns a risk score
   - Logs it in `/reports/`
3. You can:
   - Generate GDPR/DPDP legal request text
   - View a Streamlit dashboard
   - Export logs

---

## 📜 Example GDPR Prompt (LLM)

```python
from llm.ollama_integration import generate_privacy_request
text = generate_privacy_request(email="you@example.com", company="Meta", law="GDPR")
print(text)
```

---

## 🧪 Testing It

```bash
python scanner/test_url.py --url "https://example.com"
```

---

## 📊 Risk Score Logic

Basic scoring is calculated by:
- Number of trackers detected
- Type of cookies set (3rd-party, persistent)
- Presence of known fingerprinting techniques

Each factor contributes to a weighted risk score between 0–100.

---

## 🧩 Optional Features

| Feature                     | Status    |
|-----------------------------|-----------|
| 🧠 Ask LLM for advice        | ✅         |
| 📬 Generate legal requests   | ✅         |
| 🧹 Auto-delete tracker cookies | ❌ Planned |
| 🧾 Export PDF report         | ✅         |
| 🌐 Web UI with Streamlit     | ✅ Optional |

---

## 🛡 Privacy First

✅ 100% Local  
✅ No API Keys  
✅ No Internet Required After Setup  
✅ Works on Linux, macOS, and Windows  

---

## 📜 License

[MIT License](LICENSE)

---

## 🙌 Credits

- [Ollama](https://ollama.com/)
- [EasyPrivacy](https://easylist.to/)
- [Selenium](https://selenium.dev/)
- [httpx](https://www.python-httpx.org/)

---

**👁 Stay private, stay empowered.**
