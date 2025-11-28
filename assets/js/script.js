// ============================================
// Configuration Management
// ============================================
const CONFIG_KEY = 'securechat_config';

function getConfig() {
    const config = localStorage.getItem(CONFIG_KEY);
    return config ? JSON.parse(config) : null;
}

function saveConfig(config) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

function checkConfig() {
    const config = getConfig();
    if (!config || !config.apiEndpoint || !config.apiKey) {
        showSettingsModal();
        return false;
    }
    return true;
}

// ============================================
// Persona Definitions
// ============================================
const personas = {
    'sales-b2b': {
        id: 'sales-b2b',
        name: 'Sales (B2B)',
        icon: '💼',
        description: 'Professional B2B sales communication with focus on value proposition and relationship building.',
        systemPrompt: 'You are a professional B2B sales representative. Provide consultative, value-focused responses that build relationships and demonstrate expertise.'
    },
    'sales-saas': {
        id: 'sales-saas',
        name: 'Sales (SaaS)',
        icon: '🚀',
        description: 'SaaS sales communication emphasizing product benefits, demos, and trial conversions.',
        systemPrompt: 'You are a SaaS sales professional. Provide enthusiastic, solution-oriented responses that highlight product benefits and encourage trial sign-ups.'
    },
    'customer-service-gentle': {
        id: 'customer-service-gentle',
        name: 'Customer Service (Gentle)',
        icon: '😊',
        description: 'Warm and empathetic customer service approach for sensitive situations.',
        systemPrompt: 'You are a warm and empathetic customer service representative. Provide understanding, patient responses that show genuine care for the customer.'
    },
    'customer-service-strict': {
        id: 'customer-service-strict',
        name: 'Customer Service (Strict)',
        icon: '📋',
        description: 'Professional and firm customer service for policy enforcement and clear communication.',
        systemPrompt: 'You are a professional customer service representative. Provide clear, firm, policy-focused responses while maintaining professionalism.'
    },
    'interview': {
        id: 'interview',
        name: 'Interview Assistant',
        icon: '🎯',
        description: 'Help craft responses that HR and interviewers will appreciate - professional and authentic.',
        systemPrompt: 'You are helping someone craft professional interview responses. Provide authentic, confident, structured responses that showcase value.'
    },
    'account-manager': {
        id: 'account-manager',
        name: 'Account Manager',
        icon: '👔',
        description: 'Balance courtesy and professionalism in client relationship management.',
        systemPrompt: 'You are an account manager. Provide balanced, professional, relationship-focused responses that maintain client relationships while driving outcomes.'
    },
    'business-negotiation-strong': {
        id: 'business-negotiation-strong',
        name: 'Business Negotiation (Strong)',
        icon: '💪',
        description: 'Assertive negotiation style for when you need to stand firm.',
        systemPrompt: 'You are a business negotiator taking a strong position. Provide assertive, confident, firm responses that protect your interests while remaining professional.'
    },
    'business-negotiation-neutral': {
        id: 'business-negotiation-neutral',
        name: 'Business Negotiation (Neutral)',
        icon: '⚖️',
        description: 'Balanced negotiation approach seeking win-win solutions.',
        systemPrompt: 'You are a business negotiator seeking win-win solutions. Provide balanced, collaborative, solution-oriented responses that find mutual benefit.'
    },
    'dating-chat': {
        id: 'dating-chat',
        name: 'Dating Chat Helper',
        icon: '💕',
        description: 'Avoid pitfalls and maintain emotional neutrality in dating conversations.',
        systemPrompt: 'You are helping someone with dating communication. Provide balanced, engaging, respectful responses that avoid common pitfalls and maintain appropriate boundaries.'
    },
    'product-manager': {
        id: 'product-manager',
        name: 'Product Manager',
        icon: '📊',
        description: 'Professional product management communication for proposals and stakeholder updates.',
        systemPrompt: 'You are a product manager. Provide data-driven, clear, strategic responses that effectively communicate with stakeholders and drive product decisions.'
    },
    'student-teacher': {
        id: 'student-teacher',
        name: 'Student Communication',
        icon: '🎓',
        description: 'Respectful student communication when messaging teachers or professors.',
        systemPrompt: 'You are a student communicating with a teacher or professor. Provide respectful, clear, professional responses that demonstrate courtesy and academic integrity.'
    },
    'job-seeker-hr': {
        id: 'job-seeker-hr',
        name: 'Job Seeker (HR Replies)',
        icon: '📝',
        description: 'Professional responses to HR that make a positive impression.',
        systemPrompt: 'You are a job seeker responding to HR. Provide professional, enthusiastic, concise responses that showcase your value and make a positive impression.'
    },
    'email-formal': {
        id: 'email-formal',
        name: 'Formal Business Email',
        icon: '📧',
        description: 'Professional formal email communication for business correspondence.',
        systemPrompt: 'You are writing a formal business email. Provide structured, clear, professional responses that follow business email etiquette and conventions.'
    },
    'cold-outreach': {
        id: 'cold-outreach',
        name: 'Cold Outreach Assistant',
        icon: '📬',
        description: 'Effective cold outreach messages that get responses.',
        systemPrompt: 'You are crafting cold outreach messages. Provide engaging, personalized, value-focused responses that are concise and likely to get a positive response.'
    }
};

