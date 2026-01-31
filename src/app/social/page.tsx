"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Heart, MessageCircle, Share2, Award } from 'lucide-react';

export default function SocialPage() {
  // Data dummy untuk simulasi Global Explore
  const posts = [
    { id: 1, user: "Alif_Gamer", level: 5, action: "Lari Pagi 5km", image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=500", likes: 12, time: "2m ago" },
    { id: 2, user: "Sasa_Study", level: 3, action: "Belajar Coding 2 Jam", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500", likes: 8, time: "15m ago" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-24 lg:pb-0 lg:pl-64 font-sans text-slate-900">
      <header className="bg-white p-6 sticky top-0 z-10 border-b border-slate-100">
        <h1 className="text-2xl font-black text-blue-600 tracking-tight">Global Explore</h1>
        <p className="text-slate-400 text-xs font-medium">Lihat apa yang dunia capai hari ini</p>
      </header>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100">
            {/* User Info Header */}
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center font-bold text-blue-600">
                  {post.user[0]}
                </div>
                <div>
                  <p className="font-bold text-sm">{post.user}</p>
                  <span className="bg-blue-50 text-blue-600 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">LVL {post.level}</span>
                </div>
              </div>
              <span className="text-slate-400 text-[10px] font-medium">{post.time}</span>
            </div>

            {/* Achievement Content */}
            <div className="px-4 pb-3">
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Award size={16} className="text-yellow-500" /> Baru saja menyelesaikan: <span className="font-bold text-blue-600">{post.action}</span>
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="aspect-square bg-slate-200 relative">
              <img src={post.image} alt="Achievement" className="w-full h-full object-cover" />
            </div>

            {/* Interaction Bar (Emoji Style) */}
            <div className="p-4 flex items-center gap-6">
              <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors">
                <Heart size={22} />
                <span className="text-xs font-bold">{post.likes}</span>
              </button>
              <button className="text-slate-400 hover:text-blue-500 transition-colors">
                <MessageCircle size={22} />
              </button>
              <button className="text-slate-400 ml-auto hover:text-slate-900 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Navbar />
    </main>
  );
}