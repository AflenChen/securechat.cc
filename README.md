# Secure Chat - AI Chat Helper & Reply Assistant

A modern, privacy-first AI-powered chat helper powered by **Gradient Parallax** local AI that provides contextual reply suggestions with 20+ personas. Perfect for sales, customer service, interviews, account management, and more.

🌐 **Live Demo**: [https://www.securechat.cc/](https://www.securechat.cc/)

📹 **Demo Video**: [Watch Demo](https://www.securechat.cc/demo.mov)

## Features

✨ **20+ Preset Personas**
- Sales (B2B / SaaS / Agent)
- Customer Service (Gentle / Strict)
- Interview Assistant
- Account Manager
- Business Negotiation (Strong / Neutral / Weak)
- Dating Chat Helper
- Product Manager
- Student Communication
- Job Seeker HR Replies
- Formal Business Email
- Cold Outreach Assistant

💬 **3 Reply Styles**
- Professional: Formal and structured
- Friendly: Warm and approachable
- Assertive: Confident and direct

🔍 **Smart Analysis**
- Why each reply works
- Bottom-line advice to avoid mistakes
- Emotion and risk analysis

🔐 **Privacy First**
- Powered by **Gradient Parallax** local AI
- All processing happens on your local machine
- No data uploaded to any server or cloud
- Smart anonymization for sensitive information

⚙️ **Local AI Integration**
- Configure your own local AI model endpoint
- Supports any OpenAI-compatible API (e.g., Gradient Parallax)
- Default endpoint: `http://localhost:3001/v1/chat/completions`
- Works completely offline once configured

## Project Structure

```
securechat.cc/
├── index.html              # Main page
├── sales.html              # Sales persona page (SEO)
├── customer-service.html   # Customer service page (SEO)
├── interview.html          # Interview assistant page (SEO)
├── account-manager.html    # Account manager page (SEO)
├── email-formal.html       # Formal email page (SEO)
├── robots.txt              # Search engine instructions
├── sitemap.xml             # XML sitemap
├── manifest.json           # PWA manifest
├── .gitignore              # Git ignore file
│
├── assets/                 # Static resources
│   ├── css/
│   │   └── styles.css      # Stylesheet
│   ├── js/
│   │   └── script.js       # Functionality logic
│   ├── images/
│   │   └── og-image.jpg     # Open Graph image (needs generation)
│   └── icons/              # Icon files (needs generation)
│       ├── favicon.png
│       ├── apple-touch-icon.png
│       ├── icon-192x192.png
│       ├── icon-512x512.png
│       └── icon.svg
│
└── docs/                   # Documentation
    └── README.md           # This file
```

## Quick Start

### Online Demo
Visit [https://www.securechat.cc/](https://www.securechat.cc/) to try the live demo.

### Local Setup

1. **Start your local AI service**
   - Ensure your local AI model is running (e.g., Gradient Parallax)
   - Default endpoint: `http://localhost:3001/v1/chat/completions`
   - The service must support OpenAI-compatible API format

2. **Open the application**
   - Open `index.html` in a web browser, or
   - Deploy to a web server

3. **Configure local AI**
   - Click the ⚙️ settings button
   - Enter your local AI endpoint URL
   - (Optional) Enter API key if required
   - Enter model name (e.g., `Qwen/Qwen3-0.6B`, `local-model`)
   - Click "Test Connection" to verify
   - Click "Save Configuration"

4. **Start chatting**
   - Select a persona that matches your communication scenario
   - Paste the message you received
   - Click send or press Enter
   - Get three different reply style suggestions
   - Copy individual replies using the copy buttons

### Multi-Session Support
- Create multiple conversation sessions
- Switch between sessions easily
- Each session maintains its own message history
- Switching personas with existing messages creates a new session automatically

## Personas

### Sales Personas
- **Sales (B2B)**: Professional B2B sales communication
- **Sales (SaaS)**: SaaS sales with product focus
- **Sales (Agent)**: Agent/reseller sales support

### Customer Service
- **Customer Service (Gentle)**: Warm and empathetic approach
- **Customer Service (Strict)**: Professional and firm policy enforcement

### Professional Communication
- **Interview Assistant**: Job seeker responses
- **Account Manager**: Client relationship management
- **Formal Business Email**: Professional email correspondence
- **Product Manager**: Product proposals and updates

### Specialized
- **Business Negotiation**: Strong, Neutral, or Weak positions
- **Dating Chat Helper**: Balanced relationship communication
- **Student Communication**: Respectful teacher communication
- **Job Seeker HR Replies**: Professional HR responses
- **Cold Outreach Assistant**: Effective cold outreach

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styles and animations
- **JavaScript (Vanilla)** - Pure JavaScript, no dependencies
- **Local Storage** - Session and configuration storage
- **Gradient Parallax** - Local AI integration
- **OpenAI-Compatible API** - Works with any compatible local AI service

## Privacy & Security

- ✅ Powered by **Gradient Parallax** local AI
- ✅ All processing happens on your local machine
- ✅ No data is collected, stored, or transmitted to external servers
- ✅ Smart anonymization for sensitive information
- ✅ No registration or account required
- ✅ Completely free to use
- ✅ Works offline once local AI is configured

## Local AI Setup

### Requirements
- A local AI service running (e.g., Gradient Parallax)
- OpenAI-compatible API endpoint
- Web browser with JavaScript enabled

### Configuration
1. Start your local AI service on `http://localhost:3001` (or your preferred port)
2. Open Secure Chat in your browser
3. Click the ⚙️ settings button
4. Enter your API endpoint (default: `http://localhost:3001/v1/chat/completions`)
5. Enter model name (e.g., `Qwen/Qwen3-0.6B`)
6. Test the connection
7. Save configuration

### Troubleshooting

**Connection Error**: If you see "Failed to connect to local AI service":
- Make sure your local AI service is running
- Check that the endpoint URL is correct
- Verify the service is accessible at the specified port
- Try testing the connection using the "Test Connection" button

**No Response**: If the AI doesn't respond:
- Check browser console for error messages
- Verify your local AI model is loaded and ready
- Ensure the API endpoint supports streaming (if enabled)
- Check that max_tokens is set appropriately

## SEO Pages

The following pages are created for SEO purposes:
- `/sales` - Sales chat assistant
- `/customer-service` - Customer service assistant
- `/interview` - Interview assistant
- `/account-manager` - Account manager assistant
- `/email-formal` - Formal business email assistant

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use for personal and commercial purposes.

## Demo & Links

- 🌐 **Live Demo**: [https://www.securechat.cc/](https://www.securechat.cc/)
- 📹 **Demo Video**: [Watch Demo Video](https://www.securechat.cc/demo.mov)
- 🔗 **Gradient Parallax**: [https://www.gradient.network/](https://www.gradient.network/)

## Credits

Built with reference to best practices from agecalculator.cc project structure and SEO optimization. Powered by Gradient Parallax local AI.

