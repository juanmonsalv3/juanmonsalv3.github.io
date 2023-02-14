import classnames from 'tailwindcss-classnames';

const Section = ({ header, className, children }) => {
  return (
    <section
      className={classnames(
        'w-full relative p-10 border-b border-gray-400 max-md:p-6',
        className
      )}
    >
      <h2 className='uppercase italic text-3xl font-bold mb-8'>{header}</h2>
      {children}
    </section>
  );
};

export default Section;
