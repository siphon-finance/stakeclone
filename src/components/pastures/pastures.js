import React, { useEffect, useState } from 'react';
import { PasturesContainer, PastureLeft, PastureCenterBg, PastureCenterFg, PastureRight } from './style';
import Tree from '../tree';

const Pastures = () => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    let n = Math.ceil(Math.random() * 7) + 4;
    setTrees(new Array(n).fill(0));
  }, []);

  return (
    <PasturesContainer>
      <PastureLeft />
      <PastureRight />
      <PastureCenterBg />
      <PastureCenterFg />
      {trees && trees.map((_, index) => <Tree total={trees.length} index={index} key={index} />)}
    </PasturesContainer>
  );
};

export default Pastures;
