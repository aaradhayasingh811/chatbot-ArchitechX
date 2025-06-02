# ArchitechX Vastu Consultant Chatbot Module

This repository contains the **Vastu Consultant Chatbot** module, a backend service for the ArchitechX platform. It leverages Google Gemini AI to provide expert Vastu Shastra consultations via a REST API.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage Example](#usage-example)
- [Development](#development)
- [Docker Support](#docker-support)
- [License](#license)
- [Author](#author)

---

## Overview

The Vastu Consultant Chatbot module is designed to deliver detailed, actionable Vastu advice using generative AI. It is intended to be integrated as a microservice within the ArchitechX ecosystem, providing users with culturally sensitive and professional guidance based on traditional Vastu principles.

---

## Features

- **AI-powered Vastu Consultation:** Uses Google Gemini AI for natural language understanding and response generation.
- **REST API:** Simple endpoints for chat and health/test.
- **Customizable Prompt:** Ensures responses are expert, actionable, and culturally appropriate.
- **Dockerized:** Easily deployable as a container.
- **Environment-based Configuration:** Secure API key and port management.

---

## Architecture

- **Express.js** server for handling HTTP requests.
- **Google Gemini AI** for generating Vastu advice.
- **Docker** for containerization and deployment.
- **Environment Variables** for configuration.

---

## Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd chatbot
   ```

2. **Install dependencies:**
```sh
npm install
```

3. **Configure environment variables:**

* Copy .env.example to .env (if provided) or create a .env file:

```sh
PORT=3006
GEMINI_API_KEY=your_google_gemini_api_key
```

4. **Run the server:**

```sh
npm run dev
```

---

### Environment Variables

* PORT: Port on which the server runs (default: 3006).

* GEMINI_API_KEY: Your Google Gemini API key.

### API Endpoints

##### POST /api/chat

* **Description**: Get Vastu consultation based on user message and chat history.
* **Request Body**:

```sh

{
  "message": "Where should I place my kitchen?",
  "chatHistory": [
    { "role": "user", "content": "I am building a new house." }
  ]
}

```

* **Response:**

```sh
{
  "reply": "Analysis of the situation...\nVastu principles involved...\nRecommended solutions..."
}
```

### Usage Example

##### Request:

``` bash

curl -X POST http://localhost:3006/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Where should I place my kitchen?","chatHistory":[]}'

```

##### Response:

```sh
{
  "reply": "Analysis of the situation...\nVastu principles involved...\nRecommended solutions..."
}
```

### Development

* Start in development mode:
```sh
npm run dev
```

* Start in production mode:
```sh
node app.js
```

---

### Docker Support


* Build the Docker image:

```sh
docker build -t vastu-backend .
```

* Run with Docker Compose:

```sh
docker-compose up
```

---

##### License

**ISC**

---

##### Author

**Aaradhaya Singh**

---

##### Part of ArchitechX

- This module is a component of the **ArchitechX** platform, designed to enhance architectural planning with AI-powered Vastu consultation.


