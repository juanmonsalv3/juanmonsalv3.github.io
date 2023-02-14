import classNames from 'tailwindcss-classnames';
import picture from '../../assets/profile.jpg';

const ProfilePicture = ({ className }) => {
  const classes = classNames(
    'h-40 rounded-full shadow-lg shadow-black/50',
    className
  );
  return <img className={classes} src={picture} alt='Profile' />;
};

export default ProfilePicture;