// ============================================
// Initialize after DOM loads
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializePersonas();
    setupEventListeners();
    checkInitialConfig();
    loadChatHistory();
});

function checkInitialConfig() {
    if (!getConfig()) {
        setTimeout(() => {
            showSettingsModal();
        }, 500);
    }
}

// ============================================
// Initialize Personas
// ============================================
function initializePersonas() {
    const personaSelect = document.getElementById('personaSelect');
    
    Object.values(personas).forEach(persona => {
        const option = document.createElement('option');
        option.value = persona.id;
        option.textContent = `${persona.icon} ${persona.name}`;
        personaSelect.appendChild(option);
    });
    
    personaSelect.addEventListener('change', function() {
        const selectedPersonaId = this.value;
        if (selectedPersonaId) {
            displayPersonaInfo(personas[selectedPersonaId]);
        }
    });
}

function displayPersonaInfo(persona) {
    const descriptionDiv = document.getElementById('personaDescription');
    const descriptionContent = document.getElementById('descriptionContent');
    
    descriptionContent.innerHTML = `
        <strong>${persona.icon} ${persona.name}</strong>
        <p style="margin-top: 8px;">${persona.description}</p>
    `;
    descriptionDiv.style.display = 'block';
}

// ============================================
// Setup Event Listeners
// ============================================
function setupEventListeners() {
    // Settings button
    document.getElementById('settingsBtn').addEventListener('click', showSettingsModal);
    
    // Modal close
    document.getElementById('closeModal').addEventListener('click', hideSettingsModal);
    
    // Save config
    document.getElementById('saveConfigBtn').addEventListener('click', saveConfiguration);
    
    // Test connection
    document.getElementById('testConnectionBtn').addEventListener('click', testConnection);
    
    // Send button
    document.getElementById('sendBtn').addEventListener('click', sendMessage);
    
    // Anonymize button
    document.getElementById('anonymizeBtn').addEventListener('click', anonymizeMessage);
    
    // Enter key support (Shift+Enter for new line, Enter to send)
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });
    
    // Close modal on outside click
    document.getElementById('settingsModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideSettingsModal();
        }
    });
}

// ============================================
// Settings Modal
// ============================================
function showSettingsModal() {
    const modal = document.getElementById('settingsModal');
    const config = getConfig();
    
    if (config) {
        document.getElementById('apiEndpoint').value = config.apiEndpoint || '';
        document.getElementById('apiKey').value = config.apiKey || '';
        document.getElementById('modelName').value = config.modelName || '';
    }
    
    modal.classList.add('active');
}

function hideSettingsModal() {
    document.getElementById('settingsModal').classList.remove('active');
    document.getElementById('configStatus').style.display = 'none';
}

