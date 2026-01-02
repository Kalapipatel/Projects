import React, { useState } from 'react';
import { ArrowRight, Box, AlertCircle, Loader2 } from 'lucide-react';
import api from '../services/api'; 

const LoginPage = ({ onNavigate }) => {
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Map string role to ID for Backend
  const roleMap = {
    'admin': 1,
    'manager': 2,
    'picker': 3
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Send Login Request (Credentials + Role)
      const response = await api.post('/auth/login', {
        email: email,
        password: password,
        roleId: roleMap[role]
      });

      const data = response.data;

      // 2. Success Handling
      if (data.jwtToken) {
        localStorage.setItem('jwtToken', data.jwtToken);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        localStorage.setItem('roleId', data.roleId);
        localStorage.setItem('isActive', data.isActive);
        localStorage.setItem('targetPage', data.redirectPage);

        onNavigate(data.redirectPage || 'home');
      } else {
        setError('Login successful but no token received.');
      }

    } catch (err) {
      console.error("Login Error:", err);

      let errorMsg = "Login failed. Please try again.";

      if (err.response) {
        const status = err.response.status;
        
        // --- LOGIC REQUIREMENT 1: Check Credentials ---
        if (status === 401) {
           errorMsg = "Your credentials are not valid.";
        } 
        // --- LOGIC REQUIREMENT 2: Check Role ---
        else if (status === 403) {
           errorMsg = "Your role is not correct. You do not have permission to login as " + role.toUpperCase();
        } 
        // Other Server Errors (500, 404, etc.)
        else {
           // Try to get message from backend, else generic
           const backendMsg = err.response.data?.message || err.response.data;
           errorMsg = typeof backendMsg === 'string' ? backendMsg : `Server Error (${status})`;
        }

      } else if (err.request) {
        errorMsg = "Cannot connect to server. Is Spring Boot running?";
      }

      setError(String(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => onNavigate('home')} 
        className="absolute top-8 left-8 text-slate-500 hover:text-blue-600 flex items-center gap-2"
        type="button"
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

        {/* Role Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
          {['admin', 'manager', 'picker'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { setRole(r); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md capitalize transition-all ${
                role === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
              <span className="text-slate-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-sm flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account? <a href="#" className="text-blue-600 font-medium hover:underline">Contact Sales</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
