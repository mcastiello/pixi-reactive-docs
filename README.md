![PIXIReactive Logo](./public/static/assets/pixi-reactive.png)
# pixi-reactive-docs
> The `PixiReactive` library is a quick way to use all the features provided by [PIXI](http://pixijs.download/release/docs/index.html)
> inside a [React](https://reactjs.org/) virtual DOM.
>
> The purpose of this repository is to provide a web documentation for the library that will be accessible from this [LINK](https://mcastiello.github.io/pixi-reactive/).

## Install
This library uses both `React` and `PIXI` as peer dependencies, which basically means that they are required, but they are not automatically imported, so that you can use your own versions, and you won't have duplicates among your node modules. So, depending on your favourite package manager, you will need to install all the 3 libraries as follows:
```bash
npm install react pixi.js pixi-reactive
```
or
```bash
yarn add react pixi.js pixi-reactive
```

## Usage

```tsx
import React, { useReducer } from 'react';
import { PixiCanvas, PixiTilingSprite, PixiSprite } from 'pixi-reactive';

/**
 * List of textures. It supports image assets or JSON files created with TexturePacker
 */
const textures = {
  galaxy: './static/assets/galaxy.png',
  stars: './static/assets/slow-stars.png',
  ship: './static/assets/spaceship.png'
};

type Space = {
  galaxyTileX: number;
  starsTileX: number;
  direction: boolean;
  shipY: number;
};

/**
 * Update all the properties that will affect the scene using a React reducer.
 * @param {Space} state
 * @returns {Space}
 */
const updateScene = (state: Space): Space => {
  let newDirection = state.direction;

  if ((state.direction && state.shipY <= 60) || (!state.direction && state.shipY >= 240)) {
    newDirection = !state.direction;
  }
  return {
    galaxyTileX: state.galaxyTileX - 0.1,
    starsTileX: state.starsTileX - 0.5,
    direction: newDirection,
    shipY: newDirection ? state.shipY - 0.5 : state.shipY + 0.5
  };
};

const PixiCanvasExample: React.FC = () => {
  // Generate the scene state and the update function
  const [state, update] = useReducer(updateScene, {
    galaxyTileX: 0,
    starsTileX: 0,
    direction: false,
    shipY: 150
  });

  return (
    <PixiCanvas textures={textures} onUpdate={update}>
      <PixiTilingSprite texture={'galaxy'} tileX={state.galaxyTileX} />
      <PixiTilingSprite texture={'stars'} tileX={state.starsTileX} />
      <PixiSprite texture={'ship'} x={30} y={state.shipY} anchorY={0.5} />
    </PixiCanvas>
  );
};
```
For more detailed information, please refer to the [Online Documentation](https://mcastiello.github.io/pixi-reactive/).

## License

MIT © [mcastiello](https://github.com/mcastiello)
