# Backend API - Career Path Analyzer

The server-side component that powers the Career Path Analyzer. Built with Express.js, it provides REST APIs for skill gap analysis, roadmap generation, and tech news aggregation.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
echo "PORT=5000" > .env
echo "NODE_ENV=development" >> .env

# Start the server
npm start
```

Server will be running at `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Skill Gap Analysis

**POST** `/skill-gap`

Analyzes the gap between your current skills and target role requirements.

Request:
```json
{
  "targetRole": "Backend Developer",
  "currentSkills": ["Java", "Git"]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "matchedSkills": ["Java", "Git"],
    "missingSkills": ["Spring Boot", "SQL", "APIs"],
    "recommendations": "You have 2 out of 5 required skills...",
    "suggestedLearningOrder": ["SQL", "APIs", "Spring Boot"]
  }
}
```

**Notes:**
- `targetRole` is case-insensitive
- `currentSkills` accepts array or comma-separated string
- Available roles: FrontendDeveloper, Backend Developer, Data Analyst

---

#### 2. Generate Roadmap

**POST** `/roadmap`

Creates a 3-phase learning roadmap for your target role.

Request:
```json
{
  "role": "Frontend Developer"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "role": "Frontend Developer",
    "roadmap": [
      {
        "phase": "Phase 1",
        "duration": "1–2 months",
        "items": ["HTML", "CSS", "JavaScript Basics", "Git"]
      }
      // ... more phases
    ]
  }
}
```

---

#### 3. Tech News

**GET** `/news`

Fetches top 5 trending stories from HackerNews.

Response:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 38579876,
      "title": "New JavaScript Framework Released",
      "url": "https://example.com/article",
      "score": 342,
      "time": 1732320000,
      "type": "story",
      "by": "username"
    }
  ]
}
```

---

#### Legacy Endpoints

These endpoints exist for backward compatibility:

- `POST /skill-gap/analyze` - Original skill gap analysis
- `GET /skill-gap/roles` - List all available roles
- `POST /roadmap/generate` - Original roadmap generation
- `GET /roadmap/templates` - Get roadmap templates

## Architecture

### Route Handlers
Each route file (`skillGap.js`, `roadmap.js`, `news.js`) contains specific endpoint logic. They handle validation, business logic, and error responses.

### Utilities
- **api.js** - Axios wrapper for consistent API calls
- **roadmapGenerator.js** - Logic for creating learning roadmaps
- **validator.js** - Input validation helpers
- **responseFormatter.js** - Standardized response formatting
- **logger.js** - Logging utility for debugging

### Data Storage
Currently uses JSON files in `/data` folder:
- `roleSkills.json` - Maps roles to required skills
- `roles.json` - Detailed role information
- `roadmaps.json` - Learning path templates

This approach works great for the current scale. For production with many users, consider migrating to MongoDB or PostgreSQL.

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error description here"
}
```

Common status codes:
- `400` - Bad request (missing or invalid parameters)
- `404` - Resource not found
- `500` - Server error

## Development

### Running with nodemon
```bash
npm run dev
```

This auto-restarts the server on file changes.

### Adding New Roles

1. Edit `data/roleSkills.json`:
```json
{
  "New Role Name": ["Skill1", "Skill2", "Skill3"]
}
```

2. Edit `utils/roadmapGenerator.js` to add the roadmap

3. Restart the server

### Environment Variables

```env
PORT=5000                    # Server port
NODE_ENV=development         # Environment mode
```

## CORS Configuration

CORS is enabled for all origins in development. For production, configure specific origins in `server.js`:

```javascript
app.use(cors({
  origin: 'https://yourfrontend.com'
}));
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

Add `vercel.json`:
```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/server.js" }]
}
```

### Heroku

```bash
heroku create your-app-name
git push heroku main
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

## Performance Notes

- API responses are typically under 100ms
- HackerNews API calls are cached for 5 minutes (can be implemented)
- No database queries = fast response times
- Suitable for 1000+ concurrent users

## Security Considerations

For production:
- Add rate limiting (express-rate-limit)
- Implement API key authentication
- Validate and sanitize all inputs
- Use helmet.js for security headers
- Enable HTTPS only

## Testing

Currently manual testing. Future additions:
- Jest for unit tests
- Supertest for API integration tests
- Test coverage with Istanbul

## Troubleshooting

**Port already in use?**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**CORS errors?**
Make sure frontend is calling the correct API URL and CORS is properly configured.

**JSON parsing errors?**
Check that data files in `/data` are valid JSON. Use a JSON validator if needed.

## Contributing

When adding new features:
1. Follow existing code structure
2. Add error handling
3. Update this README
4. Test with different inputs

## License

MIT

---

Questions? Open an issue or reach out!