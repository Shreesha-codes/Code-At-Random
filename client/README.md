# Frontend - Career Path Analyzer

A React-based single-page application with a stunning animated solar system theme. Users can analyze their skill gaps, get personalized learning roadmaps, and stay updated with tech news - all in a beautiful, space-themed interface.

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Backend API running on port 5000

### Installation

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

App opens at `http://localhost:3000`

### Environment Setup

Create a `.env` file in the client folder:
```env
VITE_API_URL=http://localhost:5000/api
```

## User Flow

### 1. Landing Page (CareerInput)
- Enter your target role (e.g., "Backend Developer")
- List your current skills (comma-separated)
- Click "Analyze My Career Path"
- System validates input and calls both skill gap and roadmap APIs
- Results saved to localStorage
- Redirects to Dashboard

### 2. Dashboard
- Left column: Skill Gap Analysis
  - Matched skills (what you already have)
  - Missing skills (what you need to learn)
  - Personalized recommendations
  - Suggested learning order
  
- Right column: Learning Roadmap
  - 3-phase structured plan
  - Duration estimates
  - Skills for each phase
  
- Bottom section: Tech News
  - Top 5 trending stories from HackerNews
  - Direct links to articles
  - Score, author, and timestamp

## Features

### Animated Solar System Theme
The UI isn't your typical corporate dashboard. It's designed to make career planning feel like an adventure:

- **Starfield Background** - Twinkling stars that move across the screen
- **Floating Planets** - 4 animated planets that orbit and glow
- **Glassmorphism Cards** - Frosted glass effect with backdrop blur
- **Smooth Animations** - Everything floats, fades, and scales beautifully
- **Gradient Text** - Color-shifting headlines
- **Hover Effects** - Cards react to your cursor

### Responsive Design
Works perfectly on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Project Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── CareerInput.jsx      # Landing/input page
│   │   └── Dashboard.jsx        # Results dashboard
│   │
│   ├── components/
│   │   ├── SkillGapResult.jsx   # Displays skill analysis
│   │   ├── RoadmapResult.jsx    # Shows learning roadmap
│   │   └── NewsList.jsx         # Tech news cards
│   │
│   ├── services/
│   │   └── api.js               # Axios API wrapper
│   │
│   ├── styles/
│   │   ├── CareerInput.css
│   │   ├── Dashboard.css
│   │   ├── SkillGapResult.css
│   │   ├── RoadmapResult.css
│   │   └── NewsList.css
│   │
│   ├── App.jsx                  # Main app with routing
│   └── main.jsx                 # React entry point
│
├── index.html
├── vite.config.js
└── package.json
```

## Component Breakdown

### CareerInput
The entry point where users input their data.

**State:**
- `formData` - Holds targetRole and currentSkills
- `loading` - Shows spinner during API calls
- `error` - Displays validation/API errors

**Logic:**
- Validates required fields
- Converts comma-separated skills to array
- Calls two APIs simultaneously using Promise.all
- Saves results to localStorage
- Navigates to dashboard on success

### Dashboard
Main results page with three sections.

**Data Sources:**
- localStorage for skill gap and roadmap data
- API call to fetch live news

**Features:**
- Redirects to home if no data found
- "Start Over" button to clear data and restart
- Auto-fetches news on mount

### SkillGapResult
Shows matched and missing skills.

**Visual Elements:**
- Green badges for matched skills
- Red badges for missing skills
- Recommendation box with guidance
- Numbered list for learning order

### RoadmapResult
Displays 3-phase learning plan.

**Card Design:**
- Gradient background (purple to blue)
- Phase title and duration in header
- Bullet list of skills
- Glowing animation effect

### NewsList
Grid of tech news articles.

**Features:**
- Clickable article titles
- Displays score, author, type
- Formatted timestamps
- Staggered fade-in animation
- Loading and error states

## Styling Approach

### Why Custom CSS?
I went with vanilla CSS instead of Tailwind or Material-UI because:
- Full control over animations
- Smaller bundle size
- No learning curve for contributors
- Easy to customize theme

### Animation Details

**Stars:**
```css
animation: twinkle 3s ease-in-out infinite;
```

**Planets:**
```css
animation: float 20s ease-in-out infinite, 
           spin 30s linear infinite;
