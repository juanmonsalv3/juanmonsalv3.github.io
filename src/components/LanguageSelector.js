import classNames from 'tailwindcss-classnames';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';
import Link from './common/Link';

const LanguageSelector = ({ className }) => {
  const { i18n } = useTranslation();

  return (
    <div className={classNames('header__language-select', className)}>
      {Object.keys(languages).map((l) => (
        <Link key={l} className='mr-2' onClick={() => i18n.changeLanguage(l)} disabled={i18n.resolvedLanguage === l}>
          {languages[l].nativeName}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSelector;
