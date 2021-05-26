import React, { useEffect, useState } from 'react';

import Star from '../star';
//import { GoldenCookie, GoldenBoot, GoldenCandy, Cow1, Cow2, Gift1, Gift2, Gift3 } from './style';

const Sky = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    let n = Math.ceil(Math.random() * 50) + 30;
    setStars(new Array(n).fill(0));
  }, []);

  return (
    <>


      {stars && stars.map((_, index) => <Star key={index} />)}
    </>
  );
};

export default Sky;
