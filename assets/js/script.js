// ============================================
// Persona Definitions
// ============================================
const personas = {
    'sales-b2b': {
        id: 'sales-b2b',
        name: 'Sales (B2B)',
        icon: '💼',
        description: 'Professional B2B sales communication with focus on value proposition and relationship building.',
        style: 'Professional, consultative, value-focused',
        useCases: ['B2B sales inquiries', 'Enterprise deals', 'Partnership discussions']
    },
    'sales-saas': {
        id: 'sales-saas',
        name: 'Sales (SaaS)',
        icon: '🚀',
        description: 'SaaS sales communication emphasizing product benefits, demos, and trial conversions.',
        style: 'Enthusiastic, solution-oriented, conversion-focused',
        useCases: ['SaaS product inquiries', 'Demo requests', 'Trial sign-ups']
    },
    'sales-agent': {
        id: 'sales-agent',
        name: 'Sales (Agent)',
        icon: '🤝',
        description: 'Agent/reseller sales communication with focus on support and partnership.',
        style: 'Supportive, collaborative, partnership-oriented',
        useCases: ['Agent inquiries', 'Reseller support', 'Partnership discussions']
    },
    'customer-service-gentle': {
        id: 'customer-service-gentle',
        name: 'Customer Service (Gentle)',
        icon: '😊',
        description: 'Warm and empathetic customer service approach for sensitive situations.',
        style: 'Warm, empathetic, patient, understanding',
        useCases: ['Complaints', 'Refund requests', 'Sensitive issues']
    },
    'customer-service-strict': {
        id: 'customer-service-strict',
        name: 'Customer Service (Strict)',
        icon: '📋',
        description: 'Professional and firm customer service for policy enforcement and clear communication.',
        style: 'Professional, firm, clear, policy-focused',
        useCases: ['Policy enforcement', 'Terms clarification', 'Formal responses']
    },
    'interview': {
        id: 'interview',
        name: 'Interview Assistant',
        icon: '🎯',
        description: 'Help craft responses that HR and interviewers will appreciate - professional and authentic.',
        style: 'Professional, authentic, confident, structured',
        useCases: ['Interview follow-ups', 'Salary negotiations', 'Job offer responses']
    },
    'account-manager': {
        id: 'account-manager',
        name: 'Account Manager',
        icon: '👔',
        description: 'Balance courtesy and professionalism in client relationship management.',
        style: 'Balanced, professional, relationship-focused, proactive',
        useCases: ['Client check-ins', 'Renewal discussions', 'Upselling opportunities']
    },
    'business-negotiation-strong': {
        id: 'business-negotiation-strong',
        name: 'Business Negotiation (Strong)',
        icon: '💪',
        description: 'Assertive negotiation style for when you need to stand firm.',
        style: 'Assertive, confident, firm, value-driven',
        useCases: ['Price negotiations', 'Contract terms', 'Deal closing']
    },
    'business-negotiation-neutral': {
        id: 'business-negotiation-neutral',
        name: 'Business Negotiation (Neutral)',
        icon: '⚖️',
        description: 'Balanced negotiation approach seeking win-win solutions.',
        style: 'Balanced, collaborative, solution-oriented, fair',
        useCases: ['Partnership discussions', 'Mutual agreements', 'Compromise situations']
    },
    'business-negotiation-weak': {
        id: 'business-negotiation-weak',
        name: 'Business Negotiation (Weak)',
        icon: '🤲',
        description: 'Flexible negotiation style when you need to be accommodating.',
        style: 'Flexible, accommodating, collaborative, open',
        useCases: ['Relationship preservation', 'Long-term partnerships', 'Flexible terms']
    },
    'dating-chat': {
        id: 'dating-chat',
        name: 'Dating Chat Helper',
        icon: '💕',
        description: 'Avoid pitfalls and maintain emotional neutrality in dating conversations.',
        style: 'Balanced, engaging, respectful, authentic',
        useCases: ['First messages', 'Date planning', 'Relationship conversations']
    },
    'product-manager': {
        id: 'product-manager',
        name: 'Product Manager',
        icon: '📊',
        description: 'Professional product management communication for proposals and stakeholder updates.',
        style: 'Data-driven, clear, strategic, stakeholder-focused',
        useCases: ['Feature proposals', 'Stakeholder updates', 'Roadmap discussions']
    },
    'student-teacher': {
        id: 'student-teacher',
        name: 'Student Communication',
        icon: '🎓',
        description: 'Respectful student communication when messaging teachers or professors.',
        style: 'Respectful, clear, professional, courteous',
        useCases: ['Assignment questions', 'Grade inquiries', 'Extension requests']
    },
    'job-seeker-hr': {
        id: 'job-seeker-hr',
        name: 'Job Seeker (HR Replies)',
        icon: '📝',
        description: 'Professional responses to HR that make a positive impression.',
        style: 'Professional, enthusiastic, concise, value-focused',
        useCases: ['Application follow-ups', 'Interview confirmations', 'Offer responses']
    },
    'email-formal': {
        id: 'email-formal',
        name: 'Formal Business Email',
        icon: '📧',
        description: 'Professional formal email communication for business correspondence.',
        style: 'Formal, structured, clear, professional',
        useCases: ['Business proposals', 'Formal requests', 'Executive communication']
    },
    'cold-outreach': {
        id: 'cold-outreach',
        name: 'Cold Outreach Assistant',
        icon: '📬',
        description: 'Effective cold outreach messages that get responses.',
        style: 'Engaging, personalized, value-focused, concise',
        useCases: ['Cold emails', 'LinkedIn outreach', 'Initial contact']
    }
};

