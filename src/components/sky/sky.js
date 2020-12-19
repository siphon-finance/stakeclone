import React, { useEffect, useState } from 'react';

import Star from '../star';
import { GoldenCookie, GoldenBoot, GoldenCandy, Santa, Cow1, Cow2 } from './style';

const Sky = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    let n = Math.ceil(Math.random() * 50) + 30;
    setStars(new Array(n).fill(0));
  }, []);

  return (
    <>
      <GoldenCandy src={require('../../assets/candy.svg')} />
      <GoldenBoot src={require('../../assets/boot.svg')} />
      <GoldenCookie src={require('../../assets/cookie.svg')} />
      {stars && stars.map((_, index) => <Star key={index} />)}
    </>
  );
};

export default Sky;