function saveConfiguration() {
    const apiEndpoint = document.getElementById('apiEndpoint').value.trim();
    const apiKey = document.getElementById('apiKey').value.trim();
    const modelName = document.getElementById('modelName').value.trim();
    
    if (!apiEndpoint || !apiKey) {
        showConfigStatus('Please fill in API Endpoint and API Key.', 'error');
        return;
    }
    
    const config = {
        apiEndpoint,
        apiKey,
        modelName: modelName || 'llama2-7b-chat'
    };
    
    saveConfig(config);
    showConfigStatus('Configuration saved successfully!', 'success');
    
    setTimeout(() => {
        hideSettingsModal();
    }, 1500);
}

function testConnection() {
    const apiEndpoint = document.getElementById('apiEndpoint').value.trim();
    const apiKey = document.getElementById('apiKey').value.trim();
    
    if (!apiEndpoint || !apiKey) {
        showConfigStatus('Please fill in API Endpoint and API Key.', 'error');
        return;
    }
    
    showConfigStatus('Testing connection...', 'success');
    
    // Test with a simple request
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: document.getElementById('modelName').value || 'llama2-7b-chat',
            messages: [
                { role: 'user', content: 'Hello' }
            ],
            max_tokens: 10
        })
    })
    .then(response => {
        if (response.ok) {
            showConfigStatus('✅ Connection successful!', 'success');
        } else {
            showConfigStatus('❌ Connection failed. Please check your credentials.', 'error');
        }
    })
    .catch(error => {
        showConfigStatus('❌ Connection error: ' + error.message, 'error');
    });
}

function showConfigStatus(message, type) {
    const statusDiv = document.getElementById('configStatus');
    statusDiv.textContent = message;
    statusDiv.className = `config-status ${type}`;
    statusDiv.style.display = 'block';
}

// ============================================
// Send Message
// ============================================
async function sendMessage() {
    if (!checkConfig()) {
        return;
    }
    
    const personaSelect = document.getElementById('personaSelect');
    const messageInput = document.getElementById('messageInput');
    
    if (!personaSelect.value) {
        showNotification('Please select a persona first.', 'error');
        return;
    }
    
    if (!messageInput.value.trim()) {
        return;
    }
    
    const persona = personas[personaSelect.value];
    const userMessage = messageInput.value.trim();
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Add user message to chat
    addMessage('user', userMessage);
    
    // Show loading
    showLoading(true);
    
    try {
        // Generate reply using Gradient Parallax API
        const reply = await generateReplyWithAI(persona, userMessage);
        
        // Add AI reply to chat
        addMessage('ai', reply, persona);
        
        // Save to history
        saveChatHistory();
    } catch (error) {
        console.error('Error generating reply:', error);
        addMessage('ai', 'Sorry, I encountered an error. Please check your local AI configuration.', null, true);
    } finally {
        showLoading(false);
    }
}

