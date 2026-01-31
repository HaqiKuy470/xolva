"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Flame, Target, Award, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StatsPage() {
  // Data dummy untuk visualisasi XP Mingguan
  const data = [
    { day: 'Mon', xp: 45 },
    { day: 'Tue', xp: 52 },
    { day: 'Wed', xp: 38 },
    { day: 'Thu', xp: 65 },
    { day: 'Fri', xp: 48 },
    { day: 'Sat', xp: 80 },
    { day: 'Sun', xp: 72 },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-24 lg:pb-0 lg:pl-64 font-sans text-slate-900">
      <header className="bg-white p-6 lg:p-10 border-b border-slate-100">
        <h1 className="text-2xl font-black text-blue-600 tracking-tight italic uppercase">Performance Dashboard</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Analisis Progres Xolva Kamu</p>
      </header>

      <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
        
        {/* TOP CARDS: Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <Flame className="text-orange-500 mb-2" size={24} />
            <p className="text-[10px] font-black text-slate-400 uppercase">Current Streak</p>
            <p className="text-2xl font-black">12 <span className="text-sm text-slate-300">Days</span></p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <Target className="text-blue-600 mb-2" size={24} />
            <p className="text-[10px] font-black text-slate-400 uppercase">Habits Done</p>
            <p className="text-2xl font-black">124</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <Award className="text-purple-600 mb-2" size={24} />
            <p className="text-[10px] font-black text-slate-400 uppercase">Rank</p>
            <p className="text-2xl font-black">#42 <span className="text-sm text-slate-300">Global</span></p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <TrendingUp className="text-green-500 mb-2" size={24} />
            <p className="text-[10px] font-black text-slate-400 uppercase">Win Rate</p>
            <p className="text-2xl font-black">89%</p>
          </div>
        </div>

        {/* MAIN CHART: XP Growth */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h2 className="font-black text-lg mb-6 uppercase tracking-tight text-slate-800">Weekly XP Progress</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#94a3b8'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{color: '#2563eb', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="xp" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorXp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTTOM SECTION: Distribution & Level */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
             <h3 className="font-black text-sm uppercase tracking-[0.2em] mb-4 text-blue-400">Level Progression</h3>
             <p className="text-3xl font-black mb-2">Level 1 <span className="text-slate-500">→</span> Level 2</p>
             <div className="w-full bg-slate-800 h-4 rounded-full mt-6 overflow-hidden">
                <div className="bg-blue-500 h-full w-[35%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
             </div>
             <p className="text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-widest text-center">Butuh 130 XP lagi untuk naik level</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-center">
             <h3 className="font-black text-sm uppercase tracking-widest mb-6 text-slate-400">Habit Distribution</h3>
             <div className="space-y-4">
                {[
                  { label: 'Harian', val: '65%', color: 'bg-blue-600' },
                  { label: 'Mingguan', val: '20%', color: 'bg-purple-600' },
                  { label: 'Bulanan', val: '10%', color: 'bg-orange-600' },
                  { label: 'Project', val: '5%', color: 'bg-red-600' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="text-[10px] font-black w-20 uppercase text-slate-500">{item.label}</span>
                    <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", item.color)} style={{ width: item.val }} />
                    </div>
                    <span className="text-[10px] font-black text-slate-800">{item.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <Navbar />
    </main>
  );
}