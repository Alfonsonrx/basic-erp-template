import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface LocaleState {
  language: string;        // 'en', 'es'
  region: string;          // 'US', 'ES', 'CL', 'MX'
  fullLocale: string;      // 'en-US', 'es-ES'
  currency: string;        // 'USD', 'EUR', 'CLP', 'MXN'
  timezone: string;        // 'America/New_York', 'Europe/Madrid'
}

// Map language to default region
const regionMap: Record<string, string> = {
  'en': 'US',
  'es': 'CL',
};

// Map region to currency
const currencyMap: Record<string, string> = {
  'US': 'USD',
  'ES': 'EUR',
  'CL': 'CLP',
  'MX': 'MXN',
  'GB': 'GBP',
};

// Map region to timezone
const timezoneMap: Record<string, string> = {
  'US': 'America/New_York',
  'ES': 'Europe/Madrid',
  'CL': 'America/Santiago',
  'MX': 'America/Mexico_City',
  'GB': 'Europe/London',
};

// Helper to build full locale string
const buildFullLocale = (lang: string, region: string): string => {
  return `${lang}-${region}`;
};

const getInitialLanguage = (): string => {
  // Check URL first
  const path = window.location.pathname;
  const pathLang = path.split('/')[1];
  if (['en', 'es'].includes(pathLang)) {
    return pathLang;
  }
  // Check localStorage
  const stored = localStorage.getItem('i18nextLng');
  if (stored && ['en', 'es'].includes(stored)) {
    return stored;
  }
  // Default
  return 'en';
};

const initialLanguage = getInitialLanguage();
const initialRegion = regionMap[initialLanguage] || 'US';

const initialState: LocaleState = {
  language: initialLanguage,
  region: initialRegion,
  fullLocale: buildFullLocale(initialLanguage, initialRegion),
  currency: currencyMap[initialRegion] || 'USD',
  timezone: timezoneMap[initialRegion] || 'UTC',
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      const language = action.payload;
      const region = regionMap[language] || state.region;
      
      state.language = language;
      state.region = region;
      state.fullLocale = buildFullLocale(language, region);
      state.currency = currencyMap[region] || 'USD';
      state.timezone = timezoneMap[region] || 'UTC';
      
      // Persist to localStorage for i18next
      localStorage.setItem('i18nextLng', language);
    },
    
    setRegion: (state, action: PayloadAction<string>) => {
      const region = action.payload;
      
      state.region = region;
      state.fullLocale = buildFullLocale(state.language, region);
      state.currency = currencyMap[region] || 'USD';
      state.timezone = timezoneMap[region] || 'UTC';
    },
    
    setTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },
    
    // Set complete locale in one action
    setLocale: (state, action: PayloadAction<{ language: string; region: string }>) => {
      const { language, region } = action.payload;
      
      state.language = language;
      state.region = region;
      state.fullLocale = buildFullLocale(language, region);
      state.currency = currencyMap[region] || 'USD';
      state.timezone = timezoneMap[region] || 'UTC';
      
      // Persist to localStorage
      localStorage.setItem('i18nextLng', language);
    },
  },
});

export const { setLanguage, setRegion, setTimezone, setLocale } = localeSlice.actions;

export default localeSlice.reducer;
