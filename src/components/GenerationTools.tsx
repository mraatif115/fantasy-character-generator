import React from 'react';
import { CharacterClassType, CharacterRaceType, CharacterAlignmentType } from '../types';
import { CLASSES_METADATA, RACES_METADATA, ALIGNMENTS } from '../data';
import * as Icons from 'lucide-react';

interface GenerationToolsProps {
  // Lock States
  lockedClass: CharacterClassType | null;
  lockedRace: CharacterRaceType | null;
  lockedAlignment: CharacterAlignmentType | null;

  // Lock Actions
  onSetLockedClass: (cls: CharacterClassType | null) => void;
  onSetLockedRace: (race: CharacterRaceType | null) => void;
  onSetLockedAlignment: (align: CharacterAlignmentType | null) => void;

  // Trigger Action
  onGenerate: () => void;
}

export const GenerationTools: React.FC<GenerationToolsProps> = ({
  lockedClass,
  lockedRace,
  lockedAlignment,
  onSetLockedClass,
  onSetLockedRace,
  onSetLockedAlignment,
  onGenerate
}) => {
  const classesList = Object.keys(CLASSES_METADATA) as CharacterClassType[];
  const racesList = Object.keys(RACES_METADATA) as CharacterRaceType[];

  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[30px] p-6 space-y-6 shadow-2xl relative overflow-hidden">
      <div>
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-blue-400 opacity-90 block mb-1">
          Summoning Matrix
        </span>
        <h3 className="text-sm font-semibold tracking-wider text-white uppercase font-serif-fantasy border-b border-white/10 pb-2 flex items-center gap-2">
          <Icons.Lock className="w-4 h-4 text-purple-400" />
          <span>Attribute Locking Toggles</span>
        </h3>
        <p className="text-[11px] text-white/40 leading-normal mt-1.5">
          Lock certain categories to keep them fixed. Clicking summon will generate attributes, names, and bio tailored for your locked parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Class selector lock */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 flex items-center gap-1">
            {lockedClass ? <Icons.Lock className="w-3 h-3 text-purple-400" /> : <Icons.Unlock className="w-3 h-3 text-white/20" />}
            <span>Class Lock</span>
          </label>
          <select
            value={lockedClass || ''}
            onChange={(e) => onSetLockedClass((e.target.value as CharacterClassType) || null)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer backdrop-blur-md"
          >
            <option value="" className="bg-[#050b18] text-white">- Random Class -</option>
            {classesList.map((cls) => (
              <option key={cls} value={cls} className="bg-[#050b18] text-white">
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Race Selector lock */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 flex items-center gap-1">
            {lockedRace ? <Icons.Lock className="w-3 h-3 text-purple-400" /> : <Icons.Unlock className="w-3 h-3 text-white/20" />}
            <span>Ancestry Lock</span>
          </label>
          <select
            value={lockedRace || ''}
            onChange={(e) => onSetLockedRace((e.target.value as CharacterRaceType) || null)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer backdrop-blur-md"
          >
            <option value="" className="bg-[#050b18] text-white">- Random Ancestry -</option>
            {racesList.map((race) => (
              <option key={race} value={race} className="bg-[#050b18] text-white">
                {race}
              </option>
            ))}
          </select>
        </div>

        {/* Alignment Lock */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 flex items-center gap-1">
            {lockedAlignment ? <Icons.Lock className="w-3 h-3 text-purple-400" /> : <Icons.Unlock className="w-3 h-3 text-white/20" />}
            <span>Alignment Lock</span>
          </label>
          <select
            value={lockedAlignment || ''}
            onChange={(e) => onSetLockedAlignment((e.target.value as CharacterAlignmentType) || null)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer backdrop-blur-md"
          >
            <option value="" className="bg-[#050b18] text-white">- Random Alignment -</option>
            {ALIGNMENTS.map((align) => (
              <option key={align} value={align} className="bg-[#050b18] text-white">
                {align}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Trigger Roll Call Action */}
      <button
        onClick={onGenerate}
        className="group relative w-full flex items-center justify-center gap-2.5 px-6 py-4.5 bg-white text-black font-serif-fantasy font-bold tracking-[0.2em] text-xs uppercase rounded-full overflow-hidden hover:scale-[1.03] active:scale-[0.99] transition-all duration-300 shadow-xl cursor-pointer"
      >
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Icons.RefreshCw className="relative z-10 w-4 h-4 animate-spin-slow text-black group-hover:text-white transition-colors duration-300" />
        <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">Summon Adventurer</span>
      </button>
    </div>
  );
};
