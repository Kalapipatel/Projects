import React from 'react';
import { CheckCircle, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button'; // Ensure you copy your old Button.js to src/components/ui/Button.jsx

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/30 dark:bg-blue-900/10 skew-x-12 transform origin-top translate-x-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/40 dark:bg-orange-900/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">New: AI-Powered Picking Routes</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
              The OS for <span className="text-blue-600 dark:text-blue-400">Dark Stores</span> & Micro-Fulfillment.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Orchestrate inventory, automate picking, and master last-mile logistics. 
              HubControl empowers brands to deliver faster with 99.9% inventory accuracy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button onClick={() => navigate('/login')} className="w-full sm:w-auto text-lg px-8">
                Start Free Trial
              </Button>
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                See How It Works
              </Button>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-green-500" /> <span>Multi-Store Support</span>
              </div>
              <div className="flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-green-500" /> <span>Real-time Sync</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="lg:w-1/2 w-full">
            <div className="relative bg-slate-900 rounded-2xl p-2 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 border border-slate-800">
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg z-20">
                Live Picking
              </div>
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <div className="bg-slate-900 p-4 flex items-center gap-4 border-b border-slate-700">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="h-2 w-32 bg-slate-700 rounded-full"></div>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="text-xs text-slate-400 uppercase">Total Orders (Today)</div>
                      <div className="text-2xl font-bold text-white">1,248</div>
                    </div>
                    <BarChart3 className="text-blue-500 w-8 h-8" />
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <div className="text-xs text-slate-400 mb-2">Picking Accuracy</div>
                    <div className="text-xl font-bold text-green-400">99.8%</div>
                    <div className="w-full bg-slate-600 h-1 mt-2 rounded-full">
                      <div className="bg-green-500 h-1 w-[99%] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <div className="text-xs text-slate-400 mb-2">Pending Batches</div>
                    <div className="text-xl font-bold text-orange-400">14</div>
                    <div className="flex -space-x-2 mt-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-slate-500 border-2 border-slate-700"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;