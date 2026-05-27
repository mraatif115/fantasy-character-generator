import { useState, useEffect } from 'react';
import { Character, CharacterClassType, CharacterRaceType, CharacterAlignmentType } from './types';
import { generateRandomCharacter } from './data';
import { CharacterCard } from './components/CharacterCard';
import { HistorySidebar } from './components/HistorySidebar';
import { GenerationTools } from './components/GenerationTools';
import { MyDeckTray } from './components/MyDeckTray';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Dice5, ShieldAlert, Award, Copy, Check } from 'lucide-react';

export default function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [history, setHistory] = useState<Character[]>([]);
  const [deck, setDeck] = useState<Character[]>([]);
  
  // Locking states
  const [lockedClass, setLockedClass] = useState<CharacterClassType | null>(null);
  const [lockedRace, setLockedRace] = useState<CharacterRaceType | null>(null);
  const [lockedAlignment, setLockedAlignment] = useState<CharacterAlignmentType | null>(null);

  // Clipboard Copied Toast
  const [showToast, setShowToast] = useState(false);

  // Initialize with a character and deck on load
  useEffect(() => {
    // Attempt to load history from localStorage if available
    try {
      const stored = localStorage.getItem('fantasy_characters_codex');
      if (stored) {
        const parsed = JSON.parse(stored) as Character[];
        setHistory(parsed);
        if (parsed.length > 0) {
          setCharacter(parsed[0]);
        }
      } else {
        // fallback to rolling a fresh first character
        const firstChar = generateRandomCharacter();
        setCharacter(firstChar);
        setHistory([firstChar]);
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }

    // Attempt to load player deck from localStorage
    try {
      const storedDeck = localStorage.getItem('chronicles_player_deck');
      if (storedDeck) {
        setDeck(JSON.parse(storedDeck) as Character[]);
      }
    } catch (e) {
      console.error('Failed to load player deck', e);
    }
  }, []);

  // Save history on change
  const saveHistory = (newHistory: Character[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem('fantasy_characters_codex', JSON.stringify(newHistory));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  };

  // Save deck on change
  const saveDeck = (newDeck: Character[]) => {
    setDeck(newDeck);
    try {
      localStorage.setItem('chronicles_player_deck', JSON.stringify(newDeck));
    } catch (e) {
      console.error('Failed to save player deck', e);
    }
  };

  const handleSaveToDeck = (char: Character) => {
    const exists = deck.some((item) => item.id === char.id);
    if (exists) {
      const updated = deck.filter((item) => item.id !== char.id);
      saveDeck(updated);
    } else {
      if (deck.length >= 12) {
        alert("Your Active Battle Deck is full (maximum 12 cards). Please disband some legends to make space.");
        return;
      }
      const updated = [...deck, char];
      saveDeck(updated);
    }
  };

  const handleRemoveFromDeck = (id: string) => {
    const updated = deck.filter((item) => item.id !== id);
    saveDeck(updated);
  };

  const handleClearDeck = () => {
    saveDeck([]);
  };

  const handleGenerate = () => {
    const fresh = generateRandomCharacter({
      lockedClass,
      lockedRace,
      lockedAlignment
    });

    setCharacter(fresh);

    // Add to history at top of stack, cap at 15
    const updated = [fresh, ...history.filter(item => item.id !== fresh.id)].slice(0, 15);
    saveHistory(updated);
  };

  const handleSelectCharacter = (char: Character) => {
    setCharacter(char);
  };

  const handleUpdateCharacter = (updatedChar: Character) => {
    setCharacter(updatedChar);
    const updatedHistory = history.map((char) => char.id === updatedChar.id ? updatedChar : char);
    saveHistory(updatedHistory);
    
    // Also update in deck if it exists inside the deck
    if (deck.some((item) => item.id === updatedChar.id)) {
      const updatedDeck = deck.map((item) => item.id === updatedChar.id ? updatedChar : item);
      saveDeck(updatedDeck);
    }
  };

  const handleDeleteCharacter = (id: string) => {
    const updated = history.filter((char) => char.id !== id);
    saveHistory(updated);

    // Also remove from deck if deleted from codex history
    if (deck.some((item) => item.id === id)) {
      handleRemoveFromDeck(id);
    }

    // If active character was deleted, select the first in list or roll a new one
    if (character?.id === id) {
      if (updated.length > 0) {
        setCharacter(updated[0]);
      } else {
        const fresh = generateRandomCharacter();
        setCharacter(fresh);
        saveHistory([fresh]);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your character history?')) {
      const fresh = generateRandomCharacter();
      setCharacter(fresh);
      saveHistory([fresh]);
    }
  };

  // Compose copy-to-clipboard markdown payload
  const handleCopyToClipboard = () => {
    if (!character) return;
    
    const md = `### 🛡️ ${character.name} \n` +
      `**Level ${character.level} ${character.race} ${character.class}**\n` +
      `**Alignment:** ${character.alignment}\n` +
      `**HP:** ${character.healthPoints} | **Gold:** ${character.gold} GP\n\n` +
      `**Core Attributes:**\n` +
      `- Strength: ${character.attributes.strength} (${Math.floor((character.attributes.strength - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.attributes.strength - 10) / 2)})\n` +
      `- Dexterity: ${character.attributes.dexterity} (${Math.floor((character.attributes.dexterity - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.attributes.dexterity - 10) / 2)})\n` +
      `- Constitution: ${character.attributes.constitution} (${Math.floor((character.attributes.constitution - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.attributes.constitution - 10) / 2)})\n` +
      `- Intelligence: ${character.attributes.intelligence} (${Math.floor((character.attributes.intelligence - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.attributes.intelligence - 10) / 2)})\n` +
      `- Wisdom: ${character.attributes.wisdom} (${Math.floor((character.attributes.wisdom - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.attributes.wisdom - 10) / 2)})\n` +
      `- Charisma: ${character.attributes.charisma} (${Math.floor((character.attributes.charisma - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.attributes.charisma - 10) / 2)})\n\n` +
      `**Background Biography:**\n` +
      `"${character.bio}"\n\n` +
      `**Starting Equipment:**\n` +
      character.inventory.map((item, i) => `${i + 1}. ${item}`).join('\n');

    navigator.clipboard.writeText(md).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  const rollStatsTotal = (char: Character): number => {
    return (
      char.attributes.strength +
      char.attributes.dexterity +
      char.attributes.constitution +
      char.attributes.intelligence +
      char.attributes.wisdom +
      char.attributes.charisma
    );
  };

  return (
    <div className="min-h-screen alchemist-bg text-white flex flex-col selection:bg-purple-900/30 selection:text-white relative overflow-hidden">
      
      {/* Ancient Workbench Wood Texture Overlays */}
      <div className="alchemist-texture" />
      
      {/* Magical Atmosphere Candlelight Glows */}
      <div className="absolute top-[-5%] left-[15%] w-[450px] h-[450px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse-subtle" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[30%] right-[5%] w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* Runic Circle Watermark decoration in background */}
      <svg className="absolute -left-32 top-1/4 w-96 h-96 opacity-[0.03] text-purple-400 pointer-events-none animate-spin-slow" style={{ animationDuration: '120s' }} fill="currentColor" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 50 10 L 50 90 M 10 50 L 90 50 L 10 50 Z" stroke="currentColor" strokeWidth="0.5" />
        <polygon points="50,15 80,70 20,70" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <polygon points="50,85 80,30 20,30" fill="none" stroke="currentColor" strokeWidth="0.75" />
      </svg>
      <svg className="absolute -right-32 bottom-1/4 w-[500px] h-[500px] opacity-[0.02] text-amber-500 pointer-events-none animate-spin-slow" style={{ animationDuration: '180s', animationDirection: 'reverse' }} fill="currentColor" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
        <polygon points="50,10 85,80 15,80" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="50,90 85,20 15,20" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      {/* Elegant Floating Magic Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-[20%] left-[10%] w-1.5 h-1.5 rounded-full bg-amber-400/60 blur-xs animate-magic-particle" style={{ animationDelay: '0s', animationDuration: '9s' }} />
        <div className="absolute bottom-[10%] left-[45%] w-2 h-2 rounded-full bg-purple-400/50 blur-xs animate-magic-particle" style={{ animationDelay: '2.5s', animationDuration: '11s' }} />
        <div className="absolute bottom-[30%] right-[15%] w-1.5 h-1.5 rounded-full bg-blue-400/60 blur-xs animate-magic-particle" style={{ animationDelay: '1.2s', animationDuration: '8s' }} />
        <div className="absolute bottom-[15%] right-[40%] w-2 h-2 rounded-full bg-amber-500/50 blur-xs animate-magic-particle" style={{ animationDelay: '4.7s', animationDuration: '10s' }} />
        <div className="absolute bottom-[5%] left-[25%] w-1 h-1 rounded-full bg-purple-500/70 blur-xs animate-magic-particle" style={{ animationDelay: '6s', animationDuration: '7s' }} />
        <div className="absolute bottom-[40%] left-[70%] w-1.5 h-1.5 rounded-full bg-emerald-400/50 blur-xs animate-magic-particle" style={{ animationDelay: '3.1s', animationDuration: '12s' }} />
      </div>
      
      {/* Decorative Top Border Line */}
      <div className="h-1 bg-gradient-to-r from-amber-600/60 via-purple-600/50 to-blue-600/60 w-full z-10 opacity-70" />

      {/* Main Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-10 pb-6 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-blue-400 opacity-85 block mb-1">
              Arcane Manifestation
            </span>
            <h1 className="text-2xl md:text-4xl font-serif-fantasy italic tracking-tight text-white font-medium">
              Chronicles of Aether
            </h1>
            <p className="text-xs text-white/50 tracking-wider mt-1 font-sans">
              Fantasy Character Generator • Summon unique legends, attributes, backgrounds, and gear.
            </p>
          </div>
        </div>

        {/* Global summary count */}
        {character && (
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3 px-5 shadow-inner backdrop-blur-md">
            <div className="text-right">
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Active power sum</p>
              <p className="text-sm font-bold text-blue-300 font-mono">
                {rollStatsTotal(character)} cumulative points
              </p>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Adventure Level</p>
                <p className="text-sm font-semibold text-white/80 font-mono">Lvl {character.level}</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Workspace Layout Grid */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Display + Lock Tools Side (Takes 2 columns of 3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Locking and Summon Toolbar */}
            <GenerationTools
              lockedClass={lockedClass}
              lockedRace={lockedRace}
              lockedAlignment={lockedAlignment}
              onSetLockedClass={setLockedClass}
              onSetLockedRace={setLockedRace}
              onSetLockedAlignment={setLockedAlignment}
              onGenerate={handleGenerate}
            />

            {/* Main Character Sheet Card */}
            <AnimatePresence mode="wait">
              {character && (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <CharacterCard
                    character={character}
                    onCopyToClipboard={handleCopyToClipboard}
                    onUpdateCharacter={handleUpdateCharacter}
                    onSaveToDeck={handleSaveToDeck}
                    isInDeck={deck.some((item) => item.id === character.id)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Codex History Side (Takes 1 column of 3) */}
          <div className="space-y-6 h-full">
            <HistorySidebar
              characters={history}
              activeCharacterId={character?.id || ''}
              onSelectCharacter={handleSelectCharacter}
              onDeleteCharacter={handleDeleteCharacter}
              onClearAll={handleClearAll}
            />

            {/* Quick Helper Tips Panel */}
            <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-5 space-y-3.5 backdrop-blur-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-serif-fantasy flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                <span>Summoning Tips</span>
              </h4>
              <ul className="text-[11px] text-slate-500 space-y-2.5 list-disc pl-4 leading-relaxed font-sans">
                <li>
                  <strong className="text-slate-400">Lock Attributes:</strong> Use the selectors at the top to lock categories (e.g. Mage class). The algorithm will always balance attributes (e.g. high Intelligence for Wizard classes).
                </li>
                <li>
                  <strong className="text-slate-400">Markdown Export:</strong> Click <strong className="text-slate-300">Copy Export</strong> to copy your character sheet as beautifully structured markdown, perfect for RPG notes or Obsidian.
                </li>
                <li>
                  <strong className="text-slate-400">Session Storage:</strong> Generated characters are saved in your browser storage. They stay safe even if you reload or close the tab!
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      {/* Collectible Deck Tray */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 mb-12">
        <MyDeckTray
          deck={deck}
          activeCharacterId={character?.id || ''}
          onSelectCharacter={handleSelectCharacter}
          onRemoveFromDeck={handleRemoveFromDeck}
          onClearDeck={handleClearDeck}
        />
      </div>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
        <p className="font-sans">
          &copy; 2026 Fantasy Character Generator. Built for desktop-first scale and mobile adaptability.
        </p>
        <p className="font-mono text-[10px] tracking-wider uppercase bg-slate-900/50 p-2 rounded-xl border border-slate-900">
          UTC: 2026-05-27 11:08Z
        </p>
      </footer>

      {/* Absolute Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-purple-500 text-slate-200 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-md"
          >
            <div className="p-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100">Codex Export Copied!</p>
              <p className="text-[10px] text-slate-400">Markdown copied to clipboard successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
