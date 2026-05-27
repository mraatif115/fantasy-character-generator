import React from 'react';
import { Character } from '../types';
import { CLASSES_METADATA } from '../data';
import * as Icons from 'lucide-react';

interface HistorySidebarProps {
  characters: Character[];
  activeCharacterId: string;
  onSelectCharacter: (character: Character) => void;
  onDeleteCharacter: (id: string) => void;
  onClearAll: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  characters,
  activeCharacterId,
  onSelectCharacter,
  onDeleteCharacter,
  onClearAll
}) => {
  const renderClassIcon = (iconName: string, className = "w-4 h-4") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  return (
    <div className="bg-white/5 border border-white/5 shadow-2xl rounded-[30px] p-6 flex flex-col h-full backdrop-blur-md">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Icons.History className="w-4.5 h-4.5 text-blue-400" />
          <h3 className="text-sm font-semibold text-white font-serif-fantasy tracking-wider uppercase">
            Codex History ({characters.length})
          </h3>
        </div>
        {characters.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-[10px] font-mono tracking-tight font-medium text-white/40 hover:text-rose-400 flex items-center gap-1 transition duration-150 active:scale-95 px-2.5 py-1.5 rounded-lg border border-white/5 hover:border-rose-500/10 hover:bg-rose-500/5 cursor-pointer"
          >
            <Icons.Trash2 className="w-3.5 h-3.5" />
            <span>Clear Codex</span>
          </button>
        )}
      </div>

      {characters.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
          <Icons.Users className="w-8 h-8 text-white/20 animate-pulse-subtle" />
          <h4 className="text-xs font-semibold text-white/50 mt-3">Adventurer Codex Empty</h4>
          <p className="text-[11px] text-white/30 leading-relaxed max-w-[200px] mt-1">
            Generate characters above. They will be logged in your session history here.
          </p>
        </div>
      ) : (
        /* Printable characters container */
        <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[500px] lg:max-h-[700px] fantasy-scrollbar">
          {characters.map((char) => {
            const classMeta = CLASSES_METADATA[char.class];
            const isActive = char.id === activeCharacterId;

            return (
              <div
                key={char.id}
                className={`group relative flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white/10 border-white/20 shadow-lg shadow-purple-500/5'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-white/10'
                }`}
                onClick={() => onSelectCharacter(char)}
              >
                <div className="flex items-center gap-3 pr-2 min-w-0">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 bg-white/5 border-white/15`}>
                    {renderClassIcon(classMeta.icon, `w-4.5 h-4.5 ${classMeta.colorClass.text}`)}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold leading-tight font-sans truncate ${isActive ? 'text-white' : 'text-white/80'}`}>
                      {char.name}
                    </p>
                    <p className="text-[10px] text-white/40 font-mono flex items-center gap-1.5 mt-0.5">
                      <span>{char.race}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className={`${classMeta.colorClass.text}`}>{char.class}</span>
                    </p>
                  </div>
                </div>

                {/* Hover Delete Action Button */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCharacter(char.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1.5 rounded-lg text-white/40 hover:text-rose-450 hover:bg-rose-500/10 transition duration-150 relative z-10 cursor-pointer"
                    title="Delete record"
                  >
                    <Icons.Trash2 className="w-3.5 h-3.5 text-white/40 hover:text-rose-400" />
                  </button>
                  <Icons.ChevronRight className={`w-4 h-4 text-white/20 transition duration-200 ${isActive ? 'translate-x-0.5 text-blue-400' : 'group-hover:translate-x-0.5'}`} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
