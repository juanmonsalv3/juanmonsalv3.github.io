import { useTranslation } from 'react-i18next';
import Section from './common/Section';

const Education = ({ className }) => {
  const { t } = useTranslation();
  return (
    <Section header={t('education')} className={className}>
      <article className='relative basis-6/12 shrink-0 pr-20'>
        <h3 className='text-xl font-bold text-slate-100 border-b-white border-b-2'>
          Engineering on systems and informatics
        </h3>
        <h4 className='text-md text-slate-200'>Universidad de Cartagena</h4>
        <span className='text-xs text-slate-200  top-0 right-12'>
          2009 · 2016
        </span>
      </article>
    </Section>
  );
};

export default Education;
