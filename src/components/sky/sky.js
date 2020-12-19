import React, { useEffect, useState } from 'react';

import Star from '../star';

const Sky = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    let n = Math.ceil(Math.random() * 30) + 20;
    setStars(new Array(n).fill(0));
  }, []);

  return stars && stars.map((_, index) => <Star key={index} />);
};

export default Sky;
