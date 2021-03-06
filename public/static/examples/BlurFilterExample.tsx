import React, { useCallback, useReducer, useState } from 'react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, BlurFilter } from 'pixi-reactive';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const BlurFilterExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, update] = useReducer(reducer, 0);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5}>
        <BlurFilter enabled={enabled} quality={2} repeatEdgePixels={true} blur={0.5} />
      </PixiSprite>
    </PixiCanvas>
  );
};
