import Header from './header/Header';
import Experience from './Experience';
import SkillsList from './Skills';
import Education from './Education';
import { useTranslation } from 'react-i18next';
import Interests from './Interests';

function App() {
  const { t } = useTranslation();
  document.title = t('title');
  return (
    <div className='bg-gradient-to-t from-blue-300 to-blue-700 bg-white font-mono'>
      <div className='md:container md:mx-auto min-h-screen bg-slate-700 text-white border-x border-gray-400'>
        <Header />
        <SkillsList />
        <Experience />
        <div className='flex flex-wrap'>
          <Education className='grow-0 shrink-0 basis-1/2 max-md:basis-full' />
          <Interests className='grow-0 shrink-0 basis-1/2 max-md:basis-full' />
        </div>
      </div>
    </div>
  );
}

export default App;
