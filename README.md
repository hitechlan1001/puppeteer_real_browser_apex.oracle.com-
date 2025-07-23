# Real Browser Job Application Bot

A sophisticated job application automation bot built with Puppeteer Real Browser that can fill forms, solve captchas, and handle dynamic resume uploads.

## 🚀 Features

- **Automated Form Filling**: Fills job application forms with user data
- **Captcha Solving**: Supports hCaptcha, reCAPTCHA, and Turnstile via Solvecaptcha API
- **Dynamic Resume Upload**: Waits for upload completion with real-time monitoring
- **Job Scraping**: Scrapes job postings from Lever jobs pages
- **Batch Application**: Apply to multiple jobs with status tracking
- **Proxy Support**: Rotate proxies to avoid IP bans
- **Resume Capability**: Resume interrupted application processes
- **Status Tracking**: Monitor progress and success rates

## 📁 Project Structure

```
Real Browser Job Application Bot/
├── data/
│   ├── json/
│   │   ├── user_data.json          # User application data
│   │   ├── global_elite_jobs.json  # Scraped job postings
│   │   └── job_application_tracker.json # Application status tracker
│   └── resumes/
│       └── resume.pdf              # Resume file
├── src/
│   ├── core/
│   │   └── JobApplicationBot.ts    # Main bot logic
│   ├── services/
│   │   ├── CaptchaService.ts       # Captcha handling
│   │   ├── FormService.ts          # Form filling
│   │   ├── SubmissionService.ts    # Form submission
│   │   ├── JobScrapingService.ts   # Job scraping
│   │   └── JobApplicationManager.ts # Batch application management
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   ├── constants/
│   │   └── index.ts                # Application constants
│   ├── utils/
│   │   ├── index.ts                # Utility functions
│   │   ├── proxy.ts                # Proxy management
│   │   └── userData.ts             # User data loading
│   ├── config.ts                   # Configuration
│   ├── index.ts                    # Main application entry
│   ├── scrapeJobs.ts               # Job scraping script
│   └── autoApply.ts                # Batch application script
└── package.json
```

## ⚙️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure User Data

Edit `data/json/user_data.json` with your information:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "phone": "+1-555-123-4567",
    "location": "Your City, State",
    "company": "Your Company"
  },
  "links": {
    "linkedin": "https://linkedin.com/in/yourprofile",
    "twitter": "https://x.com/yourhandle",
    "github": "https://github.com/yourusername",
    "portfolio": "https://yourportfolio.com",
    "globalElite": ""
  },
  "qualifications": {
    "age18Plus": "Yes",
    "authorizedToWork": "Yes",
    "usState": "Your State"
  },
  "additionalInfo": {
    "coverLetter": "Your cover letter text..."
  },
  "files": {
    "resumePath": "./data/resumes/resume.pdf"
  }
}
```

### 3. Add Your Resume

Place your resume PDF file in `data/resumes/resume.pdf`

### 4. Configure Environment Variables

Create a `.env` file:

```env
# Solvecaptcha API Key
SOLVECAPTCHA_API_KEY=your_api_key_here

# Proxy Configuration (Optional)
# Single proxy
PROXY_HOST=proxy.example.com
PROXY_PORT=8080
PROXY_USERNAME=username
PROXY_PASSWORD=password

# Or multiple proxies (comma-separated)
PROXY_LIST=proxy1.example.com:8080:user1:pass1,proxy2.example.com:8080:user2:pass2
```

### 5. Update Configuration

Edit `src/config.ts` to set your Solvecaptcha API key and other settings.

## 🎯 Usage

### Single Job Application

```bash
npm start
```

### Job Scraping

Scrape job postings from Lever:

```bash
npm run scrape-jobs
```

This will:
- Scrape jobs from `https://jobs.lever.co/global-elite`
- Save job data to `data/json/global_elite_jobs.json`
- Extract job titles, locations, URLs, and other details

### Batch Job Applications

Apply to multiple jobs with status tracking:

