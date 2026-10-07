import React, { useState } from 'react';
import { BrewGramPost, CustomerChatThread } from '../types/game';
import { INITIAL_BREWGRAM_POSTS, INITIAL_CHATS } from '../data/brewgram';
import { playClick, playSuccessChime } from '../utils/audio';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Send, 
  Sparkles, 
  Star, 
  Smartphone,
  Camera,
  Share2,
  CheckCheck
} from 'lucide-react';

interface PhoneAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnXP: (amount: number) => void;
}

export const PhoneAppModal: React.FC<PhoneAppModalProps> = ({
  isOpen,
  onClose,
  onEarnXP,
}) => {
  const [activeTab, setActiveTab] = useState<'brewgram' | 'chats'>('brewgram');
  const [posts, setPosts] = useState<BrewGramPost[]>(INITIAL_BREWGRAM_POSTS);
  const [chatThreads, setChatThreads] = useState<CustomerChatThread[]>(INITIAL_CHATS);
  const [selectedThreadId, setSelectedThreadId] = useState<string>('maya');

  if (!isOpen) return null;

  const handleLikePost = (postId: string) => {
    playClick();
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleSendReply = (threadId: string, replyIndex: number) => {
    const thread = chatThreads.find((t) => t.customerId === threadId);
    if (!thread || !thread.pendingReplies) return;

    const chosen = thread.pendingReplies[replyIndex];
    playSuccessChime();
    onEarnXP(chosen.xpBonus);

    setChatThreads((prev) =>
      prev.map((t) => {
        if (t.customerId === threadId) {
          return {
            ...t,
            unread: false,
            messages: [
              ...t.messages,
              {
                id: `rep_${Date.now()}`,
                sender: 'barista',
                text: chosen.text,
                timestamp: 'Just now',
              },
              {
                id: `cust_${Date.now()}`,
                sender: 'customer',
                text: chosen.response,
                timestamp: 'Just now',
              },
            ],
            pendingReplies: undefined, // Answered
          };
        }
        return t;
      })
    );
  };

  const activeChat = chatThreads.find((t) => t.customerId === selectedThreadId) || chatThreads[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in">
      
      {/* Smartphone Outer Bezel Shell */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[85vh] max-h-[720px] bg-stone-950 rounded-[44px] border-[6px] border-stone-700 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Dynamic Island Speaker Pill */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-end px-3">
          <div className="w-2 h-2 rounded-full bg-stone-800"></div>
        </div>

        {/* Top Status Bar */}
        <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-bold text-white z-20 select-none">
          <span>02:45 AM</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">5G</span>
            <span className="text-xs">🔋 98%</span>
          </div>
        </div>

        {/* App Title Bar */}
        <div className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <h3 className="font-serif font-black text-sm tracking-wide">
              {activeTab === 'brewgram' ? 'BrewGram 📸' : 'Cafe DMs 💬'}
            </h3>
          </div>
          <button
            onClick={() => { playClick(); onClose(); }}
            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* App Bottom Navigation Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-bold">
          <button
            onClick={() => { playClick(); setActiveTab('brewgram'); }}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'brewgram'
                ? 'text-rose-500 border-b-2 border-rose-500 bg-rose-50/50 dark:bg-rose-950/30'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>BrewGram Feed</span>
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('chats'); }}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'chats'
                ? 'text-rose-500 border-b-2 border-rose-500 bg-rose-50/50 dark:bg-rose-950/30'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Messages</span>
            {chatThreads.some((t) => t.unread) && (
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            )}
          </button>
        </div>

        {/* App Content Area */}
        <div className="flex-1 overflow-y-auto bg-stone-100 dark:bg-stone-950 p-3 sm:p-4">
          
          {/* TAB 1: BREWGRAM SOCIAL FEED */}
          {activeTab === 'brewgram' && (
            <div className="space-y-3.5">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-stone-900 rounded-2xl p-3.5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center font-bold text-xs">
                        {post.authorName[0]}
                      </div>
                      <div>
                        <span className="block font-bold text-xs text-stone-900 dark:text-white leading-tight">
                          {post.authorName}
                        </span>
                        <span className="text-[10px] text-stone-400 font-medium">
                          {post.authorHandle} • {post.timeAgo}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400 text-xs">
                      {'★'.repeat(post.rating)}
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                    {post.text}
                  </p>

                  {post.imageUrl && (
                    <div className="w-full h-44 rounded-xl overflow-hidden my-2 border border-rose-100 dark:border-rose-950 shadow-inner group">
                      <img
                        src={post.imageUrl}
                        alt="BrewGram post photo"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center gap-1 text-rose-500 font-bold hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{post.likes}</span>
                    </button>

                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                      Verified Customer ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: MESSAGES & DIRECT CHATS */}
          {activeTab === 'chats' && (
            <div className="flex flex-col h-full space-y-2.5">
              {/* Chat Thread Selector */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {chatThreads.map((thread) => (
                  <button
                    key={thread.customerId}
                    onClick={() => { playClick(); setSelectedThreadId(thread.customerId); }}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedThreadId === thread.customerId
                        ? 'bg-rose-500 text-white'
                        : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    {thread.customerName}
                  </button>
                ))}
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 bg-white dark:bg-stone-900 rounded-2xl p-3 border border-stone-200 dark:border-stone-800 space-y-2.5 overflow-y-auto">
                {activeChat.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'barista' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-2.5 rounded-2xl text-xs ${
                        m.sender === 'barista'
                          ? 'bg-rose-500 text-white rounded-br-none'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-stone-400 mt-0.5 px-1">{m.timestamp}</span>
                  </div>
                ))}
              </div>

              {/* Reply Options */}
              {activeChat.pendingReplies && activeChat.pendingReplies.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    Choose Reply (Earns +XP):
                  </span>
                  {activeChat.pendingReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendReply(activeChat.customerId, idx)}
                      className="w-full text-left p-2 rounded-xl bg-white dark:bg-stone-900 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-rose-50 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>💬 {reply.text}</span>
                      <span className="text-[10px] font-bold text-rose-500">+{reply.xpBonus} XP</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
