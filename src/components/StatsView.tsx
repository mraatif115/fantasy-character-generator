import React from 'react';
import { CharacterAttributes } from '../types';

interface StatsViewProps {
  attributes: CharacterAttributes;
  primaryStats: string[];
  themeColor: string;
}

export const StatsView: React.FC<StatsViewProps> = ({ attributes, primaryStats, themeColor }) => {
  const getModifier = (score: number) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const statLabels: Record<keyof CharacterAttributes, { name: string; desc: string; icon: string }> = {
    strength: { name: 'Strength', desc: 'Physical power and melee combat strength', icon: 'STR' },
    dexterity: { name: 'Dexterity', desc: 'Reflexes, agility, and accuracy', icon: 'DEX' },
    constitution: { name: 'Constitution', desc: 'Stamina, health points, and grit', icon: 'CON' },
    intelligence: { name: 'Intelligence', desc: 'Mental acuity, knowledge, and arcane spells', icon: 'INT' },
    wisdom: { name: 'Wisdom', desc: 'Perception, natural awareness, and devotion', icon: 'WIS' },
    charisma: { name: 'Charisma', desc: 'Force of personality, artistry, and persuasion', icon: 'CHA' }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-wider text-white/40 uppercase font-serif-fantasy border-b border-white/10 pb-2">
        Core Attributes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(Object.keys(statLabels) as (keyof CharacterAttributes)[]).map((key) => {
          const value = attributes[key];
          const isPrimary = primaryStats.includes(key);
          const modifier = getModifier(value);

          return (
            <div
              key={key}
              className={`relative rounded-xl p-3 border transition-colors ${
                isPrimary
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wide ${
                    isPrimary 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                      : 'bg-white/5 text-white/50 border border-white/10'
                  }`}>
                    {statLabels[key].icon}
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    {statLabels[key].name}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-white font-mono">{value}</span>
                  <span className={`text-xs font-semibold font-mono ${parseInt(modifier) >= 0 ? 'text-emerald-450' : 'text-rose-450'}`}>
                    ({modifier})
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isPrimary ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-white/30'
                  }`}
                  style={{ width: `${Math.min(100, (value / 20) * 100)}%` }}
                />
              </div>

              {isPrimary && (
                <span className="absolute -top-1.5 right-3 bg-blue-500 text-white text-[8px] font-bold tracking-widest px-1.5 py-0.2 rounded-full uppercase scale-[0.9]">
                  Primary
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
