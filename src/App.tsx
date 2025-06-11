// App.tsx
import { Toaster } from 'react-hot-toast';
import LandingComponent from "./components/LandingComponent";
import TopBar from "./components/TopBar";
import BottomComponent from "./components/BottomComponent";

const App = () => {
  return (
    <div className="min-h-screen">
      <Toaster position="bottom-right" />
      <div className="max-w-7xl mx-auto px-6 py-4 min-h-screen flex flex-col">
        <TopBar />
        <LandingComponent />
        <BottomComponent />
      </div>
    </div>
  );
};

export default App;
