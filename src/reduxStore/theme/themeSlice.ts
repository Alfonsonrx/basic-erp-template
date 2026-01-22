import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the ThemeState interface
export type ThemePair = 'corporate' | 'purple' | 'green' | 'blue'; // all available pairs

export interface ThemeState {
  pair: ThemePair;       // controlled by company admin (from backend/DB)
  mode: 'dark' | 'light'; // controlled by user toggle
}

// Initial state with dynamic theme detection
const getInitialPair = (): ThemePair => {

  // Normally loaded from backend / user company setting
  return 'corporate';
};

const getInitialMode = (): 'dark' | 'light' => {
  const saved = localStorage.getItem('user-theme-mode') as 'dark' | 'light' | null;
  if (saved) return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initialState: ThemeState = {
  pair: getInitialPair(),
  mode: getInitialMode(),
};

// Create the theme slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemePair(state, action: PayloadAction<ThemePair>) {
      state.pair = action.payload;
    },
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('user-theme-mode', state.mode); // Save to localStorage
    },
    setMode(state, action: PayloadAction<'dark' | 'light'>) {
      state.mode = action.payload;
      localStorage.setItem('user-theme-mode', state.mode); // Save to localStorage
    },
  },
});

// Export actions
export const { setThemePair, toggleTheme, setMode } = themeSlice.actions;

// Export reducer
export default themeSlice.reducer;