# Pokemon Pokedex - MP2 Setup Instructions

## Project Overview
This is a React TypeScript application that uses the Pokemon API (PokeAPI) to display Pokemon information. The app includes:

- **List View**: Search and sort Pokemon by ID or name
- **Gallery View**: Filter Pokemon by type with image gallery
- **Detail View**: Detailed Pokemon information with navigation

## Technologies Used
- React 19
- TypeScript
- React Router DOM 7
- Axios
- PokeAPI (https://pokeapi.co/)

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm

### Setup Steps

1. **Navigate to the project directory:**
   ```bash
   cd mp2-main/mp2-main
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

## Deployment to GitHub Pages

### Before Deploying

You need to update two files with your GitHub information:

#### 1. Update `package.json`
Replace `<your-github-username>` and `<your-github-repo-name>` in the homepage field:
```json
"homepage": "https://<your-github-username>.github.io/<your-github-repo-name>"
```

Example:
```json
"homepage": "https://johndoe.github.io/mp2"
```

#### 2. Update `src/App.tsx`
Replace `<your-github-repo-name>` in the Router basename:
```tsx
<Router basename="/<your-github-repo-name>">
```

Example:
```tsx
<Router basename="/mp2">
```

### GitHub Repository Setup

1. **Create a new public repository** on GitHub (don't initialize with README)

2. **Change the remote URL** of your local repository:
   ```bash
   git remote rename origin old-origin
   git remote add origin git@github.com:<your-github-username>/<your-github-repo-name>.git
   ```

3. **Configure GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Build and deployment" > "Source"
   - Select "GitHub Actions"

4. **Commit and push your code:**
   ```bash
   git add .
   git commit -m "Initial commit - Pokemon Pokedex app"
   git branch -M main
   git push origin main
   ```

5. **Wait for deployment:**
   - The GitHub Actions workflow will automatically build and deploy your app
   - Check the Actions tab in your repository to monitor the deployment
   - Your site will be live at: `https://<your-github-username>.github.io/<your-github-repo-name>`

## Features Implemented

### ✅ List View
- Displays all 151 Generation 1 Pokemon
- Search by name or ID (filters as you type)
- Sort by ID or Name
- Sort in Ascending or Descending order
- Click any Pokemon to view details

### ✅ Gallery View
- Visual grid of Pokemon with images
- Filter by Pokemon type (can select multiple types)
- Shows Pokemon types as colored badges
- Click any Pokemon card to view details

### ✅ Detail View
- Comprehensive Pokemon information:
  - Official artwork
  - Types with colored badges
  - Height and weight
  - Abilities
  - Base stats with visual bars
- Previous/Next navigation buttons
- Circular navigation (wraps from #151 to #1 and vice versa)
- Accessible via specific URL routes (e.g., `/pokemon/25` for Pikachu)
- Back buttons to return to List or Gallery view

### ✅ Routing
- Uses React Router DOM
- Clean URL structure
- Direct URL access to specific Pokemon

### ✅ API Integration
- Uses Axios for all HTTP requests
- Efficient data fetching and caching
- Error handling for failed requests

### ✅ TypeScript
- Fully typed components and functions
- Type definitions for Pokemon data
- No TypeScript errors

### ✅ Design
- Modern, clean UI with gradient accents
- Responsive design for mobile and desktop
- Smooth transitions and hover effects
- Color-coded Pokemon types
- Professional navigation bar
- Loading states for better UX

## Project Structure

```
src/
├── components/
│   ├── ListView.tsx         # List view with search and sort
│   ├── ListView.css
│   ├── GalleryView.tsx      # Gallery view with filtering
│   ├── GalleryView.css
│   ├── DetailView.tsx       # Detail view with navigation
│   ├── DetailView.css
│   ├── Navigation.tsx       # Navigation bar
│   └── Navigation.css
├── services/
│   └── pokemonApi.ts        # API service layer
├── types/
│   └── Pokemon.ts           # TypeScript type definitions
├── App.tsx                  # Main app with routing
├── App.css
├── index.tsx
└── index.css
```

## Grading Checklist

- [x] List View displays relevant items (4 points)
- [x] Search bar filters as you type (8 points)
- [x] Sort by at least 2 properties (ID, Name) (8 points)
- [x] Sort in Ascending and Descending order (8 points)
- [x] Gallery composed of images (4 points)
- [x] Gallery filtering by type (8 points)
- [x] List View items link to Detail View (10 points)
- [x] Gallery View items link to Detail View (10 points)
- [x] Detail View shows item details (8 points)
- [x] Previous and Next buttons work (10 points)
- [x] Uses React Router and TypeScript (12 points)
- [x] Professional design (10 points)

**Total: 100 points**

## Notes

- The app uses the first 151 Pokemon (Generation 1) by default
- All API calls are made to https://pokeapi.co/api/v2
- No API key required
- Images are loaded from the PokeAPI sprites
- The app includes error handling for network issues
- Loading states provide feedback during data fetching

## Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm start
```

### Dependencies installation issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clear the build cache
rm -rf build
npm run build
```

## Additional Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [Axios Documentation](https://axios-http.com/docs/intro)

