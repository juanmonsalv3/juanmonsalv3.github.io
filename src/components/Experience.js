import { useTranslation } from 'react-i18next';
import experiences from '../assets/experience.json';
import Section from './common/Section';
import NavArrows from './common/NavArrows';
import { useCallback, useState } from 'react';

const ExperienceItem = ({
  role,
  company,
  monthStart,
  yearStart,
  monthEnd,
  yearEnd,
  description,
  skills,
}) => {
  const { t } = useTranslation();

  return (
    <article className='experience-item relative basis-1/2 shrink-0 pr-20 max-md:basis-full max-md:pr-0'>
      <h3 className='experience-role text-2xl font-bold text-slate-100 border-b-white border-b-2'>
        {t(role)}
      </h3>
      <h4 className='experience-company text-xl text-slate-200'>{company}</h4>
      {/* <span className='experience-location text-xs text-slate-200'>
        {location}
      </span>{' '}
      -{' '} */}
      <span className='experience-dates text-xs text-slate-200  top-0 right-12'>
        {t(monthStart)} {yearStart} ·{' '}
        {monthEnd ? t(monthEnd) + ' ' + yearEnd : t('present')}
      </span>
      <ul className='list-disc list-outside pl-4 mt-4 text-sm text-justify'>
        {description.map((desc, idx) => (
          <li key={idx} className='mt-2'>
            {t(desc)}
          </li>
        ))}
        <li className='mt-4'>
          <span className='font-bold'>{t('skills')}:</span> {skills.join(' · ')}
        </li>
      </ul>
    </article>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);

  const onBackClick = useCallback(() => {
    setOffset((value) => {
      return value === 0
        ? -100 * (Math.floor(experiences.length / 2) - 1)
        : value + 100;
    });
  }, []);

  const onForwardClick = useCallback(() => {
    setOffset((value) => {
      return -value / 100 === Math.floor(experiences.length / 2) - 1
        ? 0
        : value - 100;
    });
  }, []);

  return (
    <Section header={t('experience')}>
      <NavArrows onBackClick={onBackClick} onForwardClick={onForwardClick} />
      <div className='carousel-wrapper overflow-hidden'>
        <div
          className='flex gap-y-8 transition-all duration-1000 ease-in-out'
          style={{ transform: `translateX(${offset}%)` }}
        >
          {experiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;
