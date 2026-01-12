import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the ThemeState interface
export interface ThemeState {
  theme: 'light' | 'dark';
}

// Initial state with dynamic theme detection
const getInitialTheme = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

// Create the theme slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme); // Save to localStorage
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme); // Save to localStorage
    },
  },
});

// Export actions
export const { toggleTheme, setTheme } = themeSlice.actions;

// Export reducer
export default themeSlice.reducer;