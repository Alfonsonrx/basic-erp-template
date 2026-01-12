import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
  theme: 'light-corporate' | 'dark-corporate' | 'purple-dream' | 'green-forest';
}

const getInitialTheme = (): ThemeState['theme'] => {
  const saved = localStorage.getItem('theme') as ThemeState['theme'] | null;
  if (saved) return saved;
  // Default to light corporate if nothing is set
  return 'light-corporate';
};

const initialState: ThemeState = { theme: getInitialTheme() };

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      const next =
        state.theme === 'light-corporate'
          ? 'dark-corporate'
          : state.theme === 'dark-corporate'
            ? 'purple-dream'
            : state.theme === 'purple-dream'
              ? 'green-forest'
              : 'light-corporate';
      state.theme = next;
      localStorage.setItem('theme', next);
    },
    setTheme(state, action: PayloadAction<ThemeState['theme']>) {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;