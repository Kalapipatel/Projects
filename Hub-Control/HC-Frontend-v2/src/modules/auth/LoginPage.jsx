import React, { useState, useEffect } from 'react';
import { ArrowRight, Box, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from './authSlice'; // Adjust path if needed relative to file

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Select state from Redux
  const { loading, error, isAuthenticated, redirectPage } = useSelector((state) => state.auth);

  // Local state for inputs
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Role Mapping (Keep strict logic from old code)
  const roleMap = { 'admin': 1, 'manager': 2, 'picker': 3 };

  // Effect: Redirect if login successful
  useEffect(() => {
    if (isAuthenticated) {
      // Logic: If backend provided a redirect page, map it to our new Routes
      let targetPath = '/';
      if (redirectPage === 'managerLp') targetPath = '/manager';
      else if (redirectPage === 'adminLp') targetPath = '/admin';
      else if (redirectPage === 'pickerLp') targetPath = '/picker';
      else targetPath = '/'; // fallback

      navigate(targetPath);
    }
  }, [isAuthenticated, redirectPage, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(clearError()); // Clear previous errors
    
    // Dispatch Async Thunk
    dispatch(loginUser({
      email,
      password,
      roleId: roleMap[role]
    }));
  };

  const handleRoleChange = (r) => {
    setRole(r);
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300">
      {/* Note: Dark/Light bg classes are handled by parent ThemeProvider wrapper div, 
          but we add specific card styling here */}
      
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
        type="button"
      >
        <ArrowRight className="rotate-180 w-4 h-4" /> Back to Home
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md p-8 border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className="inline-flex bg-blue-600 p-3 rounded-xl mb-4">
            <Box className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
          <p className="text-slate-500 dark:text-slate-400">Sign in to your HubControl dashboard</p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-6">
          {['admin', 'manager', 'picker'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRoleChange(r)}
              className={`flex-1 py-2 text-sm font-medium rounded-md capitalize transition-all ${
                role === r 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600" />
              <span className="text-slate-600 dark:text-slate-400">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-sm flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account? <a href="#" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Contact Sales</a>
        </div>
      </div>
      
      <div className="mt-8 text-slate-400 dark:text-slate-600 text-xs text-center max-w-sm">
        By signing in, you agree to HubControl's Terms of Service and Privacy Policy. Secure enterprise login.
      </div>
    </div>
  );
};

export default LoginPage;