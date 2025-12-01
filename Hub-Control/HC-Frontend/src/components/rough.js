import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Layers, 
  Truck, 
  BarChart3, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X, 
  Smartphone, 
  Package, 
  Activity,
  ShieldCheck,
  Globe,
  Clock
} from 'lucide-react';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    accent: "bg-orange-500 hover:bg-orange-400 text-white shadow-orange-500/30"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ badge, title, subtitle, align = 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} max-w-4xl mx-auto px-4`}>
    {badge && (
      <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
      {title}
    </h2>
    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, color = "blue" }) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${color}-50 group-hover:bg-${color}-100 transition-colors`}>
      <Icon className={`w-7 h-7 text-${color}-600`} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const StepCard = ({ number, title, desc }) => (
  <div className="relative flex flex-col items-center text-center p-6 z-10">
    <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl mb-4 shadow-lg ring-4 ring-white">
      {number}
    </div>
    <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-600">{desc}</p>
  </div>
);

// --- Sections ---

const Navbar = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'Modules', id: 'modules' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Benefits', id: 'benefits' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <Box className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">HubControl</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`} 
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => onNavigate('login')}
            className="text-sm font-semibold text-slate-900 hover:text-blue-600"
          >
            Log In
          </button>
          <Button onClick={() => onNavigate('login')} className="py-2 px-4 text-sm">
            Book Demo
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`} 
              className="text-lg font-medium text-slate-800"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-slate-100 my-2"></div>
          <Button onClick={() => { onNavigate('login'); setIsOpen(false); }}>Login / Sign Up</Button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onNavigate }) => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/30 skew-x-12 transform origin-top translate-x-32"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/40 rounded-full filter blur-3xl"></div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-700">New: AI-Powered Picking Routes</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            The OS for <span className="text-blue-600">Dark Stores</span> & Micro-Fulfillment.
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Orchestrate inventory, automate picking, and master last-mile logistics. 
            HubControl empowers brands to deliver faster with 99.9% inventory accuracy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button onClick={() => onNavigate('login')} className="w-full sm:w-auto text-lg px-8">
              Start Free Trial
            </Button>
            <Button variant="outline" className="w-full sm:w-auto text-lg px-8" onClick={() => window.location.href='#how-it-works'}>
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

        {/* Hero Visual/Dashboard Mock */}
        <div className="lg:w-1/2 w-full">
          <div className="relative bg-slate-900 rounded-2xl p-2 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 border border-slate-800">
            <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg z-20">
              Live Picking
            </div>
            <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              {/* Mock UI Header */}
              <div className="bg-slate-900 p-4 flex items-center gap-4 border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="h-2 w-32 bg-slate-700 rounded-full"></div>
              </div>
              {/* Mock UI Body */}
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
                {/* Mock List */}
                <div className="col-span-2 space-y-2 mt-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-md border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">#{1020 + i}</div>
                        <div className="h-2 w-24 bg-slate-600 rounded"></div>
                      </div>
                      <div className="h-4 w-12 bg-green-500/20 text-green-400 rounded flex items-center justify-center text-xs font-bold">Pack</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ModulesSection = () => (
  <section id="modules" className="py-24 bg-white">
    <SectionHeading 
      badge="Powerful Modules"
      title="Everything you need to run a Dark Store"
      subtitle="From the moment inventory arrives to the second it leaves for delivery, HubControl covers every operational node."
    />
    
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard 
        icon={Box}
        title="Inventory Intelligence"
        description="Real-time stock tracking across multiple locations. Supports FIFO/FEFO batch management to reduce wastage and optimize shelf life."
        color="blue"
      />
      <FeatureCard 
        icon={Smartphone}
        title="Mobile Picking App"
        description="Empower pickers with a dedicated mobile interface. Visual product verification, optimized routing paths, and hands-free modes."
        color="green"
      />
      <FeatureCard 
        icon={Layers}
        title="Order Batching Engine"
        description="Automatically group orders based on delivery zones or product similarity. Increase picking speed by up to 40% with smart batching."
        color="indigo"
      />
      <FeatureCard 
        icon={Globe}
        title="Multi-Store Management"
        description="Control unlimited dark stores from a single HQ dashboard. Transfer stock between hubs and balance inventory loads instantly."
        color="purple"
      />
      <FeatureCard 
        icon={ShieldCheck}
        title="Role-Based Access"
        description="Granular permissions for Admins, Managers, and Pickers. Ensure data security and operational focus for every employee."
        color="slate"
      />
      <FeatureCard 
        icon={BarChart3}
        title="Operational Analytics"
        description="Deep dive into picker performance, order cycle times, and stock movement velocity. Make data-driven decisions."
        color="orange"
      />
    </div>
  </section>
);

const WorkflowSection = () => (
  <section id="how-it-works" className="py-24 bg-slate-50 overflow-hidden">
    <div className="container mx-auto px-4">
      <SectionHeading 
        badge="The Workflow"
        title="Order Lifecycle Automation"
        subtitle="How HubControl turns chaos into a streamlined assembly line."
      />

      <div className="relative mt-20">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-green-400"></div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <StepCard 
            number="1"
            title="Order Received"
            desc="Orders sync instantly via API from Shopify, WooCommerce, or custom apps."
          />
          <StepCard 
            number="2"
            title="Smart Batching"
            desc="System groups orders by zone or product type to minimize walking distance."
          />
          <StepCard 
            number="3"
            title="Guided Picking"
            desc="Picker receives optimized route on mobile app. Scans item to verify."
          />
          <StepCard 
            number="4"
            title="Packing & QC"
            desc="Items moved to packing station. Secondary scan ensures 100% accuracy."
          />
          <StepCard 
            number="5"
            title="Dispatch"
            desc="Label generated, rider assigned, and tracking link sent to customer."
          />
        </div>
      </div>
    </div>
  </section>
);

const RolesSection = () => (
  <section className="py-24 bg-slate-900 text-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <div className="text-blue-400 font-bold tracking-widest uppercase mb-2">Designed for Teams</div>
          <h2 className="text-4xl font-bold mb-6">Empower every role in your fulfillment center</h2>
          <p className="text-slate-400 text-lg mb-8">
            HubControl provides specialized interfaces for every member of your staff, ensuring they have exactly the tools they need without the clutter.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                <Users className="text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Store Managers</h4>
                <p className="text-slate-400">Oversee live operations, manage shifts, approve stock transfers, and view real-time KPIs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">
                <Package className="text-green-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Pickers & Packers</h4>
                <p className="text-slate-400">Mobile-first interface with large buttons, barcode scanning, and clear bin locations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                <Activity className="text-purple-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">HQ Admins</h4>
                <p className="text-slate-400">Global view of all dark stores. Master catalog management and supplier relationships.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
           <div className="bg-slate-800 border border-slate-700 p-2 rounded-xl shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
               alt="Warehouse worker with tablet" 
               className="rounded-lg opacity-80 hover:opacity-100 transition-opacity"
             />
           </div>
        </div>
      </div>
    </div>
  </section>
);

const CtaSection = ({ onNavigate }) => (
  <section className="py-20 bg-blue-600 relative overflow-hidden">
    <div className="absolute inset-0 bg-blue-700/50 pattern-grid-lg"></div>
    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to optimize your dark store?</h2>
      <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
        Join leading Q-Commerce brands using HubControl to cut picking times by 50% and eliminate stock errors.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={() => onNavigate('login')} className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg shadow-lg hover:bg-slate-100 transition-colors transform hover:-translate-y-1">
          Get Started Now
        </button>
        <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
          Talk to Sales
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4 text-white">
            <Box className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold">HubControl</span>
          </div>
          <p className="text-sm">
            The complete operating system for modern dark stores and micro-fulfillment centers.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Features</a></li>
            <li><a href="#" className="hover:text-blue-400">Integrations</a></li>
            <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
            <li><a href="#" className="hover:text-blue-400">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400">Careers</a></li>
            <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400">System Status</a></li>
            <li><a href="#" className="hover:text-blue-400">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} HubControl Systems Inc. All rights reserved.
      </div>
    </div>
  </footer>
);

const LoginScreen = ({ onNavigate }) => {
  const [role, setRole] = useState('admin');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => onNavigate('home')} 
        className="absolute top-8 left-8 text-slate-500 hover:text-blue-600 flex items-center gap-2"
      >
        <ArrowRight className="rotate-180 w-4 h-4" /> Back to Home
      </button>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="inline-flex bg-blue-600 p-3 rounded-xl mb-4">
            <Box className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
          <p className="text-slate-500">Sign in to your HubControl dashboard</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
          {['admin', 'manager', 'picker'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 text-sm font-medium rounded-md capitalize transition-all ${
                role === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="you@company.com"
              defaultValue={role === 'picker' ? 'picker@store01.hub' : 'admin@hubcontrol.com'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
              <span className="text-slate-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <Button className="w-full py-3" onClick={() => alert(`Login simulation for ${role} role`)}>
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account? <a href="#" className="text-blue-600 font-medium hover:underline">Contact Sales</a>
        </div>
      </div>
      
      <div className="mt-8 text-slate-400 text-xs text-center max-w-sm">
        By signing in, you agree to HubControl's Terms of Service and Privacy Policy. Secure enterprise login.
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [view, setView] = useState('home'); // 'home' or 'login'

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  if (view === 'login') {
    return <LoginScreen onNavigate={setView} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      <Navbar onNavigate={setView} currentPage={view} />
      <main>
        <Hero onNavigate={setView} />
        <ModulesSection />
        <WorkflowSection />
        <RolesSection />
        <section id="benefits" className="py-20 bg-white">
           <div className="container mx-auto px-4 text-center">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
               <div>
                  <div className="text-4xl font-extrabold text-blue-600 mb-2">99.9%</div>
                  <div className="text-slate-500 font-medium">Inventory Accuracy</div>
               </div>
               <div>
                  <div className="text-4xl font-extrabold text-blue-600 mb-2">40%</div>
                  <div className="text-slate-500 font-medium">Faster Picking</div>
               </div>
               <div>
                  <div className="text-4xl font-extrabold text-blue-600 mb-2">&lt; 15min</div>
                  <div className="text-slate-500 font-medium">Order to Dispatch</div>
               </div>
               <div>
                  <div className="text-4xl font-extrabold text-blue-600 mb-2">24/7</div>
                  <div className="text-slate-500 font-medium">Operational Uptime</div>
               </div>
             </div>
           </div>
        </section>
        <CtaSection onNavigate={setView} />
      </main>
      <Footer />
    </div>
  );
};

export default App;