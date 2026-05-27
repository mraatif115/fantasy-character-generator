import React, { useState } from 'react';
import { Character } from '../types';
import { getCardStats } from '../utils/cardStats';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderHeart, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Flame, 
  Heart, 
  Zap, 
  Eye, 
  Gauge, 
  CircleDot 
} from 'lucide-react';

interface MyDeckProps {
  deck: Character[];
  activeCharacterId: string;
  onSelectCharacter: (character: Character) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
}

export const MyDeckTray: React.FC<MyDeckProps> = ({
  deck,
  activeCharacterId,
  onSelectCharacter,
  onRemoveFromDeck,
  onClearDeck,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Deck analysis / metrics
  const totalCards = deck.length;
  const avgLevel = totalCards > 0 
    ? (deck.reduce((sum, c) => sum + c.level, 0) / totalCards).toFixed(1) 
    : '0';
  
  const totalPower = totalCards > 0 
    ? deck.reduce((sum, c) => {
        const stats = getCardStats(c);
        return sum + stats.strength + stats.mana + stats.health;
      }, 0) 
    : 0;

  const majorClass = totalCards > 0 
    ? (() => {
        const counts: Record<string, number> = {};
        deck.forEach(c => counts[c.class] = (counts[c.class] || 0) + 1);
        return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      })() 
    : 'None';

  return (
    <div 
      id="deck-collection-tray" 
      className="bg-stone-950/80 border-t-2 border-amber-600/50 backdrop-blur-3xl shadow-[0_-15px_40px_rgba(0,0,0,0.8)] z-30 transition-all duration-300 relative rounded-t-[32px] overflow-hidden"
    >
      {/* Decorative top rivet layout */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex gap-48 text-stone-500/40 pointer-events-none text-[8px]">
        <span>✦ DETECTED PORTAL CHANNEL ✦</span>
        <span>✦ CORE MODULE ONLINE ✦</span>
      </div>

      {/* Header bar of the Deck */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 relative z-10 bg-stone-950/40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <FolderHeart className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-serif-fantasy font-medium uppercase tracking-wider text-amber-200">
                My Battle Deck
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/30">
                {totalCards} / 12 Cards
              </span>
            </div>
            <p className="text-[11px] text-white/40 font-sans mt-0.5">
              Your curated collection of legendaries saved for questing. Tap any card to review its sheets.
            </p>
          </div>
        </div>

        {/* Action button set */}
        <div className="flex items-center gap-3">
          {totalCards > 0 && (
            <button
              id="btn-clear-deck"
              type="button"
              onClick={() => {
                if (window.confirm("Disband your entire active battle deck?")) {
                  onClearDeck();
                }
              }}
              className="px-3.5 py-1.5 rounded-lg border border-red-500/35 hover:border-red-500/60 text-[10px] font-bold font-serif-fantasy uppercase tracking-wider text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/40 transition cursor-pointer active:scale-95"
            >
              Disband Deck
            </button>
          )}
          <button
            id="btn-toggle-deck-collapse"
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Drawer Content */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6">
              
              {totalCards === 0 ? (
                /* Empty Deck State */
                <div className="py-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-3.5">
                  <div className="w-12 h-12 rounded-full bg-dashed border border-amber-500/30 flex items-center justify-center text-amber-500/40 animate-pulse">
                    <CircleDot className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div>
                    <h3 className="text-xs font-serif-fantasy font-medium uppercase tracking-wider text-amber-300/80">
                      Empty Deck Slots
                    </h3>
                    <p className="text-[11px] text-white/40 leading-relaxed font-sans mt-1">
                      No legendary characters have been drafted. Generate a new hero above and click <span className="text-amber-400 font-semibold text-xs">Save to Deck</span> to begin compiling your magical army!
                    </p>
                  </div>
                </div>
              ) : (
                /* Active Deck Layout split into deck overview + card carousel */
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
                  
                  {/* Deck Metrics Panel */}
                  <div className="bg-stone-900/40 border border-stone-850 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-inner">
                    <span className="text-[10px] font-mono text-amber-450/60 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-amber-500/50" />
                      <span>Deck Analytics</span>
                    </span>
                    
                    <div className="grid grid-cols-2 gap-2 text-center py-1">
                      <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider block">Avg Level</span>
                        <span className="text-lg font-bold text-white font-mono">{avgLevel}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider block">Deck Power</span>
                        <span className="text-lg font-bold text-yellow-400 font-mono">{totalPower}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1.5 border-t border-white/5 text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-white/40">Primary Archetype:</span>
                        <span className="text-amber-300 font-bold">{majorClass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Mana Synergy Flow:</span>
                        <span className="text-emerald-400 font-bold font-mono">Stable</span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Deck Carousel */}
                  <div className="lg:col-span-3 overflow-x-auto flex items-center gap-4 py-2 px-1 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
                    {deck.map((character, index) => {
                      const stats = getCardStats(character);
                      const active = character.id === activeCharacterId;
                      
                      return (
                        <motion.div
                          key={character.id}
                          initial={{ opacity: 0, scale: 0.9, x: 20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 15 }}
                          transition={{ delay: index * 0.04 }}
                          className={`flex-shrink-0 w-44 rounded-2xl bg-stone-950/90 p-2.5 border-2 transition-all duration-200 relative group/card cursor-pointer flex flex-col justify-between aspect-[3/4.2] ${
                            active 
                              ? 'border-amber-450 shadow-[0_0_15px_rgba(245,158,11,0.25)] bg-stone-900/90' 
                              : 'border-amber-600/20 hover:border-amber-500/50'
                          }`}
                          onClick={() => onSelectCharacter(character)}
                        >
                          {/* Inside Mini-Card Elements */}
                          {/* Mini stats row */}
                          <div className="flex justify-between items-center z-10">
                            <span className="text-[9px] font-mono bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded font-bold">
                              Lvl {character.level}
                            </span>
                            
                            <button
                              id={`btn-remove-deck-${character.id}`}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFromDeck(character.id);
                              }}
                              className="w-5 h-5 rounded bg-black/50 hover:bg-red-950 border border-white/5 hover:border-red-500/50 text-white/50 hover:text-red-300 flex items-center justify-center transition"
                              title="Dismiss from deck"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Mini Center Image Portrait */}
                          <div className="relative w-full h-24 my-2.5 rounded-lg overflow-hidden border border-white/5 bg-stone-900 flex items-center justify-center">
                            {character.portrait ? (
                              <img 
                                src={character.portrait} 
                                alt={character.name} 
                                className="w-full h-full object-cover group-hover/card:scale-105 transition duration-500"
                                referrerPolicy="referrer"
                              />
                            ) : (
                              <Sparkles className="w-6 h-6 text-amber-500/20 animate-pulse" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-70" />
                            
                            {/* Dynamic CCG indicators overlayed in compact form */}
                            <div className="absolute bottom-1 px-1.5 inset-x-1 flex justify-between gap-1 text-[8px] font-mono">
                              {/* STR */}
                              <div className="bg-amber-600/90 text-white font-extrabold px-1 rounded flex items-center gap-0.5 shadow">
                                <Flame className="w-2 h-2 text-yellow-250 fill-yellow-250/30" />
                                <span>{stats.strength}</span>
                              </div>
                              {/* MANA */}
                              <div className="bg-blue-600/95 text-white font-extrabold px-1 rounded flex items-center gap-0.5 shadow">
                                <Zap className="w-2 h-2 text-blue-200 fill-blue-200/20" />
                                <span>{stats.mana}</span>
                              </div>
                              {/* HP */}
                              <div className="bg-rose-600/95 text-white font-extrabold px-1 rounded flex items-center gap-0.5 shadow">
                                <Heart className="w-2 h-2 text-rose-200 fill-rose-200/20" />
                                <span>{stats.health}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card Footer Banner */}
                          <div>
                            <p className="text-[10px] font-bold font-serif-fantasy uppercase text-amber-200 group-hover/card:text-amber-100 transition truncate text-center">
                              {character.name}
                            </p>
                            <p className="text-[8px] text-white/35 font-mono uppercase tracking-widest text-center mt-0.5 truncate">
                              {character.race} {character.class}
                            </p>
                          </div>

                          {/* Hover action overlay indicator */}
                          <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover/card:opacity-100 transition duration-150 rounded-2xl pointer-events-none flex items-center justify-center">
                            <span className="bg-stone-950/90 border border-amber-500/40 text-[8px] font-bold text-amber-300 rounded px-2 py-1 uppercase tracking-wider flex items-center gap-1 shadow-md">
                              <Eye className="w-2.5 h-2.5 text-amber-400" />
                              <span>View Sheet</span>
                            </span>
                          </div>

                        </motion.div>
                      );
                    })}
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
