import classNames from 'tailwindcss-classnames';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const NavArrows = ({ onForwardClick, onBackClick }) => {
  const arrowClasses = 'arrow flex inline-block cursor-pointer border p-3 rounded-full border-gray-400';
  const iconClasses = 'h-8 w-8';
  return (
    <div className='nav-arrows absolute flex top-8 right-0 items-center'>
      <span
        className={classNames('arrow-back', arrowClasses)}
        onClick={onBackClick}
      >
        <IoChevronBack className={iconClasses} />
      </span>
      <span className='border-b border-gray-400 h-px w-4'/>
      <span
        className={classNames('arrow-forward', arrowClasses)}
        onClick={onForwardClick}
      >
        <IoChevronForward className={iconClasses} />
      </span>
      <span className='border-b border-gray-400 h-px w-20'/>
    </div>
  );
};

export default NavArrows;
