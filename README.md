# Amelia API Dashboard Frontend
A lightweight, schema-driven dashboard built with React and Vite. This frontend is designed to interact with RESTful APIs dynamically. Instead of hard-coding every UI element, it uses a configuration-first architecture, allowing you to add new API endpoints simply by updating a single configuration file.

## Key Features
- Schema-Driven UI: Forms and tables are generated automatically based on API configurations.
- Accordion-Style Interaction: Swagger-inspired layout to manage multiple API endpoints in a clean, collapsible interface.
- Config-First Architecture: New APIs can be added via apiConfig.js without touching component code.
- Utility-Ready: Includes helper utilities for payload transformation (e.g., camelCase to snake_case) and easy clipboard access.

## Getting Started
### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Install dependencies:
``` Bash
npm install
```

### Running the App
Start the development server:
``` Bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## Architecture Overview
This project prioritizes decoupling. Business logic (API config) is separated from presentation logic (UI components).

```Plaintext
src/
├── components/          # Reusable UI building blocks
│   ├── ApiSection.jsx   # Accordion container for endpoints
│   ├── DynamicForm.jsx  # Auto-generated forms
│   ├── DynamicTable.jsx # Auto-generated data grids
│   └── CopyJsonButton.jsx
├── utils.js             # Pure helper functions (transformation logic)
├── apiConfig.js         # The "Source of Truth" for your API endpoints
└── App.jsx              # Application orchestration
```
## Adding a New API
To add a new endpoint, open src/apiConfig.js and add an entry to the API_CONFIG object:

``` JavaScript
myNewApi: {
  label: "My API Name",
  endpoint: '/api/v1/resource',
  description: 'What this endpoint does',
  fields: ['field1', 'field2'],
  method: 'POST'
}
```
## Contributing
Please ensure any new API additions are defined in `apiConfig.js` and follow the existing component patterns.