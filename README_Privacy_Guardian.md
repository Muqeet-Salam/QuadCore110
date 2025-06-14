
# 🕵️‍♂️ Personal Data Privacy Guardian Agent

A lightweight browser extension powered by a local AI model (via Ollama) to detect trackers, assign privacy risk scores, and generate GDPR/CCPA data deletion requests — all 100% offline.

## 🚀 Features

- 🔍 **Real-time tracker and cookie detection**
- 🛡️ **Privacy risk scoring for each website**
- 🤖 **One-click GDPR/CCPA request generation via LLM**
- 📊 **Extension popup with a dashboard UI**
- 🧠 **Runs with local Ollama model (e.g., Llama 3)**
- 🔐 **No cloud – all processing is local and private**

## 🧰 Tech Stack

| Area          | Tech Used                              |
|---------------|----------------------------------------|
| Frontend UI   | Vanilla JS / React + TailwindCSS       |
| Backend       | Chrome Extension APIs (Manifest V3)    |
| AI Engine     | [Ollama](https://ollama.com/) + Llama3 |
| Storage       | localStorage / IndexedDB               |

## 📁 Folder Structure

```
privacy-guardian-agent/
├── manifest.json
├── background.js         # Detects web requests, trackers
├── content.js            # Monitors cookies, storage
├── popup/
│   ├── index.html        # UI layout
│   ├── popup.js          # Renders data, calls LLM
│   └── styles.css        # (Optional) TailwindCSS
├── llm/
│   └── generateGDPR.js   # Calls local Ollama API
└── utils/
    └── scoring.js        # Risk scoring logic
```

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/privacy-guardian-agent.git
cd privacy-guardian-agent
```

### 2. Install Ollama

Download and install from [ollama.com/download](https://ollama.com/download)

Pull and run your model:

```bash
ollama pull llama3
ollama run llama3
```

Make sure Ollama is running at `http://localhost:11434`.

### 3. Configure `manifest.json`

```json
"permissions": [
  "webRequest", "webRequestBlocking", "cookies",
  "storage", "declarativeNetRequest", "notifications", "activeTab"
],
"host_permissions": ["<all_urls>"]
```

### 4. Add Tracker & Risk Detection

Implement in `background.js`:

- Listen to `chrome.webRequest.onBeforeRequest`
- Count known tracker domains
- Store results in localStorage

Implement in `content.js`:

- Detect localStorage/cookie access
- Pass data to background script

### 5. Connect to LLM via Ollama

In `generateGDPR.js`:

```js
export async function generateGDPRRequest(company, userEmail) {
  const prompt = `Generate a GDPR data deletion request email for ${company}, from user ${userEmail}.`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "llama3", prompt })
  });

  const data = await response.json();
  return data.response;
}
```

### 6. Load the Extension

- Go to `chrome://extensions`
- Enable **Developer Mode**
- Click **Load Unpacked** → Select the project folder

### 7. Try It Out

1. Visit a site (e.g., news or shopping)
2. Click the extension icon
3. See:
   - Detected trackers
   - Risk score
   - “Generate GDPR Request” button
4. View the generated request and copy it!

## 🧪 Demo Plan

| Step                      | What to Do                         |
|---------------------------|------------------------------------|
| ✅ Visit Tracker-Heavy Site | Any popular news website           |
| ✅ Open Extension UI        | See real-time tracker detection    |
| ✅ Generate Request         | GDPR/CCPA request in 1 click       |
| ✅ Show No Cloud Dependency | Close Wi-Fi – still works locally! |

## 🧩 Optional Customizations

- 🌐 Add form auto-fill for privacy forms
- 📡 Add network usage stats to UI
- 🤖 Swap LLM model in Ollama (Mistral, Phi-3, etc.)
- 🎨 Switch UI framework (Vue, Svelte, etc.)

## ❗ Troubleshooting

| Issue                        | Solution                                           |
|-----------------------------|----------------------------------------------------|
| ❌ Ollama not running        | Run `ollama run llama3` in terminal               |
| ❌ Nothing shows in UI       | Check `manifest.json` permissions + console logs  |
| ❌ CORS error with Ollama    | Ensure API calls are made from background script  |
| ❌ Model too slow            | Pull lighter model like `mistral`                 |

## 📜 License

[MIT License](LICENSE)

## 🙌 Credits

- [Ollama](https://ollama.com/)
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [TailwindCSS](https://tailwindcss.com/) (if used)

**👊 Stay private. Stay local. Happy hacking!**