// ============================================
// Initialize after DOM loads
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializePersonas();
    setupEventListeners();
});

// ============================================
// Initialize Personas
// ============================================
function initializePersonas() {
    const personaSelect = document.getElementById('personaSelect');
    
    // Populate persona dropdown
    Object.values(personas).forEach(persona => {
        const option = document.createElement('option');
        option.value = persona.id;
        option.textContent = `${persona.icon} ${persona.name}`;
        personaSelect.appendChild(option);
    });
    
    // Add change listener
    personaSelect.addEventListener('change', function() {
        const selectedPersonaId = this.value;
        if (selectedPersonaId) {
            displayPersonaInfo(personas[selectedPersonaId]);
        } else {
            hidePersonaInfo();
        }
    });
}

// ============================================
// Display Persona Information
// ============================================
function displayPersonaInfo(persona) {
    const descriptionDiv = document.getElementById('personaDescription');
    const descriptionContent = document.getElementById('descriptionContent');
    const infoCard = document.getElementById('personaInfoCard');
    const infoContent = document.getElementById('personaInfoContent');
    
    // Update description below select
    descriptionContent.innerHTML = `
        <div class="persona-detail">
            <strong>${persona.icon} ${persona.name}</strong>
            <p>${persona.description}</p>
            <div class="persona-meta">
                <span><strong>Style:</strong> ${persona.style}</span>
            </div>
        </div>
    `;
    descriptionDiv.style.display = 'block';
    
    // Update info card
    infoContent.innerHTML = `
        <div class="persona-full-info">
            <h4>${persona.icon} ${persona.name}</h4>
            <p class="persona-desc">${persona.description}</p>
            <div class="persona-details">
                <div class="detail-item">
                    <strong>Communication Style:</strong>
                    <span>${persona.style}</span>
                </div>
                <div class="detail-item">
                    <strong>Best For:</strong>
                    <ul>
                        ${persona.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    infoCard.style.display = 'block';
}

function hidePersonaInfo() {
    document.getElementById('personaDescription').style.display = 'none';
    document.getElementById('personaInfoCard').style.display = 'none';
}

// ============================================
// Setup Event Listeners
// ============================================
function setupEventListeners() {
    // Generate button
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', generateReplies);
    
    // Anonymize button
    const anonymizeBtn = document.getElementById('anonymizeBtn');
    anonymizeBtn.addEventListener('click', anonymizeMessage);
    
    // Clear button
    const clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', clearInput);
    
    // Copy buttons - use event delegation for dynamically created buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.copy-btn')) {
            const btn = e.target.closest('.copy-btn');
            const targetId = btn.getAttribute('data-target');
            copyToClipboard(targetId);
        }
    });
    
    // Enter key support (Ctrl+Enter to submit)
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            generateReplies();
        }
    });
}

// ============================================
// Generate Reply Suggestions
// ============================================
function generateReplies() {
    const personaSelect = document.getElementById('personaSelect');
    const messageInput = document.getElementById('messageInput');
    const resultsContainer = document.getElementById('results');
    
    // Validation
    if (!personaSelect.value) {
        showNotification('Please select a persona first.', 'error');
        return;
    }
    
    if (!messageInput.value.trim()) {
        showNotification('Please paste the message you received.', 'error');
        return;
    }
    
    const persona = personas[personaSelect.value];
    const message = messageInput.value.trim();
    
    // Show loading state
    const generateBtn = document.getElementById('generateBtn');
    const originalText = generateBtn.innerHTML;
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<span class="btn-icon">⏳</span> Generating...';
    
    // Simulate processing (in real implementation, this would use AI)
    setTimeout(() => {
        const replies = generateReplySuggestions(persona, message);
        const analysis = analyzeMessage(message, persona);
        
        // Display results
        displayReplies(replies);
        displayAnalysis(analysis);
        
        // Show results section
        resultsContainer.classList.remove('hidden');
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Reset button
        generateBtn.disabled = false;
        generateBtn.innerHTML = originalText;
    }, 1500);
}

// ============================================
// Generate Reply Suggestions (AI Logic)
// ============================================
function generateReplySuggestions(persona, message) {
    // Analyze message tone and intent
    const messageAnalysis = analyzeMessageContent(message);
    
    // Generate three different style replies
    const professional = generateProfessionalReply(persona, message, messageAnalysis);
    const friendly = generateFriendlyReply(persona, message, messageAnalysis);
    const assertive = generateAssertiveReply(persona, message, messageAnalysis);
    
    return {
        professional,
        friendly,
        assertive
    };
}

// ============================================
// Reply Generation Functions
// ============================================
function generateProfessionalReply(persona, message, analysis) {
    const templates = {
        'sales-b2b': `Thank you for reaching out. I appreciate your interest in our solution. Based on your requirements, I believe we can provide significant value. Would you be available for a brief call this week to discuss how we can help address your specific needs?`,
        'sales-saas': `Thank you for your inquiry. Our platform is designed to solve exactly the challenges you've mentioned. I'd be happy to schedule a personalized demo to show you how it works. When would be a convenient time for you?`,
        'customer-service-gentle': `I understand your concern and I'm here to help resolve this for you. Let me look into this right away and get back to you with a solution. I appreciate your patience.`,
        'customer-service-strict': `Thank you for contacting us. According to our policy, [specific policy detail]. I've reviewed your case and here's what we can do: [solution]. Please let me know if you have any questions.`,
        'interview': `Thank you for the opportunity. I'm very interested in this position and believe my experience aligns well with your requirements. I'm available to discuss further at your convenience.`,
        'account-manager': `Thank you for your message. I've reviewed your request and I'm working on a solution that addresses your needs. I'll follow up with you by [timeframe] with the details.`,
        'email-formal': `Dear [Name], Thank you for your email. I have reviewed your request and will address it accordingly. I will provide a detailed response by [date]. Best regards, [Your Name]`
    };
    
    // Get base template or generate generic professional reply
    let reply = templates[persona.id] || generateGenericReply(persona, message, 'professional');
    
    // Customize based on message content
    if (analysis.isQuestion) {
        reply = `Thank you for your question. ${reply}`;
    }
    
    if (analysis.isUrgent) {
        reply = `I understand this is time-sensitive. ${reply}`;
    }
    
    return reply;
}

