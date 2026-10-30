# Experiment: Centralized State Management Using Redux Toolkit

## Aim
To design and implement a centralized state management system using Redux Toolkit for managing posts and platform-related data.

## Objectives
1. Configure a central Redux store.
2. Create separate slices for post data and platform settings.
3. Use Redux actions and reducers to add, edit, delete, and like posts.
4. Use React Redux hooks to read and update shared state.
5. Manage platform theme, notification preference, and category filter in the same store.

## Software Requirements
- Node.js (LTS recommended)
- npm
- Visual Studio Code or another code editor
- A modern browser

## Technologies
- React — component-based user interface
- Redux Toolkit — `configureStore`, `createSlice`, and `nanoid`
- React Redux — `Provider`, `useSelector`, and `useDispatch`
- Vite — local development server and build tool
- CSS — responsive styling

## Theory
Centralized state management stores shared application data in one Redux store rather than keeping separate copies inside individual components. Redux Toolkit simplifies Redux setup by providing `configureStore` and `createSlice`. A slice defines a section of state and the reducer logic that updates it. Components read state with `useSelector` and dispatch actions with `useDispatch`. Redux Toolkit uses Immer internally, so reducer code can use convenient update syntax while preserving immutable state updates.

This project has two slices:
- `postsSlice`: stores post records and handles add, update, delete, like, and clear actions.
- `platformSlice`: stores platform name, theme, notification preference, and active category.

## Procedure
1. Install Node.js and npm.
2. Extract the ZIP and open the project directory in a terminal.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` and open the local address printed by Vite.
5. Add a post using its title, content, and category.
6. Test Edit, Like, Delete, category filters, and search.
7. Change the theme and toggle notifications.
8. Observe that the interface updates when Redux actions are dispatched.
9. Run `npm run build` to check that the project builds successfully.

## Commands
```bash
npm install
npm run dev
npm run build
```

## Project Structure
```text
redux_toolkit_centralized_state_management/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── app/
    │   └── store.js
    └── features/
        ├── posts/
        │   └── postsSlice.js
        └── platform/
            └── platformSlice.js
```

## Test Cases
| No. | Action | Expected Result |
|---|---|---|
| 1 | Load the application | Sample posts and settings appear |
| 2 | Add a post | New post appears and total count increases |
| 3 | Edit a post | Title, content, and category update |
| 4 | Like a post | Like state and liked-post count update |
| 5 | Delete a post and confirm | Selected post is removed |
| 6 | Search for a keyword | Only matching posts appear |
| 7 | Select a category | List filters to that category |
| 8 | Toggle dark mode | Application theme changes |
| 9 | Toggle notifications | Notification status changes |
| 10 | Clear all posts and confirm | Post list becomes empty |

## Result
A centralized state management system was implemented successfully using Redux Toolkit. The Redux store maintains posts and platform settings in separate slices. React components access the shared state using `useSelector` and update it by dispatching actions with `useDispatch`.

## Conclusion
Redux Toolkit provides a structured and maintainable way to manage shared application state. Separating posts and platform settings into slices makes state updates easier to organize and test.

## Limitations
This is a frontend demonstration. The Redux store exists in memory and resets to its initial sample data after a page refresh. No real backend API, database, authentication, or cloud persistence is configured.
