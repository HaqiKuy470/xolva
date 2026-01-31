"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Plus, RotateCcw, Zap, CheckCircle2, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
// IMPORT SERVER ACTION YANG KITA BUAT TADI
import { createHabit } from './actions/habitActions';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('Harian');
  const [habitName, setHabitName] = useState('');
  const [selectedExp, setSelectedExp] = useState(3); 
  const [habits, setHabits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const habitConfigs: Record<string, { min: number, max: number, slots: number, color: string }> = {
    'Harian': { min: 3, max: 6, slots: 10, color: 'text-blue-600' },
    'Mingguan': { min: 15, max: 25, slots: 8, color: 'text-purple-600' },
    'Bulanan': { min: 40, max: 60, slots: 6, color: 'text-orange-600' },
    'Project': { min: 300, max: 600, slots: 1, color: 'text-red-600' },
  };

  const currentConfig = habitConfigs[activeTab];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedExp(habitConfigs[tab].min);
  };

  const handleAddHabit = async () => {
    if (!habitName || isLoading) return;
    
    setIsLoading(true);
    const finalExp = Math.min(Math.max(selectedExp, currentConfig.min), currentConfig.max);

    // GAS KE DATABASE!
    const result = await createHabit({
      name: habitName,
      category: activeTab.toUpperCase(),
      expReward: finalExp,
    });

    if (result.success) {
      // Update tampilan lokal biar Bos ngerasa cepet
      const newHabit = {
        id: Date.now().toString(),
        name: habitName,
        type: activeTab,
        exp: finalExp,
      };
      setHabits([newHabit, ...habits]);
      setHabitName('');
      console.log("Mantap Bos, data udah masuk Supabase!");
    } else {
      alert("Waduh Bos, database lagi ngambek. Cek terminal!");
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24 lg:pb-0 lg:pl-64 font-sans text-slate-900">
      {/* HEADER SECTION */}
      <section className="bg-white p-6 lg:p-10 border-b border-slate-100">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-200">😎</div>
            <div>
              <h1 className="font-black text-xl tracking-tight uppercase">tester123788</h1>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-tighter">LVL 1 • 0 XP Total</p>
            </div>
          </div>
          <div className="hidden md:block w-64">
            <div className="flex justify-between text-[10px] font-black mb-1 uppercase text-slate-400 tracking-widest">
              <span>Next Level</span>
              <span>0 / 200 XP</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-blue-600 w-0 transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>

      <div className="p-6 lg:p-10 max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Input Form */}
        <div className="xl:col-span-5">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="font-black text-xl mb-8 flex items-center gap-2 text-slate-800 italic">
               ADD NEW MISSION
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Aktivitas</label>
                <input 
                  type="text" 
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="Contoh: Push Up 50x"
                  className="w-full mt-2 p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white rounded-2xl focus:outline-none transition-all font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipe</label>
                  <select 
                    value={activeTab}
                    onChange={(e) => handleTabChange(e.target.value)}
                    className="w-full mt-2 p-4 bg-slate-50 rounded-2xl font-bold focus:outline-none appearance-none border-2 border-transparent focus:border-blue-100"
                  >
                    {Object.keys(habitConfigs).map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">XP Reward</label>
                  <input 
                    type="number" 
                    min={currentConfig.min}
                    max={currentConfig.max}
                    value={selectedExp}
                    onChange={(e) => setSelectedExp(parseInt(e.target.value) || 0)}
                    className="w-full mt-2 p-4 bg-blue-50 text-blue-600 rounded-2xl font-black focus:outline-none border-2 border-transparent focus:border-blue-200"
                  />
                </div>
              </div>

              {/* Status Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Allowed Range</span>
                  <span className={cn("font-black text-sm", currentConfig.color)}>{currentConfig.min} - {currentConfig.max} XP</span>
                </div>
                <div className="h-8 w-[1px] bg-slate-200" />
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Available Slots</span>
                  <span className="font-black text-sm text-slate-700">{currentConfig.slots} Habit</span>
                </div>
              </div>

              <button 
                onClick={handleAddHabit}
                disabled={isLoading}
                className={cn(
                  "w-full p-5 rounded-2xl font-black transition-all shadow-lg active:scale-95",
                  isLoading ? "bg-slate-300 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-blue-600 shadow-blue-100"
                )}
              >
                {isLoading ? "SAVING..." : "CONFIRM MISSION"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Today's Mission */}
        <div className="xl:col-span-7">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 min-h-[500px]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-black text-xl flex items-center gap-3">
                <Zap className="text-yellow-400 fill-yellow-400" size={24} /> ACTIVE MISSIONS
              </h2>
              <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                <RotateCcw size={20}/>
              </button>
            </div>
            
            <div className="space-y-4">
              {habits.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-20">
                  <Award size={64} />
                  <p className="font-black italic mt-4">NO ACTIVE MISSIONS</p>
                </div>
              ) : (
                habits.map((h) => (
                  <div key={h.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[1.5rem] border-2 border-transparent hover:border-blue-100 hover:bg-white transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-colors">
                        <CheckCircle2 size={28} />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-lg leading-tight uppercase tracking-tight">{h.name}</p>
                        <p className={cn("text-[10px] font-black uppercase mt-1", habitConfigs[h.type]?.color || "text-blue-600")}>
                          {h.type} • +{h.exp} XP REWARD
                        </p>
                      </div>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                       <span className="text-blue-600 font-black text-sm">+{h.exp}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </main>
  );
}