function generateFriendlyReply(persona, message, analysis) {
    const templates = {
        'sales-b2b': `Hi! Thanks for reaching out! I'd love to chat about how we can help. Are you free for a quick call this week?`,
        'sales-saas': `Hey! Great to hear from you. I think our solution could be a perfect fit. Want to see a quick demo?`,
        'customer-service-gentle': `Hi there! I totally understand your concern - let me help you get this sorted out right away! 😊`,
        'customer-service-strict': `Hello! Thanks for reaching out. I've got this covered and will get back to you soon with an update.`,
        'interview': `Hi! Thanks for reaching out. I'm really excited about this opportunity and would love to discuss it further!`,
        'account-manager': `Hey! Got your message - I'm on it! I'll circle back with you soon with an update. Thanks for your patience!`,
        'email-formal': `Hi [Name], Thanks for your email! I'll look into this and get back to you soon. Best, [Your Name]`
    };
    
    let reply = templates[persona.id] || generateGenericReply(persona, message, 'friendly');
    
    if (analysis.isQuestion) {
        reply = `Great question! ${reply}`;
    }
    
    return reply;
}

function generateAssertiveReply(persona, message, analysis) {
    const templates = {
        'sales-b2b': `I understand you're evaluating solutions. To move forward effectively, I'll need [specific requirement]. Once we have that, I can provide a detailed proposal. When can we schedule a call?`,
        'sales-saas': `To ensure we're the right fit, I need to understand [specific need]. Let's schedule a demo this week to determine if we can meet your requirements.`,
        'customer-service-strict': `I've reviewed your case. Based on our terms, here's what we can do: [solution]. To proceed, I'll need [requirement].`,
        'business-negotiation-strong': `I understand your position. However, to move forward, we need [requirement]. This is essential for [reason]. Can we align on this?`,
        'account-manager': `To address this effectively, I need [requirement] by [deadline]. This will allow me to [action]. Can you provide this?`
    };
    
    let reply = templates[persona.id] || generateGenericReply(persona, message, 'assertive');
    
    if (analysis.isUrgent) {
        reply = `This requires immediate attention. ${reply}`;
    }
    
    return reply;
}

