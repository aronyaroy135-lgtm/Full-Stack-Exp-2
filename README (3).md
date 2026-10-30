# Experiment: Memoized Selectors and Efficient Rendering

## Aim
To optimize state access and improve application performance using memoized selectors and efficient rendering strategies.

## Objectives
1. Create memoized selectors using Redux Toolkit's `createSelector`.
2. Avoid repeated filtering, sorting, and aggregation when selector inputs have not changed.
3. Use `React.memo` to reduce unnecessary child component renders when props are unchanged.
4. Keep event handler references stable with `useMemo`.
5. Use focused `useSelector` subscriptions and compare UI behavior with different filter settings.

## Software Requirements
- Node.js and npm
- Visual Studio Code (or another code editor)
- Modern web browser

## Technologies Used
- React
- Redux Toolkit (`createSelector`, `createSlice`, `configureStore`)
- React Redux (`Provider`, `useSelector`, `useDispatch`)
- JavaScript and CSS
- Vite

## Theory
A selector reads or derives data from application state. A normal selector that filters or sorts an array can repeat expensive calculations whenever it is called. A memoized selector created with `createSelector` caches its last result and recalculates only when its input-selector values change. This can preserve the result reference and reduce unnecessary downstream updates.

This experiment demonstrates:
- `selectVisiblePosts`: filters posts by search, category, and liked status, then sorts the result.
- `selectPostStats`: computes total posts, liked posts, and total views.
- `React.memo(PostCard)`: can skip a parent-driven render if the card's props are shallowly unchanged.
- `useMemo`: keeps the event-handler object stable between renders.
- `useSelector`: subscribes to specific state values.

Memoization is not a substitute for measurement and does not guarantee that every render is avoided. Redux state changes may legitimately cause subscribed components to update.

## Procedure
1. Extract the ZIP file and open the project folder in Visual Studio Code.
2. Open a terminal in the project directory.
3. Install dependencies using `npm install`.
4. Start the application using `npm run dev`.
5. Open the local URL printed by Vite.
6. Search posts, select a category, change sorting, and enable the liked-only filter.
7. Like a post or increment its view count and observe updated statistics.
8. Generate a larger set of sample posts (up to 5000) and try the filters again.
9. Add or delete posts and observe the visible results and summary cards.
10. Run `npm run build` to verify that the project builds.

## Commands
```bash
npm install
npm run dev
npm run build
```

## Project Structure
```text
memoized_selectors_performance_experiment/
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
        │   ├── postsSlice.js
        │   └── postsSelectors.js
        └── filters/
            └── filtersSlice.js
```

## Test Cases
| No. | Test | Expected Result |
|---|---|---|
| 1 | Load application | Sample posts and statistics appear |
| 2 | Enter a search term | Only matching posts appear |
| 3 | Choose a category | Feed is filtered by that category |
| 4 | Enable liked-only filter | Only liked posts appear |
| 5 | Change sort order | Posts reorder by title, views, or liked status |
| 6 | Like/unlike a post | Like state and aggregate statistics update |
| 7 | Increment a post's views | View count and total views update |
| 8 | Generate sample posts | Post count increases; filtering remains functional |
| 9 | Add/delete a post | The feed and statistics reflect the change |
| 10 | Build the application | Vite completes a production build successfully |

## Result
The application was implemented using React and Redux Toolkit. Memoized selectors derive visible posts and summary statistics from centralized state. React.memo and stable event handlers are used to help avoid unnecessary child component renders when their props remain unchanged.

## Conclusion
Memoized selectors can reduce repeated derived-state calculations, while focused subscriptions and memoized components can improve rendering efficiency. Performance should be measured with representative data and React DevTools before drawing conclusions.

## Limitations
- This is a frontend demonstration and does not use a backend or database.
- Redux state is in memory and resets to sample data after refreshing the page.
- The sample generator is for hands-on testing, not a rigorous performance benchmark.
