import React, { useState } from 'react';
import { Character, CharacterClassType, CharacterRaceType } from '../types';
import { CLASSES_METADATA, RACES_METADATA } from '../data';
import { StatsView } from './StatsView';
import { generateBackstoryForCharacter } from '../utils/backstory';
import { getCardStats } from '../utils/cardStats';
import * as Icons from 'lucide-react';

// Preset portraits for high-fantasy digital art style (Mythic Art)
export const PORTRAIT_PRESETS: Record<CharacterClassType, string[]> = {
  Warrior: [
    'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&h=600&q=80',
  ],
  Mage: [
    'https://images.unsplash.com/photo-1514894780887-121968d00567?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=500&h=600&q=80',
  ],
  Rogue: [
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?auto=format&fit=crop&w=500&h=600&q=80',
  ],
  Cleric: [
    'https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=500&h=600&q=80',
  ],
  Ranger: [
    'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500&h=600&q=80',
  ],
  Paladin: [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=400&h=400&q=80',
  ],
  Bard: [
    'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&h=600&q=80',
  ],
  Druid: [
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500&h=600&q=80',
  ],
  Warlock: [
    'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&h=600&q=80',
  ],
  Necromancer: [
    'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&h=600&q=80',
  ],
  Barbarian: [
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&h=400&q=80',
  ],
  Alchemist: [
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&h=600&q=80',
    'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=505&h=605&q=80',
    'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=400&h=400&q=80',
  ]
};

// Return a precise, themed portal/game frame URL matching Style selection and Character class
const getPortraitUrl = (style: 'adventurer' | 'pixel' | 'mythic', charClass: CharacterClassType, name: string) => {
  if (style === 'mythic') {
    const list = PORTRAIT_PRESETS[charClass] || PORTRAIT_PRESETS['Warrior'];
    // Deterministic selection based on name hash so shifting styles retains a beautiful face, with random modifier support
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % list.length;
    return list[index];
  } else if (style === 'pixel') {
    // Dicebear pixel-art matches Retro 8-Bit classic gaming
    return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(name + '_' + charClass)}&backgroundColor=050b18`;
  } else {
    // Dicebear adventurer matches high quality medieval RPG cartoon portraits
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name + '_' + charClass)}&backgroundColor=050b18`;
  }
};