function generateGenericReply(persona, message, style) {
    const styleMap = {
        'professional': `Thank you for your message. I've reviewed your request and will address it accordingly. I'll follow up with you shortly with more details.`,
        'friendly': `Hi! Thanks for reaching out. I'm looking into this and will get back to you soon. Appreciate your patience!`,
        'assertive': `I understand your request. To proceed effectively, I need [specific information]. Once provided, I can [action].`
    };
    
    return styleMap[style] || styleMap['professional'];
}

// ============================================
// Message Analysis
// ============================================
function analyzeMessage(message, persona) {
    const contentAnalysis = analyzeMessageContent(message);
    
    return {
        explanation: generateExplanation(persona, message, contentAnalysis),
        bottomLine: generateBottomLine(persona, message, contentAnalysis),
        emotion: analyzeEmotion(message, contentAnalysis)
    };
}

function analyzeMessageContent(message) {
    const lowerMessage = message.toLowerCase();
    
    return {
        isQuestion: /[?]/.test(message) || /\b(how|what|when|where|why|can|could|would|should)\b/i.test(message),
        isUrgent: /\b(urgent|asap|immediately|emergency|critical|important)\b/i.test(lowerMessage),
        isPositive: /\b(thank|thanks|appreciate|great|excellent|wonderful|happy|pleased)\b/i.test(lowerMessage),
        isNegative: /\b(problem|issue|concern|complaint|disappointed|unhappy|wrong|error)\b/i.test(lowerMessage),
        isRequest: /\b(please|request|need|want|would like|asking)\b/i.test(lowerMessage),
        hasEmotion: /[!]/.test(message) || /\b(!!|!!!)\b/.test(message),
        wordCount: message.split(/\s+/).length
    };
}

function generateExplanation(persona, message, analysis) {
    let explanation = `This reply works well because it `;
    
    if (analysis.isQuestion) {
        explanation += `directly addresses the question while maintaining a ${persona.style.toLowerCase()} tone. `;
    }
    
    if (analysis.isUrgent) {
        explanation += `acknowledges the time-sensitive nature of the request. `;
    }
    
    if (analysis.isPositive) {
        explanation += `builds on the positive sentiment and reinforces the relationship. `;
    }
    
    if (analysis.isNegative) {
        explanation += `addresses concerns professionally without being defensive. `;
    }
    
    explanation += `The ${persona.name} persona ensures the response aligns with best practices for this type of communication.`;
    
    return explanation;
}

function generateBottomLine(persona, message, analysis) {
    let advice = `Avoid: `;
    
    if (analysis.isNegative) {
        advice += `Don't be defensive or dismissive. Acknowledge the concern and focus on solutions. `;
    }
    
    if (analysis.isUrgent) {
        advice += `Don't delay - respond promptly and set clear expectations. `;
    }
    
    if (persona.id.includes('customer-service')) {
        advice += `Always maintain professionalism, even if the customer is frustrated. `;
    }
    
    if (persona.id.includes('sales')) {
        advice += `Don't be pushy - focus on value and let the customer decide. `;
    }
    
    advice += `Keep your response clear, concise, and aligned with your persona's communication style.`;
    
    return advice;
}

