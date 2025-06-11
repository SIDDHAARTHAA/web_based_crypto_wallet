import logo from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';

const TopBar = () => {
  return (
    <div className='my-10 max-w-[98%] rounded-3xl  border-black px-4 py-2 flex justify-between items-center overflow-hidden'>
      {/* Left side */}
      <div className='flex items-center gap-2'>
        <img src={logo} alt="logo" className='h-12 w-12' />
        <span className='text-3xl font-bold font-mono'>ChainVault</span>
        <span className='text-xs border border-gray-400 dark:border-[#FFD700] px-2 py-0.5 rounded-2xl'>
          v1.0
        </span>
      </div>

      {/* Right side */}
      <div className='mr-3'>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default TopBar;
