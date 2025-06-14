
# 🛡️ Personal Data Privacy Guardian Agent

A browser extension that blocks trackers, monitors cookies, and protects your privacy — all locally and offline. Detect and block third-party trackers, analyze cookies, calculate privacy risk scores, and alert users in real-time. No cloud, no telemetry, no compromise.

---

## 🚀 Features

- 🔍 **Real-time tracker detection** using Chrome webRequest and declarativeNetRequest APIs
- 🚫 **Block outgoing tracker requests** before they leave your browser
- 🍪 **Monitor and auto-delete tracking cookies**
- 📊 **Privacy risk scoring** based on tracker and cookie behavior
- 🔔 **Live alerts** when new cookies are set
- 🧠 **Fully local — no cloud, no server, no telemetry**
- 📈 **Simple dashboard UI** with a list of detected trackers and cookie analysis

---

## 🧰 Tech Stack

| Area          | Tech Used                              |
|---------------|----------------------------------------|
| Frontend UI   | Vanilla JS + TailwindCSS (optional)    |
| Backend       | Chrome Extension APIs (Manifest V3)    |
| Storage       | localStorage / chrome.storage          |

---

## 📁 Folder Structure

```
privacy-guardian-agent/
├── manifest.json
├── background.js         # Blocks requests, monitors cookies
├── content.js            # Page-specific analysis (optional)
├── popup/
│   ├── index.html        # Dashboard popup
│   ├── popup.js          # Displays cookies, trackers, scores
│   └── styles.css        # Tailwind or plain CSS
└── rules/
    └── rules.json        # Domains to block (Google, Meta, etc.)
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/privacy-guardian-agent.git
cd privacy-guardian-agent
```

---

### 2. Configure `manifest.json`

Ensure you have the right permissions:

```json
"permissions": [
  "webRequest", "webRequestBlocking",
  "cookies", "storage", "tabs",
  "declarativeNetRequest", "declarativeNetRequestWithHostAccess"
],
"host_permissions": [
  "<all_urls>"
]
```

---

### 3. Blocking Trackers (declarativeNetRequest)

Create a `rules.json` file:

```json
[
  {
    "id": 1,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "google-analytics.com",
      "resourceTypes": ["script", "xmlhttprequest"]
    }
  }
]
```

In `background.js`:

```js
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [/* Load your rules from rules.json */],
    removeRuleIds: [1]
  });
});
```

---

### 4. Cookie Monitoring & Auto-Delete

In `background.js`:

```js
chrome.cookies.onChanged.addListener((changeInfo) => {
  const { cookie, removed, cause } = changeInfo;
  if (!removed && (cookie.name.startsWith("_ga") || cookie.domain.includes("facebook"))) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Privacy Alert",
      message: `Tracker cookie set: ${cookie.name} (${cookie.domain})`
    });

    // Optional auto-delete:
    chrome.cookies.remove({
      url: (cookie.secure ? "https://" : "http://") + cookie.domain + cookie.path,
      name: cookie.name
    });
  }
});
```

---

### 5. UI Popup: Display Trackers & Cookies

In `popup.js`:

```js
chrome.cookies.getAll({}, (cookies) => {
  const trackerCookies = cookies.filter(c =>
    c.name.startsWith("_ga") || c.domain.includes("facebook")
  );

  document.getElementById("cookie-count").textContent = trackerCookies.length;
  document.getElementById("cookie-list").innerHTML = trackerCookies.map(c =>
    `<li>${c.name} → ${c.domain}</li>`
  ).join("");
});
```

In `index.html`:

```html
<h3>🍪 Tracker Cookies</h3>
<p>Total: <span id="cookie-count">0</span></p>
<ul id="cookie-list"></ul>
```

---

## 🔬 Privacy Risk Scoring

In `background.js` or `popup.js`, compute a simple score:

```js
let score = trackerCookies.length * 10;
chrome.storage.local.set({ riskScore: score });
```

Display in UI:

```html
<p>⚠️ Risk Score: <strong id="risk-score"></strong></p>
```

---

## 🧪 Testing Plan

| Step                      | What to Check                         |
|---------------------------|---------------------------------------|
| ✅ Visit known tracker site | Should block requests automatically   |
| ✅ Open DevTools Network tab | No outgoing requests to trackers      |
| ✅ View extension popup     | Shows cookies, score, alerts          |
| ✅ Set new cookie (test)    | Triggers alert, optionally deletes    |

---

## 📜 License

[MIT License](LICENSE)

---

## 🙌 Credits

- Chrome Extensions API
- Community tracker lists (EasyPrivacy, etc.)
- [TailwindCSS](https://tailwindcss.com/) (if used)

---

**🛡 Built to protect your privacy — all local, all yours.**
