# GenVision — AI Image Generator

GenVision is a full-stack AI image generation and sharing platform where users can turn their ideas into images using AI. Users can enter a text prompt, generate an image, preview it, download it, and share their creations with the community.

The project is built using the MERN stack with the Hugging Face Inference API for AI-powered image generation and Cloudinary for image storage.

## Features

* AI Image Generation — Generate images from natural-language prompts.
* Community Showcase — Browse images generated and shared by users.
* Search Images — Search the community gallery using prompts or creator names.
* Download Images — Download generated images directly.
* Cloud Image Storage — Store shared images using Cloudinary.
* MongoDB Database — Store generated posts and image information.
* Fast Development — Vite-powered React frontend with HMR.
* Responsive UI — Designed to work across different screen sizes.

## Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Tailwind CSS
* JavaScript (ES6+)
* FileSaver.js

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Cloudinary
* dotenv
* CORS

### AI

* Hugging Face Inference API
* FLUX.1-dev — AI image generation model

## Project Structure

```text
GenVision/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── constants/
│       ├── pages/
│       ├── utils/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── server/
│   ├── mongodb/
│   │   ├── connect.js
│   │   └── models/
│   │       └── post.js
│   │
│   ├── routes/
│   │   ├── dalleRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## How GenVision Works

```text
User
  |
  v
React + Vite Frontend
  |
  | Prompt
  v
Express.js API
  |
  v
Hugging Face Inference API
  |
  v
AI Generated Image
  |
  +--------------> Download
  |
  v
Cloudinary
  |
  v
MongoDB
  |
  v
Community Showcase
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shreya-pandey03/GenVision.git
cd GenVision
```

### 2. Setup the Client

```bash
cd client
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:8000
```

### 3. Setup the Server

Open another terminal:

```bash
cd server
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:8080
```

## Environment Variables

Create a `.env` file inside the `server` directory:

```env
MONGODB_URL=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

HF_TOKEN=your_huggingface_token
```

Never commit your `.env` file or API keys to GitHub.

## API Endpoints

### Generate Image

```http
POST /api/v1/dalle
```

Request:

```json
{
  "prompt": "A futuristic city with flying cars"
}
```

### Get Community Posts

```http
GET /api/v1/post
```

### Create a Post

```http
POST /api/v1/post
```

Request:

```json
{
  "name": "Your Name",
  "prompt": "A futuristic city",
  "photo": "base64-image"
}
```

## Future Improvements

* User authentication
* Like and favorite images
* User profiles
* Comments
* User image-generation history
* Trending images
* Multiple AI models
* Dark mode
* Production deployment

## Author

**Shreya Pandey**

GenVision is a full-stack project built to explore AI integration, MERN architecture, REST APIs, cloud image storage, and modern React development.