interface CharacterCardProps {
  character: Character;
  onCopyToClipboard: () => void;
  onUpdateCharacter: (character: Character) => void;
  onSaveToDeck?: (character: Character) => void;
  isInDeck?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  onCopyToClipboard, 
  onUpdateCharacter,
  onSaveToDeck,
  isInDeck = false
}) => {
  const cardStats = getCardStats(character);
  const classMeta = CLASSES_METADATA[character.class];
  const raceMeta = RACES_METADATA[character.race];
  const [copiedTick, setCopiedTick] = useState(false);
  const [portraitStyle, setPortraitStyle] = useState<'adventurer' | 'pixel' | 'mythic'>('adventurer');
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic Lucide icon loader
  const renderClassIcon = (iconName: string, className = "w-6 h-6") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  const handleCopy = () => {
    onCopyToClipboard();
    setCopiedTick(true);
    setTimeout(() => setCopiedTick(false), 2000);
  };

  const handleGenerateBackstory = () => {
    const generatedBio = generateBackstoryForCharacter(character);
    onUpdateCharacter({
      ...character,
      bio: generatedBio,
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedUrl = getPortraitUrl(portraitStyle, character.class, character.name);
      onUpdateCharacter({
        ...character,
        portrait: generatedUrl,
      });
      setIsGenerating(false);
    }, 1200);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Shuffles seeds to roll a different randomized aspect
      const salt = Math.random().toString(36).substring(7);
      const generatedUrl = getPortraitUrl(portraitStyle, character.class, character.name + '_' + salt);
      onUpdateCharacter({
        ...character,
        portrait: generatedUrl,
      });
      setIsGenerating(false);
    }, 1200);
  };

  // Automatically update portrait when style selection changes, if a portrait is already present
  const handleStyleChange = (style: 'adventurer' | 'pixel' | 'mythic') => {
    setPortraitStyle(style);
    if (character.portrait) {
      setIsGenerating(true);
      setTimeout(() => {
        const generatedUrl = getPortraitUrl(style, character.class, character.name);
        onUpdateCharacter({
          ...character,
          portrait: generatedUrl,
        });
        setIsGenerating(false);
      }, 1000);
    }
  };

  return (
    <div id="character-main-card" className={`relative bg-stone-950/70 border border-purple-500/20 rounded-[30px] overflow-hidden shadow-2xl backdrop-blur-3xl transition-all duration-300 hover:border-purple-400/40 magical-glow-card`}>
      {/* Dynamic Magical Sparkles inside card */}
      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none overflow-hidden opacity-30 z-0">
        <div className="absolute top-[20%] left-[20%] w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
        <div className="absolute top-[40%] right-[30%] w-[2px] h-[2px] rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] left-[45%] w-1 h-1 rounded-full bg-blue-300 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Dynamic Aura Gradient Accent */}
      <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b opacity-[0.25] pointer-events-none`}
        style={{
          background: `linear-gradient(180deg, ${
            character.class === 'Warrior' ? '#EF4444' :
            character.class === 'Mage' ? '#3B82F6' :
            character.class === 'Rogue' ? '#64748B' :
            character.class === 'Cleric' ? '#F59E0B' :
            character.class === 'Ranger' ? '#10B981' :
            character.class === 'Paladin' ? '#EAB308' :
            character.class === 'Bard' ? '#EC4899' :
            character.class === 'Druid' ? '#14B8A6' :
            character.class === 'Warlock' ? '#A855F7' :
            character.class === 'Necromancer' ? '#6366F1' :
            character.class === 'Barbarian' ? '#F97316' : '#06B6D4' // Alchemist
          }50 0%, rgba(15, 23, 42, 0) 100%)`
        }}
      />

      {/* Card Header Frame */}
      <div className="p-6 md:p-8 pb-3 border-b border-white/10 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Portrait Shield & Basic Info */}
          <div className="flex items-center gap-4">
            {/* Class Specific Badge Emblem */}
            <div className={`relative flex items-center justify-center w-14 h-14 rounded-2xl border border-white/15 shadow-lg bg-white/5 flex-shrink-0 animate-pulse-subtle`}>
              {renderClassIcon(classMeta.icon, `w-7 h-7 ${classMeta.colorClass.text}`)}
              <div className="absolute -bottom-1 -right-1 bg-[#050b18] border border-white/15 text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold text-white/80">
                Lvl {character.level}
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-3.5xl font-fantasy text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200 tracking-wide select-all drop-shadow-[0_2px_10px_rgba(251,191,36,0.15)]">
                {character.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className={`text-[10px] font-bold font-serif-fantasy px-2.5 py-0.5 rounded-md uppercase tracking-wider bg-stone-900/60 text-amber-300 border border-amber-500/20`}>
                  {character.race}
                </span>
                <span className={`text-[10px] font-bold font-serif-fantasy px-2.5 py-0.5 rounded-md uppercase tracking-wider bg-purple-950/40 text-purple-300 border border-purple-500/30`}>
                  {character.class}
                </span>
                <span className="text-xs font-medium text-white/40 font-mono tracking-tight bg-white/[0.02] px-2 py-0.5 rounded">
                  {character.alignment}
                </span>
              </div>
            </div>
          </div>

          {/* Top action buttons */}
          <div className="flex items-center flex-wrap gap-2.5 w-full md:w-auto justify-end">
            {onSaveToDeck && (
              <button
                id="btn-save-to-deck"
                onClick={() => onSaveToDeck(character)}
                className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold font-serif-fantasy uppercase tracking-wider rounded-xl transition duration-150 active:scale-95 cursor-pointer shadow-md ${
                  isInDeck 
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/30'
                }`}
                title={isInDeck ? "This character is in your deck" : "Save this character to your player deck"}
              >
                {isInDeck ? (
                  <>
                    <Icons.CheckSquare className="w-4 h-4 text-amber-400" />
                    <span>In Your Deck</span>
                  </>
                ) : (
                  <>
                    <Icons.BookmarkPlus className="w-4 h-4 text-emerald-100" />
                    <span>Save to Deck</span>
                  </>
                )}
              </button>
            )}

            <button
              id="btn-copy-export"
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-xl transition duration-150 active:scale-95 cursor-pointer"
              title="Copy Character sheet as Markdown"
            >
              {copiedTick ? (
                <>
                  <Icons.Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Icons.Copy className="w-4 h-4 text-white/40" />
                  <span>Copy Export</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Level Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          <div className="bg-white/5 border border-white/5 rounded-xl px-3.5 py-2.5 flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-455">
              <Icons.Heart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Health Points</p>
              <p className="text-sm font-bold text-white font-mono">{character.healthPoints} HP</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl px-3.5 py-2.5 flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-455">
              <Icons.Coins className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider font-medium">Starting Funds</p>
              <p className="text-sm font-bold text-white font-mono">{character.gold} GP</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white/5 border border-white/5 rounded-xl px-3.5 py-2.5 flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-405">
              <Icons.Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider font-medium">Character ID</p>
              <p className="text-xs font-bold text-white/90 font-mono uppercase">#{character.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Split columns */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Portrait and Controls */}
          <div className="lg:col-span-5 space-y-5">
            {/* PHYSICAL BORDERED PLAYER CARD FRAME */}
            <div className="relative group rounded-[24px] overflow-hidden border-[6px] border-amber-600/80 bg-stone-950 p-[5px] aspect-[3/4] flex flex-col shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.1)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.2)] hover:border-amber-500/90 transition-all duration-300">
              
              {/* Ornate Gold Inlay Borders */}
              <div className="absolute inset-1 border border-amber-500/20 rounded-[16px] pointer-events-none z-10" />
              <div className="absolute inset-2 border-[2px] border-amber-500/45 rounded-[12px] pointer-events-none z-10" />
              
              {/* Ornate Card Corners */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-amber-400/90 z-20 group-hover:scale-105 transition-all duration-300" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-amber-400/90 z-20 group-hover:scale-105 transition-all duration-300" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-amber-400/90 z-20 group-hover:scale-105 transition-all duration-300" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-amber-400/90 z-20 group-hover:scale-105 transition-all duration-300" />

              {/* DYNAMIC PLAYER CARD STATS OVERLAYS (Health, Mana, Strength) */}
              {/* 1. MANA ORB/GEMS - Top Right */}
              <div className="absolute top-4 right-4 z-30 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] hover:scale-110 transition duration-200">
                <div className="w-11 h-11 rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-blue-500 via-blue-600 to-indigo-900 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-300/10 animate-pulse pointer-events-none" />
                  <Icons.Zap className="w-3.5 h-3.5 text-blue-200 mt-0.5" />
                  <span className="text-[11px] font-bold font-mono text-white leading-none -mt-0.5">{cardStats.mana}</span>
                  <span className="text-[6px] font-bold font-mono text-blue-200 scale-90 leading-none pb-0.5">MANA</span>
                </div>
              </div>
              
              {/* 2. STRENGTH INLAY - Bottom Left */}
              <div className="absolute bottom-18 left-4 z-30 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] hover:scale-110 transition duration-200">
                <div className="w-11 h-11 rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-amber-500 via-amber-600 to-yellow-900 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber-400/10 animate-pulse pointer-events-none" />
                  <Icons.Swords className="w-3.5 h-3.5 text-amber-200 mt-0.5" />
                  <span className="text-[11px] font-bold font-mono text-white leading-none -mt-0.5">{cardStats.strength}</span>
                  <span className="text-[6px] font-bold font-mono text-amber-100 scale-90 leading-none pb-0.5">STR</span>
                </div>
              </div>

              {/* 3. HEALTH ORB - Bottom Right */}
              <div className="absolute bottom-18 right-4 z-30 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] hover:scale-110 transition duration-200">
                <div className="w-11 h-11 rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-rose-500 via-rose-600 to-red-950 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-rose-450/10 animate-pulse pointer-events-none" />
                  <Icons.Heart className="w-3.5 h-3.5 text-rose-200 mt-0.5 fill-rose-200/20" />
                  <span className="text-[11px] font-bold font-mono text-white leading-none -mt-0.5">{cardStats.health}</span>
                  <span className="text-[6px] font-bold font-mono text-rose-200 scale-90 leading-none pb-0.5">HP</span>
                </div>
              </div>

              {/* Card Level Badge - Top Left */}
              <div className="absolute top-4 left-4 z-30 bg-amber-500 text-stone-950 font-extrabold font-serif-fantasy uppercase text-[9px] tracking-widest px-2.5 py-1 rounded-md border border-amber-400/60 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                LVL {character.level}
              </div>

              {/* Image display layer */}
              {character.portrait ? (
                <div className="relative w-full h-full rounded-[10px] overflow-hidden">
                  <img
                    src={character.portrait}
                    alt={`${character.name} Portrait`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette/gradient map overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-black/35 opacity-75 pointer-events-none" />
                  
                  {/* Bottom Portrait Tab detailing Race & Class (Collectible Ribbon style) */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-stone-950/95 border border-amber-500/30 rounded-lg flex flex-col items-center justify-center text-center pointer-events-none shadow-md z-20">
                    <span className="text-xs font-bold tracking-wider text-amber-200 font-serif-fantasy uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] truncate max-w-full">
                      {character.name}
                    </span>
                    <span className="text-[9px] font-sans font-bold text-white/40 uppercase tracking-widest mt-0.5">
                      {character.race} {character.class}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-stone-900/60 rounded-[10px]">
                  {/* Arcane Compass design spinner (simulated) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-42 h-42 rounded-full border border-dashed border-amber-500/10 animate-spin pointer-events-none" style={{ animationDuration: '40s' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-dotted border-amber-500/10 animate-spin pointer-events-none" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
                  
                  <div className="p-4 rounded-full bg-amber-500/5 border border-amber-500/20 text-amber-400/40 mb-4 animate-pulse relative z-10">
                    <Icons.Camera className="w-8 h-8 text-amber-400 opacity-60" />
                  </div>
                  <h4 className="text-xs font-serif-fantasy font-medium uppercase tracking-[0.15em] text-amber-300 relative z-10">
                    Card Art Unmanifested
                  </h4>
                  <p className="text-[11px] text-white/40 max-w-[200px] mt-2 leading-relaxed relative z-10 font-sans">
                    Tap the Aetherial channels to draw a custom cartoon or pixel-art representation for this card.
                  </p>

                  {/* Bottom Portrait Tab for card representation even when empty */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-stone-950/95 border border-amber-500/30 rounded-lg flex flex-col items-center justify-center text-center pointer-events-none shadow-md z-20">
                    <span className="text-xs font-bold tracking-wider text-amber-200 font-serif-fantasy uppercase truncate max-w-full">
                      {character.name}
                    </span>
                    <span className="text-[9px] font-sans font-bold text-white/40 uppercase tracking-widest mt-0.5">
                      {character.race} {character.class}
                    </span>
                  </div>
                </div>
              )}

              {/* Generating Scanning Overlay */}
              {isGenerating && (
                <div className="absolute inset-0 bg-[#050b18]/95 z-20 flex flex-col items-center justify-center text-center p-4 rounded-[10px]">
                  <div className="relative mb-4">
                    {/* Pulsing visual circles */}
                    <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping" />
                    <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <Icons.Sun className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-amber-450">
                    Weaving Magic Threads
                  </span>
                  <p className="text-xs font-mono text-stone-200 mt-1 max-w-[220px]">
                    Scribing {character.class} portrait...
                  </p>
                  
                  {/* Modern gaming styled loading log */}
                  <div className="mt-4 pt-3 border-t border-amber-500/10 w-full max-w-[180px]">
                    <div className="flex justify-between text-[8px] font-mono text-amber-400/40 tracking-widest uppercase">
                      <span>Card sync</span>
                      <span className="text-emerald-400 animate-pulse">Engraving</span>
                    </div>
                    <div className="h-[2px] w-full bg-stone-900 rounded-full overflow-hidden mt-1.5 border border-amber-500/10">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 animate-pulse" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Controls Box */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
              {/* Style selector heading */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Avatar Medium
                </span>
                <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-white/5 text-white/60 font-medium">
                  {portraitStyle === 'adventurer' ? 'RPG Cartoon' : portraitStyle === 'pixel' ? '8-Bit Retro' : 'Mythic Art'}
                </span>
              </div>

              {/* Style Choice Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/25 border border-white/5 rounded-xl text-[10px] font-mono tracking-wider uppercase">
                <button
                  id="tab-style-cartoon"
                  type="button"
                  onClick={() => handleStyleChange('adventurer')}
                  className={`py-2 px-1 rounded-lg text-center transition font-semibold cursor-pointer ${
                    portraitStyle === 'adventurer'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  Cartoon
                </button>
                <button
                  id="tab-style-pixel"
                  type="button"
                  onClick={() => handleStyleChange('pixel')}
                  className={`py-2 px-1 rounded-lg text-center transition font-semibold cursor-pointer ${
                    portraitStyle === 'pixel'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  Pixel
                </button>
                <button
                  id="tab-style-mythic"
                  type="button"
                  onClick={() => handleStyleChange('mythic')}
                  className={`py-2 px-1 rounded-lg text-center transition font-semibold cursor-pointer ${
                    portraitStyle === 'mythic'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  Mythic
                </button>
              </div>

              {/* TWO BUTTONS: Generate Portrait and Regenerate Portrait */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  id="btn-generate-portrait"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-white/90 text-black rounded-xl font-serif-fantasy font-bold tracking-wider text-[11px] uppercase transition active:scale-98 disabled:opacity-50 cursor-pointer shadow-md"
                >
                  <Icons.Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Generate Portrait</span>
                </button>
                <button
                  id="btn-regenerate-portrait"
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl font-serif-fantasy font-bold tracking-wider text-[11px] uppercase transition active:scale-98 disabled:opacity-40 cursor-pointer shadow-sm"
                >
                  <Icons.RefreshCw className={`w-3.5 h-3.5 text-white/80 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>Regenerate Portrait</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Character bio, attributes, specs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Custom Backstory Quote Box */}
            <div className="bg-stone-950/40 border border-stone-800 border-l-4 border-l-amber-500/70 rounded-r-2xl p-5 relative overflow-hidden group/bio shadow-inner">
              <Icons.Quote className="absolute -right-2 -bottom-2 w-20 h-20 text-white/[0.01] pointer-events-none" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 pb-2.5 border-b border-white/5 relative z-10">
                <span className="text-[10px] font-mono text-amber-550/60 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Icons.BookOpen className="w-3.5 h-3.5 text-amber-500/50" />
                  <span>Scroll of Destiny</span>
                </span>
                <button
                  id="btn-generate-backstory"
                  type="button"
                  onClick={handleGenerateBackstory}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold font-serif-fantasy uppercase tracking-wider text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400/50 rounded-lg transition duration-200 cursor-pointer active:scale-95 shadow-md self-end sm:self-auto"
                >
                  <Icons.Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Generate Backstory</span>
                </button>
              </div>
              <p className="text-xs font-sans text-white/85 leading-relaxed italic relative z-10">
                "{character.bio}"
              </p>
              <p className="text-[10px] font-mono text-white/30 mt-3 text-right">
                — {character.name}'s Chronicle
              </p>
            </div>

            {/* Attributes panel */}
            <StatsView
              attributes={character.attributes}
              primaryStats={classMeta.primaryStats}
              themeColor={classMeta.colorClass.accent}
            />

            {/* Ancestry Trait & Equipment Split Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Racial Trait */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wider text-white/40 uppercase font-serif-fantasy border-b border-white/10 pb-2 flex items-center gap-2">
                  <Icons.Users className="w-4 h-4 text-white/40" />
                  <span>Ancestry Trait</span>
                </h3>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                      {raceMeta.trait}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white/90 mt-1">
                    {raceMeta.name} Heritage:
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    {raceMeta.traitDescription}
                  </p>
                  <p className="text-[11px] text-white/40 pt-1 leading-relaxed border-t border-white/10 mt-2 font-sans">
                    {raceMeta.description}
                  </p>
                </div>
              </div>

              {/* Starting Kit */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wider text-white/40 uppercase font-serif-fantasy border-b border-white/10 pb-2 flex items-center gap-2">
                  <Icons.BookOpen className="w-4 h-4 text-white/40" />
                  <span>Starting Equipment</span>
                </h3>
                <div className="space-y-2">
                  {character.inventory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold font-mono text-purple-400">
                          {index + 1}
                        </span>
                        <span className="text-xs font-medium text-white/80">{item}</span>
                      </div>
                      <span className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                        {index === 0 ? 'Equipped' : 'At Belt'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
