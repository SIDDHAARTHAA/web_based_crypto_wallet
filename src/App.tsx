// App.tsx
import { Toaster } from 'react-hot-toast';
import LandingComponent from "./components/LandingComponent";
import TopBar from "./components/TopBar";
import BottomComponent from "./components/BottomComponent";
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#0e0d0d] text-black dark:text-white">
        <Toaster position="bottom-right" />
        <div className="max-w-7xl mx-auto px-6 py-4 min-h-screen flex flex-col">
          <TopBar />
          <LandingComponent />
          <BottomComponent />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
