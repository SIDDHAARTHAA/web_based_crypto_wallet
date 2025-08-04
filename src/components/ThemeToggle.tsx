import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const storageKey = 'theme-preference';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const getColorPreference = (): 'light' | 'dark' => {
    if (localStorage.getItem(storageKey))
      return localStorage.getItem(storageKey) as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [mounted, setMounted] = useState(false);
  const [localTheme, setLocalTheme] = useState<'light' | 'dark'>(getColorPreference());

  const reflectPreference = (value: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', value);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-label', value);
  };

  const setPreference = (value: 'light' | 'dark') => {
    localStorage.setItem(storageKey, value);
    reflectPreference(value);
  };

  const toggle = () => {
    const newTheme = localTheme === 'light' ? 'dark' : 'light';
    setLocalTheme(newTheme);
    setPreference(newTheme);
    toggleTheme();
  };

  useEffect(() => {
    reflectPreference(localTheme);
    setMounted(true);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setLocalTheme(newTheme);
      setPreference(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                transition-colors duration-200"
      aria-label={`Switch to ${localTheme === 'light' ? 'dark' : 'light'} mode`}
      id="theme-toggle"
      title="Toggles light & dark"
      aria-live="polite"
    >
      {localTheme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
