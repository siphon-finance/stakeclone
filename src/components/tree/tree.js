import React, { useState, useEffect } from 'react';

import tree from '../../assets/tree.svg';
import tree2 from '../../assets/tree2.svg';

const Tree = ({ total, index }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const r = 100 / total;
    const x = (index + Math.random() * 0.5) * r;
    const y = Math.ceil(Math.random() * 30) / 10 + 0.5;
    const w = Math.round(Math.random() * 3) + 2.5;
    const d = Math.random() < 0.5 ? -1 : 1;
    const decorations = Math.random() < 0.3 ? true : false;

    setConfig({ x, y, w, d, decorations });
  }, [total, index]);

  if (!config) return null;

  return (
    <img
      alt='tree'
      src={config.decorations ? tree2 : tree}
      style={{
        position: 'absolute',
        bottom: `${config.y}rem`,
        left: `${config.x}vw`,
        width: `${config.w}rem`,
        transform: `scaleX(${config.d})`,
        zIndex: `${Math.ceil(config.y) + 1}`,
      }}
    />
  );
};

export default Tree;
