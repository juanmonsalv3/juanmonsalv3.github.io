import { useCallback } from 'react';
import classnames from 'tailwindcss-classnames';

const Link = ({ className, disabled, href, children, onClick, ...rest }) => {
  const onLinkClick = useCallback(
    (event) => {
      if (!href) event.preventDefault();
      if (onClick) onClick(event);
    },
    [href, onClick]
  );
  return (
    <a
      href={href || '#'}
      className={classnames(
        disabled
          ? 'cursor-auto no-underline not-italic opacity-50 text-inherit'
          : 'cursor-pointer underline hover:text-blue-300 hover:italic',
        className
      )}
      onClick={onLinkClick}
      {...rest}
    >
      {children}
    </a>
  );
};

export default Link;
