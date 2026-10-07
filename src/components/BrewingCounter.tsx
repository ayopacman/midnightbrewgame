import React from 'react';
import { CupState, BaseType, LiquidType, ExtraType, TemperatureType, Recipe, CupSkin } from '../types/game';
import { CupVisualizer } from './CupVisualizer';
import { IngredientRack } from './IngredientRack';

interface BrewingCounterProps {
  cupState: CupState;
  onSetBase: (base: BaseType, extractionQuality?: 'PERFECT' | 'GOOD' | 'NORMAL') => void;
  onSetLiquid: (liquid: LiquidType, steamQuality?: 'PERFECT' | 'GOOD' | 'NORMAL') => void;
  onToggleTemperature: (temp: TemperatureType) => void;
  onToggleExtra: (extra: ExtraType) => void;
  onResetCup: () => void;
  onOpenLatteArt: () => void;
  onServe: () => void;
  targetRecipe?: Recipe;
  disabled?: boolean;
  cupSkin?: CupSkin;
  onShakeIce?: () => void;
  activeDecor?: string[];
  unlockedSyrups?: string[];
}

export const BrewingCounter: React.FC<BrewingCounterProps> = ({
  cupState,
  onSetBase,
  onSetLiquid,
  onToggleTemperature,
  onToggleExtra,
  onResetCup,
  onOpenLatteArt,
  onServe,
  disabled = false,
  cupSkin = 'classic_ceramic',
  onShakeIce,
  activeDecor = [],
  unlockedSyrups = [],
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Left Column: Visual Cup & Live Concoction Inspector (5 cols) */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center">
        <CupVisualizer
          cupState={cupState}
          onOpenLatteArt={onOpenLatteArt}
          cupSkin={cupSkin}
          onShakeIce={onShakeIce}
          activeDecor={activeDecor}
        />
      </div>

      {/* Right Column: Interactive Ingredient Rack & Brewer Station (7 cols) */}
      <div className="lg:col-span-7 flex flex-col">
        <IngredientRack
          cupState={cupState}
          onSetBase={onSetBase}
          onSetLiquid={onSetLiquid}
          onToggleTemperature={onToggleTemperature}
          onToggleExtra={onToggleExtra}
          onResetCup={onResetCup}
          onOpenLatteArt={onOpenLatteArt}
          onServe={onServe}
          disabled={disabled}
          unlockedSyrups={unlockedSyrups}
        />
      </div>
    </div>
  );
};
