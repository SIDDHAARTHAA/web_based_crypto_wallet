// components/ThemeToggle.tsx
import { useEffect, useState } from 'react';

const storageKey = 'theme-preference';

const ThemeToggle = () => {
  const getColorPreference = (): 'light' | 'dark' => {
    if (localStorage.getItem(storageKey))
      return localStorage.getItem(storageKey) as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getColorPreference());

  const reflectPreference = (value: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', value);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-label', value);
  };

  const setPreference = (value: 'light' | 'dark') => {
    localStorage.setItem(storageKey, value);
    reflectPreference(value);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setPreference(newTheme);
  };

  useEffect(() => {
    reflectPreference(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      setPreference(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      title="Toggles light & dark"
      aria-label={theme}
      aria-live="polite"
      onClick={toggleTheme}
    >
      <svg
        className="sun-and-moon"
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <mask className="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle
          className="sun"
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
          fill="currentColor"
        />
        <g className="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
};

export default ThemeToggle;
