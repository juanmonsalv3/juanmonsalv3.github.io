import classNames from 'tailwindcss-classnames';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Section from './common/Section';

import skills from '../assets/skills.json';

const barWidths = {
  1: 'w-1/5',
  2: 'w-2/5',
  3: 'w-3/5',
  4: 'w-4/5',
  5: 'w-5/5',
};

const SkillItem = memo(({ name, level, index, hide }) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimated(true), (index + 1) * 100);
  }, [index]);
  const classes = classNames(
    barWidths[level.toString()],
    `h-2 bg-blue-300 transition-all duration-[2000ms] ease-in-out origin-left`
  );
  return (
    <li
      key='name'
      className={classNames('basis-3/13 max-md:basis-full', {
        'max-md:hidden': hide,
      })}
    >
      {name}
      <div className='bg-slate-500 mt-2'>
        <div
          className={classes}
          style={{ transform: `scaleX(${Number(animated)})` }}
        ></div>
      </div>
    </li>
  );
});

const SkillsList = () => {
  const { t } = useTranslation();
  return (
    <Section header={t('skills')}>
      <ul className='flex flex-row flex-wrap w-full justify-between gap-y-8 max-md:gap-y-4'>
        {skills.map((s, i) => (
          <SkillItem {...s} index={i} key={i} />
        ))}
      </ul>
    </Section>
  );
};

export default SkillsList;