```

**Cards:**
```css
animation: cardFloat 6s ease-in-out infinite;
```

**News Items:**
```css
animation: newsAppear 0.6s ease-out forwards;
/* Staggered with nth-child delays */
```

### Color Palette
- Primary: `#667eea` (Purple-blue)
- Secondary: `#764ba2` (Deep purple)
- Success: `#48bb78` (Green)
- Warning: `#ed8936` (Orange)
- Background: `#0c0d13` (Dark space)

## API Integration

All API calls go through `src/services/api.js`:

```javascript
// Analyze skills
const result = await analyzeSkillGap({
  targetRole: "Frontend Developer",
  currentSkills: ["HTML", "CSS"]
});

// Generate roadmap
const roadmap = await generateRoadmap({
  role: "Backend Developer"
});

// Fetch news
const news = await getNews();
```

Error handling is built-in. Failed requests show user-friendly messages.

## State Management

Using React's built-in useState and useEffect. No Redux needed because:
- Small app with limited shared state
- localStorage handles persistence
- Most data is fetched once and displayed

If the app grows, consider Context API or Zustand.

## Performance Optimizations

- Vite for instant HMR during development
- Lazy loading for routes (can be added)
- CSS animations use GPU acceleration
- Images/assets minimized
- Production build is under 500KB

## Building for Production

```bash
# Create optimized build
npm run build

# Preview build locally
npm run preview
```

Output goes to `dist/` folder.

## Deployment Options

### Vercel (Easiest)
```bash
npm i -g vercel
vercel
```

### Netlify
1. Connect your GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`

### Manual Deploy
Upload contents of `dist/` folder to any static hosting:
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting
- Surge

## Environment Variables

Vite uses `VITE_` prefix for client-side env vars:

```env
VITE_API_URL=http://localhost:5000/api
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Customization Guide

### Changing Theme Colors
Edit CSS files and search for:
- `#667eea` - Primary purple
- `#764ba2` - Secondary purple
- Update gradient values

### Adding New Planets
In `CareerInput.css`, add:
```css
.planet-5 {
  width: 70px;
  height: 70px;
  background: radial-gradient(circle at 30% 30%, #color1, #color2);
  top: 40%;
  left: 50%;
  animation: float 25s ease-in-out infinite;
}
```

Then add `<div className="planet planet-5"></div>` in CareerInput.jsx

### Modifying Animations
All animations are in respective CSS files. Common properties:
- `animation-duration` - How long the animation takes
- `animation-delay` - When to start
- `animation-timing-function` - Easing (ease, linear, etc.)

## Browser Support

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Older browsers may not support backdrop-filter and some CSS animations.

## Accessibility

Current features:
- Semantic HTML tags
- Form labels properly connected
- Keyboard navigation works
- Focus states visible

Future improvements:
- ARIA labels for complex components
- Screen reader testing
- High contrast mode
- Reduced motion option

## Common Issues

**API calls failing?**
- Check if backend is running on port 5000
- Verify VITE_API_URL in .env
- Look for CORS errors in console

**Animations laggy?**
- Check if hardware acceleration is enabled in browser
- Reduce animation complexity on slower devices

**LocalStorage data persists?**
- Use "Start Over" button
- Or clear manually: `localStorage.clear()` in console

## Development Tips

### Hot Reload
Vite's HMR is instant. Just save and see changes.

### Inspecting State
React DevTools extension is your friend. Install it for Chrome or Firefox.

### Debugging API Calls
Network tab shows all requests. Check:
- Request payload
- Response data
- Status codes

### CSS Debugging
Use browser DevTools to:
- Inspect element styles
- Modify animations live
- Test responsive breakpoints

## Future Enhancements

Ideas for v2:
- Dark/light mode toggle
- More role options
- Save multiple career paths
- Share results via link
- Export roadmap as PDF
- Integration with learning platforms
- Progress tracking
- Community features

## Contributing

Want to add a feature or fix a bug?

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a PR

Keep the space theme intact - it's what makes this app special!

## Performance Metrics

Current build stats:
- Initial load: ~200KB
- Time to interactive: <2s
- Lighthouse score: 90+

## License

MIT - Build something cool with it!

---

Built with React, Vite, and lots of coffee. May your career journey be as smooth as these animations! 🚀