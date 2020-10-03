import React  from 'react';
import {
  Pastures,
  PastureLeft,
  PastureCenterBg,
  PastureCenterFg,
  PastureRight,
} from './style';

const Footer = () => {
  return (
    <Pastures>
      <PastureLeft />
      <PastureRight />
      <PastureCenterBg />
      <PastureCenterFg />
    </Pastures>
  );
}




export default Footer;
