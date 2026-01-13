import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the ThemeState interface
export type ThemePair = 'corporate' | 'purple' | 'forest' ; // all available pairs

export interface ThemeState {
  pair: ThemePair;       // controlled by company admin (from backend/DB)
  mode: 'light' | 'dark'; // controlled by user toggle
}

// Initial state with dynamic theme detection
const getInitialPair = (): ThemePair => {
  
  // Normally loaded from backend / user company setting
  return 'corporate';
};

const getInitialMode = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('user-theme-mode') as 'light' | 'dark' | null;
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
    setMode(state, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload;
      localStorage.setItem('user-theme-mode', state.mode); // Save to localStorage
    },
  },
});

// Export actions
export const { setThemePair, toggleTheme, setMode } = themeSlice.actions;

// Export reducer
export default themeSlice.reducer;