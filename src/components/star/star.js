import React, { useState, useEffect } from 'react';
import { StarSimple } from './style';

const Star = () => {
  const [dimensions, setDimensions] = useState(null);

  const between = (min, max) => Math.floor(Math.random() * (max - min) + min);

  useEffect(() => {
    const x = between(0, 100);
    const y = between(0, 100);
    const size = between(3, 7);

    setDimensions({ x, y, size });
  }, []);

  if (!dimensions) return null;

  return <StarSimple size={dimensions.size} x={dimensions.x} y={dimensions.y} />;
};

export default Star;
