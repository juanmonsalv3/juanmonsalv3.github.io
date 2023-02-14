import { useTranslation } from 'react-i18next';
import Section from './common/Section';

const list = ['Coding', 'Football', 'Reading', 'Video Games'];

const Interest = ({ label }) => <li className='mb-4'>{label}</li>;

const Interests = ({className}) => {
  const { t } = useTranslation();

  return (
    <Section header={t('interests')} className={className}>
      <article className='relative basis-6/12 shrink-0 pr-20'>
        <ul className='list-disc list-outside pl-4 mt-4 text-sm text-justify'>
          {list.map((l) => (
            <Interest label={l} />
          ))}
        </ul>
      </article>
    </Section>
  );
};

export default Interests;
