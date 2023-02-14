import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';
import ProfileDetails from './ProfileDetails';
import ProfilePicture from './ProfilePicture';

const Header = () => {
  const { t } = useTranslation();
  return (
    <header className='relative bg-slate-500 border-b border-gray-400 flex flex-wrap items-start gap-x-8 gap-y-3 p-10 pb-0 '>
      <LanguageSelector className='absolute text-xs top-1 right-10' />
      <ProfilePicture className='shrink grow-0' />
      <div className='flex flex-col basis-1/2 grow'>
        <div className='mb-4'>
          <h1 className='text-4xl'>Juan Monsalve Giraldo</h1>
          <h2 className='text-xl text-slate-200'>{t('react_dev')}</h2>
        </div>
        <div className='text-sm'>
          <p>{t('profile_header')}</p>
        </div>
      </div>
      <ProfileDetails className='basis-full' />
    </header>
  );
};

export default Header;