// ============================================
// Gradient Parallax API Integration
// ============================================
async function generateReplyWithAI(persona, userMessage) {
    const config = getConfig();
    
    const response = await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
            model: config.modelName || 'llama2-7b-chat',
            messages: [
                {
                    role: 'system',
                    content: `${persona.systemPrompt}\n\nProvide three reply suggestions in different styles:\n1. Professional - formal and structured\n2. Friendly - warm and approachable\n3. Assertive - confident and direct\n\nFormat your response as:\n\n**Professional:**\n[reply]\n\n**Friendly:**\n[reply]\n\n**Assertive:**\n[reply]\n\n**Analysis:**\n[Why this reply works and bottom-line advice]`
                },
                {
                    role: 'user',
                    content: `Message received: "${userMessage}"\n\nGenerate three reply suggestions in the requested format.`
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        })
    });
    
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// ============================================
// Chat UI Functions
// ============================================
function addMessage(role, content, persona = null, isError = false) {
    const chatMessages = document.getElementById('chatMessages');
    
    // Remove welcome message if exists
    const welcomeMsg = chatMessages.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${role}`;
    
    const avatar = role === 'user' ? '👤' : (persona ? persona.icon : '🤖');
    const author = role === 'user' ? 'You' : (persona ? persona.name : 'AI Assistant');
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${author}</span>
            </div>
            <div class="message-text">${formatMessage(content)}</div>
            ${role === 'ai' ? `
                <div class="message-actions">
                    <button class="action-btn-small" onclick="copyMessage(this)">📋 Copy</button>
                </div>
            ` : ''}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (isError) {
        messageDiv.style.borderLeft = '3px solid #ef4444';
    }
}

function formatMessage(content) {
    // Format markdown-like content
    let formatted = content
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    
    // Extract and format reply styles
    const professionalMatch = content.match(/\*\*Professional:\*\*\s*([^*]+?)(?=\*\*|$)/s);
    const friendlyMatch = content.match(/\*\*Friendly:\*\*\s*([^*]+?)(?=\*\*|$)/s);
    const assertiveMatch = content.match(/\*\*Assertive:\*\*\s*([^*]+?)(?=\*\*|$)/s);
    const analysisMatch = content.match(/\*\*Analysis:\*\*\s*(.+?)(?=\*\*|$)/s);
    
    if (professionalMatch || friendlyMatch || assertiveMatch) {
        let html = '<div class="reply-styles">';
        
        if (professionalMatch) {
            html += `<div class="reply-card"><div class="reply-header">💼 Professional</div><div class="reply-content">${professionalMatch[1].trim()}</div></div>`;
        }
        if (friendlyMatch) {
            html += `<div class="reply-card"><div class="reply-header">😊 Friendly</div><div class="reply-content">${friendlyMatch[1].trim()}</div></div>`;
        }
        if (assertiveMatch) {
            html += `<div class="reply-card"><div class="reply-header">💪 Assertive</div><div class="reply-content">${assertiveMatch[1].trim()}</div></div>`;
        }
        if (analysisMatch) {
            html += `<div class="reply-card" style="border-left-color: #10a37f;"><div class="reply-header">💡 Analysis</div><div class="reply-content">${analysisMatch[1].trim()}</div></div>`;
        }
        
        html += '</div>';
        return html;
    }
    
    return formatted;
}

function copyMessage(button) {
    const messageText = button.closest('.message').querySelector('.message-text').textContent;
    navigator.clipboard.writeText(messageText).then(() => {
        button.textContent = '✓ Copied';
        setTimeout(() => {
            button.textContent = '📋 Copy';
        }, 2000);
    });
}

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = show ? 'flex' : 'none';
}

// ============================================
// Anonymization
// ============================================
function anonymizeMessage() {
    const messageInput = document.getElementById('messageInput');
    let message = messageInput.value;
    
    if (!message.trim()) {
        showNotification('Please paste a message first.', 'error');
        return;
    }
    
    // Anonymize patterns
    message = message.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, '[Name]');
    message = message.replace(/\b[\w.-]+@[\w.-]+\.\w+\b/g, '[Email]');
    message = message.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[Phone]');
    message = message.replace(/\$\d+([,.]\d+)?/g, '[Amount]');
    message = message.replace(/https?:\/\/[^\s]+/g, '[URL]');
    
    messageInput.value = message;
    showNotification('Message anonymized!', 'success');
}

// ============================================
// Chat History
// ============================================
function saveChatHistory() {
    const messages = Array.from(document.querySelectorAll('.message')).map(msg => ({
        role: msg.classList.contains('message-user') ? 'user' : 'ai',
        content: msg.querySelector('.message-text').textContent
    }));
    localStorage.setItem('securechat_history', JSON.stringify(messages));
}

function loadChatHistory() {
    const history = localStorage.getItem('securechat_history');
    if (history) {
        const messages = JSON.parse(history);
        messages.forEach(msg => {
            addMessage(msg.role, msg.content);
        });
    }
}

// ============================================
// Notifications
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'error' ? '#ef4444' : '#10a37f'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
