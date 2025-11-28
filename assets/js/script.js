// ============================================
// Configuration Management
// ============================================
const CONFIG_KEY = 'securechat_config';
const SESSIONS_KEY = 'securechat_sessions';
const CURRENT_SESSION_KEY = 'securechat_current_session';

// ============================================
// Session Management
// ============================================
let sessions = [];
let currentSessionId = null;

function getSessions() {
    const stored = localStorage.getItem(SESSIONS_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveSessions() {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

function getCurrentSessionId() {
    return localStorage.getItem(CURRENT_SESSION_KEY);
}

function setCurrentSessionId(sessionId) {
    currentSessionId = sessionId;
    localStorage.setItem(CURRENT_SESSION_KEY, sessionId);
}

function createSession(personaId = null) {
    const sessionId = 'session_' + Date.now();
    const session = {
        id: sessionId,
        personaId: personaId,
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    sessions.push(session);
    saveSessions();
    return session;
}

function getSession(sessionId) {
    return sessions.find(s => s.id === sessionId);
}

function updateSession(sessionId, updates) {
    const session = getSession(sessionId);
    if (session) {
        Object.assign(session, updates);
        session.updatedAt = Date.now();
        saveSessions();
    }
}

function deleteSession(sessionId) {
    sessions = sessions.filter(s => s.id !== sessionId);
    saveSessions();
    if (currentSessionId === sessionId) {
        if (sessions.length > 0) {
            switchToSession(sessions[0].id);
        } else {
            currentSessionId = null;
            setCurrentSessionId(null);
            clearChatMessages();
        }
    }
}

function switchToSession(sessionId) {
    currentSessionId = sessionId;
    setCurrentSessionId(sessionId);
    const session = getSession(sessionId);
    if (session) {
        // Update persona select
        if (session.personaId) {
            document.getElementById('personaSelect').value = session.personaId;
            updatePersonaDescription();
        }
        // Load messages
        loadSessionMessages(session);
    }
    renderSessionsList();
}

function loadSessionMessages(session) {
    clearChatMessages();
    session.messages.forEach(msg => {
        const persona = msg.personaId ? personas[msg.personaId] : null;
        addMessage(msg.role, msg.content, persona, msg.isError, false);
    });
}

function clearChatMessages() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
}

function getCurrentSession() {
    if (!currentSessionId) {
        return null;
    }
    return getSession(currentSessionId);
}

function ensureSession(personaId) {
    const currentSession = getCurrentSession();
    
    // If no current session, create one
    if (!currentSession) {
        const session = createSession(personaId);
        currentSessionId = session.id;
        setCurrentSessionId(session.id);
        renderSessionsList();
        return session;
    }
    
    // If current session has messages and persona changed, create new session
    if (currentSession.messages.length > 0 && currentSession.personaId !== personaId) {
        const session = createSession(personaId);
        currentSessionId = session.id;
        setCurrentSessionId(session.id);
        renderSessionsList();
        return session;
    }
    
    // Update persona if changed
    if (currentSession.personaId !== personaId) {
        updateSession(currentSession.id, { personaId: personaId });
    }
    
    return currentSession;
}

function renderSessionsList() {
    const sessionsList = document.getElementById('sessionsList');
    sessionsList.innerHTML = '';
    
    if (sessions.length === 0) {
        sessionsList.innerHTML = '<div class="no-sessions">No sessions yet</div>';
        return;
    }
    
    // Sort by updatedAt (newest first)
    const sortedSessions = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt);
    
    sortedSessions.forEach(session => {
        const sessionDiv = document.createElement('div');
        sessionDiv.className = `session-item ${session.id === currentSessionId ? 'active' : ''}`;
        
        const persona = session.personaId ? personas[session.personaId] : null;
        const personaName = persona ? persona.name : 'No Persona';
        const personaIcon = persona ? persona.icon : '💬';
        const messageCount = session.messages.length;
        
        sessionDiv.innerHTML = `
            <div class="session-content" onclick="switchToSession('${session.id}')">
                <div class="session-icon">${personaIcon}</div>
                <div class="session-info">
                    <div class="session-name">${personaName}</div>
                    <div class="session-meta">${messageCount} message${messageCount !== 1 ? 's' : ''}</div>
                </div>
            </div>
            <button class="session-delete" onclick="deleteSession('${session.id}')" title="Delete session">×</button>
        `;
        
        sessionsList.appendChild(sessionDiv);
    });
}

function getConfig() {
    const config = localStorage.getItem(CONFIG_KEY);
    return config ? JSON.parse(config) : null;
}

function saveConfig(config) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

function checkConfig() {
    const config = getConfig();
    if (!config || !config.apiEndpoint) {
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
    // Initialize sessions
    sessions = getSessions();
    currentSessionId = getCurrentSessionId();
    
    // If no current session, create one
    if (!currentSessionId || !getSession(currentSessionId)) {
        if (sessions.length > 0) {
            currentSessionId = sessions[0].id;
        } else {
            const session = createSession();
            currentSessionId = session.id;
        }
        setCurrentSessionId(currentSessionId);
    }
    
    initializePersonas();
    setupEventListeners();
    checkInitialConfig();
    renderSessionsList();
    
    // Load current session messages
    const currentSession = getCurrentSession();
    if (currentSession && currentSession.messages.length > 0) {
        loadSessionMessages(currentSession);
    }
});

function checkInitialConfig() {
    const config = getConfig();
    if (!config) {
        // Set default local model configuration
        const defaultConfig = {
            apiEndpoint: 'http://localhost:3001/v1/chat/completions',
            apiKey: '', // No API key needed for local model
            modelName: 'local-model',
            maxTokens: 2048,
            stream: true
        };
        saveConfig(defaultConfig);
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
    
    // Persona selection is handled in setupEventListeners
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
    
    // Persona selection
    document.getElementById('personaSelect').addEventListener('change', function() {
        const personaId = this.value;
        if (personaId) {
            const persona = personas[personaId];
            displayPersonaInfo(persona);
            
            // Check if we need to create a new session
            const currentSession = getCurrentSession();
            if (currentSession && currentSession.messages.length > 0 && currentSession.personaId !== personaId) {
                // Create new session with new persona
                const newSession = createSession(personaId);
                currentSessionId = newSession.id;
                setCurrentSessionId(newSession.id);
                renderSessionsList();
                clearChatMessages();
            } else {
                // Update current session persona
                if (currentSession) {
                    updateSession(currentSession.id, { personaId: personaId });
                } else {
                    ensureSession(personaId);
                }
            }
        } else {
            document.getElementById('personaDescription').style.display = 'none';
        }
    });
    
    // New session button
    document.getElementById('newSessionBtn').addEventListener('click', function() {
        const personaSelect = document.getElementById('personaSelect');
        const personaId = personaSelect.value || null;
        const newSession = createSession(personaId);
        currentSessionId = newSession.id;
        setCurrentSessionId(newSession.id);
        renderSessionsList();
        clearChatMessages();
        
        if (personaId) {
            displayPersonaInfo(personas[personaId]);
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
        document.getElementById('apiEndpoint').value = config.apiEndpoint || 'http://localhost:3001/v1/chat/completions';
        document.getElementById('apiKey').value = config.apiKey || '';
        document.getElementById('modelName').value = config.modelName || 'local-model';
        document.getElementById('maxTokens').value = config.maxTokens || 2048;
        const streamCheckbox = document.getElementById('streamEnabled');
        if (streamCheckbox) {
            streamCheckbox.checked = config.stream !== false;
        }
    } else {
        // Set defaults
        document.getElementById('apiEndpoint').value = 'http://localhost:3001/v1/chat/completions';
        document.getElementById('modelName').value = 'local-model';
        document.getElementById('maxTokens').value = 2048;
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
    const maxTokens = parseInt(document.getElementById('maxTokens').value) || 2048;
    const streamEnabled = document.getElementById('streamEnabled')?.checked !== false;
    
    if (!apiEndpoint) {
        showConfigStatus('Please fill in API Endpoint.', 'error');
        return;
    }
    
    const config = {
        apiEndpoint,
        apiKey: apiKey || '', // API key is optional for local models
        modelName: modelName || 'local-model',
        maxTokens: maxTokens,
        stream: streamEnabled
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
    const modelName = document.getElementById('modelName').value.trim() || 'local-model';
    
    if (!apiEndpoint) {
        showConfigStatus('Please fill in API Endpoint.', 'error');
        return;
    }
    
    showConfigStatus('Testing connection...', 'success');
    
    const headers = {
        'Content-Type': 'application/json'
    };
    
    if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
    }
    
    // Test with a simple non-streaming request
    fetch(apiEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            model: modelName,
            messages: [
                { role: 'user', content: 'Hello' }
            ],
            max_tokens: 10,
            stream: false
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    })
    .then(data => {
        if (data.choices && data.choices[0]) {
            showConfigStatus('✅ Connection successful!', 'success');
        } else {
            showConfigStatus('⚠️ Connection successful but unexpected response format.', 'error');
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
    
    // Ensure session exists and is correct
    const session = ensureSession(personaSelect.value);
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Add user message to chat
    const userMessageElement = addMessage('user', userMessage);
    
    // Save user message to session
    session.messages.push({
        role: 'user',
        content: userMessage,
        personaId: persona.id,
        timestamp: Date.now()
    });
    updateSession(session.id, { messages: session.messages });
    
    // Add AI message placeholder for streaming
    const aiMessageElement = addMessage('ai', '', persona, false, true);
    
    // Disable send button during processing
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = true;
    
    try {
        console.log('Starting message generation...');
        console.log('Persona:', persona.name);
        console.log('User message:', userMessage);
        console.log('Config:', getConfig());
        
        // Generate reply using local AI with streaming
        await generateReplyWithAIStream(persona, userMessage, aiMessageElement);
        
        console.log('Message generation completed successfully');
        
        // Get final content and save to session
        const finalContent = aiMessageElement.querySelector('.message-text').innerText || 
                            aiMessageElement.querySelector('.message-text').textContent;
        
        session.messages.push({
            role: 'ai',
            content: finalContent,
            personaId: persona.id,
            timestamp: Date.now()
        });
        updateSession(session.id, { messages: session.messages });
        renderSessionsList();
    } catch (error) {
        console.error('Error generating reply:', error);
        let errorMessage = 'Sorry, I encountered an error. ';
        
        if (error.message.includes('Failed to connect')) {
            errorMessage += 'Please make sure your local AI service is running at ' + (getConfig()?.apiEndpoint || 'http://localhost:3001/v1/chat/completions');
        } else if (error.message.includes('not configured')) {
            errorMessage += 'Please configure your local AI endpoint in settings (click the ⚙️ button).';
        } else {
            errorMessage += 'Error: ' + error.message;
        }
        
        updateMessageContent(aiMessageElement, errorMessage, true);
        
        // Save error message to session
        session.messages.push({
            role: 'ai',
            content: errorMessage,
            personaId: persona.id,
            isError: true,
            timestamp: Date.now()
        });
        updateSession(session.id, { messages: session.messages });
    } finally {
        sendBtn.disabled = false;
    }
}

// ============================================
// Local AI API Integration with Streaming
// ============================================
async function generateReplyWithAIStream(persona, userMessage, messageElement) {
    const config = getConfig();
    
    if (!config || !config.apiEndpoint) {
        throw new Error('API endpoint not configured. Please configure your local AI endpoint in settings.');
    }
    
    const stream = config.stream !== false; // Default to true for local models
    
    // Build messages array - some APIs support message IDs, but we'll keep it simple
    const messages = [
        {
            role: 'system',
            content: `${persona.systemPrompt}\n\nProvide three reply suggestions in different styles:\n1. Professional - formal and structured\n2. Friendly - warm and approachable\n3. Assertive - confident and direct\n\nFormat your response as:\n\n**Professional:**\n[reply]\n\n**Friendly:**\n[reply]\n\n**Assertive:**\n[reply]\n\n**Analysis:**\n[Why this reply works and bottom-line advice]`
        },
        {
            role: 'user',
            content: `Message received: "${userMessage}"\n\nGenerate three reply suggestions in the requested format.`
        }
    ];
    
    const requestBody = {
        model: config.modelName || 'local-model',
        messages: messages,
        temperature: 0.7,
        max_tokens: config.maxTokens || 2048,
        stream: stream
    };
    
    // Add sampling_params if needed (some local models support this)
    if (config.samplingParams) {
        requestBody.sampling_params = config.samplingParams;
    }
    
    const headers = {
        'Content-Type': 'application/json'
    };
    
    // Add Authorization header only if API key is provided
    if (config.apiKey && config.apiKey.trim()) {
        headers['Authorization'] = `Bearer ${config.apiKey}`;
    }
    
    // Debug logging
    console.log('Calling local AI API:', config.apiEndpoint);
    console.log('Request body:', requestBody);
    
    try {
        const response = await fetch(config.apiEndpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });
        
        console.log('API Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }
        
        if (stream) {
            // Handle streaming response
            console.log('Handling streaming response...');
            await handleStreamResponse(response, messageElement);
        } else {
            // Handle non-streaming response
            console.log('Handling non-streaming response...');
            const data = await response.json();
            console.log('API Response data:', data);
            const content = data.choices?.[0]?.message?.content;
            if (content) {
                updateMessageContent(messageElement, content);
            } else {
                throw new Error('Invalid response format from API');
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Failed to connect to local AI service. Please check if the service is running at ' + config.apiEndpoint);
        }
        throw error;
    }
}

async function handleStreamResponse(response, messageElement) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullContent = '';
    let hasContent = false;
    
    // Filter out unwanted content patterns
    const filterContent = (content) => {
        // Remove reasoning tags like <think>...</think>
        content = content.replace(/<think>[\s\S]*?<\/redacted_reasoning>/gi, '');
        content = content.replace(/<think>/gi, '');
        return content;
    };
    
    try {
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
                console.log('Stream completed. Total content length:', fullContent.length);
                break;
            }
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer
            
            for (const line of lines) {
                if (!line.trim()) continue; // Skip empty lines
                
                if (line.startsWith('data: ')) {
                    const data = line.slice(6).trim();
                    
                    if (data === '[DONE]') {
                        console.log('Received [DONE] signal');
                        // Filter final content before returning
                        fullContent = filterContent(fullContent);
                        updateMessageContent(messageElement, fullContent);
                        return;
                    }
                    
                    try {
                        const json = JSON.parse(data);
                        const choice = json.choices?.[0];
                        
                        if (choice) {
                            // Check for finish_reason
                            if (choice.finish_reason === 'stop') {
                                console.log('Received stop signal');
                                fullContent = filterContent(fullContent);
                                updateMessageContent(messageElement, fullContent);
                                return;
                            }
                            
                            // Get content from delta
                            const delta = choice.delta;
                            if (delta && delta.content !== null && delta.content !== undefined) {
                                const content = String(delta.content);
                                if (content) {
                                    hasContent = true;
                                    fullContent += content;
                                    // Filter and update in real-time
                                    const filtered = filterContent(fullContent);
                                    updateMessageContent(messageElement, filtered);
                                }
                            }
                        }
                    } catch (e) {
                        console.warn('Failed to parse JSON:', data.substring(0, 100), e);
                        // Skip invalid JSON lines
                    }
                } else if (line.trim() && !line.startsWith('data:')) {
                    // Handle responses that don't follow SSE format exactly
                    try {
                        const json = JSON.parse(line);
                        const choice = json.choices?.[0];
                        if (choice) {
                            const content = choice.message?.content || choice.delta?.content;
                            if (content) {
                                hasContent = true;
                                fullContent += String(content);
                                const filtered = filterContent(fullContent);
                                updateMessageContent(messageElement, filtered);
                            }
                        }
                    } catch (e) {
                        // Not JSON, skip
                    }
                }
            }
        }
        
        // Final filter before completion
        fullContent = filterContent(fullContent);
        if (fullContent) {
            updateMessageContent(messageElement, fullContent);
        }
        
        if (!hasContent && fullContent.length === 0) {
            throw new Error('No content received from API. Please check your local AI service configuration.');
        }
    } catch (error) {
        console.error('Stream handling error:', error);
        throw error;
    } finally {
        reader.releaseLock();
    }
}

// ============================================
// Chat UI Functions
// ============================================
function addMessage(role, content, persona = null, isError = false, isStreaming = false) {
    const chatMessages = document.getElementById('chatMessages');
    
    // Remove welcome message if exists
    const welcomeMsg = chatMessages.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${role}`;
    if (isStreaming) {
        messageDiv.classList.add('streaming');
    }
    
    const avatar = role === 'user' ? '👤' : (persona ? persona.icon : '🤖');
    const author = role === 'user' ? 'You' : (persona ? persona.name : 'AI Assistant');
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${author}</span>
                ${isStreaming ? '<span class="streaming-indicator">●</span>' : ''}
            </div>
            <div class="message-text">${formatMessage(content)}</div>
            ${role === 'ai' && !isStreaming ? `
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
    
    return messageDiv;
}

function updateMessageContent(messageElement, content, isError = false) {
    const messageText = messageElement.querySelector('.message-text');
    if (messageText) {
        messageText.innerHTML = formatMessage(content);
        
        // Remove streaming indicator when content is complete
        const streamingIndicator = messageElement.querySelector('.streaming-indicator');
        if (streamingIndicator && !isError) {
            streamingIndicator.remove();
            messageElement.classList.remove('streaming');
            
            // Add copy button when streaming is complete
            const messageContent = messageElement.querySelector('.message-content');
            if (!messageContent.querySelector('.message-actions')) {
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'message-actions';
                actionsDiv.innerHTML = '<button class="action-btn-small" onclick="copyMessage(this)">📋 Copy</button>';
                messageContent.appendChild(actionsDiv);
            }
        }
        
        // Auto-scroll to bottom
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    if (isError) {
        messageElement.style.borderLeft = '3px solid #ef4444';
    }
}

function formatMessage(content) {
    // Extract and format reply styles with individual copy buttons
    const professionalMatch = content.match(/\*\*Professional:\*\*\s*([^*]+?)(?=\*\*|$)/s);
    const friendlyMatch = content.match(/\*\*Friendly:\*\*\s*([^*]+?)(?=\*\*|$)/s);
    const assertiveMatch = content.match(/\*\*Assertive:\*\*\s*([^*]+?)(?=\*\*|$)/s);
    const analysisMatch = content.match(/\*\*Analysis:\*\*\s*(.+?)(?=\*\*|$)/s);
    
    if (professionalMatch || friendlyMatch || assertiveMatch) {
        let html = '<div class="reply-styles">';
        
        if (professionalMatch) {
            const professionalText = professionalMatch[1].trim();
            const textId = 'reply-professional-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            html += `
                <div class="reply-card">
                    <div class="reply-header">
                        <span>💼 Professional</span>
                        <button class="reply-copy-btn" onclick="copyReplyText('${textId}')" title="Copy Professional reply">📋</button>
                    </div>
                    <div class="reply-content" id="${textId}">${professionalText.replace(/\n/g, '<br>')}</div>
                </div>
            `;
        }
        if (friendlyMatch) {
            const friendlyText = friendlyMatch[1].trim();
            const textId = 'reply-friendly-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            html += `
                <div class="reply-card">
                    <div class="reply-header">
                        <span>😊 Friendly</span>
                        <button class="reply-copy-btn" onclick="copyReplyText('${textId}')" title="Copy Friendly reply">📋</button>
                    </div>
                    <div class="reply-content" id="${textId}">${friendlyText.replace(/\n/g, '<br>')}</div>
                </div>
            `;
        }
        if (assertiveMatch) {
            const assertiveText = assertiveMatch[1].trim();
            const textId = 'reply-assertive-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            html += `
                <div class="reply-card">
                    <div class="reply-header">
                        <span>💪 Assertive</span>
                        <button class="reply-copy-btn" onclick="copyReplyText('${textId}')" title="Copy Assertive reply">📋</button>
                    </div>
                    <div class="reply-content" id="${textId}">${assertiveText.replace(/\n/g, '<br>')}</div>
                </div>
            `;
        }
        if (analysisMatch) {
            html += `
                <div class="reply-card" style="border-left-color: #10a37f;">
                    <div class="reply-header">💡 Analysis</div>
                    <div class="reply-content">${analysisMatch[1].trim().replace(/\n/g, '<br>')}</div>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }
    
    // Format regular markdown-like content
    let formatted = content
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    
    return formatted;
}

function copyReplyText(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Get text content (remove HTML tags)
    const text = element.innerText || element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy', 'error');
    });
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
