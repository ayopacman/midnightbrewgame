import React, { useState } from 'react';
import { RECIPES } from '../data/recipes';
import { playClick } from '../utils/audio';
import { 
  X, 
  BookOpen, 
  Search, 
  Flame, 
  Snowflake, 
  Sparkles, 
  Coffee, 
  Award,
  Tag
} from 'lucide-react';

interface RecipeBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeBookModal: React.FC<RecipeBookModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string>('all');

  if (!isOpen) return null;

  const filteredRecipes = RECIPES.filter((r) => {
    const matchesSearch = 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.flavorProfile.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;
    if (filterTag === 'all') return true;
    if (filterTag === 'iced') return r.temperature === 'ICED';
    if (filterTag === 'hot') return r.temperature === 'HOT';
    if (filterTag === 'matcha') return r.base === 'matcha';
    if (filterTag === 'tea') return r.base === 'black_tea';
    if (filterTag === 'espresso') return r.base === 'espresso' || r.base === 'double_espresso';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FFFDF9] dark:bg-stone-900 border-2 border-pink-200 dark:border-stone-800 rounded-3xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-pink-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-800 dark:text-stone-100">
                Midnight Brew Recipe Grimoire
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Master barista secret recipes, flavor notes, and ratios
              </p>
            </div>
          </div>
          <button
            onClick={() => { playClick(); onClose(); }}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, flavor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-stone-100/80 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Drinks' },
              { id: 'espresso', label: '☕ Espresso' },
              { id: 'matcha', label: '🍵 Matcha' },
              { id: 'tea', label: '🫖 Tea' },
              { id: 'hot', label: '🔥 Hot' },
              { id: 'iced', label: '🧊 Iced' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { playClick(); setFilterTag(tab.id); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterTag === tab.id
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-pink-100 hover:text-rose-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Cards List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-pink-100 dark:border-stone-700/80 shadow-sm hover:shadow-md hover:border-pink-200 transition-all flex flex-col sm:flex-row gap-4"
            >
              {/* Recipe Icon & Tag */}
              <div className="flex sm:flex-col items-center justify-between sm:justify-center p-3 rounded-xl bg-pink-50/60 dark:bg-stone-700/50 min-w-[90px] text-center">
                <div className="text-3xl mb-1">{recipe.icon}</div>
                <div className="flex flex-col items-center">
                  <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    recipe.temperature === 'HOT'
                      ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300'
                      : 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300'
                  }`}>
                    {recipe.temperature === 'HOT' ? <Flame className="w-2.5 h-2.5" /> : <Snowflake className="w-2.5 h-2.5" />}
                    <span>{recipe.temperature}</span>
                  </span>
                  <span className="text-[11px] font-bold text-rose-600 mt-1">
                    ${recipe.price}
                  </span>
                </div>
              </div>

              {/* Recipe Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-serif font-bold text-base text-stone-800 dark:text-stone-100">
                      {recipe.name}
                    </h4>
                    <p className="text-xs text-rose-500 font-medium -mt-0.5">
                      {recipe.subtitle}
                    </p>
                  </div>
                  {recipe.requiresLatteArt && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Art Bonus</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1.5">
                  {recipe.description}
                </p>

                {/* Formulation Formula */}
                <div className="mt-2.5 p-2 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-700/60 flex flex-wrap items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-rose-500">Formula:</span>
                  <span className="px-2 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[11px] font-medium">
                    Base: {recipe.base.replace('_', ' ').toUpperCase()}
                  </span>
                  <span>+</span>
                  <span className="px-2 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[11px] font-medium">
                    Liquid: {recipe.liquid.replace('_', ' ').toUpperCase()}
                  </span>
                  {recipe.addIns.length > 0 && (
                    <>
                      <span>+</span>
                      <span className="px-2 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                        Extras: {recipe.addIns.map((a) => a.replace('_', ' ')).join(', ')}
                      </span>
                    </>
                  )}
                </div>

                {/* Flavor Profile Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mt-2">
                  {recipe.flavorProfile.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-pink-50 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[10px] font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredRecipes.length === 0 && (
            <div className="text-center py-10 text-stone-400">
              <Coffee className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No recipes found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-pink-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>{RECIPES.length} Total Master Recipes Available</span>
          <button
            onClick={() => { playClick(); onClose(); }}
            className="px-4 py-1.5 rounded-xl font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-xs"
          >
            Close Grimoire
          </button>
        </div>
      </div>
    </div>
  );
};
