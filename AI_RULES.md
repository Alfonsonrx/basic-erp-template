# AI Rules & Tech Stack

## 📦 Tech Stack Overview
- **React 19** – UI framework (functional components, hooks).
- **TypeScript** – static typing throughout the codebase.
- **Vite** – build tool with fast HMR and ES module support.
- **Tailwind CSS** – utility‑first styling; all components use Tailwind classes.
- **shadcn/ui** – prebuilt Radix‑based UI primitives (buttons, dialogs, etc.).
- **React Router DOM v7** – client‑side routing (`<Routes>`, `<Route>`).
- **Redux Toolkit + Redux Persist** – global state management with persistence.
- **Axios** – HTTP client for API calls.
- **Lucide‑react** – icon library (SVG icons as React components).

## 📚 Library Usage Rules
1. **UI Components**  
   - Prefer shadcn/ui primitives over custom CSS whenever possible.  
   - If a component is not available in shadcn, create a small wrapper using Tailwind.

2. **Routing**  
   - All routes must be declared in `src/App.tsx`.  
   - Use `<BrowserRouter>` at the root (in `main.tsx`) and keep route definitions declarative.

3. **State Management**  
   - Global state goes into Redux Toolkit slices; avoid prop drilling.  
   - Persist only essential data with `redux-persist`.

4. **API Calls**  
   - Use Axios for all HTTP requests.  
   - Create a dedicated `src/api` folder for service modules.

5. **Styling**  
   - Stick to Tailwind CSS classes; avoid inline styles unless absolutely necessary.  
   - Keep component files focused on layout and logic, not styling.

6. **Type Safety**  
   - All components and hooks must be typed with TypeScript.  
   - Avoid using `any`; use interfaces or type aliases for props and state.

7. **Accessibility**  
   - Use shadcn/ui components which are accessible by default.  
   - When adding custom elements, ensure proper ARIA attributes.

8. **Testing & Linting**  
   - Follow ESLint rules defined in `eslint.config.js`.  
   - Write unit tests for critical logic (not required for UI‑only components).

9. **File Organization**  
   - Pages → `src/pages/`  
   - Components → `src/components/`  
   - Redux slices → `src/store/`  
   - API services → `src/api/`

10. **Documentation**  
    - Keep README and any feature docs up‑to‑date.  
    - Add comments only where logic is non‑obvious.

---  

This file serves as a quick reference for developers to maintain consistency across the project. Happy coding!
