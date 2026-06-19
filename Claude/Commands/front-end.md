Frontend Coding Guidelines (React)
These are my standing rules for any React work in this repo. Follow them by default, every time, without me having to repeat them.

1. Detect the project setup first
   Before writing any code, check:

JS or TS? Look at existing file extensions (.jsx vs .tsx), tsconfig.json presence, and match it. Never introduce TS into a JS codebase or vice versa without asking.
Styling system? Check package.json and existing components for Tailwind config, MUI (@mui/material), styled-components, CSS modules, etc. Use whatever the repo already uses — don't mix styling systems.
State management? Check if Redux, Zustand, Context, or plain useState is already in use before introducing something new.

Match existing conventions over personal preference. If the setup is genuinely unclear or mixed, ask before assuming.

2. DRY — no exceptions
   If a piece of logic appears more than once (even slightly reworded), extract it into a shared function, hook, or component.
   No business logic, data transformation, or API logic lives inside a component or page file. Components and pages should be thin — they call hooks/utils and render. Logic belongs in:
   Custom hooks (useXyz) for stateful/reusable logic
   Plain utility functions for pure logic
   Service/API layer files for network calls
   Repeated JSX patterns (cards, list items, form rows, etc.) get extracted into their own components.
3. Hooks discipline
   Never use useEffect with an empty dependency array as a dumping ground for "stuff that happens on mount." Be deliberate: if it's an API call, keep it clean — extract the fetch logic into a named async function or custom hook (e.g. useFetchUser()), and call it from useEffect. Avoid unnecessary .then().then().then() promise chains — prefer async/await with clear error handling.
   Memoize heavy computations with useMemo. If a calculation is non-trivial and depends on props/state, wrap it.
   Wrap functions passed as props or used in dependency arrays with useCallback, especially if passed to memoized children or used inside other hooks' dependency arrays. Default to using it for non-trivial functions rather than skipping it.
4. Naming conventions
   Components: PascalCase (UserProfileCard, NavigationBar).
   Variables, functions, props: camelCase (userEmail, handleSubmit, isLoading).
   Always verbose, descriptive names — no abbreviations or single-letter names, including inside callbacks. E.g. users.filter((activeUser) => activeUser.isActive) not users.filter(u => u.isActive). This applies to every iterable callback param (.map(), .filter(), .reduce(), etc.) — name it after what it actually represents, not generic letters like x, i, el.
   Functions: always use arrow function syntax (const handleClick = () => {}), consistent with the useCallback preference above.
5. Lists and rendering
   Always use stable, unique keys in .map() — never array index unless the list is static and never reorders/filters. Use an actual unique ID from the data.
   Double-check .map() callbacks with block bodies ({ }) have an explicit return — implicit-return arrow functions (() => (...)) are preferred for simple JSX returns to avoid this bug entirely.
6. State management & prop drilling
   Don't default to prop drilling through 3+ levels of components. If state needs to be shared across distant components, prefer:
   Context (for moderate, mostly-static shared state)
   Redux/Zustand or equivalent (for complex, frequently-updated global state)
   Use judgment — don't reach for global state for things that are genuinely local to one component tree.
7. Workflow — debate before implementing
   For each meaningful piece of implementation:

State what you're about to implement and in which file.
Flag any design/architecture decision points (e.g. "should this be a hook or inline logic," "Context vs Redux here").
Debate it with me — give your reasoning, hear pushback, adjust.
Only after we land on an approach, implement it.

Don't silently make architectural decisions and present a finished file — talk it through first.

8. Testing
   After implementing a logical unit (hook, util, component with real logic):

Write unit tests for it (Jest/Vitest + React Testing Library, matching whatever's already in the repo).
Where it makes sense (user flows, critical paths), write end-to-end tests in Cypress or Playwright (match whichever is already configured in the repo; ask if neither exists yet).
Tests aren't optional add-ons — treat them as part of "done."
Quick checklist before considering a piece of code finished
Matches existing JS/TS and styling conventions
No repeated logic — extracted into hook/util/component
No business/API logic sitting in component or page files
useEffect calls are clean, no empty-array dumping ground, no unnecessary promise chains
Heavy computations in useMemo, heavy/passed-down functions in useCallback
.map() uses proper unique keys and explicit/implicit returns are correct
No excessive prop drilling — Context/global state used where appropriate
Design decisions were discussed before implementing, not just decided unilaterally
Unit tests written; E2E tests written where applicable
