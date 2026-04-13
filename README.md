# Dragon Rider Academy

A WDD330-style vanilla JavaScript final project.

## Concepts from WDD330 used in this app

- ES modules split into multiple files
- `fetch()` with async/await
- JSON processing from third-party APIs
- Event listeners for buttons, form submission, theme changes, and delete actions
- `localStorage` for saving squads and theme preference
- DOM updates based on application state
- CSS transitions and responsive layout
- Error handling with fallback data

## APIs used

- D&D 5e API for dragon data
- Random User Generator for rider data

## Run locally

```bash
npm install
npm run start
```

## Suggested evidence for your WDD330 documents

### JavaScript
- `src/js/main.js` controls application state, event handling, and pair generation.

### Third-party APIs / JSON
- `src/js/api.js` fetches dragon and rider data and converts JSON responses.

### Events
- Buttons and form submission trigger generation, saving, deleting, and theme toggling.

### CSS
- `src/styles/styles.css` includes transitions, hover states, focus states, and responsive layout.

### Local Storage
- `src/js/storage.js` stores saved squads and theme preference.
