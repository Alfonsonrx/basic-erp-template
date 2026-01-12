// tailwind.config.js
const colors = {
  primary: {
    DEFAULT: 'var(--color-primary)',
    50:  'var(--color-primary-50)',
    100: 'var(--color-primary-100)',
    // ... up to 950
  },
  secondary: { DEFAULT: 'var(--color-secondary)', /* ... */ },
  neutral:   { DEFAULT: 'var(--color-neutral)',   /* ... */ },
  success:   { DEFAULT: 'var(--color-success)',   /* ... */ },
  // etc...
}

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'], // or just class
  theme: {
    extend: {
      colors,
      borderColor: colors,
      backgroundColor: colors,
      textColor: colors,
      ringColor: colors,
      // accentColor, caretColor, etc...
    },
  },
  plugins: [],
}