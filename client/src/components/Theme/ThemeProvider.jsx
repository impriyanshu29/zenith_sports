
//implementing dark mode on website from value got from frontend
import { useSelector } from 'react-redux';

export function ThemeProvider({ children }) {
  const {currentTheme} = useSelector((state) => state.theme);
  console.log('Current Theme:', currentTheme);
  return (
    <div className={currentTheme}>
      <div className='bg-gray-50 dark:bg-neutral-950'>
        {children}
      </div>
    </div>
  );
}
