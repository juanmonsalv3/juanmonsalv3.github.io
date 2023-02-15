import classNames from 'tailwindcss-classnames';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const NavArrows = ({ onForwardClick, onBackClick }) => {
  const arrowClasses = classNames(
    'arrow flex inline-block cursor-pointer border p-3 rounded-full border-gray-400',
    'hover:bg-gray-500',
    'active:scale-110',
    'max-md:p-1'
  );
  const iconClasses = 'h-8 w-8 max-md:h4 max-md:w-8';
  return (
    <div className='nav-arrows absolute flex top-8 right-0 items-center max-md:top-4'>
      <span
        className={classNames('arrow-back', arrowClasses)}
        onClick={onBackClick}
      >
        <IoChevronBack className={iconClasses} />
      </span>
      <span className='border-b border-gray-400 h-px w-4 max-md:w-2' />
      <span
        className={classNames('arrow-forward', arrowClasses)}
        onClick={onForwardClick}
      >
        <IoChevronForward className={iconClasses} />
      </span>
      <span className='border-b border-gray-400 h-px w-20 max-md:w-10' />
    </div>
  );
};

export default NavArrows;
