import React, { useState, useEffect } from 'react';

const Tree = ({ total, index }) => {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const r = 100 / total;
    const x = (index + Math.random() * 0.5) * r;
    const y = Math.ceil(Math.random() * 30) / 10 + 0.5;
    const w = Math.round(Math.random() * 3) + 2;
    const d = Math.random() < 0.5 ? -1 : 1;

    setDimensions({ x, y, w, d });
  }, [total, index]);

  if (!dimensions) return null;

  return (
    <img
      alt='tree'
      src={require('../../assets/tree.svg')}
      style={{
        position: 'absolute',
        bottom: `${dimensions.y}rem`,
        left: `${dimensions.x}vw`,
        width: `${dimensions.w}rem`,
        transform: `scaleX(${dimensions.d})`,
        zIndex: `${Math.ceil(dimensions.y)}`,
      }}
    />
  );
};

export default Tree;
