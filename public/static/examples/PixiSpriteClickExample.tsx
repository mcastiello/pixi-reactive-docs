import React, { useCallback, useReducer } from 'react';
import { PixiCanvas, PixiSprite, PixiTexture, PixiTilingSprite } from 'pixi-reactive';
import { PixiParticles } from 'pixi-reactive-particles';
import ThrusterConfig from './thruster.json';

const textures = {
  galaxy: './static/assets/galaxy.png',
  sheet: './static/assets/spritesheet.json'
};

type EngineState = {
  active: boolean,
  position: number
};

enum EngineActions {
  Navigate,
  Start,
  Stop
}

const engineReducer = (state: EngineState, action: EngineActions) => {
  switch (action){
    case EngineActions.Navigate:
      return state.active ? { ...state, position: state.position - 1 } : state;
    case EngineActions.Start:
      return {...state, active: true};
    case EngineActions.Stop:
      return {...state, active: false };
  }
}

const PixiClickSpriteExample: React.FC = () => {
  const [engineState, update] = useReducer(engineReducer, { position: 0, active: false });
  const {position, active} = engineState;

  const toggle = useCallback(() => update(active ? EngineActions.Stop : EngineActions.Start), [active]);
  const navigate = useCallback(() => update(EngineActions.Navigate), []);

  return (
    <PixiCanvas textures={textures} onUpdate={navigate}>
      <PixiTilingSprite texture={'galaxy'} tileX={position} />
      <PixiSprite alignY={0.5} x={20} buttonMode={true} interactive={true} onClick={toggle}>
        <PixiTexture src={'./static/assets/spaceship.png'} />
        {active && <PixiParticles textures={'particle fire'} config={ThrusterConfig} />}
      </PixiSprite>
    </PixiCanvas>
  );
};
