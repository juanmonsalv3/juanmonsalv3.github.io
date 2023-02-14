const Section = ({ children, header }) => {
  return (
    <section className='w-full relative p-10 border-b border-gray-400'>
      <h2 className='uppercase italic text-3xl font-bold mb-8'>{header}</h2>
      {children}
    </section>
  );
};

export default Section;