function analyzeEmotion(message, analysis) {
    let emotion = [];
    let risk = [];
    
    // Emotion detection
    if (analysis.isPositive) {
        emotion.push('Positive sentiment detected');
    }
    if (analysis.isNegative) {
        emotion.push('Negative sentiment detected');
        risk.push('Potential complaint or dissatisfaction');
    }
    if (analysis.hasEmotion) {
        emotion.push('High emotional tone');
    }
    if (analysis.isUrgent) {
        risk.push('Urgent request - requires prompt response');
    }
    
    // Hidden attack detection
    const lowerMessage = message.toLowerCase();
    if (/\b(but|however|although|unfortunately)\b/i.test(message) && analysis.isPositive) {
        risk.push('Mixed signals - positive opening may lead to negative request');
    }
    if (/\b(always|never|all|every)\b/i.test(message) && analysis.isNegative) {
        risk.push('Absolute language may indicate frustration');
    }
    
    if (emotion.length === 0) {
        emotion.push('Neutral tone');
    }
    
    if (risk.length === 0) {
        risk.push('Low risk - standard communication');
    }
    
    return {
        emotions: emotion,
        risks: risk
    };
}

// ============================================
// Display Functions
// ============================================
function displayReplies(replies) {
    document.getElementById('replyProfessional').textContent = replies.professional;
    document.getElementById('replyFriendly').textContent = replies.friendly;
    document.getElementById('replyAssertive').textContent = replies.assertive;
}

function displayAnalysis(analysis) {
    document.getElementById('analysisExplanation').textContent = analysis.explanation;
    document.getElementById('analysisBottomLine').textContent = analysis.bottomLine;
    
    const emotionDiv = document.getElementById('analysisEmotion');
    emotionDiv.innerHTML = `
        <div class="emotion-section">
            <div class="emotion-item">
                <strong>Emotions Detected:</strong>
                <ul>
                    ${analysis.emotion.emotions.map(e => `<li>${e}</li>`).join('')}
                </ul>
            </div>
            <div class="emotion-item">
                <strong>Risks & Concerns:</strong>
                <ul>
                    ${analysis.emotion.risks.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// ============================================
// Anonymization Function
// ============================================
function anonymizeMessage() {
    const messageInput = document.getElementById('messageInput');
    let message = messageInput.value;
    
    if (!message.trim()) {
        showNotification('Please paste a message first.', 'error');
        return;
    }
    
    // Anonymize names (common patterns)
    message = message.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, '[Name]');
    message = message.replace(/\b[A-Z][a-z]+\b/g, (match) => {
        // Skip common words
        if (['I', 'The', 'This', 'That', 'Thank', 'Please'].includes(match)) {
            return match;
        }
        return '[Name]';
    });
    
    // Anonymize emails
    message = message.replace(/\b[\w.-]+@[\w.-]+\.\w+\b/g, '[Email]');
    
    // Anonymize phone numbers
    message = message.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[Phone]');
    message = message.replace(/\b\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}\b/g, '[Phone]');
    
    // Anonymize amounts (currency)
    message = message.replace(/\$\d+([,.]\d+)?/g, '[Amount]');
    message = message.replace(/\b\d+([,.]\d+)?\s*(USD|EUR|GBP|dollars?|euros?|pounds?)\b/gi, '[Amount]');
    
    // Anonymize company names (common patterns)
    message = message.replace(/\b[A-Z][a-z]+ (Inc|LLC|Corp|Ltd|Company|Co\.)\b/g, '[Company]');
    
    // Anonymize URLs
    message = message.replace(/https?:\/\/[^\s]+/g, '[URL]');
    message = message.replace(/\bwww\.[^\s]+/g, '[URL]');
    
    messageInput.value = message;
    showNotification('Message anonymized successfully!', 'success');
}

// ============================================
// Utility Functions
// ============================================
function clearInput() {
    document.getElementById('messageInput').value = '';
    document.getElementById('personaSelect').value = '';
    document.getElementById('results').classList.add('hidden');
    hidePersonaInfo();
    showNotification('Input cleared.', 'success');
}

function copyToClipboard(targetId) {
    const element = document.getElementById(targetId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Copied to clipboard!', 'success');
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            }
            .notification-success {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .notification-error {
                background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

