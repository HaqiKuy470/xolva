"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart2, User, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "Social", href: "/social" },
    { icon: BarChart2, label: "Stats", href: "/stats" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <>
      {/* --- MOBILE BOTTOM NAVBAR --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50 lg:hidden">
        {menuItems.slice(0, 2).map((item) => (
          <Link key={item.label} href={item.href} className={cn("flex flex-col items-center gap-1", pathname === item.href ? "text-blue-600" : "text-slate-400")}>
            <item.icon size={24} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
        
        <div className="relative -top-8">
          <button className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-200 text-white hover:scale-110 transition-transform">
            <Camera size={28} />
          </button>
        </div>

        {menuItems.slice(2).map((item) => (
          <Link key={item.label} href={item.href} className={cn("flex flex-col items-center gap-1", pathname === item.href ? "text-blue-600" : "text-slate-400")}>
            <item.icon size={24} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex-col p-6 z-50">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-black text-blue-600 tracking-tight italic">XOLVA</h1>
        </div>

        <div className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold",
                pathname === item.href 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon size={22} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <button className="mt-auto bg-blue-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          <Camera size={20} />
          <span>Post Achievement</span>
        </button>
      </aside>
    </>
  );
}