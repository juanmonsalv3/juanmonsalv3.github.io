import classNames from 'tailwindcss-classnames';
import contactDetails from '../../assets/contact-details.json';
import {
  IoPhonePortrait,
  IoLocation,
  IoMail,
  IoLogoLinkedin,
  IoLogoGithub,
} from 'react-icons/io5';
import { memo } from 'react';
import Link from '../common/Link';

const ContactItem = memo(({ label, value, Icon, isEmail, isLink }) => {
  const labelContent = label || value;
  let content = (
    <>
      {labelContent}
      <Icon className='h-5 w-5 inline-block ml-1' />
    </>
  );

  if (isLink || isEmail) {
    content = (
      <Link
        href={isEmail ? `mailto:${value}` : value}
        target='_blank'
        rel='noreferrer'
        className='flex items-center'
      >
        {labelContent}
        <Icon className='h-5 w-5 inline-block ml-1' />
      </Link>
    );
  }

  return (
    <li
      className={classNames(
        'header__profile-detail m-4 text-left max-md:m-2 max-md:ml-4',
        (isLink || isEmail)
      )}
      key={label}
    >
      {content}
    </li>
  );
});

const ProfileDetails = ({ className }) => {
  return (
    <ul
      className={classNames(
        className,
        'profile-details bg-slate-800 flex justify-around text-right text-xs shrink-0 -mx-10 grow mt-4 max-md:flex-col max-md:mt-0'
      )}
    >
      <ContactItem {...contactDetails.location} Icon={IoLocation} />
      <ContactItem {...contactDetails.phone} Icon={IoPhonePortrait} />
      <ContactItem {...contactDetails.email} isEmail Icon={IoMail} />
      <ContactItem {...contactDetails.linkedin} isLink Icon={IoLogoLinkedin} />
      <ContactItem {...contactDetails.github} isLink Icon={IoLogoGithub} />
    </ul>
  );
};

export default ProfileDetails;
