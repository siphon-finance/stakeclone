import React, { useEffect, useState } from 'react';

import Star from '../star';
import { GoldenCookie, GoldenBoot, GoldenCandy, Santa, Cow1, Cow2, Gift1, Gift2, Gift3 } from './style';

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
      <Santa src={require('../../assets/santa.svg')} />
      <Cow1 src={require('../../assets/cow.svg')} />
      <Cow2 src={require('../../assets/cow.svg')} />
      <Gift1 src={require('../../assets/gift.svg')} />
      <Gift2 src={require('../../assets/gift.svg')} />
      <Gift3 src={require('../../assets/gift.svg')} />

      {stars && stars.map((_, index) => <Star key={index} />)}
    </>
  );
};

export default Sky;
