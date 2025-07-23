# Modern Project Structure

This document outlines the new modular architecture of the Job Application Automation Bot.

## 📁 Directory Structure

```
src/
├── core/                    # Core application logic
│   └── JobApplicationBot.ts # Main bot orchestrator
├── services/               # Business logic services
│   ├── CaptchaService.ts   # Captcha handling logic
│   ├── FormService.ts      # Form filling logic
│   ├── SubmissionService.ts # Form submission logic
│   └── index.ts           # Service exports
├── types/                  # TypeScript type definitions
│   └── index.ts           # All type definitions
├── constants/              # Application constants
│   └── index.ts           # All constants and selectors
├── utils/                  # Utility functions
│   └── index.ts           # Common utility functions
├── config.ts              # Application configuration
└── index.ts               # Main entry point
```

## 🏗️ Architecture Overview

### **Core Layer** (`src/core/`)
- **JobApplicationBot**: Main orchestrator that coordinates all services
- Handles browser initialization, navigation, and overall flow control
- Provides high-level API for running the complete automation

### **Services Layer** (`src/services/`)
- **CaptchaService**: Handles all captcha-related operations
  - Detection of different captcha types (hCaptcha, reCAPTCHA, Turnstile)
  - API integration with Solvecaptcha
  - Solution injection into forms
  
- **FormService**: Manages form filling operations
  - Personal information, links, qualifications
  - Resume upload handling
  - Form validation and error handling
  
- **SubmissionService**: Handles form submission process
  - Submit button detection and interaction
  - Captcha submission flow
  - Success/error detection

### **Types Layer** (`src/types/`)
- **TypeScript interfaces** for all data structures
- **Type safety** across the entire application
- **API response types** for external services

### **Constants Layer** (`src/constants/`)
- **Form selectors** for different field types
- **Captcha selectors** and methods
- **API endpoints** and configuration
- **Error codes** and timing values

### **Utils Layer** (`src/utils/`)
- **Common utility functions** for DOM manipulation
- **Error handling** and logging utilities
- **File operations** and validation helpers
- **Retry logic** with exponential backoff

## 🔄 Data Flow

```
1. Main Entry Point (index.ts)
   ↓
2. JobApplicationBot (core/JobApplicationBot.ts)
   ↓
3. Services Layer:
   ├── FormService (fill form)
   ├── CaptchaService (handle captcha)
   └── SubmissionService (submit form)
   ↓
4. Utils Layer (common operations)
   ↓
5. Constants & Types (configuration & type safety)
```

## 🎯 Key Benefits

### **Separation of Concerns**
- Each service has a single responsibility
- Easy to test individual components
- Clear boundaries between different functionalities

### **Maintainability**
- Modular structure makes it easy to modify specific features
- Type safety reduces runtime errors
- Consistent error handling across the application

### **Extensibility**
- Easy to add new captcha types
- Simple to support different form structures
- Plug-and-play service architecture

### **Testability**
- Services can be unit tested independently
- Mock dependencies easily
- Clear interfaces for testing

## 🚀 Usage Examples

### **Basic Usage**
```typescript
import { JobApplicationBot } from './core/JobApplicationBot';
import { CONFIG } from './config';

const bot = new JobApplicationBot(CONFIG);
const result = await bot.run();
```

### **Service-Specific Usage**
```typescript
import { CaptchaService, FormService } from './services';
import { CONFIG } from './config';

const captchaService = new CaptchaService(CONFIG.captchaApiKey);
const formService = new FormService(page, CONFIG.APPLICATION_DATA);
```

### **Custom Configuration**
```typescript
import { AppConfig } from './types';

const customConfig: AppConfig = {
  // ... your custom configuration
};
```

## 🔧 Configuration

The application uses a centralized configuration system:

- **Application Data**: Personal information, links, qualifications
- **Browser Settings**: Headless mode, arguments, custom config
- **Timing Configuration**: Wait times, timeouts, intervals
- **API Configuration**: Captcha service API keys

## 🛠️ Development

### **Adding New Features**
1. Define types in `src/types/`
2. Add constants in `src/constants/`
3. Create service methods in appropriate service
4. Update the main bot orchestrator if needed

### **Adding New Captcha Types**
1. Add captcha type to `CaptchaType` union
2. Add selectors to `CAPTCHA_SELECTORS`
3. Add method to `CAPTCHA_METHODS`
4. Implement solving logic in `CaptchaService`

### **Adding New Form Fields**
1. Add field to `ApplicationData` interface
2. Add selector to `FORM_SELECTORS`
3. Implement filling logic in `FormService`

## 📊 Error Handling

The application uses a consistent error handling pattern:

- **Error Codes**: Centralized error codes in constants
- **Error Types**: Typed error objects with details
- **Logging**: Structured logging with timestamps and emojis
- **Retry Logic**: Exponential backoff for transient failures

## 🔍 Monitoring & Logging

- **Structured Logging**: Timestamped logs with emoji indicators
- **Success/Error Tracking**: Clear indicators for automation results
- **Screenshot Capability**: Debug screenshots when needed
- **Process Monitoring**: Graceful shutdown handling

This modern structure provides a solid foundation for scaling and maintaining the automation bot while keeping it easy to understand and modify. 