```bash
# Start new application process
npm run auto-apply

# Resume interrupted process
npm run auto-apply-resume

# Check current status
npm run auto-apply-status
```

The batch application system:
- Loads jobs from `data/json/global_elite_jobs.json`
- Automatically adds `/apply` to job URLs
- Tracks progress in `data/json/job_application_tracker.json`
- Supports proxy rotation to avoid IP bans
- Provides detailed status reporting

## 🔧 Configuration

### Browser Settings

Modify `src/config.ts` to adjust browser behavior:

```typescript
BROWSER_CONFIG: {
  headless: false,        // Set to true for headless mode
  args: [],              // Additional browser arguments
  customConfig: {},      // Custom browser configuration
  turnstile: true,       // Enable Turnstile support
  connectOption: {},     // Connection options
  disableXvfb: false,    // Disable Xvfb
  ignoreAllFlags: false, // Ignore browser flags
}
```

### Timing Configuration

Adjust timing settings for different scenarios:

```typescript
TIMING: {
  pageLoadWait: 3000,              // Wait after page load
  locationDropdownWait: 2000,      // Wait for dropdowns
  resumeProcessingWait: 3000,      // Wait for resume upload
  submissionWait: 5000,            // Wait after submission
  captchaCheckInterval: 5000,      // Captcha check frequency
  maxCaptchaAttempts: 60,          // Max captcha attempts
  captchaAppearanceTimeout: 10000, // Wait for captcha to appear
  captchaProcessingWait: 2000,     // Wait after solving captcha
}
```

## 🛠️ Services

### CaptchaService

Handles different captcha types:
- **hCaptcha**: Detects and solves hCaptcha challenges
- **reCAPTCHA**: Supports reCAPTCHA v2 and v3
- **Turnstile**: Handles Cloudflare Turnstile

### FormService

Fills application forms with:
- Personal information
- Contact details
- Links (LinkedIn, GitHub, etc.)
- Qualifications
- Cover letter
- Resume upload

### SubmissionService

Manages form submission:
- Detects submit buttons
- Handles captcha submission
- Monitors submission completion
- Validates success indicators

### JobScrapingService

Scrapes job postings:
- Extracts job details from Lever pages
- Handles pagination
- Saves structured data to JSON

### JobApplicationManager

Manages batch applications:
- Loads job data from JSON
- Tracks application status
- Handles retry logic
- Provides progress reporting
- Supports proxy rotation

## 📊 Status Tracking

The application tracker provides detailed status information:

```json
{
  "startedAt": "2024-01-01T00:00:00.000Z",
  "totalJobs": 100,
  "appliedJobs": 50,
  "successfulJobs": 45,
  "failedJobs": 3,
  "skippedJobs": 2,
  "currentJobIndex": 50,
  "isComplete": false,
  "jobs": [...]
}
```

## 🔒 Proxy Support

The bot supports both single and multiple proxy configurations:

### Single Proxy
```env
PROXY_HOST=proxy.example.com
PROXY_PORT=8080
PROXY_USERNAME=username
PROXY_PASSWORD=password
```

### Multiple Proxies
```env
PROXY_LIST=proxy1.example.com:8080:user1:pass1,proxy2.example.com:8080:user2:pass2
```

Proxies are rotated per job application to avoid IP bans.

## 🐛 Troubleshooting

### Common Issues

1. **Captcha Not Detected**: Check Solvecaptcha API key and balance
2. **Resume Upload Fails**: Ensure resume file exists and is accessible
3. **Form Fields Not Found**: Update selectors in constants
4. **Proxy Connection Issues**: Verify proxy credentials and connectivity

### Debug Mode

Enable debug logging by modifying the log level in `src/utils/index.ts`.

## 📝 License

This project is for educational purposes. Please use responsibly and in accordance with website terms of service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## ⚠️ Disclaimer

This tool is for educational and personal use only. Users are responsible for complying with website terms of service and applicable laws. Use at your own risk.