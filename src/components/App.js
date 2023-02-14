import Header from './header/Header';
import Experience from './Experience';
import SkillsList from './Skills';

function App() {
  return (
    <div className='bg-gradient-to-t from-blue-300 to-blue-700 bg-white font-mono'>
      <div className='md:container md:mx-auto min-h-screen bg-slate-700 text-white border-x border-gray-400'>
        <Header />
        <SkillsList />
        <Experience />
        
      </div>
    </div>
  );
}

export default App;
