document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('website-url');
    const analyzeBtn = document.getElementById('analyze-btn');
    const dashboard = document.querySelector('.dashboard');
    const privacyScore = document.getElementById('privacy-score');
    const trackersList = document.getElementById('trackers-list');
    const cookiesAnalysis = document.getElementById('cookies-analysis');
    const gdprBtn = document.getElementById('generate-gdpr');
    const dpdpBtn = document.getElementById('generate-dpdp');
    const exportBtn = document.getElementById('export-report');

    analyzeBtn.addEventListener('click', async () => {
        const url = urlInput.value.trim();
        if (!isValidUrl(url)) {
            alert('Please enter a valid URL');
            return;
        }

        try {
            analyzeBtn.disabled = true;
            analyzeBtn.textContent = 'Analyzing...';

            // Call the backend API for analysis
            const analysisResult = await analyzeSite(url);
            
            // Update the UI with results
            updateDashboard(analysisResult);
            dashboard.classList.remove('hidden');
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Failed to analyze the website. Please try again.');
        } finally {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze';
        }
    });

    gdprBtn.addEventListener('click', async () => {
        try {
            const request = await generateGDPRRequest(urlInput.value);
            downloadFile(request, 'gdpr-request.txt');
        } catch (error) {
            alert('Failed to generate GDPR request');
        }
    });

    dpdpBtn.addEventListener('click', async () => {
        try {
            const request = await generateDPDPRequest(urlInput.value);
            downloadFile(request, 'dpdp-request.txt');
        } catch (error) {
            alert('Failed to generate DPDP request');
        }
    });

    exportBtn.addEventListener('click', async () => {
        try {
            const report = await generateReport(urlInput.value);
            downloadFile(report, 'privacy-report.pdf');
        } catch (error) {
            alert('Failed to generate report');
        }
    });

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    function updateDashboard(data) {
        // Update privacy score
        privacyScore.textContent = data.score;
        privacyScore.style.color = getScoreColor(data.score);

        // Update trackers list
        trackersList.innerHTML = data.trackers
            .map(tracker => `<li>${tracker.name} - ${tracker.category}</li>`)
            .join('');

        // Update cookies analysis
        cookiesAnalysis.innerHTML = `
            <p>Total Cookies: ${data.cookies.total}</p>
            <p>Essential: ${data.cookies.essential}</p>
            <p>Analytics: ${data.cookies.analytics}</p>
            <p>Marketing: ${data.cookies.marketing}</p>
            <p>Other: ${data.cookies.other}</p>
        `;
    }

    function getScoreColor(score) {
        if (score >= 80) return 'var(--success-color)';
        if (score >= 60) return 'var(--warning-color)';
        return 'var(--danger-color)';
    }

    function downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // API functions to be implemented
    async function analyzeSite(url) {
        // TODO: Implement API call to backend
        return {
            score: 75,
            trackers: [
                { name: 'Google Analytics', category: 'Analytics' },
                { name: 'Facebook Pixel', category: 'Marketing' }
            ],
            cookies: {
                total: 10,
                essential: 3,
                analytics: 2,
                marketing: 4,
                other: 1
            }
        };
    }

    async function generateGDPRRequest(url) {
        // TODO: Implement API call to backend
        return 'Sample GDPR request content';
    }

    async function generateDPDPRequest(url) {
        // TODO: Implement API call to backend
        return 'Sample DPDP request content';
    }

    async function generateReport(url) {
        // TODO: Implement API call to backend
        return 'Sample report content';
    }

    // Initialize the popup with current tab data
    getCurrentTabInfo();

    // Add event listeners
    document.getElementById('deletion-request').addEventListener('click', handleDeletionRequest);
    document.getElementById('cookie-settings').addEventListener('click', handleCookieSettings);
    document.getElementById('visit-website').addEventListener('click', handleFullWebsiteVisit);
});

async function getCurrentTabInfo() {
    // Get the active tab using chrome API
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const currentTab = tabs[0];
        await analyzePrivacy(currentTab.url);
    });
}

async function analyzePrivacy(url) {
    try {
        // Calculate privacy score (this would integrate with your backend)
        const privacyData = await fetchPrivacyData(url);
        updatePrivacyScore(privacyData.score);
        updateStats(privacyData.trackers, privacyData.cookies);
    } catch (error) {
        console.error('Error analyzing privacy:', error);
    }
}

function updatePrivacyScore(score) {
    const scoreElement = document.getElementById('privacy-score');
    const circleFill = document.getElementById('score-circle-fill');
    
    // Update the score display
    scoreElement.textContent = score;
    
    // Update the circle fill
    const circumference = 2 * Math.PI * 15.9155; // Matches the SVG path radius
    const offset = circumference - (score / 100) * circumference;
    circleFill.style.strokeDasharray = `${circumference} ${circumference}`;
    circleFill.style.strokeDashoffset = offset;
    
    // Update color based on score
    if (score >= 70) {
        circleFill.style.stroke = '#27ae60'; // Green for good score
    } else if (score >= 40) {
        circleFill.style.stroke = '#f39c12'; // Orange for medium score
    } else {
        circleFill.style.stroke = '#e74c3c'; // Red for poor score
    }
}

function updateStats(trackers, cookies) {
    document.getElementById('trackers-count').textContent = trackers.length;
    document.getElementById('cookies-count').textContent = cookies.length;
}

async function handleDeletionRequest() {
    try {
        const tab = await getCurrentTab();
        const domain = new URL(tab.url).hostname;
        
        // Open email composition with pre-filled template
        const emailSubject = `Data Deletion Request for ${domain}`;
        const emailBody = generateDeletionEmailTemplate(domain);
        
        const mailtoLink = `mailto:privacy@${domain}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink);
    } catch (error) {
        console.error('Error handling deletion request:', error);
    }
}

function handleCookieSettings() {
    // This would integrate with your cookie management system
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'openCookieSettings' });
    });
}

function handleFullWebsiteVisit() {
    // Open the full dashboard in a new tab
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
}

function generateDeletionEmailTemplate(domain) {
    return `Dear ${domain} Data Protection Officer,

I am writing to request the deletion of my personal data under Article 17 of the General Data Protection Regulation (GDPR).

Please delete all personal data that you hold about me, including but not limited to:
- Account information
- Usage data
- Cookies and tracking data
- Any other personal information

Please confirm when this has been completed.

Best regards,
[Your name]`;
}

// Helper function to get current tab
function getCurrentTab() {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0]);
        });
    });
}

// Mock function for privacy data fetching (replace with actual implementation)
async function fetchPrivacyData(url) {
    // This would be replaced with actual API calls to your backend
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                score: Math.floor(Math.random() * 100),
                trackers: Array(Math.floor(Math.random() * 10)),
                cookies: Array(Math.floor(Math.random() * 15))
            });
        }, 500);
    });
}