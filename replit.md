# GalaxyV6

## Overview
GalaxyV6 is a web-based application that provides a desktop-like interface with browser proxy functionality. It's built with Fastify for the backend and serves static HTML/CSS/JS files.

## Project Structure
- `src/index.js` - Main Fastify server entry point
- `public/` - Static frontend files (HTML, CSS, JS)
  - `index.html` - Main landing page
  - `assets/` - Styles, scripts, and images
  - `glass/`, `kirk/`, `scram/` - Proxy worker files

## Technology Stack
- **Runtime**: Node.js 20
- **Backend**: Fastify with static file serving
- **Package Manager**: npm
- **Port**: 5000 (0.0.0.0)

## Configuration
- Server binds to `0.0.0.0:5000`
- Uses environment variables from `.env` file (optional)
- `trustProxy: true` is enabled for proper request handling

## Running the Application
```bash
npm install
npm start
```

## Recent Changes
- 2026-01-29: Initial Replit setup, changed default port from 4040 to 5000
